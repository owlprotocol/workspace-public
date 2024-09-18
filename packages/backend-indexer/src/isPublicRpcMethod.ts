export type PublicRpcMethod = Parameters<(typeof publicRpcMethods)["has"]>[0];

export const publicRpcMethods = new Set([
    "web3_clientVersion",
    "web3_sha3",
    "net_listening",
    "net_peerCount",
    "net_version",
    "eth_blobBaseFee",
    "eth_blockNumber",
    "eth_call",
    "eth_chainId",
    "eth_coinbase",
    "eth_estimateGas",
    "eth_feeHistory",
    "eth_gasPrice",
    "eth_getBalance",
    "eth_getBlockByHash",
    "eth_getBlockByNumber",
    "eth_getBlockTransactionCountByHash",
    "eth_getBlockTransactionCountByNumber",
    "eth_getCode",
    "eth_getFilterChanges",
    "eth_getFilterLogs",
    "eth_getLogs",
    "eth_getProof",
    "eth_getStorageAt",
    "eth_getTransactionByBlockHashAndIndex",
    "eth_getTransactionByBlockNumberAndIndex",
    "eth_getTransactionByHash",
    "eth_getTransactionCount",
    "eth_getTransactionReceipt",
    "eth_getUncleByBlockHashAndIndex",
    "eth_getUncleByBlockNumberAndIndex",
    "eth_getUncleCountByBlockHash",
    "eth_getUncleCountByBlockNumber",
    "eth_maxPriorityFeePerGas",
    "eth_newBlockFilter",
    "eth_newFilter",
    "eth_newPendingTransactionFilter",
    "eth_protocolVersion",
    "eth_sendRawTransaction",
    "eth_uninstallFilter",
] as const);

/**
 * Check if RPC method is for public client.
 * @param method
 * @returns true if public rpc method
 */
export function isPublicRpcMethod(method: string): method is PublicRpcMethod {
    return publicRpcMethods.has(method as any);
}
