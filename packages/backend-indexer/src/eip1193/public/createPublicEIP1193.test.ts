import { expect, describe, test, beforeAll } from "vitest";
import {
    Transport,
    PublicClient,
    createPublicClient,
    http,
    custom,
    createClient,
    MethodNotFoundRpcError,
    zeroHash,
    InvalidParamsRpcError,
    Client,
} from "viem";
import { localhost } from "viem/chains";

import { createPublicEIP1193 } from "./createPublicEIP1193.js";
import { port } from "../../test/constants.js";

/**
 * Test if proxy request returns InvalidParamsRpcError
 * @param params
 */
async function testInvalidParamsRpcErrorTest(parameters: {
    publicClient: Client;
    publicEIP1193Client: Client;
    method: string;
    params?: any[];
}) {
    const { publicClient, publicEIP1193Client, method, params } = parameters;
    const args: { method: string; params?: any[] } = { method };
    if (params) {
        args.params = params;
    }

    const invalid = publicClient.request(args as any);
    const invalidEIP1193 = publicEIP1193Client.request(args as any);
    const [invalidError, invalidEIP1193Error] = (await Promise.allSettled([invalid, invalidEIP1193])) as unknown as [
        { reason: InvalidParamsRpcError },
        { reason: InvalidParamsRpcError },
    ];

    console.debug(invalidError.reason.details);
    expect(invalidError.reason).toBeInstanceOf(InvalidParamsRpcError);
    expect(invalidEIP1193Error.reason).toBeInstanceOf(InvalidParamsRpcError);
    expect(invalidEIP1193Error.reason.code).toBe(InvalidParamsRpcError.code);
}

describe("createPublicEIP1193.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient;
    let publicEIP1193Client: PublicClient;

    // let walletClient: WalletClient<Transport, Chain>;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });

        // walletClient = createWalletClient({
        // chain: localhost,
        // transport,
        // });

        publicEIP1193Client = createPublicClient({
            transport: custom({
                request: createPublicEIP1193(createClient({ chain: localhost, transport }).request),
            }),
        });
    });

    describe("errors", () => {
        test("MethodNotFound", async () => {
            const invalid = publicClient.request({ method: "eth_invalid" } as any);
            const invalidEIP1193 = publicEIP1193Client.request({ method: "eth_invalid" } as any);
            const [invalidError, invalidEIP1193Error] = (await Promise.allSettled([
                invalid,
                invalidEIP1193,
            ])) as unknown as [{ reason: MethodNotFoundRpcError }, { reason: MethodNotFoundRpcError }];

            expect(invalidError.reason).toBeInstanceOf(MethodNotFoundRpcError);
            expect(invalidEIP1193Error.reason).toBeInstanceOf(MethodNotFoundRpcError);
            expect(invalidEIP1193Error.reason.code).toBe(invalidError.reason.code);
        });
    });

    describe("getBlock", () => {
        describe("getBlockByNumber", () => {
            test("getBlockByNumber - InvalidParamsRpcError params empty", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByNumber",
                });
            });

            test("getBlockByNumber - InvalidParamsRpcError params []", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByNumber",
                    params: [],
                });
            });

            test("getBlockByNumber - InvalidParamsRpcError [invalid, true]", async () => {
                const params = ["invalid", true] as any;
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByNumber",
                    params,
                });
            });

            test("getBlockByNumber - InvalidParamsRpcError [0x0, invalid]", async () => {
                const params = ["0x0", "invalid"] as any;
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByNumber",
                    params,
                });
            });
        });

        describe("getBlockByHash", () => {
            test("getBlockByHash - InvalidParamsRpcError params undefined", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                });
            });

            test("getBlockByHash - InvalidParamsRpcError params []", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                    params: [],
                });
            });

            test("getBlockByHash - InvalidParamsRpcError [0x, true]", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                    params: ["0x", true],
                });
            });

            test("getBlockByHash - InvalidParamsRpcError [0x1, true]", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                    params: ["0x1", true],
                });
            });

            test("getBlockByHash - InvalidParamsRpcError [0x0...0, invalid]", async () => {
                const params = [zeroHash, "invalid"] as any;
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                    params,
                });
            });
        });
    });
});
