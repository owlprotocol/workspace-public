import { describe, test, expect } from "vitest";
import { getFirestorePathValue } from "./getFirestorePathValue.js";

describe("getFirestorePathValue.test.ts", () => {
    test("key-value depth=1", () => {
        const item = { msg: "hello" };
        const value = getFirestorePathValue(item, "msg");
        expect(value).toStrictEqual("hello");
    });

    test("key-value depth=2", () => {
        const item = { payload: { msg: "hello" } };
        const value = getFirestorePathValue(item, "payload.msg");
        expect(value).toStrictEqual("hello");
    });

    test("key-value depth=3", () => {
        const item = { result: { payload: { msg: "hello" } } };
        const value = getFirestorePathValue(item, "result.payload.msg");
        expect(value).toStrictEqual("hello");
    });
});
