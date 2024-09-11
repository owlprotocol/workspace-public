import { Address, Hex, encodeFunctionData, zeroAddress } from "viem";
import { exactInput, exactInputSingle } from "../artifacts/ISwapRouter.js";
import { multicall } from "../artifacts/IMulticall.js";
import { unwrapWNativeToken } from "../artifacts/IPeripheryPayments.js";
import { encodeTradePath } from "../quoter/tradePath.js";

/** Combine transactions as multicall and add `unwrapWNativeToken` if necessary */
export interface GetMulticallSwapTransactionParams {
    /** Algebra Integral swap router address */
    swapRouterAddress: Address;
    /** Weth unwrap recipient */
    recipient: Address;
    /** Transactions with wethIn/wethOutMinimum info */
    transactions: {
        data: Hex;
        value: bigint;
        wethOutMinimum: bigint;
    }[];
}

/**
 * Combine transaction to swap ERC20 tokens as a `multicall`
 * - if `transactions.length === 0`, avoid multicall if possible
 * - if `sum(wethIn)` > 0, set `tx.value` as sum
 * - if `sum(wethOut)` > 0, add `unwrapWNativeToken` call
 * - if both are > 0, throw an error as this breaks the invariant
 *
 * @param params
 */
export function getMulticallSwapTransaction(params: GetMulticallSwapTransactionParams): {
    to: Address;
    data: Hex;
    value: bigint;
} {
    const { swapRouterAddress, transactions, recipient } = params;
    if (transactions.length === 0) {
        throw new Error(`getMulticallSwapTransactionData transactions.length === 0`);
    }

    const value = transactions.reduce((acc, t) => acc + t.value, 0n);
    const wethOutMinimum = transactions.reduce((acc, t) => acc + t.wethOutMinimum, 0n);
    if (value > 0 && wethOutMinimum > 0) {
        throw new Error(
            `getMulticallSwapTransactionData invalid multicall BOTH value (wethIn) ${value} > 0 && wethOutMinimum ${wethOutMinimum} > 0`,
        );
    }

    if (transactions.length === 1 && wethOutMinimum === 0n) {
        // Simple transaction, no multicall necessary
        return {
            to: swapRouterAddress,
            data: transactions[0].data,
            value,
        };
    }

    // Token output WETH
    const dataArr = transactions.map((t) => t.data);
    if (wethOutMinimum > 0n) {
        // Encode unwrap
        const unwrapData = encodeFunctionData({
            abi: [unwrapWNativeToken],
            functionName: "unwrapWNativeToken",
            args: [wethOutMinimum, recipient],
        });
        dataArr.push(unwrapData);
    }

    // Multicall transaction
    const data = encodeFunctionData({
        abi: [multicall],
        functionName: "multicall",
        args: [dataArr],
    });

    return {
        to: swapRouterAddress,
        data,
        value,
    };
}

/** Get transaction data for swap */
export interface GetSwapExactInputTransactionParams {
    /** Algebra Integral swap router address */
    swapRouterAddress: Address;
    /** Swap path, if only 2 tokens, will use `exactInputSingle` */
    path: [Address, ...Address[]];
    /** Input token amount */
    amountIn: bigint;
    /** Output token minimum amount */
    amountOutMinimum: bigint;
    /** WETH address for wrap/unwrap */
    weth: Address;
    /** Swap output recipient (defaults to account) */
    recipient: Address;
    /** Swap expiry (defaults to 1hr) */
    deadline?: bigint;
}

/**
 * Get data for multicall transaction to swap ERC20 token using Algebra Swap Router
 * @warning Do **NOT** use this if not using `getMulticallSwapTransaction`, use `getSwapExactInputTransaction` instead
 * @warning The following edge cases are good to know
 * - WETH input: `amountIn` is used for the `value` field of the transaction
 * - WETH output: swap call `recipient` is set to address(0) you **MUST** re-encode this with a multicall to `unwrapWNativeToken`
 * @param params
 * @return transaction, wethIn, wethOut
 */
export function prepareMulticallSwapExactInput(params: GetSwapExactInputTransactionParams): {
    to: Address;
    data: Hex;
    value: bigint;
    wethOutMinimum: bigint;
} {
    const { swapRouterAddress, path, amountIn, amountOutMinimum, recipient } = params;
    const deadline = params.deadline ?? BigInt((Date.now() + 600) * 1000); //default expire in 10min
    const weth = params.weth;

    const tokenIn = path[0];
    const tokenOut = path[path.length - 1];

    const isWethInput = tokenIn.toLowerCase() === weth.toLowerCase();
    const isWethOutput = tokenOut.toLowerCase() === weth.toLowerCase();

    let data: Hex;
    if (path.length === 2) {
        // Single swap
        const tokenOut = path[1];
        data = encodeFunctionData({
            abi: [exactInputSingle],
            functionName: "exactInputSingle",
            args: [
                {
                    tokenIn,
                    tokenOut,
                    // WETH output, set recipient to address(0), MUST unwrap in `multicall` with `unwrapWNativeToken`
                    recipient: isWethOutput ? zeroAddress : recipient,
                    deadline,
                    amountIn,
                    amountOutMinimum,
                    limitSqrtPrice: 0n,
                },
            ],
        });
    } else if (path.length > 2) {
        // Multi-hop swap
        data = encodeFunctionData({
            abi: [exactInput],
            functionName: "exactInput",
            args: [
                {
                    path: encodeTradePath(path),
                    // WETH output, set recipient to address(0), MUST unwrap in `multicall` with `unwrapWNativeToken`
                    recipient: isWethOutput ? zeroAddress : recipient,
                    deadline,
                    amountIn,
                    amountOutMinimum,
                },
            ],
        });
    } else {
        throw new Error(`Invalid path.length ${path.length} < 2`);
    }

    // Token input WETH
    const value = isWethInput ? amountIn : 0n;

    return {
        to: swapRouterAddress,
        data,
        value,
        wethOutMinimum: isWethOutput ? amountOutMinimum : 0n,
    };
}
