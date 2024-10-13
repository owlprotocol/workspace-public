import { expect, describe, test, beforeAll } from "vitest";
import { MethodNotFoundRpcError, zeroHash, InvalidParamsRpcError, EIP1193RequestFn, RpcRequestError } from "viem";
import { buildRequest } from "viem/utils";

import { createPublicEIP1193 } from "./createPublicEIP1193.js";
import { createHttpEIP1193 } from "./createHttpEIP1193.js";
import { port } from "../test/constants.js";

/**
 * Test if proxy request returns InvalidParamsRpcError
 * @param params
 */
async function testInvalidParamsRpcErrorTest(parameters: {
    expectedRequest: EIP1193RequestFn;
    request: EIP1193RequestFn;
    method: string;
    params?: any[];
}) {
    const { expectedRequest, request, method, params } = parameters;
    const args: { method: string; params?: any[] } = { method };
    if (params) {
        args.params = params;
    }

    const invalid = expectedRequest(args as any);
    const invalidEIP1193 = request(args as any);
    const [invalidError, invalidEIP1193Error] = (await Promise.allSettled([invalid, invalidEIP1193])) as unknown as [
        { reason: InvalidParamsRpcError },
        { reason: InvalidParamsRpcError },
    ];

    expect(invalidError.reason).toBeInstanceOf(InvalidParamsRpcError);
    expect(invalidEIP1193Error.reason).toBeInstanceOf(InvalidParamsRpcError);

    expect((invalidError.reason.walk() as RpcRequestError).code).toBe(-32602);
    expect((invalidEIP1193Error.reason.walk() as RpcRequestError).code).toBe(-32602);
}

describe("createPublicEIP1193.test.ts", function () {
    let expectedRequest: EIP1193RequestFn;
    let request: EIP1193RequestFn;

    beforeAll(async () => {
        // bypass buildRequest middleware by avoiding creating transport
        const httpEIP1193 = createHttpEIP1193(`http://127.0.0.1:${port}`);
        expectedRequest = buildRequest(httpEIP1193);
        request = buildRequest(createPublicEIP1193(httpEIP1193));
    });

    describe("errors", () => {
        test("MethodNotFound", async () => {
            const invalid = expectedRequest({ method: "eth_invalid" } as any);
            const invalidEIP1193 = request({ method: "eth_invalid" } as any);
            const [invalidError, invalidEIP1193Error] = (await Promise.allSettled([
                invalid,
                invalidEIP1193,
            ])) as unknown as [{ reason: MethodNotFoundRpcError }, { reason: MethodNotFoundRpcError }];

            expect(invalidError.reason).toBeInstanceOf(MethodNotFoundRpcError);
            expect(invalidEIP1193Error.reason).toBeInstanceOf(MethodNotFoundRpcError);

            expect(invalidError.reason.walk()).toStrictEqual({ code: -32601, message: "Method not found" });
            expect(invalidEIP1193Error.reason.walk()).toStrictEqual({ code: -32601, message: "Method not found" });
        });
    });

    describe("getBlock", () => {
        describe("getBlockByNumber", () => {
            test("getBlockByNumber - InvalidParamsRpcError params empty", async () => {
                await testInvalidParamsRpcErrorTest({
                    expectedRequest,
                    request,
                    method: "eth_getBlockByNumber",
                });
            });

            test("getBlockByNumber - InvalidParamsRpcError params []", async () => {
                await testInvalidParamsRpcErrorTest({
                    expectedRequest,
                    request,
                    method: "eth_getBlockByNumber",
                    params: [],
                });
            });

            test("getBlockByNumber - InvalidParamsRpcError [invalid, true]", async () => {
                const params = ["invalid", true] as any;
                await testInvalidParamsRpcErrorTest({
                    expectedRequest,
                    request,
                    method: "eth_getBlockByNumber",
                    params,
                });
            });

            test("getBlockByNumber - InvalidParamsRpcError [0x0, invalid]", async () => {
                const params = ["0x0", "invalid"] as any;
                await testInvalidParamsRpcErrorTest({
                    expectedRequest,
                    request,
                    method: "eth_getBlockByNumber",
                    params,
                });
            });
        });

        describe("getBlockByHash", () => {
            test("getBlockByHash - InvalidParamsRpcError params undefined", async () => {
                await testInvalidParamsRpcErrorTest({
                    expectedRequest,
                    request,
                    method: "eth_getBlockByHash",
                });
            });

            test("getBlockByHash - InvalidParamsRpcError params []", async () => {
                await testInvalidParamsRpcErrorTest({
                    expectedRequest,
                    request,
                    method: "eth_getBlockByHash",
                    params: [],
                });
            });

            test("getBlockByHash - InvalidParamsRpcError [0x, true]", async () => {
                await testInvalidParamsRpcErrorTest({
                    expectedRequest,
                    request,
                    method: "eth_getBlockByHash",
                    params: ["0x", true],
                });
            });

            test("getBlockByHash - InvalidParamsRpcError [0x1, true]", async () => {
                await testInvalidParamsRpcErrorTest({
                    expectedRequest,
                    request,
                    method: "eth_getBlockByHash",
                    params: ["0x1", true],
                });
            });

            test("getBlockByHash - InvalidParamsRpcError [0x0...0, invalid]", async () => {
                const params = [zeroHash, "invalid"] as any;
                await testInvalidParamsRpcErrorTest({
                    expectedRequest,
                    request,
                    method: "eth_getBlockByHash",
                    params,
                });
            });
        });
    });
});
