import { Account, Transport, Chain, PublicClient, parseEther, WalletClient, Address, walletActions } from "viem";
import { getLocalAccount } from "@owlprotocol/viem-utils";
import { isProductionOrStaging } from "@owlprotocol/envvars";
import { topupAddressL2 } from "@owlprotocol/viem-utils";
import { publicActionsL2, walletActionsL1 } from "viem/op-stack";

/**
 * Topup chain utility account params. `chainL1` required if using L2 Topup
 */
export type TopupUtilityAccountParams = {
    /** Address */
    address: Address;
    /** Min balance to trigger topup */
    minBalance?: bigint;
    /** Target balance for topup */
    targetBalance?: bigint;
    /** Public Client */
    publicClient: PublicClient<Transport, Chain>;
} & (
    | { publicClientL1: PublicClient<Transport, Chain>; walletClientL1: WalletClient<Transport, Chain, Account> }
    | { publicClientL1?: undefined; walletClientL1?: undefined }
);
/**
 * Topup chain utility account
 * @param params
 */
export async function topupUtilityAccount(params: TopupUtilityAccountParams) {
    const { address, publicClient, targetBalance, publicClientL1, walletClientL1 } = params;
    const minBalance = params.minBalance ?? 0n;
    const chain = publicClient.chain;

    // Local development
    // chainId is local L1 network (anvil/L1 Optimism Devnet)
    if (!isProductionOrStaging() && (chain.id === 1337 || chain.id === 900)) {
        // Check account balance
        const balance = await publicClient.getBalance({ address });
        if (balance === 0n) {
            // One-time topup from local seed account
            // note: this is kinda a no-no in viem but works (should be using .extend usually)
            const client = { ...publicClient, account: getLocalAccount(1) };
            const localWalletClient = walletActions(client) as unknown as WalletClient<Transport, Chain, Account>;

            const hash = await localWalletClient.sendTransaction({
                to: address,
                // One-time 1,000 ETH transfer
                value: parseEther("1000"),
            });
            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            return { balance, hash, receipt };
        }

        return { balance };
    } else if (publicClientL1) {
        //TODO: Can crash when waiting for receipt too long
        //TODO: Maybe add longer confirmation time?
        // Topup from L1 balance
        return topupAddressL2({
            publicClientL1,
            publicClientL2: publicClient.extend(publicActionsL2()),
            walletClientL1: walletClientL1.extend(walletActionsL1()),
            address,
            minBalance,
            targetBalance,
        });
    }
}
