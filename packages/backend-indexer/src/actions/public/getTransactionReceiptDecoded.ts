import { Chain, Client, Transport, GetTransactionReceiptParameters, Log } from "viem";
import { getTransactionReceipt as getTransactionReceiptViem } from "viem/actions";
import { decodeLogWithAbis } from "../../controllers/index.js";

/**
 * Returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash.
 *
 * - Docs: https://viem.sh/docs/actions/public/getTransactionReceipt
 * - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions/fetching-transactions
 * - JSON-RPC Methods: [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionreceipt)
 *
 * @param client - Client to use
 * @param parameters - {@link GetTransactionReceiptParameters}
 * @returns The transaction receipt. {@link GetTransactionReceiptReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getTransactionReceipt } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const transactionReceipt = await getTransactionReceipt(client, {
 *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
 * })
 */
export async function getTransactionReceiptDecoded<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: GetTransactionReceiptParameters,
) {
    //Cache has insufficient data, fetch transaction and update cache
    const transactionReceiptViem = await getTransactionReceiptViem<chain>(client, params);

    //Decode logs
    const logsDecoded = await Promise.all(
        transactionReceiptViem.logs.map(async (l) => {
            const { topics, data } = l as Log<bigint, number, false>;
            const { eventName, args } = decodeLogWithAbis({ topics, data }) ?? {};

            const logDecoded = l as Log<bigint, number, false> & {
                eventName?: string;
                args?: any;
            };
            if (eventName) logDecoded.eventName = eventName;
            if (args) logDecoded.args = args;
            return logDecoded;
        }),
    );

    return {
        ...transactionReceiptViem,
        logs: logsDecoded,
    };
}
