import { Account, Chain, PublicClient, Transport, WalletClient } from "viem";

export type Clients = {
    publicClient: PublicClient<Transport, Chain>;
    walletClient: WalletClient<Transport, Chain, Account>;
};
