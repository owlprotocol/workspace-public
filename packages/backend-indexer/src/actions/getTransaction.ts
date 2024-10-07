import { ethTransactionResource } from "@owlprotocol/eth-firebase/admin";
import { TransactionDecoded, TransactionEncoded } from "@owlprotocol/zod-sol";
import {
    Chain,
    BlockTag,
    Client,
    Transport,
    GetTransactionParameters,
    GetTransactionReturnType,
    numberToHex,
    formatTransaction,
} from "viem";
import { getChainId, getTransaction as getTransactionViem } from "viem/actions";
import { getAction } from "viem/utils";

/**
 * Returns information about a [Transaction](https://viem.sh/docs/glossary/terms#transaction) given a hash or block identifier.
 *
 * - Docs: https://viem.sh/docs/actions/public/getTransaction
 * - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions
 * - JSON-RPC Methods: [`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash)
 *
 * @param client - Client to use
 * @param parameters - {@link GetTransactionParameters}
 * @returns The transaction information. {@link GetTransactionReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getTransaction } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const transaction = await getTransaction(client, {
 *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
 * })
 */
export async function getTransaction<chain extends Chain | undefined, blockTag extends BlockTag = "latest">(
    client: Client<Transport, chain>,
    params: GetTransactionParameters<blockTag>,
): Promise<GetTransactionReturnType<chain, blockTag>> {
    const { blockHash, blockNumber, hash, index } = params;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));
    const format = client.chain?.formatters?.transaction?.format || formatTransaction;

    const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;

    let transactionIndexed: TransactionEncoded | null = null;
    if (hash) {
        transactionIndexed = await ethTransactionResource.getOrNullEncoded({ chainId, hash });
    } else if (blockHash) {
        transactionIndexed = await ethTransactionResource.getWhereFirstEncoded({
            chainId,
            blockHash,
            transactionIndex: index,
        });
    } else if (blockNumberHex) {
        transactionIndexed = await ethTransactionResource.getWhereFirstEncoded({
            chainId,
            blockNumber: blockNumberHex,
            transactionIndex: index,
        });
    }

    if (transactionIndexed) {
        return format(transactionIndexed);
    }

    //Cache has insufficient data, fetch transaction and update cache
    const transactionViem = await getTransactionViem<chain, blockTag>(client, params);

    if (transactionViem.blockHash) {
        //Update cache with confirmed tx only
        //TODO: Seems like need to await for write to confirm?
        await ethTransactionResource.upsert({ ...(transactionViem as TransactionDecoded), chainId });
    }

    return transactionViem;
}
