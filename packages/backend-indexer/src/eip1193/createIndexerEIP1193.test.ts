import { expect, describe, test, beforeAll, beforeEach } from "vitest";
import {
    Transport,
    Chain,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    zeroAddress,
    custom,
    createClient,
    TransactionReceipt,
    MethodNotFoundRpcError,
    zeroHash,
    numberToHex,
    InvalidParamsRpcError,
    Hash,
    Hex,
} from "viem";
import { localhost } from "viem/chains";
import { getAddress } from "viem/utils";
import { omit } from "lodash-es";

import {
    ethBlockResource,
    ethTransactionReceiptResource,
    ethTransactionResource,
} from "@owlprotocol/eth-firebase/admin";
import { createPublicEIP1193 } from "./createIndexerEIP1193.js";
import { port } from "../test/constants.js";

//TODO: Add more error handling

/**
 * For block comparisons between viem
 * @param block
 * @returns
 */
function toBlock(block: any) {
    return omit(block, ["chainId", "blobGasUsed", "excessBlobGas", "sealFields"]);
}

/**
 * For transaction comparisons between viem
 * @param transaction
 * @returns
 */
function toTransaction(transaction: any) {
    return {
        ...omit(transaction, ["typeHex", "yParity"]),
        from: getAddress(transaction.from),
    };
}

/**
 * For transaction receipt comparisons between viem
 * @param transactionReceipt
 * @returns
 */
function toTransactionReceipt(transactionReceipt: any) {
    return {
        ...omit(transactionReceipt, ["typeHex", "chainId"]),
        from: getAddress(transactionReceipt.from),
        logs: transactionReceipt.logs ?? [],
    };
}

describe("createIndexerEIP1193.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient;
    let publicEIP1193Client: PublicClient;

    let walletClient: WalletClient<Transport, Chain>;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });

        walletClient = createWalletClient({
            chain: localhost,
            transport,
        });

        publicEIP1193Client = createPublicClient({
            transport: custom({
                request: createPublicEIP1193(createClient({ chain: localhost, transport })),
            }),
        });
    });

    //TODO: Test log fetching
    //TODO: Test gas estimation
    //TODO: Test additional rpc (getBlockNumber etc...)
    //TODO: Test error handling

    test("getChainId", async () => {
        const chainId = await publicClient.getChainId();
        const chainIdEIP1193 = await publicEIP1193Client.getChainId();
        expect(chainIdEIP1193).toBe(chainId);
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
            test("getBlockByNumber - found", async () => {
                const number = "0x0";
                const params = [number, false] as [Hex, boolean];
                const block = await publicClient.request({ method: "eth_getBlockByNumber", params });
                const blockEIP1193 = await publicEIP1193Client.request({
                    method: "eth_getBlockByNumber",
                    params,
                });
                expect(toBlock(blockEIP1193)).toStrictEqual(toBlock(block));

                const blockFromFirebase = await ethBlockResource.getWhereFirstEncoded({
                    chainId: 1337,
                    number,
                });
                expect(toBlock(blockFromFirebase)).toStrictEqual(toBlock(block));
                const blockCached = await publicEIP1193Client.request({
                    method: "eth_getBlockByNumber",
                    params,
                });
                expect(toBlock(blockCached)).toStrictEqual(toBlock(block));
            });

            test("getBlockByNumber - not found", async () => {
                const number = "0xFFFF";
                const params = [number, false] as [Hex, boolean];
                const block = await publicClient.request({ method: "eth_getBlockByNumber", params });
                const blockEIP1193 = await publicEIP1193Client.request({
                    method: "eth_getBlockByNumber",
                    params,
                });
                expect(toBlock(blockEIP1193)).toStrictEqual(toBlock(block));
            });

            test("getBlockByNumber - InvalidParamsRpcError EthRequest::EthGetBlockByNumber", async () => {
                const invalid = publicClient.request({ method: "eth_getBlockByNumber" } as any);
                const invalidEIP1193 = publicEIP1193Client.request({ method: "eth_getBlockByNumber" } as any);
                const [invalidError, invalidEIP1193Error] = (await Promise.allSettled([
                    invalid,
                    invalidEIP1193,
                ])) as unknown as [{ reason: InvalidParamsRpcError }, { reason: InvalidParamsRpcError }];

                expect(invalidError.reason).toBeInstanceOf(InvalidParamsRpcError);
                expect(invalidEIP1193Error.reason).toBeInstanceOf(InvalidParamsRpcError);
                expect(invalidEIP1193Error.reason.code).toBe(invalidError.reason.code);
                expect(invalidEIP1193Error.reason.details).toBe(invalidError.reason.details);
            });

            test("getBlockByNumber - InvalidParamsRpcError enum LenientBlockNumber", async () => {
                const params = ["invalid"];
                const invalid = publicClient.request({ method: "eth_getBlockByNumber", params } as any);
                const invalidEIP1193 = publicEIP1193Client.request({
                    method: "eth_getBlockByNumber",
                    params,
                } as any);
                const [invalidError, invalidEIP1193Error] = (await Promise.allSettled([
                    invalid,
                    invalidEIP1193,
                ])) as unknown as [{ reason: InvalidParamsRpcError }, { reason: InvalidParamsRpcError }];

                expect(invalidError.reason).toBeInstanceOf(InvalidParamsRpcError);
                expect(invalidEIP1193Error.reason).toBeInstanceOf(InvalidParamsRpcError);
                expect(invalidEIP1193Error.reason.code).toBe(invalidError.reason.code);
                expect(invalidEIP1193Error.reason.details).toBe(invalidError.reason.details);
            });
        });

        describe("getBlockByHash", () => {
            test("getBlockByHash - found", async () => {
                const { hash } = await publicClient.getBlock({ blockNumber: 0n });
                const params = [hash, false] as [Hash, boolean];
                const block = await publicClient.request({ method: "eth_getBlockByHash", params });
                const blockEIP1193 = await publicEIP1193Client.request({
                    method: "eth_getBlockByHash",
                    params,
                });
                expect(toBlock(blockEIP1193)).toStrictEqual(toBlock(block));

                const blockFromFirebase = await ethBlockResource.getOrNullEncoded({
                    chainId: 1337,
                    hash,
                });
                expect(toBlock(blockFromFirebase)).toStrictEqual(toBlock(block));
                const blockCached = await publicEIP1193Client.request({
                    method: "eth_getBlockByHash",
                    params,
                });
                expect(toBlock(blockCached)).toStrictEqual(toBlock(block));
            });

            test("getBlockByHash - not found", async () => {
                const hash = zeroHash;
                const params = [hash, false] as [Hash, boolean];
                const block = await publicClient.request({ method: "eth_getBlockByHash", params });
                const blockEIP1193 = await publicEIP1193Client.request({
                    method: "eth_getBlockByHash",
                    params,
                });
                expect(block).toBe(null);
                expect(blockEIP1193).toBe(null);
            });
        });
    });

    describe("gasPrice", () => {
        test("getGasPrice", async () => {
            const gasPrice = await publicClient.request({ method: "eth_gasPrice" });
            const gasPriceEIP1193 = await publicEIP1193Client.request({ method: "eth_gasPrice" });
            expect(gasPriceEIP1193).toBe(gasPrice);
        });

        test("estimateMaxPriorityFeePerGas", async () => {
            const maxPriorityFeePerGas = await publicClient.request({ method: "eth_maxPriorityFeePerGas" });
            const maxPriorityFeePerGasEIP1193 = await publicEIP1193Client.request({
                method: "eth_maxPriorityFeePerGas",
            });
            expect(maxPriorityFeePerGas).toBe(maxPriorityFeePerGasEIP1193);
        });
    });

    describe("getTransaction", () => {
        let receipt: TransactionReceipt;

        beforeEach(async () => {
            const accounts = await walletClient.getAddresses();
            const hash = await walletClient.sendTransaction({
                account: accounts[0],
                to: zeroAddress,
                value: 1n,
            });
            receipt = await publicClient.waitForTransactionReceipt({ hash });
        });

        test("getTransactionByHash - found", async () => {
            const hash = receipt.transactionHash;
            const params = [hash] as [Hash];
            const transaction = await publicClient.request({
                method: "eth_getTransactionByHash",
                params,
            });
            const transactionEIP1193 = await publicEIP1193Client.request({
                method: "eth_getTransactionByHash",
                params,
            });
            expect(toTransaction(transactionEIP1193)).toStrictEqual(toTransaction(transaction));

            const transactionFromFirebase = await ethTransactionResource.getOrNullEncoded({
                chainId: 1337,
                hash,
            });
            expect(toTransaction(transactionFromFirebase)).toStrictEqual(toTransaction(transaction));
            const transactionCached = await publicEIP1193Client.request({
                method: "eth_getTransactionByHash",
                params,
            });
            expect(toTransaction(transactionCached)).toStrictEqual(toTransaction(transaction));
        });

        test("getTransactionByHash - not found", async () => {
            const hash = zeroHash;
            const params = [hash] as [Hash];
            const transaction = await publicClient.request({
                method: "eth_getTransactionByHash",
                params,
            });
            const transactionEIP1193 = await publicEIP1193Client.request({
                method: "eth_getTransactionByHash",
                params,
            });
            expect(transaction).toBe(null);
            expect(transactionEIP1193).toBe(null);
        });

        test("getTransactionByBlockHashAndIndex - found", async () => {
            const blockHash = receipt.blockHash;
            const transactionIndex = numberToHex(receipt.transactionIndex);
            const params = [blockHash, transactionIndex] as [Hash, Hex];
            const transaction = await publicClient.request({
                method: "eth_getTransactionByBlockHashAndIndex",
                params,
            });
            const transactionEIP1193 = await publicEIP1193Client.request({
                method: "eth_getTransactionByBlockHashAndIndex",
                params,
            });
            expect(toTransaction(transactionEIP1193)).toStrictEqual(toTransaction(transaction));

            const transactionFromFirebase = await ethTransactionResource.getWhereFirstEncoded({
                chainId: 1337,
                blockHash,
                transactionIndex,
            });
            expect(toTransaction(transactionFromFirebase)).toStrictEqual(toTransaction(transaction));
            const transactionCached = await publicEIP1193Client.request({
                method: "eth_getTransactionByBlockHashAndIndex",
                params,
            });
            expect(toTransaction(transactionCached)).toStrictEqual(toTransaction(transaction));
        });

        test("getTransactionByBlockHashAndIndex - not found", async () => {
            const blockHash = zeroHash;
            const transactionIndex = "0x0";
            const params = [blockHash, transactionIndex] as [Hash, Hex];
            const transaction = await publicClient.request({
                method: "eth_getTransactionByBlockHashAndIndex",
                params,
            });
            const transactionEIP1193 = await publicEIP1193Client.request({
                method: "eth_getTransactionByBlockHashAndIndex",
                params,
            });
            expect(transaction).toBe(null);
            expect(transactionEIP1193).toBe(null);
        });

        test("getTransactionByBlockNumberAndIndex - found", async () => {
            const blockNumber = numberToHex(receipt.blockNumber);
            const transactionIndex = numberToHex(receipt.transactionIndex);
            const params = [blockNumber, transactionIndex] as [Hex, Hex];
            const transaction = await publicClient.request({
                method: "eth_getTransactionByBlockNumberAndIndex",
                params,
            });
            const transactionEIP1193 = await publicEIP1193Client.request({
                method: "eth_getTransactionByBlockNumberAndIndex",
                params,
            });
            expect(toTransaction(transactionEIP1193)).toStrictEqual(toTransaction(transaction));

            const transactionFromFirebase = await ethTransactionResource.getWhereFirstEncoded({
                chainId: 1337,
                blockNumber,
                transactionIndex,
            });
            expect(toTransaction(transactionFromFirebase)).toStrictEqual(toTransaction(transaction));
            const transactionCached = await publicEIP1193Client.request({
                method: "eth_getTransactionByBlockNumberAndIndex",
                params,
            });
            expect(toTransaction(transactionCached)).toStrictEqual(toTransaction(transaction));
        });

        test("getTransactionByBlockNumberAndIndex - not found", async () => {
            const blockNumber = numberToHex(1_000_000);
            const transactionIndex = "0x0";
            const params = [blockNumber, transactionIndex] as [Hex, Hex];
            const transaction = await publicClient.request({
                method: "eth_getTransactionByBlockNumberAndIndex",
                params,
            });
            const transactionEIP1193 = await publicEIP1193Client.request({
                method: "eth_getTransactionByBlockNumberAndIndex",
                params,
            });
            expect(transaction).toBe(null);
            expect(transactionEIP1193).toBe(null);
        });
    });

    describe("getTransactionReceipt", () => {
        test("getTransactionReceipt - found", async () => {
            const accounts = await walletClient.getAddresses();
            const hash = await walletClient.sendTransaction({
                account: accounts[0],
                to: zeroAddress,
                value: 1n,
            });
            await publicClient.waitForTransactionReceipt({ hash });
            const params = [hash] as [Hash];

            const transactionReceipt = await publicClient.request({
                method: "eth_getTransactionReceipt",
                params,
            });
            const transactionReceiptEIP1193 = await publicEIP1193Client.request({
                method: "eth_getTransactionReceipt",
                params,
            });
            expect(toTransactionReceipt(transactionReceiptEIP1193)).toStrictEqual(
                toTransactionReceipt(transactionReceipt),
            );

            const transactionReceiptFromFirebase = await ethTransactionReceiptResource.getEncoded({
                transactionHash: hash,
                chainId: 1337,
            });
            expect({ ...toTransactionReceipt(transactionReceiptFromFirebase), logs: [] }).toStrictEqual(
                toTransactionReceipt(transactionReceipt),
            );
            const transactionReceiptCached = await publicEIP1193Client.request({
                method: "eth_getTransactionReceipt",
                params,
            });
            expect(toTransactionReceipt(transactionReceiptCached)).toStrictEqual(
                toTransactionReceipt(transactionReceipt),
            );
        });

        test("getTransactionReceipt - not found", async () => {
            const params = [zeroHash] as [Hash];
            const transactionReceipt = await publicClient.request({
                method: "eth_getTransactionReceipt",
                params,
            });

            const transactionReceiptEIP1193 = await publicEIP1193Client.request({
                method: "eth_getTransactionReceipt",
                params,
            });

            expect(transactionReceipt).toBe(null);
            expect(transactionReceiptEIP1193).toBe(null);
        });
    });
});
