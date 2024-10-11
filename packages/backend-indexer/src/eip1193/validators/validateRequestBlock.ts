import { EIP1193Parameters, isHash, isHex, PublicRpcSchema, RpcRequestError } from "viem";
import { isBlockTag } from "../../controllers/isBlockTag.js";

export function validateRequestBlockByHash(
    args: EIP1193Parameters<PublicRpcSchema> & { method: "eth_getBlockByHash" },
) {
    if (!args.params) {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32602,
                message: "invalid type: null, expected tuple variant EthRequest::EthGetBlockByHash",
            },
        });
    }

    const paramsLength = 2;
    if (args.params.length != paramsLength) {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32602,
                message: `invalid length ${args.params.length}, expected tuple variant EthRequest::EthGetBlockByHash with ${paramsLength} elements`,
            },
        });
    }

    const [blockHash, includeTransactions] = args.params as [any, any];
    if (!blockHash) {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32602,
                message: "Invalid string length",
            },
        });
    }

    if (!isHash(blockHash)) {
        if (blockHash.length % 2 === 0) {
            throw new RpcRequestError({
                body: args,
                url: "",
                error: {
                    code: -32602,
                    message: "Invalid string length",
                },
            });
        } else {
            throw new RpcRequestError({
                body: args,
                url: "",
                error: {
                    code: -32602,
                    message: "Odd number of digits",
                },
            });
        }
    }

    if (typeof includeTransactions != "boolean") {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32602,
                message: `invalid type: ${typeof includeTransactions} "${includeTransactions}", expected a boolean`,
            },
        });
    }
}

export function validateRequestBlockByNumber(
    args: EIP1193Parameters<PublicRpcSchema> & { method: "eth_getBlockByNumber" },
) {
    if (!args.params) {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32602,
                message: "invalid type: null, expected tuple variant EthRequest::EthGetBlockByNumber",
            },
        });
    }

    const paramsLength = 2;
    if (args.params.length != paramsLength) {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32602,
                message: `invalid length ${args.params.length}, expected tuple variant EthRequest::EthGetBlockByNumber with ${paramsLength} elements`,
            },
        });
    }

    const [blockTagOrNumber, includeTransactions] = args.params;
    if (!blockTagOrNumber || (!isBlockTag(blockTagOrNumber) && !isHex(blockTagOrNumber))) {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32602,
                message: "data did not match any variant of untagged enum LenientBlockNumber",
            },
        });
    }

    if (typeof includeTransactions != "boolean") {
        throw new RpcRequestError({
            body: args,
            url: "",
            error: {
                code: -32602,
                message: `invalid type: ${typeof includeTransactions} "${includeTransactions}", expected a boolean`,
            },
        });
    }
}
