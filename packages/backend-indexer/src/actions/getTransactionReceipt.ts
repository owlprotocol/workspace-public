import { GCLOUD_PROJECT } from "@owlprotocol/envvars";
import { ethLogResource, ethTransactionReceiptResource } from "@owlprotocol/eth-firebase/admin";
import {
    Chain,
    Client,
    Transport,
    GetTransactionReceiptParameters,
    formatTransactionReceipt,
    numberToHex,
    Log,
} from "viem";
import { getChainId, getTransactionReceipt as getTransactionReceiptViem } from "viem/actions";
import { getAction } from "viem/utils";
import { updateStateForLog } from "./updateStateForLog.js";
import { decodeLogWithAbis, decodeLogWithFirebase } from "../controllers/index.js";

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
export async function getTransactionReceipt<chain extends Chain | undefined>(
    client: Client<Transport, chain>,
    params: GetTransactionReceiptParameters,
) {
    const { hash } = params;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));
    const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;

    const [transactionReceiptIndexed, logsIndexed] = await Promise.all([
        ethTransactionReceiptResource.getOrNullEncoded({
            chainId,
            transactionHash: hash,
        }),
        ethLogResource.getWhereEncoded({ chainId, transactionHash: hash }),
    ]);

    if (transactionReceiptIndexed) {
        return format({
            ...transactionReceiptIndexed,
            logs: logsIndexed.map((l) => {
                return { ...l, logIndex: numberToHex(l.logIndex) };
            }),
        });
    }

    //Cache has insufficient data, fetch transaction and update cache
    const transactionReceiptViem = await getTransactionReceiptViem<chain>(client, params);

    await ethTransactionReceiptResource.upsert({
        ...(transactionReceiptViem as any),
        contractAddress: transactionReceiptViem.contractAddress ?? null,
        chainId,
    });

    //TODO: Seems like need to await for write to confirm?
    //Decode logs
    const logsDecoded = await Promise.all(
        transactionReceiptViem.logs.map(async (l) => {
            const { eventName, args } = decodeLogWithAbis(l) ?? (await decodeLogWithFirebase(l)) ?? {};

            const logDecoded = l as Log<bigint, number, false> & {
                eventName?: string;
                args?: any;
            };
            if (eventName) logDecoded.eventName = eventName;
            if (args) logDecoded.args = args;
            return logDecoded;
        }),
    );

    //Upsert logs, `logIndex` parsed as number as part of composite id
    ethLogResource.upsertBatch(
        logsDecoded.map((l) => {
            return { ...l, chainId };
        }),
    );

    //Update state in background (for non-Google environment)
    if (!GCLOUD_PROJECT) {
        Promise.allSettled(
            logsDecoded.map((l) => {
                updateStateForLog(client, l);
            }),
        );
    }

    return {
        ...transactionReceiptViem,
        logs: logsDecoded,
    };
}
