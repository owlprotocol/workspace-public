import { PublicRpcSchema, Client, EIP1193Parameters, EIP1193RequestFn, Transport, RpcRequestError } from "viem";
import { validateRequestBlockByHash, validateRequestBlockByNumber } from "./validators/validateRequestBlock.js";

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

//TODO: Cache chain id
//TODO: Support additional overrides
/**
 * Process EIP1193 request using a viem client
 * Useful for clients with custom action overrides
 * @param client
 * @param args
 * @returns JSON-RPC formatted result
 */
export async function requestPublicEIP1193(request: EIP1193RequestFn, args: EIP1193Parameters<PublicRpcSchema>) {
    try {
        // Validate Request
        if (args.method === "eth_getBlockByHash") {
            validateRequestBlockByHash(args);
        } else if (args.method === "eth_getBlockByNumber") {
            validateRequestBlockByNumber(args);
        }

        if (isPublicRpcMethod(args.method)) {
            return request(args);
        } else {
            throw new RpcRequestError({
                body: args,
                url: "",
                error: {
                    code: -32601,
                    message: "Method not found",
                },
            });
        }
    } catch (error) {
        // console.debug(error);
        if (error instanceof RpcRequestError) {
            throw error;
        }

        return null;
    }
}

export function createPublicEIP1193(client: Client<Transport>): EIP1193RequestFn<PublicRpcSchema> {
    return async function (args: EIP1193Parameters<PublicRpcSchema>) {
        return requestPublicEIP1193(client.request, args);
    } as any;
}
