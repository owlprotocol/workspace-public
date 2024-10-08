import { Transport, Client, Address, Chain, LocalAccount } from "viem";
import {
    getPaymasterData,
    GetPaymasterDataParameters07,
    GetPaymasterDataReturnType07,
} from "../../actions/paymaster/getPaymasterData.js";
import {
    getPaymasterStubData,
    GetPaymasterStubDataParameters07,
    GetPaymasterStubDataReturnType07,
} from "../../actions/paymaster/getPaymasterStubData.js";

export type BackendPaymasterActions = {
    getPaymasterData: (parameters: GetPaymasterDataParameters07) => Promise<GetPaymasterDataReturnType07>;
    getPaymasterStubData: (parameters: GetPaymasterStubDataParameters07) => Promise<GetPaymasterStubDataReturnType07>;
};

export function backendPaymasterActions<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends LocalAccount = LocalAccount,
>(
    client: Client<transport, chain, account> & {
        paymaster: Address;
    },
): BackendPaymasterActions {
    return {
        getPaymasterData: (parameters) => getPaymasterData(client, parameters),
        getPaymasterStubData: (parameters) => getPaymasterStubData(client, parameters),
    };
}
