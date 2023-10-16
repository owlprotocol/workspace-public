import { describe, test, expect, beforeEach, beforeAll } from "vitest";
import { omit } from "lodash-es";
import crypto from "node:crypto";
import { testItem, testItemComposite, testItemId } from "../test/data.js";
import { itemsCRUD, itemsCompositeCRUD } from "../test/crudWebWrappers.js";

describe("web/crud.test.ts", () => {
    beforeAll(() => {
        //TODO: Fix, using global crypto in web sdk
        //@ts-expect-error
        global.crypto = crypto;
    });

    describe("itemComposite", () => {
        beforeEach(async () => {
            await itemsCompositeCRUD.deleteAll();
        });

        test("set/get", async () => {
            await itemsCompositeCRUD.set(testItemComposite);

            const itemByIdStr = await itemsCompositeCRUD.get("A-1");
            expect(itemByIdStr).toStrictEqual(testItemComposite);

            const itemByIdComponents = await itemsCompositeCRUD.get({
                idPrefix: testItemComposite.idPrefix,
                idSuffix: testItemComposite.idSuffix,
            });
            expect(itemByIdComponents).toStrictEqual(testItemComposite);
        });
    });

    describe("item", () => {
        beforeEach(async () => {
            await itemsCRUD.deleteAll();
        });

        test("set/get", async () => {
            await itemsCRUD.set(testItem);
            const item = await itemsCRUD.get(testItem.id);
            expect(item).toStrictEqual(testItem);
        });

        test("set, auto-id", async () => {
            const id = await itemsCRUD.set(omit(testItem, "id"));
            const item = await itemsCRUD.get(id);
            expect(omit(item, "id")).toStrictEqual(omit(testItem, "id"));
            expect(item.id).not.toBe(testItem.id);
        });

        test("set, nested key", async () => {
            await itemsCRUD.set(testItem);
            const testItemUpdate = {
                ...testItem,
                map: { keyB: "valueB" },
            };
            await itemsCRUD.set(testItemUpdate);
            const item = await itemsCRUD.get(testItem.id);
            //Keys get overwritten
            expect(item).toStrictEqual(testItemUpdate);
        });

        test("setBatch", async () => {
            await itemsCRUD.setBatch([testItem]);
            const item = await itemsCRUD.get(testItem.id);
            expect(item).toStrictEqual(testItem);
        });

        test("setBatch, nested key", async () => {
            await itemsCRUD.set(testItem);
            const testItemUpdate = {
                ...testItem,
                map: { keyB: "valueB" },
            };
            await itemsCRUD.setBatch([testItemUpdate]);
            const item = await itemsCRUD.get(testItem.id);
            //Keys get overwritten
            expect(item).toStrictEqual(testItemUpdate);
        });

        test("getBatch", async () => {
            await itemsCRUD.set(testItem);
            const [item] = await itemsCRUD.getBatch([testItem.id]);
            expect(item).toStrictEqual(testItem);
        });

        test("getOrCreate, get", async () => {
            const testitem2 = { ...testItem, name: "jane" };
            await itemsCRUD.set(testItem);
            const item = await itemsCRUD.getOrCreate(testItem.id, testitem2);
            expect(item).toStrictEqual(testItem);
        });

        test("getOrCreate, create", async () => {
            const testitem2 = { ...testItem, name: "jane" };
            const item = await itemsCRUD.getOrCreate(testItem.id, testitem2);
            expect(item).toStrictEqual(testitem2);
        });

        test("getWhereFirstOrCreate, get", async () => {
            const testitem2 = { ...testItem, name: "jane" };
            await itemsCRUD.set(testItem);
            const item = await itemsCRUD.getWhereFirstOrCreate({ name: testItem.name }, testitem2);
            expect(item).toStrictEqual(testItem);
        });

        test("getWhereFirstOrCreate, create", async () => {
            const testitem2 = { ...testItem, name: "jane" };
            const item = await itemsCRUD.getWhereFirstOrCreate({ name: testitem2.name }, testitem2);
            expect(item).toStrictEqual(testitem2);
        });

        test("getAll", async () => {
            await itemsCRUD.set(testItem);
            const items = await itemsCRUD.getAll();

            expect(items.length).toBe(1);
            expect(items[0]).toStrictEqual(testItem);
        });

        test("where", async () => {
            await itemsCRUD.set(testItem);
            const items = await itemsCRUD.getWhere({ name: testItem.name });

            expect(items.length).toBe(1);
            expect(items[0]).toStrictEqual(testItem);
        });

        test("where, orderBy", async () => {
            await itemsCRUD.set(testItem);
            const items = await itemsCRUD.getWhere({ name: testItem.name }, { orderBy: "name" });

            expect(items.length).toBe(1);
            expect(items[0]).toStrictEqual(testItem);
        });

        test("whereFirst", async () => {
            await itemsCRUD.set(testItem);
            const item = await itemsCRUD.getWhereFirst({ name: testItem.name });

            expect(item).toStrictEqual(testItem);
        });

        test("update", async () => {
            await itemsCRUD.set(testItem);
            const testItemUpdated = { ...testItem, name: "jane" };
            await itemsCRUD.update(testItemUpdated);
            const item = await itemsCRUD.get(testItem.id);
            expect(item).toStrictEqual(testItemUpdated);
        });

        test("update, nested key", async () => {
            await itemsCRUD.set(testItem);
            const testItemUpdate = {
                id: testItem.id,
                map: { keyB: "valueB" },
            };
            await itemsCRUD.update(testItemUpdate);
            const item = await itemsCRUD.get(testItem.id);
            //Keys get merged with existing data
            const testItemUpdated = {
                ...testItem,
                map: { keyA: "valueA", keyB: "valueB" },
            };
            expect(item).toStrictEqual(testItemUpdated);
        });

        test("updateBatch", async () => {
            await itemsCRUD.set(testItem);
            const testItemUpdated = { ...testItem, name: "jane" };
            await itemsCRUD.updateBatch([testItemUpdated]);
            const item = await itemsCRUD.get(testItem.id);
            expect(item).toStrictEqual(testItemUpdated);
        });

        test("updateBatch, nested key", async () => {
            await itemsCRUD.set(testItem);
            const testItemUpdate = {
                id: testItem.id,
                map: { keyB: "valueB" },
            };
            await itemsCRUD.updateBatch([testItemUpdate]);
            const item = await itemsCRUD.get(testItem.id);
            //Keys get merged with existing data
            const testItemUpdated = {
                ...testItem,
                map: { keyA: "valueA", keyB: "valueB" },
            };
            expect(item).toStrictEqual(testItemUpdated);
        });

        test("delete", async () => {
            await itemsCRUD.set(testItem);
            await itemsCRUD.delete(testItemId);
            const items = await itemsCRUD.getAll();
            expect(items.length).toBe(0);
        });

        test("deleteBatch", async () => {
            await itemsCRUD.set(testItem);
            await itemsCRUD.deleteBatch([testItemId]);
            const items = await itemsCRUD.getAll();
            expect(items.length).toBe(0);
        });

        test("increment", async () => {
            await itemsCRUD.set(testItem);
            await itemsCRUD.increment(testItem.id, "value", "10");

            const item = await itemsCRUD.get(testItem.id);
            expect(item.value).toStrictEqual("10");
        });

        test("decrement", async () => {
            await itemsCRUD.set(testItem);
            await itemsCRUD.decrement(testItem.id, "value", "10");

            const item = await itemsCRUD.get(testItem.id);
            expect(item.value).toStrictEqual("-10");
        });
    });
});
