import { Address, Hex, encodeFunctionData, zeroAddress } from "viem";
import { exactInput, exactInputSingle } from "../artifacts/ISwapRouter.js";
import { multicall } from "../artifacts/IMulticall.js";
import { unwrapWNativeToken } from "../artifacts/IPeripheryPayments.js";
import { encodeTradePath } from "../quoter/tradePath.js";

export interface GetSwapExactInputTransactionsParams {
    /** Algebra Integral swap router address */
    swapRouter: Address;
    /** Swap path, if only 2 tokens, will use `exactInputSingle` */
    path: [Address, ...Address[]];
    /** Input token amount */
    amountIn: bigint;
    /** Output token minimum amount */
    amountOutMinimum: bigint;
    /** WETH address for wrap/unwrap */
    weth: Address;
    /** Swap output recipient */
    recipient: Address;
    /** Swap expiry (defaults to 1hr) */
    deadline?: bigint;
}

/**
 * Get transactions to swap ERC20 token using Algebra Swap Router
 * @warning The following edge cases are good to know
 * - WETH input: `amountIn` is used for the `value` field of the transaction
 * - WETH output: swap call `recipient` is set to address(0) and unwrapped to `recipient` using multicall
 * @param params
 * @return necessary transactions to complete bridging
 */
export function getSwapExactInputTransaction(params: GetSwapExactInputTransactionsParams): {
    to: Address;
    data: Hex;
    value: bigint;
} {
    const { swapRouter, path, amountIn, amountOutMinimum, recipient } = params;
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
                    // WETH output, set recipient to address(0) (unwrapped later)
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
                    // WETH output, set recipient to address(0) (unwrapped later)
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

    // Token output WETH
    if (isWethOutput) {
        // Encode unwrap
        const unwrapData = encodeFunctionData({
            abi: [unwrapWNativeToken],
            functionName: "unwrapWNativeToken",
            args: [amountOutMinimum, recipient],
        });
        data = encodeFunctionData({
            abi: [multicall],
            functionName: "multicall",
            args: [[data, unwrapData]],
        });
    }

    // Token input WETH
    const value = isWethInput ? amountIn : 0n;

    return {
        to: swapRouter,
        data,
        value,
    };
}
