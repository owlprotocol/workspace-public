import { Account, Address, Chain, formatEther, PublicClient, Transport, WalletClient } from "viem";
import { getL2TransactionHashes, PublicActionsL2, WalletActionsL1 } from "viem/op-stack";

/**
 * Address balance topup params
 */
export type TopupAddressL2Params = {
    publicClientL1: PublicClient<Transport, Chain>;
    publicClientL2: PublicClient<Transport, Chain> & PublicActionsL2<Chain>;
    walletClientL1: WalletClient<Transport, Chain, Account> & WalletActionsL1<Chain, Account>;
    address: Address;
    l1Gas?: number | null;
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
 * Funds are sent to reach `targetBalance` (defaults to `minBalance`) using L1 -> L2 transfer.
 * @param params publicClient, walletClient **with funds**, minBalance, targetBalance
 * @returns current address balance & transaction hashes & receipts (resolves on confirmation) for topup (if required)
 */
export async function topupAddressL2(params: TopupAddressL2Params) {
    const { publicClientL1, publicClientL2, walletClientL1, address, minBalance, l1Gas } = params;
    if (params.minBalance == undefined && params.targetBalance == undefined) {
        //Ensure invariant either minBalance or targetBalance defined
        throw new Error(`topupAddressL2: minBalance AND targetBalance undefined`);
    }

    const targetBalance = params.targetBalance ?? minBalance!;
    if (minBalance && minBalance > targetBalance) {
        //Ensure invariant targetBalance >= minBalance
        throw new Error(
            `topupAddressL2: minBalance (${formatEther(minBalance)}) > targetBalance (${formatEther(targetBalance)})`,
        );
    }

    if (0n >= targetBalance) {
        //Ensure invariant targetBalance > 0
        throw new Error(`topupAddressL2: 0 >= targetBalance (${formatEther(targetBalance)})`);
    }

    const balance = await publicClientL2.getBalance({ address });
    // Amount to topup
    const targetDeficit = targetBalance - balance;

    if (
        targetDeficit > 0n &&
        //if minBalance undefined, always topup
        //if minBalance == 0, if balance == 0
        //if minBalance > 0, if balance < minBalance
        (minBalance == undefined || (minBalance == 0n && balance == 0n) || balance < minBalance)
    ) {
        // Address under-funded => deposit from wallet account
        // Follow viem guide https://viem.sh/op-stack/guides/deposits
        // Build parameters for the transaction on the L2.
        const args = await publicClientL2.buildDepositTransaction({
            mint: targetDeficit,
            to: address,
        });

        //Opposite of if statement for depositTransaction.ts (viem)
        if (typeof l1Gas === "number" || l1Gas === null) {
            //@ts-expect-error
            args.gas = l1Gas;
        }

        // Execute the deposit transaction on the L1.
        const l1DepositHash = await walletClientL1.depositTransaction(args);
        // Wait for the L1 transaction to be processed.
        const l1DepositReceipt = await publicClientL1.waitForTransactionReceipt({
            hash: l1DepositHash,
        });
        console.debug(l1DepositReceipt);
        // Get the L2 transaction hash from the L1 transaction receipt.
        const [l2DepositHash] = getL2TransactionHashes(l1DepositReceipt);
        // Wait for the L2 transaction to be processed.
        const l2DepositReceipt = await publicClientL2.waitForTransactionReceipt({
            hash: l2DepositHash,
        });

        return { balance, l1DepositHash, l1DepositReceipt, l2DepositHash, l2DepositReceipt };
    }

    return { balance };
}
