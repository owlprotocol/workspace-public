import { describe, test, expect, beforeEach } from "vitest";
import { testItem, testItemComposite, testItemId } from "../test/data.js";
import { itemsCRUD, itemsCompositeCRUD } from "../test/crudAdminWrappers.js";

describe("admin/crud.test.ts", async () => {
    describe("itemComposite", () => {
        beforeEach(async () => {
            await itemsCRUD._deleteAll();
            await itemsCompositeCRUD._deleteAll();
        });

        test("set/get", async () => {
            await itemsCompositeCRUD._set(testItemComposite);

            const itemByIdStr = await itemsCompositeCRUD._get("A-1");
            expect(itemByIdStr).toStrictEqual(testItemComposite);

            const itemByIdComponents = await itemsCompositeCRUD._get({
                idPrefix: testItemComposite.idPrefix,
                idSuffix: testItemComposite.idSuffix,
            });
            expect(itemByIdComponents).toStrictEqual(testItemComposite);
        });
    });

    describe("item", () => {
        beforeEach(async () => {
            await itemsCRUD._deleteAll();
        });

        describe("privileged access, no security checks", () => {
            test("_set/_get", async () => {
                await itemsCRUD._set(testItem);
                const item = await itemsCRUD._get(testItem.id);
                expect(item).toStrictEqual(testItem);
            });

            test("_set, nested key", async () => {
                await itemsCRUD._set(testItem);
                const testItemUpdate = {
                    ...testItem,
                    map: { keyB: "valueB" },
                };
                await itemsCRUD._set(testItemUpdate);
                const item = await itemsCRUD._get(testItem.id);
                //Keys get overwritten
                expect(item).toStrictEqual(testItemUpdate);
            });

            test("_setBatch", async () => {
                await itemsCRUD._setBatch([testItem]);
                const item = await itemsCRUD._get(testItem.id);
                expect(item).toStrictEqual(testItem);
            });

            test("_setBatch, nested key", async () => {
                await itemsCRUD._set(testItem);
                const testItemUpdate = {
                    ...testItem,
                    map: { keyB: "valueB" },
                };
                await itemsCRUD._setBatch([testItemUpdate]);
                const item = await itemsCRUD._get(testItem.id);
                //Keys get overwritten
                expect(item).toStrictEqual(testItemUpdate);
            });

            test("_getBatch", async () => {
                await itemsCRUD._set(testItem);
                const [item] = await itemsCRUD._getBatch([testItem.id]);
                expect(item).toStrictEqual(testItem);
            });

            test("_getOrCreate, get", async () => {
                const testItem2 = { ...testItem, name: "jane" };
                await itemsCRUD._set(testItem);
                const item = await itemsCRUD._getOrCreate(testItem.id, testItem2);
                expect(item).toStrictEqual(testItem);
            });

            test("_getOrCreate, create", async () => {
                const testItem2 = { ...testItem, name: "jane" };
                const item = await itemsCRUD._getOrCreate(testItem.id, testItem2);
                expect(item).toStrictEqual(testItem2);
            });

            test("_getWhereFirstOrCreate, get", async () => {
                const testItem2 = { ...testItem, name: "jane" };
                await itemsCRUD._set(testItem);
                const item = await itemsCRUD._getWhereFirstOrCreate({ name: testItem.name }, testItem2);
                expect(item).toStrictEqual(testItem);
            });

            test("_getWhereFirstOrCreate, create", async () => {
                const testItem2 = { ...testItem, name: "jane" };
                const item = await itemsCRUD._getWhereFirstOrCreate({ name: testItem2.name }, testItem2);
                expect(item).toStrictEqual(testItem2);
            });

            test("_getAll", async () => {
                await itemsCRUD._set(testItem);
                const items = await itemsCRUD._getAll();

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem);
            });

            test("_where", async () => {
                await itemsCRUD._set(testItem);
                const items = await itemsCRUD._getWhere({ name: testItem.name });

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem);
            });

            test("_where, nested key", async () => {
                const testItem2 = { ...testItem, map: { keyA: "valueA", keyB: "valueB" } };
                await itemsCRUD._set(testItem2);
                const items = await itemsCRUD._getWhere({ map: { keyA: "valueA" } });

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem2);
            });

            test("_where, orderBy", async () => {
                await itemsCRUD._set(testItem);
                const items = await itemsCRUD._getWhere({ name: testItem.name }, { orderBy: "name" });

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem);
            });

            test("_whereFirst", async () => {
                await itemsCRUD._set(testItem);
                const item = await itemsCRUD._getWhereFirst({ name: testItem.name });

                expect(item).toStrictEqual(testItem);
            });

            test("_update", async () => {
                await itemsCRUD._set(testItem);
                const testItemUpdated = { ...testItem, name: "jane" };
                await itemsCRUD._update(testItemUpdated);
                const item = await itemsCRUD._get(testItem.id);
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("_update, nested key", async () => {
                await itemsCRUD._set(testItem);
                const testItemUpdate = {
                    id: testItem.id,
                    map: { keyB: "valueB" },
                };
                await itemsCRUD._update(testItemUpdate);
                const item = await itemsCRUD._get(testItem.id);
                //Keys get merged with existing data
                const testItemUpdated = {
                    ...testItem,
                    map: { keyA: "valueA", keyB: "valueB" },
                };
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("_updateBatch", async () => {
                await itemsCRUD._set(testItem);
                const testItemUpdated = { ...testItem, name: "jane" };
                await itemsCRUD._updateBatch([testItemUpdated]);
                const item = await itemsCRUD._get(testItem.id);
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("_updateBatch, nested key", async () => {
                await itemsCRUD._set(testItem);
                const testItemUpdate = {
                    id: testItem.id,
                    map: { keyB: "valueB" },
                };
                await itemsCRUD._updateBatch([testItemUpdate]);
                const item = await itemsCRUD._get(testItem.id);
                //Keys get merged with existing data
                const testItemUpdated = {
                    ...testItem,
                    map: { keyA: "valueA", keyB: "valueB" },
                };
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("_incrementStr", async () => {
                await itemsCRUD._set(testItem);
                await itemsCRUD._incrementStr(testItem.id, "value", "10");

                const item = await itemsCRUD._get(testItem.id);
                expect(item.value).toStrictEqual("10");
            });

            test("_decrementStr", async () => {
                await itemsCRUD._set(testItem);
                await itemsCRUD._decrementStr(testItem.id, "value", "10");

                const item = await itemsCRUD._get(testItem.id);
                expect(item.value).toStrictEqual("-10");
            });

            test("_incrementNumber", async () => {
                await itemsCRUD._set(testItem);
                await itemsCRUD._incrementNumber(testItem.id, "count", 10);

                const item = await itemsCRUD._get(testItem.id);
                expect(item.count).toStrictEqual(10);
            });

            test("_decrementNumber", async () => {
                await itemsCRUD._set(testItem);
                await itemsCRUD._decrementNumber(testItem.id, "count", 10);

                const item = await itemsCRUD._get(testItem.id);
                expect(item.count).toStrictEqual(-10);
            });
        });

        //TODO: Test security guards on failure
        describe("security checks", () => {
            test("set/get", async () => {
                await itemsCRUD.set(testItem, testItemId);
                const item = await itemsCRUD.get(testItem.id, testItemId);
                expect(item).toStrictEqual(testItem);
            });

            test("setBatch", async () => {
                await itemsCRUD.setBatch([testItem], testItemId);
                const item = await itemsCRUD.get(testItem.id, testItemId);
                expect(item).toStrictEqual(testItem);
            });

            test("getBatch", async () => {
                await itemsCRUD.set(testItem, testItemId);
                const [item] = await itemsCRUD.getBatch([testItem.id], testItemId);
                expect(item).toStrictEqual(testItem);
            });

            test("update", async () => {
                await itemsCRUD.set(testItem, testItemId);
                const testItemUpdated = { ...testItem, name: "jane" };
                await itemsCRUD.update(testItemUpdated, testItemId);
                const item = await itemsCRUD.get(testItem.id, testItemId);
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("updateBatch", async () => {
                await itemsCRUD.set(testItem, testItemId);
                const testItemUpdated = { ...testItem, name: "jane" };
                await itemsCRUD.updateBatch([testItemUpdated], testItemId);
                const item = await itemsCRUD.get(testItem.id, testItemId);
                expect(item).toStrictEqual(testItemUpdated);
            });

            test("where", async () => {
                await itemsCRUD.set(testItem, testItemId);
                const items = await itemsCRUD.getWhere({ name: testItem.name }, undefined, testItemId);

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem);
            });

            test("getAll", async () => {
                await itemsCRUD.set(testItem, testItemId);
                const items = await itemsCRUD.getAll(testItemId);

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem);
            });

            test("where", async () => {
                await itemsCRUD.set(testItem, testItemId);
                const items = await itemsCRUD.getWhere({ name: testItem.name }, undefined, testItemId);

                expect(items.length).toBe(1);
                expect(items[0]).toStrictEqual(testItem);
            });
        });
    });
});
