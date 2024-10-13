import { EIP1193RequestFn, HttpTransportConfig, RpcRequestError } from "viem";
import { getHttpRpcClient } from "viem/utils";
import { createBatchScheduler } from "../utils/promise/createBatchScheduler.js";
import { RpcRequest } from "../types/rpc.js";

/**
 * @description Creates a HTTP EIP1193 Request that connects to a JSON-RPC API.
 * Note: This is used to bypass viem `buildRequest` middleware when adding custom RPC middleware and then use with `custom` transport
 */
export function createHttpEIP1193(
    url: string,
    config: Omit<HttpTransportConfig, "key" | "name" | "retryCount" | "retryDelay"> = {},
): EIP1193RequestFn {
    const { batch, fetchOptions, onFetchRequest, onFetchResponse } = config;
    const { batchSize = 1000, wait = 0 } = typeof batch === "object" ? batch : {};
    const timeout = config.timeout ?? 10_000;

    const rpcClient = getHttpRpcClient(url, {
        fetchOptions,
        onRequest: onFetchRequest,
        onResponse: onFetchResponse,
        timeout,
    });

    return async function request({ method, params }) {
        const body = { method, params };

        const { schedule } = createBatchScheduler({
            id: url,
            wait,
            shouldSplitBatch(requests) {
                return requests.length > batchSize;
            },
            fn: (body: RpcRequest[]) =>
                rpcClient.request({
                    body,
                }),
            sort: (a, b) => a.id - b.id,
        });

        const fn = async (body: RpcRequest) =>
            batch
                ? schedule(body)
                : [
                      await rpcClient.request({
                          body,
                      }),
                  ];

        const [{ error, result }] = await fn(body);
        if (error)
            throw new RpcRequestError({
                body,
                error,
                url,
            });
        return result;
    };
}
