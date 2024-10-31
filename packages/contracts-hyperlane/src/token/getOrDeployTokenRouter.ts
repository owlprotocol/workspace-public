import { Account, Chain, Transport, WalletClient } from "viem";
import { waitForTransactionReceipt } from "viem/actions";
import { getAction } from "viem/utils";
import {
    GetTokenRouterDeployTransactionsParameters,
    getTokenRouterDeployTransactions,
} from "./getTokenRouterDeployTransactions.js";

export async function getOrDeployTokenRouter(
    walletClient: WalletClient<Transport, Chain, Account>,
    params: GetTokenRouterDeployTransactionsParameters,
) {
    const { transactions, tokenRouterProxyAddress, proxyAdminAddress, tokenRouterImplAddress } =
        await getTokenRouterDeployTransactions(walletClient, params);

    if (transactions.length > 0) {
        for (const tx of transactions) {
            const hash = await walletClient.sendTransaction(tx);
            await getAction(walletClient, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash });
        }
    }

    return { tokenRouterProxyAddress, tokenRouterImplAddress, proxyAdminAddress };
}
