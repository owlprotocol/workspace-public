import { Account, Transport, Chain, parseEther, Address, Client } from "viem";
import { getLocalAccount } from "@owlprotocol/viem-utils";
import { isProductionOrStaging } from "@owlprotocol/envvars";
import { topupAddressL2 } from "@owlprotocol/viem-utils";
import { getAction } from "viem/utils";
import { getBalance, sendTransaction, waitForTransactionReceipt } from "viem/actions";

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
    /** L1 Client for OPStack bridging */
    clientL1?: Client<Transport, Chain, Account>;
};
/**
 * Topup chain utility account
 * @param params
 */
export async function topupUtilityAccount(client: Client<Transport, Chain>, params: TopupUtilityAccountParams) {
    const { address, targetBalance, clientL1 } = params;
    const minBalance = params.minBalance ?? 0n;
    const chain = client.chain;

    // Local development
    // chainId is local L1 network (anvil/L1 Optimism Devnet)
    //TODO: Make dynamic
    if (!isProductionOrStaging() && (chain.id === 1337 || chain.id === 1338 || chain.id === 900)) {
        // Check account balance
        const balance = await getAction(client, getBalance, "getBalance")({ address });
        if (balance === 0n) {
            // One-time topup from local seed account
            // note: this is kinda a no-no in viem but works (should be using .extend usually)
            const hash = await getAction(
                client,
                sendTransaction,
                "sendTransaction",
            )({
                to: address,
                // One-time 1,000 ETH transfer
                value: parseEther("1000"),
                chain,
                account: getLocalAccount(1),
            });
            const receipt = await getAction(
                client,
                waitForTransactionReceipt,
                "waitForTransactionReceipt",
            )({
                hash,
            });

            return { balance, hash, receipt };
        }

        return { balance };
    } else if (clientL1) {
        //TODO: Can crash when waiting for receipt too long
        //TODO: Maybe add longer confirmation time?
        // Topup from L1 balance
        return topupAddressL2({
            clientL1,
            clientL2: client,
            address,
            minBalance,
            targetBalance,
        });
    }
}
