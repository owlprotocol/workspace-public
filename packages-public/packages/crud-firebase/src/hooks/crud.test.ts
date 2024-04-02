import { describe, test, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react-hooks/native";
import { testItem, testItemComposite, testItemId } from "../test/data.js";
import { itemsCRUD, itemsCompositeCRUD } from "../test/crudWebWrappers.js";
import { itemsCompositeHooks, itemsHooks } from "../test/crudHooksWrappers.js";

describe("hooks/crud.test.ts", () => {
    describe("itemComposite", () => {
        beforeEach(async () => {
            await itemsCompositeCRUD.deleteAll();
        });

        test("useGet", async () => {
            await itemsCompositeCRUD.set(testItemComposite);
            const { result, waitForNextUpdate } = renderHook(() =>
                itemsCompositeHooks.useGet({ idPrefix: "A", idSuffix: "1" }),
            );

            const [result0, options0] = result.current;
            expect(result0).toStrictEqual(undefined);
            expect(options0.status).toBe("loading");

            await waitForNextUpdate();

            const [result1, options1] = result.current;
            expect(result1).toStrictEqual(testItemComposite);
            expect(options1.status).toBe("success");

            //Test data sync, updating item updates hook
            const testItemUpdated = { ...testItemComposite, name: "jane" };
            await itemsCompositeCRUD.update(testItemUpdated);

            await waitForNextUpdate();

            const [result2, options2] = result.current;
            expect(result2).toStrictEqual(testItemUpdated);
            expect(options2.status).toBe("success");
        });
    });

    describe("item", () => {
        beforeEach(async () => {
            await itemsCRUD.deleteAll();
        });

        test("useGet - undefined id", async () => {
            await itemsCRUD.set(testItem);
            const { result } = renderHook(() => itemsHooks.useGet(undefined));

            const [result0, options0] = result.current;
            expect(result0).toStrictEqual(undefined);
            expect(options0.status).toBe("loading");
        });

        test("useGet", async () => {
            await itemsCRUD.set(testItem);
            const { result, waitForNextUpdate } = renderHook(() => itemsHooks.useGet(testItemId));

            const [result0, options0] = result.current;
            expect(result0).toStrictEqual(undefined);
            expect(options0.status).toBe("loading");

            await waitForNextUpdate();

            const [result1, options1] = result.current;
            expect(result1).toStrictEqual(testItem);
            expect(options1.status).toBe("success");

            //Test data sync, updating item updates hook
            const testItemUpdated = { ...testItem, name: "jane" };
            await itemsCRUD.update(testItemUpdated);

            await waitForNextUpdate();

            const [result2, options2] = result.current;
            expect(result2).toStrictEqual(testItemUpdated);
            expect(options2.status).toBe("success");
        });

        test("useGetAll", async () => {
            await itemsCRUD.set(testItem);
            const { result, waitForNextUpdate } = renderHook(() => itemsHooks.useGetAll());

            const [result0, options0] = result.current;
            expect(result0).toStrictEqual(undefined);
            expect(options0.status).toBe("loading");

            await waitForNextUpdate();

            const [result1, options1] = result.current;
            expect(result1).toStrictEqual([testItem]);
            expect(options1.status).toBe("success");
        });

        test("useGetWhere", async () => {
            await itemsCRUD.set(testItem);
            const { result, waitForNextUpdate } = renderHook(() => itemsHooks.useGetWhere({ name: testItem.name }));

            const [result0, options0] = result.current;
            expect(result0).toStrictEqual(undefined);
            expect(options0.status).toBe("loading");

            await waitForNextUpdate();

            const [result1, options1] = result.current;
            expect(result1).toStrictEqual([testItem]);
            expect(options1.status).toBe("success");
        });

        test("useGetWhere, nested key", async () => {
            const testItem2 = { ...testItem, map: { keyA: "valueA", keyB: "valueB" } };
            await itemsCRUD.set(testItem2);
            const { result, waitForNextUpdate } = renderHook(() => itemsHooks.useGetWhere({ map: { keyA: "valueA" } }));

            const [result0, options0] = result.current;
            expect(result0).toStrictEqual(undefined);
            expect(options0.status).toBe("loading");

            await waitForNextUpdate();

            const [result1, options1] = result.current;
            expect(result1).toStrictEqual([testItem2]);
            expect(options1.status).toBe("success");
        });
    });
});
