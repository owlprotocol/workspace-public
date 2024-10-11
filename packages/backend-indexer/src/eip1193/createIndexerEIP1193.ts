import { Client, Transport, PublicRpcSchema, EIP1193Parameters, EIP1193RequestFn, RpcRequestError } from "viem";
import { requestBlockByHash, requestBlockByNumber } from "./requests/requestBlock.js";
import { requestCode } from "./requests/requestCode.js";
import { requestLogs } from "./requests/requestLogs.js";
import {
    requestTransactionByBlockHashAndIndex,
    requestTransactionByBlockNumberAndIndex,
    requestTransactionByHash,
} from "./requests/requestTransaction.js";
import { requestTransactionReceipt } from "./requests/requestTransactionReceipt.js";
import { isPublicRpcMethod } from "./createPublicEIP1193.js";

//TODO: Cache chain id
//TODO: Support additional overrides
/**
 * Process EIP1193 request using a viem client
 * Useful for clients with custom action overrides
 * @param client
 * @param args
 * @returns JSON-RPC formatted result
 */
export async function requestIndexerEIP1193(request: EIP1193RequestFn, args: EIP1193Parameters<PublicRpcSchema>) {
    try {
        if (args.method === "eth_getBlockByHash") {
            return requestBlockByHash(request, args);
        } else if (args.method === "eth_getBlockByNumber") {
            return requestBlockByNumber(request, args);
        } else if (args.method === "eth_getCode") {
            return requestCode(request, args);
        } else if (args.method === "eth_getLogs") {
            return requestLogs(request, args);
        } else if (args.method === "eth_getFilterChanges") {
            return requestLogs(request, args);
        } else if (args.method === "eth_getFilterLogs") {
            return requestLogs(request, args);
        } else if (args.method === "eth_getTransactionByBlockHashAndIndex") {
            return requestTransactionByBlockHashAndIndex(request, args);
        } else if (args.method === "eth_getTransactionByBlockNumberAndIndex") {
            return requestTransactionByBlockNumberAndIndex(request, args);
        } else if (args.method === "eth_getTransactionByHash") {
            return requestTransactionByHash(request, args);
        } else if (args.method === "eth_getTransactionReceipt") {
            return requestTransactionReceipt(request, args);
        } else if (isPublicRpcMethod(args.method)) {
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

export function createIndexerEIP1193(client: Client<Transport>): EIP1193RequestFn<PublicRpcSchema> {
    return async function (args: EIP1193Parameters<PublicRpcSchema>) {
        return requestIndexerEIP1193(client.request, args);
    } as any;
}
