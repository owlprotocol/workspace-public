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
import { port } from "../test/constants.js";

/**
 * Test if proxy request returns same error
 * @param params
 */
async function testInvalidParamsRpcErrorTest(parameters: {
    publicClient: Client;
    publicEIP1193Client: Client;
    method: string;
    params: any[] | undefined;
    expectedDetails: string;
}) {
    const { publicClient, publicEIP1193Client, method, params, expectedDetails } = parameters;
    const invalid = publicClient.request({ method, params } as any);
    const invalidEIP1193 = publicEIP1193Client.request({ method, params } as any);
    const [invalidError, invalidEIP1193Error] = (await Promise.allSettled([invalid, invalidEIP1193])) as unknown as [
        { reason: InvalidParamsRpcError },
        { reason: InvalidParamsRpcError },
    ];

    console.debug(invalidError.reason.details);
    expect(invalidError.reason).toBeInstanceOf(InvalidParamsRpcError);
    expect(invalidEIP1193Error.reason).toBeInstanceOf(InvalidParamsRpcError);
    expect(invalidEIP1193Error.reason.code).toBe(InvalidParamsRpcError.code);

    expect(invalidError.reason.details).toBe(expectedDetails);
    expect(invalidEIP1193Error.reason.details).toBe(expectedDetails);
}

//TODO: Find proper OpenRPC Typescript validator

describe("createIndexerEIP1193.test.ts", function () {
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
                request: createPublicEIP1193(createClient({ chain: localhost, transport })),
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
            test("getBlockByNumber - InvalidParamsRpcError params null", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByNumber",
                    params: undefined,
                    expectedDetails: "invalid type: null, expected tuple variant EthRequest::EthGetBlockByNumber",
                });
            });

            test("getBlockByNumber - InvalidParamsRpcError params []", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByNumber",
                    params: [],
                    expectedDetails:
                        "invalid length 0, expected tuple variant EthRequest::EthGetBlockByNumber with 2 elements",
                });
            });

            test("getBlockByNumber - InvalidParamsRpcError [invalid, true]", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByNumber",
                    params: ["invalid", true],
                    expectedDetails: "data did not match any variant of untagged enum LenientBlockNumber",
                });
            });

            test("getBlockByNumber - InvalidParamsRpcError [0x0, invalid]", async () => {
                const params = ["0x0", "invalid"] as any;
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByNumber",
                    params,
                    expectedDetails: `invalid type: ${typeof params[1]} "${params[1]}", expected a boolean`,
                });
            });
        });

        describe("getBlockByHash", () => {
            test("getBlockByHash - InvalidParamsRpcError params null", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                    params: undefined,
                    expectedDetails: "invalid type: null, expected tuple variant EthRequest::EthGetBlockByHash",
                });
            });

            test("getBlockByHash - InvalidParamsRpcError params []", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                    params: [],
                    expectedDetails:
                        "invalid length 0, expected tuple variant EthRequest::EthGetBlockByHash with 2 elements",
                });
            });

            test("getBlockByHash - InvalidParamsRpcError [0x, true]", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                    params: ["0x", true],
                    expectedDetails: "Invalid string length",
                });
            });

            test("getBlockByHash - InvalidParamsRpcError [0x1, true]", async () => {
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                    params: ["0x1", true],
                    expectedDetails: "Odd number of digits",
                });
            });

            test("getBlockByHash - InvalidParamsRpcError [0x0, invalid]", async () => {
                const params = [zeroHash, "invalid"] as any;
                await testInvalidParamsRpcErrorTest({
                    publicClient,
                    publicEIP1193Client,
                    method: "eth_getBlockByHash",
                    params,
                    expectedDetails: `invalid type: ${typeof params[1]} "${params[1]}", expected a boolean`,
                });
            });
        });
    });
});
