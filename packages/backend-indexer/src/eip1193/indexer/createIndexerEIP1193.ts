import { PublicRpcSchema, EIP1193Parameters, EIP1193RequestFn, RpcRequestError } from "viem";
import { ParameterValidationError } from "@open-rpc/schema-utils-js";

import { requestBlockByHash, requestBlockByNumber } from "./requestBlock.js";
import { requestCode } from "./requestCode.js";
import { requestLogs } from "./requestLogs.js";
import {
    requestTransactionByBlockHashAndIndex,
    requestTransactionByBlockNumberAndIndex,
    requestTransactionByHash,
} from "./requestTransaction.js";
import { requestTransactionReceipt } from "./requestTransactionReceipt.js";
import { isPublicRpcMethod, requestWithMemoizedChainId } from "../public/createPublicEIP1193.js";
import { getPublicOpenRpcSchema } from "../public/publicOpenRpcSchema.js";

/**
 * Process EIP1193 request using a viem client
 * Useful for clients with custom action overrides
 * @param client
 * @param args
 * @returns JSON-RPC formatted result
 */
export async function requestIndexerEIP1193(request: EIP1193RequestFn, args: EIP1193Parameters<PublicRpcSchema>) {
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
        } else {
            return request(args);
        }
    } catch (error) {
        if (error instanceof RpcRequestError) {
            throw error;
        }

        // Unhandled error
        console.error(error);
        return null;
    }
}

export function createIndexerEIP1193(request: EIP1193RequestFn): EIP1193RequestFn<PublicRpcSchema> {
    const requestMemoizedChainId = requestWithMemoizedChainId(request);

    return async function (args: EIP1193Parameters<PublicRpcSchema>) {
        return requestIndexerEIP1193(requestMemoizedChainId as EIP1193RequestFn, args);
    } as any;
}
