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

/**
 * Creates a Public Client with a given [Transport](https://viem.sh/docs/clients/intro) configured for a [Chain](https://viem.sh/docs/clients/chains).
 *
 * - Docs: https://viem.sh/docs/clients/public
 *
 * A Public Client is an interface to "public" [JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/) methods such as retrieving block numbers, transactions, reading from smart contracts, etc through [Public Actions](/docs/actions/public/introduction).
 *
 * @param config - {@link PublicClientConfig}
 * @returns A Public Client. {@link PublicClient}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 */
export function createIndexerClient<
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
