import { expect, describe, test, beforeAll, beforeEach } from "vitest";
import {
    Client,
    createClient,
    createWalletClient,
    getAddress,
    http,
    TransactionReceipt,
    Transport,
    zeroAddress,
} from "viem";
import { localhost } from "viem/chains";
import { deleteEmulatorData, ethTransactionResource } from "@owlprotocol/eth-firebase/admin";
import { omit } from "lodash-es";
import { getTransaction as getTransactionViem, waitForTransactionReceipt } from "viem/actions";
import { getTransaction } from "./getTransaction.js";
import { port } from "../../test/constants.js";

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

describe("getTransaction.test.ts", function () {
    let transport: Transport;
    let client: Client;
    let receipt: TransactionReceipt;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        client = createClient({
            chain: localhost,
            transport,
        });
    });

    beforeEach(async () => {
        await deleteEmulatorData();

        const walletClient = createWalletClient({
            chain: localhost,
            transport,
        });
        const accounts = await walletClient.getAddresses();
        const hash = await walletClient.sendTransaction({
            account: accounts[0],
            to: zeroAddress,
            value: 1n,
        });
        receipt = await waitForTransactionReceipt(client, { hash });
    });

    test("getTransactionByHash", async () => {
        const hash = receipt.transactionHash;
        const transactionViem = await getTransactionViem(client, { hash });
        const transaction = await getTransaction(client, { hash });
        expect(transaction).toStrictEqual(transactionViem);

        const transactionFromFirebase = await ethTransactionResource.getOrNull({ hash, chainId: 1337 });
        expect(toTransaction(transactionFromFirebase)).toStrictEqual(toTransaction(transactionViem));

        const transactionCached = await getTransaction(client, { hash });
        expect(toTransaction(transactionCached)).toStrictEqual(toTransaction(transactionViem));
    });

    test("getTransactionByByBlockNumberAndIndex", async () => {
        const hash = receipt.transactionHash;
        const blockNumber = receipt.blockNumber;
        const index = receipt.transactionIndex;

        const transactionViem = await getTransactionViem(client, { blockNumber, index });
        const transaction = await getTransaction(client, { blockNumber, index });
        expect(transaction).toStrictEqual(transactionViem);

        const transactionFromFirebase = await ethTransactionResource.getOrNull({ hash, chainId: 1337 });
        expect(toTransaction(transactionFromFirebase)).toStrictEqual(toTransaction(transactionViem));

        const transactionCached = await getTransaction(client, { blockNumber, index });
        expect(toTransaction(transactionCached)).toStrictEqual(toTransaction(transactionViem));
    });

    test("getTransactionByByBlockHashAndIndex", async () => {
        const hash = receipt.transactionHash;
        const blockHash = receipt.blockHash;
        const index = receipt.transactionIndex;

        const transactionViem = await getTransactionViem(client, { blockHash, index });
        const transaction = await getTransaction(client, { blockHash, index });
        expect(transaction).toStrictEqual(transactionViem);

        const transactionFromFirebase = await ethTransactionResource.getOrNull({ hash, chainId: 1337 });
        expect(toTransaction(transactionFromFirebase)).toStrictEqual(toTransaction(transactionViem));

        const transactionCached = await getTransaction(client, { blockHash, index });
        expect(toTransaction(transactionCached)).toStrictEqual(toTransaction(transactionViem));
    });
});
