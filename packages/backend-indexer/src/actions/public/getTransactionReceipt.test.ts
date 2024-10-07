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
import { deleteEmulatorData, ethTransactionReceiptResource } from "@owlprotocol/eth-firebase/admin";
import { omit } from "lodash-es";
import { getTransactionReceipt as getTransactionReceiptViem, waitForTransactionReceipt } from "viem/actions";
import { getTransactionReceipt } from "./getTransactionReceipt.js";
import { port } from "../../test/constants.js";

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

describe("getTransactionReceipt.test.ts", function () {
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

    test("getTransactionReceipt", async () => {
        const transactionHash = receipt.transactionHash;
        const transactionViem = await getTransactionReceiptViem(client, { hash: transactionHash });
        const transaction = await getTransactionReceipt(client, { hash: transactionHash });
        expect(transaction).toStrictEqual(transactionViem);

        const transactionFromFirebase = await ethTransactionReceiptResource.getOrNull({
            transactionHash,
            chainId: 1337,
        });
        expect({ ...toTransactionReceipt(transactionFromFirebase), logs: [] }).toStrictEqual(
            toTransactionReceipt(transactionViem),
        );

        const transactionCached = await getTransactionReceipt(client, { hash: transactionHash });
        expect(toTransactionReceipt(transactionCached)).toStrictEqual(toTransactionReceipt(transactionViem));
    });
});
