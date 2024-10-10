import type { Address } from "abitype";
import {
    Transport,
    Chain,
    Account,
    RpcSchema,
    PublicClientConfig,
    PublicClient,
    ParseAccount,
    createClient,
    publicActions,
} from "viem";
import { indexerActions } from "./decorators/indexer.js";

export function createBackendIndexer<
    transport extends Transport,
    chain extends Chain | undefined = undefined,
    accountOrAddress extends Account | Address | undefined = undefined,
    rpcSchema extends RpcSchema | undefined = undefined,
>(
    parameters: PublicClientConfig<transport, chain, accountOrAddress, rpcSchema>,
): PublicClient<transport, chain, ParseAccount<accountOrAddress>, rpcSchema> {
    const { key = "indexer", name = "Indexer Client" } = parameters;
    const client = createClient({
        ...parameters,
        key,
        name,
        type: "indexerClient",
    }) as any;
    return client.extend(publicActions).extend(indexerActions);
}
