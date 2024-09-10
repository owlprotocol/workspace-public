import { PublicClient, Address, Hex, encodeFunctionData, erc20Abi } from "viem";
import { exactInput, exactInputSingle } from "../artifacts/ISwapRouter.js";
import { multicall } from "../artifacts/IMulticall.js";
import { unwrapWNativeToken } from "../artifacts/IPeripheryPayments.js";
import { encodeTradePath } from "../quoter/tradePath.js";

//TODO: list
//exactInput support
//WETH unwrapping
//exactoutput

export interface SwapExactInputParams {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral swap router address */
    swapRouterAddress: Address;
    /** Swap path, if only 2 tokens, will use `exactInputSingle` */
    path: [Address, ...Address[]];
    /** Input token amount */
    amountIn: bigint;
    /** Output token minimum amount */
    amountOutMinimum: bigint;
    /** Account */
    from: Address;
    /** Swap output recipient (defaults to account) */
    recipient?: Address;
    /** Swap expiry (defaults to 1hr) */
    deadline?: bigint;
    /** WETH address for wrap/unwrap */
    wethAddress?: Address;
}

/**
 * Get transactions to swap ERC20 token using Algebra Swap Router
 * @param params
 * @return necessary transactions to complete bridging
 */
export async function swapExactInput(params: SwapExactInputParams): Promise<{
    approval?: { account: Address; to: Address; data: Hex };
    swap: { account: Address; to: Address; data: Hex; value: bigint };
}> {
    const { publicClient, swapRouterAddress, path, amountIn, amountOutMinimum, from } = params;
    const recipient = params.recipient ?? from; //default swap to self
    const deadline = params.deadline ?? BigInt((Date.now() + 600) * 1000); //default expire in 10min
    const wethAddress = params.wethAddress ?? "0x4200000000000000000000000000000000000006";

    const tokenIn = path[0];
    const tokenOut = path[path.length - 1];

    let approval: { account: Address; to: Address; data: Hex } | undefined;

    if (tokenIn.toLowerCase() === wethAddress.toLowerCase()) {
        // Token input WETH, no allowance necessary
        approval = undefined;
    } else {
        // Check ERC20 Allowance
        const erc20Approval = await getERC20Approval({
            publicClient,
            address: tokenIn,
            owner: from,
            spender: swapRouterAddress,
            amount: amountIn,
        });
        approval = erc20Approval.transaction;
    }

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
            abi: [multicall, unwrapData],
            functionName: "multicall",
            args: [[data]],
        });
    }

    return {
        approval,
        swap: {
            account: from,
            to: swapRouterAddress,
            data,
            value: 0n,
        },
    };
}

export interface GetERC20ApprovalParams {
    publicClient: PublicClient;
    address: Address;
    owner: Address;
    spender: Address;
    amount: bigint;
}

//TODO: Move this to a more general SDK
/**
 * Check if sufficient allowance and return transaction if necessary
 * @returns
 */
export async function getERC20Approval(params: GetERC20ApprovalParams) {
    const { publicClient, address, owner, spender, amount } = params;

    // Check Allowance & Approve ERC20 for swap router
    let transaction: { account: Address; to: Address; data: Hex } | undefined;
    const allowance = await publicClient.readContract({
        address,
        abi: erc20Abi,
        functionName: "allowance",
        args: [owner, spender],
    });

    if (allowance < amount) {
        const data = await encodeFunctionData({
            abi: erc20Abi,
            functionName: "approve",
            args: [spender, amount],
        });
        transaction = { account: owner, to: spender, data };
    }

    return {
        allowance,
        transaction,
    };
}
