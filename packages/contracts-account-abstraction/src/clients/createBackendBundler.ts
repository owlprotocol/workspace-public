import { Address, Chain, Client, ClientConfig, createClient, Account, Prettify, Transport } from "viem";
import { BackendBundlerActions, backendBundlerActions } from "./decorators/bundler.js";

export type BackendBundlerConfig<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account = Account,
> = Prettify<
    Pick<
        ClientConfig<transport, chain, account, undefined>,
        "cacheTime" | "key" | "name" | "pollingInterval" | "transport"
    > & { entryPointSimulationsAddress: Address }
>;

export type BackendBundler<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account = Account,
> = Prettify<Client<transport, chain, account, undefined, BackendBundlerActions>>;

export function createBackendBundler<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account = Account,
>(parameters: BackendBundlerConfig<transport, chain, account>): BackendBundler {
    const { key = "bundler-backend", name = "Bundler Backend", transport } = parameters;
    const client = createClient({
        ...parameters,
        key,
        name,
        transport,
        type: "BundlerBackend",
    }) as any;

    return client.extend(backendBundlerActions);
}