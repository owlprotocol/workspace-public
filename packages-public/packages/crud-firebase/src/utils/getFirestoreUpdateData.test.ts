import { describe, test, expect } from "vitest";
import { getFirestoreUpdateData } from "./getFirestoreUpdateData.js";

describe("getFirestoreUpdateData.test.ts", () => {
    test("primitive", () => {
        const item = "hello";
        const updateDataExpected = "hello";
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("{}", () => {
        const item = {};
        const updateDataExpected = {};
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("key-value depth=1", () => {
        const item = { msg: "hello" };
        const updateDataExpected = { msg: "hello" };
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("key-value depth=1, with empty", () => {
        const item = { msg: "hello", empty: {} };
        const updateDataExpected = { msg: "hello" };
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("key-value depth=2", () => {
        const item = { payload: { msg: "hello" } };
        const updateDataExpected = { "payload.msg": "hello" };
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("key-value depth=3", () => {
        const item = { result: { payload: { msg: "hello" } } };
        const updateDataExpected = { "result.payload.msg": "hello" };
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("key-value depth=4", () => {
        const item = { wrapper: { result: { payload: { msg: "hello" } } } };
        const updateDataExpected = { "wrapper.result.payload.msg": "hello" };
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("key-value depth=4, with empty", () => {
        const item = { wrapper: { result: { payload: { msg: "hello", empty: {} }, empty: {} }, empty: {} }, empty: {} };
        const updateDataExpected = { "wrapper.result.payload.msg": "hello" };
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("mixed", () => {
        const item = {
            msg: "hello",
            payload: { msg: "hello" },
            result: { payload: { msg: "hello" } },
            wrapper: { result: { payload: { msg: "hello" } } },
        };

        const updateDataExpected = {
            msg: "hello",
            "payload.msg": "hello",
            "result.payload.msg": "hello",
            "wrapper.result.payload.msg": "hello",
        };
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("two entries, depth two", () => {
        const item = { metadata: { name: "Bob", image: "http://example.com" }, id: "1" };
        const updateData = getFirestoreUpdateData(item);
        const updateDataExpected = { id: "1", "metadata.name": "Bob", "metadata.image": item.metadata.image };
        console.log(updateData);
        expect(updateData).toStrictEqual(updateDataExpected);
    });

    test("mixed, two keys per depth", () => {
        const item = {
            msg2: "hi",
            msg: "hello",
            payload: { msg2: "hi", msg: "hello" },
            result: { payload: { msg2: "hi", msg: "hello" } },
            wrapper: { result: { payload: { msg2: "hi", msg: "hello" } } },
        };

        const updateDataExpected = {
            msg: "hello",
            msg2: "hi",
            "payload.msg": "hello",
            "payload.msg2": "hi",
            "result.payload.msg": "hello",
            "result.payload.msg2": "hi",
            "wrapper.result.payload.msg": "hello",
            "wrapper.result.payload.msg2": "hi",
        };
        const updateData = getFirestoreUpdateData(item);
        expect(updateData).toStrictEqual(updateDataExpected);
    });
});
