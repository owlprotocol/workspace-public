import {
    PublicClient,
    Transport,
    Chain,
    EIP1193RequestFn,
    PublicRpcSchema,
    RpcBlock,
    RpcTransaction,
    RpcTransactionReceipt,
    Log,
    RpcLog,
    PublicClientConfig,
    createClient,
    publicActions,
    Address,
    RpcBlockIdentifier,
    BlockTag,
    keccak256,
    custom,
    createPublicClient,
    numberToHex,
} from "viem";
import { BlockEncoded, TransactionEncoded, TransactionTypeInput } from "@owlprotocol/zod-sol";
import { decodeLogWithAbis, decodeLogWithFirebase } from "./controllers/decodeLog.js";
import { EthResources } from "./types/EthResources.js";

/**
 * Convert a viem publicClient to support indexing, we do so by overriding `client.request` with `createIndexeEIP1193Request`
 *
 * TODO: Add `write` param to support client-side use without write access
 * @warning For client-side use, you MUST have an Eth*Resource implementation that supports writes so a simple firebase client will
 * NOT work. You should have an implementation that has the same interface but uses core-trpc backend to write.
 * @param client a public client
 * @param sdk ethBlockResource, ethTransactionResource, ethTransactionReceiptResource, ethLogResource to read/write from firebase cache
 * @returns same client but with overriden actions
 */
export async function createIndexerPublicClientForSdk<
    transport extends Transport,
    chain extends Chain | undefined = undefined,
>(
    parameters: PublicClientConfig<transport, chain> & { chainId?: number },
    sdk: EthResources,
): Promise<PublicClient<transport, chain>> {
    //TODO: Override getTransaction This does not return same data as receipt
    const { key = "public", name = "Indexer Public Client" } = parameters;

    const client = createClient({
        ...parameters,
        key,
        name,
        type: "publicClient",
    });
    client.request = await createIndexeEIP1193RequestForSdk(
        {
            request: client.request,
            chain: parameters.chain,
            chainId: parameters.chainId,
        },
        sdk,
    );

    return client.extend(publicActions);
}

/**
 * Convert a `EIP1193RequestFn<PublicRpcSchema>` request function to support indexing and caching, we do so by overriding
 * the following rpc methods:
 * - eth_chainId                                => Cache
 * - eth_getBlockByHash                         => EthBlock
 * - eth_getBlockByNumber                       => EthBlock
 * - eth_getTransactionByHash                   => EthTransaction
 * - eth_getTransactionByBlockHashAndIndex      => EthTransaction
 * - eth_getTransactionByBlockNumberAndIndex    => EthTransaction
 * - eth_getTransactionReceipt                  => EthTransactionReceipt + EthLog[]
 * - eth_getLogs                                => EthLog[]
 * - eth_getFilterLogs                          => EthLog[]
 * - eth_getFilterChanges                       => EthLog[]
 * - eth_getCode                                => EthAddress? cache if code exists?
 *
 * Methods are overriden by calling the firebase cache. If value is null, we call the default request function,
 * and update the firebase cache.
 *
 * If new data is written, we then trigger the following in the background:
 * - EthBlock               => Nothing
 * - EthTransaction         => Decode input data method call using EthFunctionAbi
 * - EthTransactionReceipt  => Nothing
 * - EthLog                 => Decode log data using EthLogAbi
 *
 * @warning For client-side use, you MUST have an Eth*Resource implementation that supports writes so a simple firebase client will
 * NOT work. You should have an implementation that has the same interface but uses core-trpc backend to write.
 * @param client a public client
 * @param resources ethBlockResource, ethTransactionResource, ethTransactionReceiptResource, ethLogResource to read/write from firebase cache
 * @returns same client but with overriden actions
 */
export async function createIndexeEIP1193RequestForSdk(
    parameters: { request: EIP1193RequestFn<PublicRpcSchema>; chain?: Chain; chainId?: number },
    sdk: EthResources,
): Promise<EIP1193RequestFn<PublicRpcSchema>> {
    const { request } = parameters;

    let chain: Chain;
    if (parameters.chain) {
        chain = parameters.chain;
    } else {
        chain = {
            id: parameters.chainId ?? parseInt(await request({ method: "eth_chainId" })),
            name: "internal",
            nativeCurrency: {
                decimals: 18,
                name: "Ether",
                symbol: "ETH",
            },
            rpcUrls: {
                default: { http: [] },
            },
        };
    }

    //Get chainId to pick correct firebase collection
    const chainId = chain.id;

    //Internal publicClient for contract calls
    const transport = custom({ request });
    const publicClient = createPublicClient({
        chain,
        transport,
    });

    const requestOverride: EIP1193RequestFn<PublicRpcSchema> = async function requestOverride(args, options) {
        // console.debug(args);
        if (args.method === "eth_chainId") {
            return numberToHex(chainId);
        } else if (args.method === "eth_blockNumber") {
            const blockNumber = await request(args as any, options);
            // console.debug(blockNumber);
            return blockNumber;
        } else if (args.method === "eth_getBlockByHash" || args.method === "eth_getBlockByNumber") {
            //Load transaction from cache if exists
            let block: BlockEncoded | null;
            let transactions: TransactionEncoded[];
            const [, includeTransactionObjects] = args.params as [unknown, includeTransactionObjects: boolean];

            if (args.method === "eth_getBlockByHash") {
                const [hash] = args.params as [hash: `0x${string}`];

                [block, transactions] = await Promise.all([
                    sdk.block.getOrNullEncoded({ chainId, hash }),
                    //Fetch transaction objects if requested
                    includeTransactionObjects
                        ? sdk.transaction.getWhereEncoded({ chainId, blockHash: hash })
                        : Promise.resolve([]),
                ]);
            } else if (args.method === "eth_getBlockByNumber") {
                const [blockTagOrHex] = args.params as [blockTagOrHex: `0x${string}`];

                //Fetching by block tag, avoid caching as higher likelihood of rever (eg. "pending", "latest")
                if (!blockTagOrHex.startsWith("0x")) return request(args as any, options);

                [block, transactions] = await Promise.all([
                    sdk.block.getWhereFirstEncoded({ chainId, number: blockTagOrHex }),
                    //Fetch transaction objects if requested
                    includeTransactionObjects
                        ? sdk.transaction.getWhereEncoded({ chainId, blockNumber: blockTagOrHex })
                        : Promise.resolve([]),
                ]);
            } else {
                throw new Error(`Invalid method ${args.method}`);
            }

            if (block && includeTransactionObjects && block.transactions.length === transactions.length) {
                //Block cached & Transaction objects requested & Transactions cached
                const blockRpc: RpcBlock<"safe", true> = {
                    ...block,
                    transactions,
                };
                return blockRpc;
            }

            if (block && !includeTransactionObjects) {
                //Block cached
                const blockRpc: RpcBlock<"safe", false> = block;
                return blockRpc;
            }

            //Cache has insufficient data, fetch block and update cache
            if (includeTransactionObjects) {
                const blockRpcWithTransactions: RpcBlock<"safe", true> | null = await request(args as any, options);
                if (!blockRpcWithTransactions) return blockRpcWithTransactions;

                const transactionsRpc = blockRpcWithTransactions.transactions;
                const blockRpc: RpcBlock<"safe", false> = {
                    ...blockRpcWithTransactions,
                    transactions: transactionsRpc.map((t) => t.hash),
                };
                sdk.transaction.upsertBatch(
                    transactionsRpc.map((t) => {
                        return { ...t, chainId };
                    }),
                );
                sdk.block.upsert({ ...blockRpc, chainId });
                return blockRpcWithTransactions;
            } else {
                const blockRpc: RpcBlock<"safe", false> = await request(args as any, options);
                sdk.block.upsert({ ...blockRpc, chainId });
                return blockRpc;
            }
        } else if (
            args.method === "eth_getTransactionByHash" ||
            args.method === "eth_getTransactionByBlockHashAndIndex" ||
            args.method === "eth_getTransactionByBlockNumberAndIndex"
        ) {
            //Load transaction from cache if exists
            let transaction: TransactionEncoded | null;
            if (args.method === "eth_getTransactionByHash") {
                const [hash] = args.params as [hash: `0x${string}`];
                transaction = await sdk.transaction.getOrNullEncoded({ chainId, hash });
            } else if (args.method === "eth_getTransactionByBlockHashAndIndex") {
                const [blockHash, transactionIndex] = args.params as [
                    blockHash: `0x${string}`,
                    transactionIndex: `0x${string}`,
                ];

                transaction = await sdk.transaction.getWhereFirstEncoded({
                    chainId,
                    blockHash,
                    transactionIndex,
                });
            } else if (args.method === "eth_getTransactionByBlockNumberAndIndex") {
                const [blockTagOrHexNumber, transactionIndex] = args.params as [
                    blockTagOrHex: `0x${string}`,
                    transactionIndex: `0x${string}`,
                ];

                //Fetching by block tag, avoid caching as higher likelihood of revert (eg. "pending", "latest")
                if (!blockTagOrHexNumber.startsWith("0x")) return request(args as any, options);

                transaction = await sdk.transaction.getWhereFirstEncoded({
                    chainId,
                    blockNumber: blockTagOrHexNumber,
                    transactionIndex,
                });
            } else {
                throw new Error(`Invalid method ${args.method}`);
            }

            //Return cached transaction
            if (transaction) return transaction as RpcTransaction<false>;

            //Fetch transaction and update cache
            const transactionRpc: RpcTransaction | null = await request(args as any, options);
            if (!transactionRpc) return transactionRpc;
            if (transactionRpc.blockHash) {
                //Update cache with confirmed tx only
                sdk.transaction.upsert({ ...(transactionRpc as RpcTransaction<false>), chainId });
            }
            return transactionRpc;
        } else if (args.method === "eth_getTransactionReceipt") {
            // console.debug(args);
            const [transactionHash] = args.params as [transactionHash: `0x${string}`];

            //Load transaction receipt from cache if exists
            const [transactionReceipt, logs] = await Promise.all([
                sdk.transactionReceipt.getOrNullEncoded({
                    chainId,
                    transactionHash,
                }),
                sdk.log.getWhereEncoded({ chainId, transactionHash }),
            ]);

            //Return cached transaction receipt
            if (transactionReceipt) {
                const logsRpc: Log<`0x${string}`, `0x${string}`, false>[] = logs.map((l) => {
                    return { ...l, logIndex: numberToHex(l.logIndex) };
                });
                //TODO: Fix type issue (from added opstack/zksync transaction types)
                //@ts-expect-error
                const transactionReceiptRpc: RpcTransactionReceipt & { type: TransactionTypeInput } = {
                    ...transactionReceipt,
                    logs: logsRpc,
                };
                return transactionReceiptRpc;
            }

            //Fetch transaction receipt and update cache
            const transactionReceiptRpc: (RpcTransactionReceipt & { type: TransactionTypeInput }) | null =
                await request(args as any, options);
            // console.debug(transactionReceiptRpc);

            if (!transactionReceiptRpc) {
                return transactionReceiptRpc;
            }

            if (!transactionReceiptRpc.contractAddress) {
                transactionReceiptRpc.contractAddress = null;
            }

            // contractAddress constrained to `Address | null`
            sdk.transactionReceipt.upsert({ ...(transactionReceiptRpc as any), chainId });

            //Decode logs
            const logsDecoded = await Promise.all(
                transactionReceiptRpc.logs.map(async (l) => {
                    const { eventName, args } =
                        decodeLogWithAbis(l, {
                            publicClient,
                            ...sdk,
                        }) ??
                        (await decodeLogWithFirebase(l, sdk.logAbi)) ??
                        {};

                    const logDecoded = l as Log<`0x${string}`, `0x${string}`, false> & {
                        eventName?: string;
                        args?: any;
                    };
                    if (eventName) logDecoded.eventName = eventName;
                    if (args) logDecoded.args = args;
                    return logDecoded;
                }),
            );

            //Upsert logs, `logIndex` parsed as number as part of composite id
            sdk.log.upsertBatch(
                logsDecoded.map((l) => {
                    return { ...l, logIndex: parseInt(l.logIndex), chainId };
                }),
            );

            return {
                ...transactionReceiptRpc,
                logs: logsDecoded,
            };
        } else if (
            args.method === "eth_getLogs" ||
            args.method === "eth_getFilterLogs" ||
            args.method === "eth_getFilterChanges"
        ) {
            const logsRpc: RpcLog[] = await request(args as any, options);
            //TODO: Is this logic required? Only accept if all logs confirmed
            if (
                logsRpc.some(
                    (log) =>
                        log.blockHash === null ||
                        log.blockNumber === null ||
                        log.transactionIndex === null ||
                        log.transactionHash === null ||
                        log.logIndex === null,
                    // log.topics.length === 0,
                )
            ) {
                // transaction pending
                return logsRpc;
            }

            const logsRpcConfirmed: Log<`0x${string}`, `0x${string}`, false>[] = logsRpc.filter(
                (l) => l.blockHash,
            ) as Log<`0x${string}`, `0x${string}`, false>[];

            const logsDecoded = await Promise.all(
                logsRpcConfirmed.map(async (l) => {
                    const { eventName, args } =
                        decodeLogWithAbis(l, {
                            publicClient,
                            ...sdk,
                        }) ??
                        (await decodeLogWithFirebase(l, sdk.logAbi)) ??
                        {};

                    const logDecoded = l as Log<`0x${string}`, `0x${string}`, false> & {
                        eventName?: string;
                        args?: any;
                    };
                    if (eventName) logDecoded.eventName = eventName;
                    if (args) logDecoded.args = args;
                    return logDecoded;
                }),
            );

            //Upsert logs, `logIndex` parsed as number as part of composite id
            sdk.log.upsertBatch(
                logsDecoded.map((l) => {
                    return { ...l, logIndex: parseInt(l.logIndex), chainId };
                }),
            );

            return logsDecoded;
        } else if (args.method === "eth_getCode") {
            const [address, blockTagOrHexNumber] = args.params as [
                address: Address,
                block: `0x${string}` | BlockTag | RpcBlockIdentifier,
            ];
            if (typeof blockTagOrHexNumber != "string") {
                //TODO: Handle this case?
                //RpcBlockIndentifier used
                return request(args as any, options);
            } else if (blockTagOrHexNumber === "pending") {
                //Fetching by pending block tag, avoid caching as higher likelihood of revert (eg. "earliest", "pending")
                return request(args as any, options);
            }

            const bytecode = await sdk.bytecode.getOrNull({ chainId, address });
            let blockNumber: bigint;
            if (
                blockTagOrHexNumber === "latest" ||
                blockTagOrHexNumber === "safe" ||
                blockTagOrHexNumber === "finalized" ||
                blockTagOrHexNumber === "earliest"
            ) {
                //Get block number for tag
                const blockNumberHex = await request(
                    { method: "eth_blockNumber", args: [blockTagOrHexNumber] },
                    options,
                );
                blockNumber = BigInt(blockNumberHex);
            } else if (blockTagOrHexNumber.startsWith("0x")) {
                blockNumber = BigInt(blockTagOrHexNumber);
            } else {
                //Unexpected blockTag
                return request(args as any, options);
            }

            if (bytecode) {
                if (bytecode.blockNumber <= blockNumber) {
                    //Bytecode cached, query is for later block. Return cached data.
                    //TODO: Fix this. Inconsistent behaviour as returning bytecode hash instead of bytecode
                    //We store bytecodeHash as it is much more compact then storing full bytecode
                    //Main use case for eth_getCode is to check if contract exists
                    return bytecode.bytecodeHash;
                } else {
                    //Bytecode cached, query is for earlier block. Try to refresh cache
                    const bytecodeRpc: `0x${string}` = await request(args as any, options);
                    if (bytecodeRpc != "0x") {
                        //Non empty-result, update cache with earlier block number
                        sdk.bytecode.update({ chainId, address, blockNumber });
                    }
                    return bytecodeRpc;
                }
            }

            //Fetch bytecode and update cache
            const bytecodeRpc: `0x${string}` = await request(args as any, options);
            if (bytecodeRpc != "0x") {
                //Non empty-result, update cached earliers block
                sdk.bytecode.upsert({ chainId, address, blockNumber, bytecodeHash: keccak256(bytecodeRpc) });
            }
            return request(args as any, options);
        }

        return request(args as any, options);
    } as EIP1193RequestFn<PublicRpcSchema>;

    return requestOverride;
}
