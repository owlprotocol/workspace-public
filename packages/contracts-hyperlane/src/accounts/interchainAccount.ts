import { Account, Address, Chain, Transport, WalletClient } from "viem";

export type InterchainAccount = Account<Address> & {
    //deploy params for ICA
    router: Address;
    ism: Address;
    //on the main chain
    originClient: WalletClient<Transport, Chain, Account>;
    originRouter: Address;
};
