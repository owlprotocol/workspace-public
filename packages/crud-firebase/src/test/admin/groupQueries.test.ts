import { describe, test, expect, beforeEach } from "vitest";
import { itemChildResource } from "./resources.js";
import { itemChildGroupQuery } from "./groupQueries.js";
import { getTestItemComposite } from "../data.js";
import { deleteEmulatorData } from "../../admin/config.js";

describe("admin/groupQueries.test.ts", async () => {
    let id = 1;

    beforeEach(async () => {
        await deleteEmulatorData();
    });

    describe("itemSubcollection", () => {
        test("getAll", async () => {
            const testItemComposite1 = getTestItemComposite(id++);
            const testItemComposite2 = getTestItemComposite(id++);

            await itemChildResource.set({ ...testItemComposite1, id: "100000" });
            await itemChildResource.set({ ...testItemComposite2, id: "200000" });

            const items = await itemChildGroupQuery.getAll();
            expect(items).toStrictEqual([
                { ...testItemComposite1, id: "100000" },
                { ...testItemComposite2, id: "200000" },
            ]);
        });
    });
});
