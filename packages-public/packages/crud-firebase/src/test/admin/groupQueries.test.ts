import { describe, test, expect, beforeEach } from "vitest";
import { itemSubcollectionResource } from "./resources.js";
import { childrenGroupQuery } from "./groupQueries.js";
import { getTestItemComposite } from "../data.js";

describe("admin/groupQueries.test.ts", async () => {
    let id = 0;

    describe("itemSubcollection", () => {
        const testSubCollection1 = itemSubcollectionResource({ id: "100000" });
        const testSubCollection2 = itemSubcollectionResource({ id: "200000" });

        beforeEach(async () => {
            await testSubCollection1.deleteAll();
            await testSubCollection2.deleteAll();
        });

        test("getAll", async () => {
            const testItemComposite1 = getTestItemComposite(id++);
            const testItemComposite2 = getTestItemComposite(id++);

            await testSubCollection1.set(testItemComposite1);
            await testSubCollection2.set(testItemComposite2);

            const items = await childrenGroupQuery.getAll();
            expect(items).toStrictEqual([
                { ...testItemComposite1, id: "100000" },
                { ...testItemComposite2, id: "200000" },
            ]);
        });
    });
});
