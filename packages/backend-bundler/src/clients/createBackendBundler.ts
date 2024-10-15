import { Chain, createClient, Account, Transport } from "viem";
import { BackendBundler, BackendBundlerConfig } from "@owlprotocol/contracts-account-abstraction/clients";

import { backendBundlerWithFirebaseActions } from "./decorators/bundler.js";

export function createBackendBundlerWithFirebase<
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account = Account,
>(parameters: BackendBundlerConfig<transport, chain, account>): BackendBundler {
    const { key = "bundler-backend", name = "Bundler Backend", transport, entryPointSimulationsAddress } = parameters;
    const client = Object.assign(
        createClient({
            ...parameters,
            key,
            name,
            transport,
            type: "BundlerBackend",
        }),
        { entryPointSimulationsAddress },
    ) as any;

    return client.extend(backendBundlerWithFirebaseActions);
}
