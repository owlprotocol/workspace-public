export type BundlerRpcMethod = (typeof bundlerRpcMethods)[number];

export const bundlerRpcMethods = [
    "eth_sendUserOperation",
    "eth_estimateUserOperationGas",
    "eth_supportedEntryPoints",
    "eth_getUserOperationByHash",
    "eth_getUserOperationReceipt",
    //pimlico
    "eth_getUserOperationGasPrice",
    "pimlico_getUserOperationGasPrice",
    "eth_getUserOperationStatus",
    "pimlico_getUserOperationStatus",
    "eth_sendCompressedUserOperation",
    "pimlico_sendCompressedUserOperation",
] as const;

/**
 * Check if RPC method is for bundler.
 * @param method
 * @returns true if bundler rpc method
 */
export function isBundlerRpcMethod(method: string): method is BundlerRpcMethod {
    return bundlerRpcMethods.includes(method as any);
}
