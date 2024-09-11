import { PublicClient, Address, Hex, encodeFunctionData, erc20Abi } from "viem";

export interface GetERC20ApprovalTransactionParams {
    publicClient: PublicClient;
    address: Address;
    owner: Address;
    spender: Address;
    amount: bigint;
}

/**
 * Check if sufficient allowance and return transaction if necessary
 * @returns
 */
export async function getERC20ApprovalTransaction(params: GetERC20ApprovalTransactionParams) {
    const { publicClient, address, owner, spender, amount } = params;

    // Check Allowance & Approve ERC20 for swap router
    let transaction: { account: Address; to: Address; data: Hex; value: 0n } | undefined;
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
        transaction = { account: owner, to: address, data, value: 0n };
    }

    return {
        allowance,
        transaction,
    };
}
