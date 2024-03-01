import { describe, test, expect, beforeEach } from "vitest";
import { itemResource, itemCompositeResource, itemSubcollectionResource, itemResourceCached } from "./resources.js";
import { getTestItem, getTestItemComposite } from "../data.js";
import { Item, ItemComposite } from "../models/index.js";

describe("admin/resource.test.ts", async () => {
    let id = 0;

    beforeEach(() => {
        id += 1;
    });

    describe("item LRU Cache", () => {
        let testItem: Item;

        beforeEach(async () => {
            await itemResourceCached().deleteAll();
            itemResourceCached().cache?.clear();
            testItem = getTestItem(id);
        });

        test.only("set/get - cache hit", async () => {
            await itemResourceCached().set(testItem);
            //Get Item - populate cache
            const itemGet1 = await itemResourceCached().get(testItem.id);
            expect(itemGet1).toStrictEqual(testItem);
            //Check cache populated
            expect(itemResourceCached().cache!.has(testItem.id)).toBe(true);
        });

        test.only("set/get - cache purged", async () => {
            await itemResourceCached().set(testItem);

            //Get Item - populate cache
            const itemGet1 = await itemResourceCached().get(testItem.id);
            expect(itemGet1).toStrictEqual(testItem);
            //Check cache populated
            expect(itemResourceCached().cache!.has(testItem.id)).toBe(true);

            //Update testItem using non-cached instance
            const testItem2 = { ...testItem, name: "jane" };
            await itemResourceCached().set(testItem2);

            //Cache still populated
            expect(itemResourceCached().cache!.has(testItem.id)).toBe(false);
            //Cache-stale, should return original item
            const itemGet2 = await itemResourceCached().get(testItem.id);
            expect(itemGet2).toStrictEqual(testItem2);
        });

        test.only("set/get - cache stale", async () => {
            await itemResourceCached().set(testItem);

            //Get Item - populate cache
            const itemGet1 = await itemResourceCached().get(testItem.id);
            expect(itemGet1).toStrictEqual(testItem);
            //Check cache populated
            expect(itemResourceCached().cache!.has(testItem.id)).toBe(true);

            //Update testItem using non-cached instance
            const testItem2 = { ...testItem, name: "jane" };
            await itemResource().set(testItem2);

            //Cache still populated
            expect(itemResourceCached().cache!.has(testItem.id)).toBe(true);
            //Cache-stale, should return original item
            const itemGet2 = await itemResourceCached().get(testItem.id);
            expect(itemGet2).toStrictEqual(testItem);
        });

        test.only("set/get - cache busted", async () => {
            for (let i = 0; i < 11; i++) {
                const item = getTestItem(1000 + i);
                await itemResourceCached().set(item);
                await itemResourceCached().get(item.id);
                expect(itemResourceCached().cache!.has(item.id)).toBe(true);
            }

            const item0 = getTestItem(1000 + 0);
            const item1 = getTestItem(1000 + 1);
            //LRU capacity reached item0 no longer in cache
            expect(itemResourceCached().cache!.has(item0.id)).toBe(false);
            expect(itemResourceCached().cache!.has(item1.id)).toBe(true);

            //Get works regardless
            const itemGet0 = await itemResourceCached().get(item0.id);
            expect(itemGet0).toStrictEqual(item0);
            const itemGet1 = await itemResourceCached().get(item1.id);
            expect(itemGet1).toStrictEqual(item1);
        });
    });

    describe("itemSubcollection", () => {
        const testSubCollection = itemSubcollectionResource({ id: "100000" });
        let testItemComposite: ItemComposite;

        beforeEach(async () => {
            await testSubCollection.deleteAll();
            testItemComposite = getTestItemComposite(id);
        });

        test("set/get", async () => {
            await testSubCollection.set(testItemComposite);

            const itemByIdStr = await testSubCollection.get(
                `${testItemComposite.idPrefix}-${testItemComposite.idSuffix}`,
            );
            expect(itemByIdStr).toStrictEqual(testItemComposite);

            const itemByIdComponents = await testSubCollection.get({
                idPrefix: testItemComposite.idPrefix,
                idSuffix: testItemComposite.idSuffix,
            });
            expect(itemByIdComponents).toStrictEqual(testItemComposite);
        });
    });

    describe("itemComposite", () => {
        let testItemComposite: ItemComposite;

        beforeEach(async () => {
            await itemCompositeResource().deleteAll();
            testItemComposite = getTestItemComposite(id);
        });

        test("set/get", async () => {
            await itemCompositeResource().set(testItemComposite);

            const itemByIdStr = await itemCompositeResource().get(
                `${testItemComposite.idPrefix}-${testItemComposite.idSuffix}`,
            );
            expect(itemByIdStr).toStrictEqual(testItemComposite);

            const itemByIdComponents = await itemCompositeResource().get({
                idPrefix: testItemComposite.idPrefix,
                idSuffix: testItemComposite.idSuffix,
            });
            expect(itemByIdComponents).toStrictEqual(testItemComposite);
        });
    });

    describe("item", () => {
        let testItem: Item;

        beforeEach(async () => {
            await itemResource().deleteAll();
            testItem = getTestItem(id);
        });

        describe("privileged access, no security checks", () => {
            test("set/get", async () => {
                await itemResource().set(testItem);
                const item = await itemResource().get(testItem.id);
                expect(item).toStrictEqual(testItem);
            });

            test("set, nested key", async () => {
                await itemResource().set(testItem);
                const testItemUpdate = {
                    ...testItem,
                    map: { keyB: "valueB" },
                };
                await itemResource().set(testItemUpdate);
                const item = await itemResource().get(testItem.id);
                //Keys get overwritten
                expect(item).toStrictEqual(testItemUpdate);
            });

            test("setBatch", async () => {
                await itemResource().setBatch([testItem]);
                const item = await itemResource().get(testItem.id);
                expect(item).toStrictEqual(testItem);
            });

            test("setBatch, nested key", async () => {
                await itemResource().set(testItem);
                const testItemUpdate = {
                    ...testItem,
                    map: { keyB: "valueB" },
                };
                await itemResource().setBatch([testItemUpdate]);
                const item = await itemResource().get(testItem.id);
                //Keys get overwritten
                expect(item).toStrictEqual(testItemUpdate);
            });

            test("getBatch", async () => {
                await itemResource().set(testItem);
                const [item] = await itemResource().getBatch([testItem.id]);
                expect(item).toStrictEqual(testItem);
            });

            test("getOrCreate, get", async () => {
                const testItem2 = { ...testItem, name: "jane" };
                await itemResource().set(testItem);
                const item = await itemResource().getOrCreate(testItem.id, testItem2);
                expect(item).toStrictEqual(testItem);
            });

            test("getOrCreate, create", async () => {
                const testItem2 = { ...testItem, name: "jane" };
                const item = await itemResource().getOrCreate(testItem.id, testItem2);
                expect(item).toStrictEqual(testItem2);
            });

            test("getWhereFirstOrCreate, get", async () => {
                const testItem2 = { ...testItem, name: "jane" };
                await itemResource().set(testItem);
                const item = await itemResource().getWhereFirstOrCreate({ name: testItem.name }, testItem2);
                expect(item).toStrictEqual(testItem);
            });

            test("getWhereFirstOrCreate, create", async () => {
                const testItem2 = { ...testItem, name: "jane" };
                const item = await itemResource().getWhereFirstOrCreate({ name: testItem2.name }, testItem2);
                expect(item).toStrictEqual(testItem2);
            });

            test("getAll", async () => {
                await itemResource().set(testItem);
                const items = await itemResource().getAll();

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem);
            });

            test("where", async () => {
                await itemResource().set(testItem);
                const items = await itemResource().getWhere({ name: testItem.name });

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem);
            });

            test("where, nested key", async () => {
                const testItem2 = { ...testItem, map: { keyA: "valueA", keyB: "valueB" } };
                await itemResource().set(testItem2);
                const items = await itemResource().getWhere({ map: { keyA: "valueA" } });

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem2);
            });

            test("where, orderBy", async () => {
                await itemResource().set(testItem);
                const items = await itemResource().getWhere({ name: testItem.name }, { orderBy: "name" });

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem);
            });

            test("whereFirst", async () => {
                await itemResource().set(testItem);
                const item = await itemResource().getWhereFirst({ name: testItem.name });

                expect(item).toStrictEqual(testItem);
            });

            test("update", async () => {
                await itemResource().set(testItem);
                const testItemUpdated = { ...testItem, name: "jane" };
                await itemResource().update(testItemUpdated);
                const item = await itemResource().get(testItem.id);
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("update, nested key", async () => {
                await itemResource().set(testItem);
                const testItemUpdate = {
                    id: testItem.id,
                    map: { keyB: "valueB" },
                };
                await itemResource().update(testItemUpdate);
                const item = await itemResource().get(testItem.id);
                //Keys get merged with existing data
                const testItemUpdated = {
                    ...testItem,
                    map: { keyA: "valueA", keyB: "valueB" },
                };
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("updateBatch", async () => {
                await itemResource().set(testItem);
                const testItemUpdated = { ...testItem, name: "jane" };
                await itemResource().updateBatch([testItemUpdated]);
                const item = await itemResource().get(testItem.id);
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("updateBatch, nested key", async () => {
                await itemResource().set(testItem);
                const testItemUpdate = {
                    id: testItem.id,
                    map: { keyB: "valueB" },
                };
                await itemResource().updateBatch([testItemUpdate]);
                const item = await itemResource().get(testItem.id);
                //Keys get merged with existing data
                const testItemUpdated = {
                    ...testItem,
                    map: { keyA: "valueA", keyB: "valueB" },
                };
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("incrementStr", async () => {
                await itemResource().set(testItem);
                await itemResource().incrementStr(testItem.id, "value", "10");

                const item = await itemResource().get(testItem.id);
                expect(item.value).toStrictEqual("10");
            });

            test("decrementStr", async () => {
                await itemResource().set(testItem);
                await itemResource().decrementStr(testItem.id, "value", "10");

                const item = await itemResource().get(testItem.id);
                expect(item.value).toStrictEqual("-10");
            });

            test("incrementNumber", async () => {
                await itemResource().set(testItem);
                await itemResource().incrementNumber(testItem.id, "count", 10);

                const item = await itemResource().get(testItem.id);
                expect(item.count).toStrictEqual(10);
            });

            test("decrementNumber", async () => {
                await itemResource().set(testItem);
                await itemResource().decrementNumber(testItem.id, "count", 10);

                const item = await itemResource().get(testItem.id);
                expect(item.count).toStrictEqual(-10);
            });
        });
    });
});
