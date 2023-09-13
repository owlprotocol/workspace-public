import { describe, test, expect } from "vitest";
import { usersCol } from "./config.js";
import { testUser, testUserId } from "../test/data.js";

describe("user.test.ts", async () => {
    test("users", async () => {
        await usersCol.doc(testUserId).set(testUser);
        const snapshot = await usersCol.doc(testUserId).get();
        const result = snapshot.data();
        expect(result).toStrictEqual(testUser);
    });
});
