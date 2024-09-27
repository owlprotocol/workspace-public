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
} from "viem";
import { localhost } from "viem/chains";
import { getAddress } from "viem/utils";
import { sleep } from "@owlprotocol/utils";
import { omit } from "lodash-es";
import {
    deleteEmulatorData,
    ethBlockResource,
    ethTransactionReceiptResource,
    ethTransactionResource,
} from "@owlprotocol/eth-firebase/admin";
import { createIndexerBackend } from "./createIndexerBackend.js";
import { port } from "./test/constants.js";

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
    };
}

describe("createIndexerClient.test.ts", function () {
    let publicClient: PublicClient;
    let publicIndexerClient: PublicClient;

    let walletClient: WalletClient<Transport, Chain>;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });

        publicIndexerClient = await createIndexerBackend({ chain: localhost, transport });

        walletClient = createWalletClient({
            chain: localhost,
            transport,
        });
    });

    beforeEach(async () => {
        await deleteEmulatorData();
    });

    test("getBlock", async () => {
        const block = await publicClient.getBlock({ blockNumber: 0n });
        console.debug({ block });
        const blockSeed = await publicIndexerClient.getBlock({ blockNumber: 0n });
        expect(blockSeed).toStrictEqual(block);

        //Firebase write is done in background, wait a bit for it to complete
        await sleep(200);

        const blockFromFirebase = await ethBlockResource.getOrNull({ hash: block.hash, chainId: 1337 });
        expect(toBlock(blockFromFirebase)).toStrictEqual(toBlock(block));

        const blockCached = await publicIndexerClient.getBlock({ blockNumber: 0n });
        expect(toBlock(blockCached)).toStrictEqual(toBlock(block));
    });

    test("getTransaction", async () => {
        const accounts = await walletClient.getAddresses();
        const hash = await walletClient.sendTransaction({
            account: accounts[0],
            to: zeroAddress,
            value: 1n,
        });
        await publicClient.waitForTransactionReceipt({ hash });

        const transaction = await publicClient.getTransaction({ hash });
        const transactionSeed = await publicIndexerClient.getTransaction({ hash });
        expect(transactionSeed).toStrictEqual(transaction);

        //Firebase write is done in background, wait a bit for it to complete
        await sleep(200);

        const transactionFromFirebase = await ethTransactionResource.getOrNull({
            hash,
            chainId: 1337,
        });
        expect(toTransaction(transactionFromFirebase)).toStrictEqual(toTransaction(transaction));

        const transactionCached = await publicIndexerClient.getTransaction({ hash });
        expect(toTransaction(transactionCached)).toStrictEqual(toTransaction(transaction));
    });

    test("getTransactionReceipt", async () => {
        const accounts = await walletClient.getAddresses();
        const hash = await walletClient.sendTransaction({
            account: accounts[0],
            to: zeroAddress,
            value: 1n,
        });

        const transactionReceipt = await publicClient.waitForTransactionReceipt({ hash });
        const transactionReceiptSeed = await publicIndexerClient.getTransactionReceipt({ hash });
        expect(transactionReceiptSeed).toStrictEqual(transactionReceipt);

        //Firebase write is done in background, wait a bit for it to complete
        await sleep(200);

        const transactionReceiptFromFirebase = await ethTransactionReceiptResource.getOrNull({
            transactionHash: hash,
            chainId: 1337,
        });
        expect({ ...toTransactionReceipt(transactionReceiptFromFirebase), logs: [] }).toStrictEqual(
            toTransactionReceipt(transactionReceipt),
        );

        const transactionReceiptCached = await publicIndexerClient.getTransactionReceipt({ hash });
        expect(toTransactionReceipt(transactionReceiptCached)).toStrictEqual(toTransactionReceipt(transactionReceipt));
    });
});
