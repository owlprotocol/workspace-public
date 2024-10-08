import { Address, Chain, Client, ClientConfig, createClient, LocalAccount, Prettify, Transport } from "viem";
import { BackendPaymasterActions, backendPaymasterActions } from "./decorators/paymaster.js";

export type BackendPaymasterConfig<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends LocalAccount = LocalAccount,
> = Prettify<
    Pick<
        ClientConfig<transport, chain, account, undefined>,
        "cacheTime" | "key" | "name" | "pollingInterval" | "transport" | "chain" | "account"
    > & { account: account; paymaster: Address }
>;

export type BackendPaymaster<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends LocalAccount = LocalAccount,
> = Prettify<Client<transport, chain, account, undefined, BackendPaymasterActions>>;

export function createBackendPaymaster<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends LocalAccount = LocalAccount,
>(parameters: BackendPaymasterConfig<transport, chain, account>): BackendPaymaster {
    const { key = "paymaster-backend", name = "Paymaster Backend", transport, paymaster } = parameters;
    const client = Object.assign(
        createClient({
            ...parameters,
            key,
            name,
            transport,
            type: "PaymasterBackend",
        }),
        {
            paymaster,
        },
    ) as any;

    return client.extend(backendPaymasterActions);
}
