import { Address, formatEther } from "viem";
import { Clients } from "./clients.js";

/**
 * Address balance topup params
 */
export interface TopupAddressParams extends Clients {
    address: Address;
    minBalance: bigint;
    targetBalance?: bigint;
}
/**
 * Topup address with funds if balance is below `minBalance` (0 = Always topup)
 *
 * Funds are sent to reach `targetBalance` (defaults to `minBalance`)
 * @param params publicClient, walletClient **with funds**, minBalance, targetBalance
 * @returns current address balance & transaction hash for topup (if required)
 */
export async function topupAddress(params: TopupAddressParams) {
    const { publicClient, walletClient, address, minBalance } = params;
    if (minBalance == 0n && params.targetBalance === undefined) {
        //Ensure invariant targetBalance ALWAYS defined with minBalance = 0
        throw new Error(`topupAddressL2: minBalance 0, targetBalance MUST be defined`);
    }

    const targetBalance = params.targetBalance ?? minBalance;
    if (minBalance > targetBalance) {
        //Ensure invariant targetBalance >= minBalance
        throw new Error(
            `topupAddress: minBalance (${formatEther(minBalance)}) > targetBalance (${formatEther(targetBalance)})`,
        );
    }

    if (0n >= targetBalance) {
        //Ensure invariant targetBalance > 0
        throw new Error(`topupAddress: 0 >= targetBalance (${formatEther(targetBalance)})`);
    }

    const balance = await publicClient.getBalance({ address });
    // Amount to topup
    const targetDeficit = targetBalance - balance;

    if (targetDeficit > 0n && (balance < minBalance || minBalance == 0n)) {
        //Address under-funded => deposit from wallet account
        const paymasterDepositHash = await walletClient.sendTransaction({
            to: address,
            value: targetDeficit,
        });
        return { balance, hash: paymasterDepositHash };
    }

    return { balance };
}
