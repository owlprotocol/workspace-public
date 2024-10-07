import {
    BlockEncoded,
    ethBlockResource,
    ethTransactionResource,
    TransactionDecoded,
    TransactionEncoded,
} from "@owlprotocol/eth-firebase/admin";
import { Chain, Account, BlockTag, Client, Transport, GetBlockParameters, GetBlockReturnType, Hash } from "viem";
import { getChainId, getBlock as getBlockViem } from "viem/actions";
import { formatBlock, getAction } from "viem/utils";

/**
 * Returns information about a block at a block number, hash, or tag.
 *
 * - Docs: https://viem.sh/docs/actions/public/getBlock
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks/fetching-blocks
 * - JSON-RPC Methods:
 *   - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) for `blockNumber` & `blockTag`.
 *   - Calls [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash) for `blockHash`.
 *
 * @param client - Client to use
 * @param parameters - {@link GetBlockParameters}
 * @returns Information about the block. {@link GetBlockReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getBlock } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const block = await getBlock(client)
 */
export async function getBlock<
    chain extends Chain | undefined,
    account extends Account | undefined,
    includeTransactions extends boolean = false,
    blockTag extends BlockTag = "latest",
>(
    client: Client<Transport, chain, account>,
    params: GetBlockParameters<includeTransactions, blockTag> = {},
): Promise<GetBlockReturnType<chain, includeTransactions, blockTag>> {
    const { blockHash, blockNumber, includeTransactions: includeTransactions_ } = params;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));
    const format = client.chain?.formatters?.block?.format || formatBlock;

    const includeTransactions = includeTransactions_ ?? false;

    let blockIndexed: BlockEncoded | null = null;
    let transactionsIndexed: TransactionEncoded[] = [];

    if (blockHash) {
        [blockIndexed, transactionsIndexed] = await Promise.all([
            ethBlockResource.getOrNullEncoded({ chainId, hash: blockHash }),
            //Fetch transaction objects if requested
            includeTransactions ? ethTransactionResource.getWhereEncoded({ chainId, blockHash }) : Promise.resolve([]),
        ]);
    } else if (blockNumber) {
        [blockIndexed, transactionsIndexed] = await Promise.all([
            ethBlockResource.getWhereFirstEncoded({ chainId, number: blockNumber }),
            //Fetch transaction objects if requested
            includeTransactions
                ? ethTransactionResource.getWhereEncoded({ chainId, blockNumber })
                : Promise.resolve([]),
        ]);
    }

    if (blockIndexed && !includeTransactions) {
        //Block cached
        return format(blockIndexed);
    }

    if (blockIndexed && includeTransactions && blockIndexed.transactions.length === transactionsIndexed.length) {
        //Block cached & Transaction objects requested & Transactions cached
        return format({
            ...blockIndexed,
            transactions: transactionsIndexed,
        });
    }

    //Cache has insufficient data, fetch block and update cache
    const blockViem = await getBlockViem<chain, account, includeTransactions, blockTag>(client, params);

    if (includeTransactions) {
        const transactionsRpc = blockViem.transactions as TransactionDecoded[];

        //TODO: Seems like need to await for write to confirm?
        await Promise.all([
            ethTransactionResource.upsertBatch(
                transactionsRpc.map((t) => {
                    return { ...t, chainId };
                }),
            ),
            ethBlockResource.upsert({
                ...blockViem,
                chainId,
                transactions: transactionsRpc.map((t: { hash: Hash }) => t.hash),
            }),
        ]);
    } else {
        //TODO: Seems like need to await for write to confirm?
        await ethBlockResource.upsert({ ...blockViem, chainId });
    }

    return blockViem;
}
