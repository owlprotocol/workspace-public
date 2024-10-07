import { expect, describe, test, beforeAll, beforeEach } from "vitest";
import { Client, createClient, http } from "viem";
import { localhost } from "viem/chains";
import { deleteEmulatorData, ethBlockResource } from "@owlprotocol/eth-firebase/admin";
import { omit } from "lodash-es";
import { getBlock as getBlockViem } from "viem/actions";
import { getBlock } from "./getBlock.js";
import { port } from "../test/constants.js";

/**
 * For block comparisons between viem
 * @param block
 * @returns
 */
function toBlock(block: any) {
    return omit(block, ["chainId", "blobGasUsed", "excessBlobGas", "sealFields"]);
}

describe("getBlock.test.ts", function () {
    let client: Client;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        client = createClient({
            chain: localhost,
            transport,
        });
    });

    beforeEach(async () => {
        await deleteEmulatorData();
    });

    test("getBlockByNumber", async () => {
        const blockViem = await getBlockViem(client, { blockNumber: 0n });
        const block = await getBlock(client, { blockNumber: 0n });
        expect(block).toStrictEqual(blockViem);

        const blockFromFirebase = await ethBlockResource.getOrNull({ hash: blockViem.hash, chainId: 1337 });
        expect(toBlock(blockFromFirebase)).toStrictEqual(toBlock(blockViem));

        const blockCached = await getBlock(client, { blockNumber: 0n });
        expect(toBlock(blockCached)).toStrictEqual(toBlock(blockViem));
    });

    test("getBlockByHash", async () => {
        const { hash: blockHash } = await getBlockViem(client, { blockNumber: 0n });
        const blockViem = await getBlockViem(client, { blockHash });
        const block = await getBlock(client, { blockHash });
        expect(block).toStrictEqual(blockViem);

        const blockFromFirebase = await ethBlockResource.getOrNull({ hash: blockViem.hash, chainId: 1337 });
        expect(toBlock(blockFromFirebase)).toStrictEqual(toBlock(blockViem));

        const blockCached = await getBlock(client, { blockHash });
        expect(toBlock(blockCached)).toStrictEqual(toBlock(blockViem));
    });

    test("getBlockByTag", async () => {
        const blockViem = await getBlockViem(client, { blockTag: "latest" });
        const block = await getBlock(client, { blockTag: "latest" });
        expect(block).toStrictEqual(blockViem);

        const blockFromFirebase = await ethBlockResource.getOrNull({ hash: blockViem.hash, chainId: 1337 });
        expect(toBlock(blockFromFirebase)).toStrictEqual(toBlock(blockViem));

        const blockCached = await getBlock(client, { blockTag: "latest" });
        expect(toBlock(blockCached)).toStrictEqual(toBlock(blockViem));
    });
});
