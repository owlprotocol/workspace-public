import { PublicClient, Address, Hex, encodeFunctionData, erc20Abi } from "viem";
import { exactInputSingle } from "../artifacts/ISwapRouter.js";

//TODO: list
//exactInput support
//WETH unwrapping
//exactoutput

export interface AlgebraSwapERC20Params {
    /** Swap params */
    tokenIn: Address;
    tokenOut: Address;
    amountIn: bigint;
    amountOutMinimum: bigint;
    from: Address;
    recipient?: Address;
    deadline?: bigint;
    /** Network params */
    publicClient: PublicClient;
    algebraSwapRouter: Address;
}

/**
 * Get transactions to swap ERC20 token using Algebra Swap Router
 * @param params
 * @return necessary transactions to complete bridging
 */
export async function getSwapExactInputTransactions(params: AlgebraSwapERC20Params): Promise<{
    approval?: { account: Address; to: Address; data: Hex };
    swap: { account: Address; to: Address; data: Hex };
}> {
    const { tokenIn, tokenOut, amountIn, amountOutMinimum, algebraSwapRouter, from, publicClient } = params;
    const recipient = params.recipient ?? from; //default swap to self
    const deadline = params.deadline ?? BigInt((Date.now() + 600) * 1000); //default expire in 10min

    // Check Allowance & Approve ERC20 for swap router
    const { transaction: approval } = await getERC20Approval({
        publicClient,
        address: tokenIn,
        owner: from,
        spender: algebraSwapRouter,
        amount: amountIn,
    });

    const data = encodeFunctionData({
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

    return {
        approval,
        swap: {
            account: from,
            to: algebraSwapRouter,
            data,
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
