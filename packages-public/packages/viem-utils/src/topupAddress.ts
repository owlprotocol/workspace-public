import { Address, formatEther } from "viem";
import { Clients } from "./clients.js";

/**
 * Topup address with funds if its balance is below a certain minimum.
 * If a topup is required (balance < `minBalance`), funds are sent to reach `targetBalance`
 * @param clients publicClient, walletClient with funds, minBalance (to trigger topup), targetBalance (topup amount)
 * @returns current address balance & transaction hash for topup (if required)
 */
export async function topupAddress(clients: Clients & { address: Address; minBalance: bigint; targetBalance: bigint }) {
    const { publicClient, walletClient, address, minBalance, targetBalance } = clients;

    if (minBalance > targetBalance) {
        //Ensure invariant minBalance <= targetBalance
        throw new Error(
            `topupAddress: minBalance (${formatEther(minBalance)}) > targetBalance (${formatEther(targetBalance)})`,
        );
    }

    const balance = await publicClient.getBalance({ address });

    if (balance < minBalance) {
        //Address under-funded => deposit from wallet account
        const depositAmount = targetBalance - balance;
        const paymasterDepositHash = await walletClient.sendTransaction({
            to: address,
            value: depositAmount,
        });
        return { balance, hash: paymasterDepositHash };
    }

    return { balance };
}
