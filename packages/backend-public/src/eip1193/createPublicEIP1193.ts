import { PublicRpcSchema, EIP1193Parameters, EIP1193RequestFn, RpcRequestError, Hex, RpcSchema } from "viem";
import { ParameterValidationError } from "@open-rpc/schema-utils-js";
import { getPublicOpenRpcSchema } from "../publicOpenRpcSchema.js";

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
 * Check if RPC method is for Public RPC Spec
 * @param method
 * @returns true if public rpc method
 */
export function isPublicRpcMethod(method: string): method is PublicRpcMethod {
    return publicRpcMethods.has(method as any);
}

/**
 * Restrict EIP1193 request function to Public RPC
 * @param request
 * @param args
 * @returns JSON-RPC formatted result
 */
export async function requestPublicEIP1193(request: EIP1193RequestFn, args: EIP1193Parameters<PublicRpcSchema>) {
    // Validate method
    if (!isPublicRpcMethod(args.method)) {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32601,
                message: "Method not found",
            },
        });
    }

    // Validate params
    const publicRpcValidator = (await getPublicOpenRpcSchema()).publicRpcValidator;
    const errors = publicRpcValidator.validate(args.method, args.params ?? []) as ParameterValidationError[];
    if (errors.length > 0) {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32602,
                message: errors[0].message,
            },
        });
    }

    try {
        return request(args);
    } catch (error) {
        if (error instanceof RpcRequestError) {
            throw error;
        }

        // Unhandled error
        console.error(error);
        return null;
    }
}

export function requestWithMemoizedChainId<T extends RpcSchema = RpcSchema>(
    request: EIP1193RequestFn<T>,
): EIP1193RequestFn<T> {
    let chainId: Hex | undefined = undefined;

    return async function (args: EIP1193Parameters<PublicRpcSchema>) {
        if (args.method === "eth_chainId") {
            chainId = chainId ?? (await request(args as any));
            return chainId;
        }

        return request(args as any);
    } as EIP1193RequestFn;
}

/**
 * Concatenate multiple EIP1139 RPC Methods
 * @param requests
 * @returns
 */
export function concatRequests(requests: { request: EIP1193RequestFn; isRpcMethod: (method: string) => boolean }[]) {
    return async function (args: EIP1193Parameters) {
        const request = requests.find(({ isRpcMethod }) => isRpcMethod(args.method));

        if (!request) {
            throw new RpcRequestError({
                body: args,
                url: "",
                error: {
                    code: -32601,
                    message: "Method not found",
                },
            });
        }

        return request.request(args);
    } as EIP1193RequestFn;
}

/**
 *
 * @param client
 * @returns
 */
export function createPublicEIP1193(request: EIP1193RequestFn): EIP1193RequestFn<PublicRpcSchema> {
    const requestMemoizedChainId = requestWithMemoizedChainId(request);

    return async function (args: EIP1193Parameters<PublicRpcSchema>) {
        return requestPublicEIP1193(requestMemoizedChainId, args);
    } as EIP1193RequestFn<PublicRpcSchema>;
}
