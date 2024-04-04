import { describe, test, expect, beforeEach } from "vitest";
import { itemSubcollectionResource } from "./resources.js";
import { childrenGroupQuery } from "./groupQueries.js";
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

            await itemSubcollectionResource.set({ ...testItemComposite1, id: "100000" });
            await itemSubcollectionResource.set({ ...testItemComposite2, id: "200000" });

            const items = await childrenGroupQuery.getAll();
            expect(items).toStrictEqual([
                { ...testItemComposite1, id: "100000" },
                { ...testItemComposite2, id: "200000" },
            ]);
        });
    });
});
