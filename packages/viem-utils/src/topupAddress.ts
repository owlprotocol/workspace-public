import { Account, Address, Chain, Client, formatEther, Transport } from "viem";
import { getBalance, sendTransaction } from "viem/actions";
import { getAction } from "viem/utils";

/**
 * Address balance topup params
 */
export type TopupAddressParams = {
    address: Address;
} & (
    | {
          minBalance: bigint;
          targetBalance?: bigint;
      }
    | {
          minBalance?: bigint;
          targetBalance: bigint;
      }
);
/**
 * Topup address up to `targetBalance` if balance is below `minBalance` (undefined = Always topup)
 *
 * Funds are sent to reach `targetBalance` (defaults to `minBalance`)
 * @param params publicClient, walletClient **with funds**, minBalance, targetBalance
 * @returns current address balance & transaction hash for topup (if required)
 */
export async function topupAddress(client: Client<Transport, Chain, Account>, params: TopupAddressParams) {
    const { address, minBalance } = params;
    if (params.minBalance == undefined && params.targetBalance == undefined) {
        //Ensure invariant either minBalance or targetBalance defined
        throw new Error(`topupAddress: minBalance AND targetBalance undefined`);
    }

    const targetBalance = params.targetBalance ?? minBalance!;
    if (minBalance && minBalance > targetBalance) {
        //Ensure invariant targetBalance >= minBalance
        throw new Error(
            `topupAddress: minBalance (${formatEther(minBalance)}) > targetBalance (${formatEther(targetBalance)})`,
        );
    }

    if (0n >= targetBalance) {
        //Ensure invariant targetBalance > 0
        throw new Error(`topupAddress: 0 >= targetBalance (${formatEther(targetBalance)})`);
    }

    const balance = await getAction(client, getBalance, "getBalance")({ address });
    // Amount to topup
    const targetDeficit = targetBalance - balance;

    if (
        targetDeficit > 0n &&
        //if minBalance undefined, always topup
        //if minBalance == 0, if balance == 0
        //if minBalance > 0, if balance < minBalance
        (minBalance == undefined || (minBalance == 0n && balance == 0n) || balance < minBalance)
    ) {
        //Address under-funded => deposit from wallet account
        const paymasterDepositHash = await getAction(
            client,
            sendTransaction,
            "sendTransaction",
        )({
            to: address,
            value: targetDeficit,
            account: client.account,
            chain: client.chain,
        });
        return { balance, hash: paymasterDepositHash };
    }

    return { balance };
}
