import { Transport, Chain, WalletClient, Account } from "viem";
import { transactionQueue } from "@latticexyz/common/actions";

/**
 * Extend a wallet client based on its chain config
 * - EIP-1559 supported: Add transactionQueue
 * @param params walletClient
 */
export function extendWalletClient(
    walletClient: WalletClient<Transport, Chain, Account>,
): WalletClient<Transport, Chain, Account> {
    //TODO: Find way to detect this?
    // IOTEX do NOT use lattice, Polygon Blackberry
    // Non-EIP1559 Chains
    const nonEIP1559 = [4690, 4689, 94204209];
    if (!nonEIP1559.includes(walletClient.chain.id)) {
        return walletClient.extend(transactionQueue());
    }

    return walletClient;
}
