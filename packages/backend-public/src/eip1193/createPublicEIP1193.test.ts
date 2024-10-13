import { expect, describe, test, beforeAll } from "vitest";
import { Transport, http, MethodNotFoundRpcError, zeroHash, InvalidParamsRpcError, EIP1193RequestFn } from "viem";
import { localhost } from "viem/chains";
import { buildRequest } from "viem/utils";

import { createPublicEIP1193 } from "./createPublicEIP1193.js";
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
    expect(invalidEIP1193Error.reason.code).toBe(InvalidParamsRpcError.code);
}

describe("createPublicEIP1193.test.ts", function () {
    let transport: Transport;
    let expectedRequest: EIP1193RequestFn;
    let request: EIP1193RequestFn;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        expectedRequest = transport({ chain: localhost }).request;
        request = buildRequest(createPublicEIP1193(transport({ chain: localhost }).request));
    });

    describe("errors", () => {
        test("MethodNotFound", async () => {
            const invalid = expectedRequest({ method: "eth_invalid" } as any);
            const invalidEIP1193 = request({ method: "eth_invalid" } as any);
            const [invalidError, invalidEIP1193Error] = (await Promise.allSettled([
                invalid,
                invalidEIP1193,
            ])) as unknown as [{ reason: MethodNotFoundRpcError }, { reason: MethodNotFoundRpcError }];

            console.debug(invalidEIP1193Error);
            expect(invalidError.reason).toBeInstanceOf(MethodNotFoundRpcError);
            expect(invalidEIP1193Error.reason).toBeInstanceOf(MethodNotFoundRpcError);
            expect(invalidEIP1193Error.reason.code).toBe(invalidError.reason.code);
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
