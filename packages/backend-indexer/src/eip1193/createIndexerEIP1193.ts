import {
    Account,
    PublicRpcSchema,
    Chain,
    Client,
    EIP1193Parameters,
    EIP1193RequestFn,
    numberToHex,
    Transport,
    hexToNumber,
    BlockTag,
    Hex,
    hexToBigInt,
    Address,
} from "viem";
import { getChainId } from "viem/actions";
import { getAction } from "viem/utils";
import { blockEncodeZod, logEncodeZod, transactionEncodeZod, transactionReceiptEncodeZod } from "@owlprotocol/zod-sol";
import { getBlock, getBytecode, getLogsByTopics, getTransaction, getTransactionReceipt } from "../actions/index.js";

export type IndexerRpcMethod = Parameters<(typeof indexerRpcMethods)["has"]>[0];

export const indexerRpcMethods = new Set([
    "eth_chainId",
    "eth_getBlockByHash",
    "eth_getBlockByNumber",
    "eth_getBlockTransactionCountByHash",
    "eth_getBlockTransactionCountByNumber",
    "eth_getCode",
    "eth_getFilterChanges",
    "eth_getFilterLogs",
    "eth_getLogs",
    "eth_getTransactionByBlockHashAndIndex",
    "eth_getTransactionByBlockNumberAndIndex",
    "eth_getTransactionByHash",
    "eth_getTransactionReceipt",
] as const);

/**
 * Check if RPC method is for public client.
 * @param method
 * @returns true if public rpc method
 */
export function isIndexerRpcMethod(method: string): method is IndexerRpcMethod {
    return indexerRpcMethods.has(method as any);
}

function getBlockTagOrNumberParams(
    blockTagOrNumberHex: Hex | BlockTag,
): { blockNumber: bigint } | { blockTag: BlockTag } {
    if (blockTagOrNumberHex.startsWith("0x")) {
        return { blockNumber: hexToBigInt(blockTagOrNumberHex as Hex) };
    } else {
        return { blockTag: blockTagOrNumberHex as BlockTag };
    }
}

function getBlockTagOrNumber(blockTagOrNumberHex: Hex | BlockTag): bigint | BlockTag {
    if (blockTagOrNumberHex.startsWith("0x")) {
        return hexToBigInt(blockTagOrNumberHex as Hex);
    } else {
        return blockTagOrNumberHex as BlockTag;
    }
}

export function createIndexerEIP1193(
    client: Client<Transport, Chain | undefined, Account>,
): EIP1193RequestFn<PublicRpcSchema> {
    return async function (args: EIP1193Parameters<PublicRpcSchema>) {
        try {
            if (args.method === "eth_chainId") {
                const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));
                return numberToHex(chainId);
            } else if (args.method === "eth_getBlockByHash") {
                const [blockHash, includeTransactions] = args.params;
                const block = await getAction(client, getBlock, "getBlock")({ blockHash, includeTransactions });
                return blockEncodeZod.parse(block);
            } else if (args.method === "eth_getBlockByNumber") {
                const [blockTagOrNumberHex, includeTransactions] = args.params;
                const block = await getAction(
                    client,
                    getBlock,
                    "getBlock",
                )({ ...getBlockTagOrNumberParams(blockTagOrNumberHex), includeTransactions });
                return blockEncodeZod.parse(block);
            } else if (args.method === "eth_getCode") {
                const [address, blockTagOrNumberHex] = args.params as [Address, Hex | BlockTag];
                const code = await getAction(
                    client,
                    getBytecode,
                    "getBytecode",
                )({ address, ...getBlockTagOrNumberParams(blockTagOrNumberHex) });
                return code ?? "0x";
            } else if (args.method === "eth_getLogs") {
                const [getLogsParams] = args.params;
                const { address, topics, blockHash } = getLogsParams;
                const fromBlock = getLogsParams.fromBlock ? getBlockTagOrNumber(getLogsParams.fromBlock) : undefined;
                const toBlock = getLogsParams.toBlock ? getBlockTagOrNumber(getLogsParams.toBlock) : undefined;

                const logs = await getAction(
                    client,
                    getLogsByTopics,
                    "getLogsByTopics",
                )({
                    address,
                    topics,
                    fromBlock,
                    toBlock,
                    blockHash,
                } as any);
                return logs.map((l) => logEncodeZod.parse(l));
            } else if (args.method === "eth_getFilterChanges") {
                //TODO: Add action
            } else if (args.method === "eth_getFilterLogs") {
                //TODO: Add action
            } else if (args.method === "eth_getTransactionByBlockHashAndIndex") {
                const [blockHash, index] = args.params;
                const transaction = await getAction(
                    client,
                    getTransaction,
                    "getTransaction",
                )({
                    blockHash,
                    index: hexToNumber(index),
                });
                return transaction;
            } else if (args.method === "eth_getTransactionByBlockNumberAndIndex") {
                const [blockTagOrNumberHex, index] = args.params;
                const transaction = await getAction(
                    client,
                    getTransaction,
                    "getTransaction",
                )({
                    ...getBlockTagOrNumberParams(blockTagOrNumberHex),
                    index: hexToNumber(index),
                });
                return transactionEncodeZod.parse(transaction);
            } else if (args.method === "eth_getTransactionByHash") {
                const [hash] = args.params;
                const transaction = await getAction(
                    client,
                    getTransaction,
                    "getTransaction",
                )({
                    hash,
                });
                return transactionEncodeZod.parse(transaction);
            } else if (args.method === "eth_getTransactionReceipt") {
                const [hash] = args.params;
                const receipt = await getAction(
                    client,
                    getTransactionReceipt,
                    "getTransactionReceipt",
                )({
                    hash,
                });
                return transactionReceiptEncodeZod.parse(receipt);
            }
        } catch (error) {
            return null;
        }
    } as any;
}
