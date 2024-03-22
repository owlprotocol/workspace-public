import { Account, Chain, PublicClient, Transport, WalletClient } from "viem";

export type Clients = {
    publicClient: PublicClient;
    walletClient: WalletClient<Transport, Chain, Account>;
};
