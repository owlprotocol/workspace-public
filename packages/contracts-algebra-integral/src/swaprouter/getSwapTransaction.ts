import { Address, Hex, encodeFunctionData } from "viem";
import { exactInput, exactInputSingle } from "../artifacts/ISwapRouter.js";
import { multicall } from "../artifacts/IMulticall.js";
import { unwrapWNativeToken } from "../artifacts/IPeripheryPayments.js";
import { encodeTradePath } from "../quoter/tradePath.js";

export interface GetSwapExactInputTransactionsParams {
    /** Algebra Integral swap router address */
    swapRouterAddress: Address;
    /** Swap path, if only 2 tokens, will use `exactInputSingle` */
    path: [Address, ...Address[]];
    /** Input token amount */
    amountIn: bigint;
    /** Output token minimum amount */
    amountOutMinimum: bigint;
    /** Account */
    account: Address;
    /** WETH address for wrap/unwrap */
    wethAddress?: Address;
    /** Swap output recipient (defaults to account) */
    recipient?: Address;
    /** Swap expiry (defaults to 1hr) */
    deadline?: bigint;
}

/**
 * Get transactions to swap ERC20 token using Algebra Swap Router
 * @param params
 * @return necessary transactions to complete bridging
 */
export function getSwapExactInputTransaction(params: GetSwapExactInputTransactionsParams): {
    account: Address;
    to: Address;
    data: Hex;
    value: bigint;
} {
    const { swapRouterAddress, path, amountIn, amountOutMinimum, account: from } = params;
    const recipient = params.recipient ?? from; //default swap to self
    const deadline = params.deadline ?? BigInt((Date.now() + 600) * 1000); //default expire in 10min
    const wethAddress = params.wethAddress ?? "0x4200000000000000000000000000000000000006";

    const tokenIn = path[0];
    const tokenOut = path[path.length - 1];

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
                    recipient,
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
                    recipient,
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
    if (tokenOut.toLowerCase() === wethAddress.toLowerCase()) {
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
    const value = tokenIn.toLowerCase() === wethAddress.toLowerCase() ? amountIn : 0n;

    return {
        account: from,
        to: swapRouterAddress,
        data,
        value,
    };
}
