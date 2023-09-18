import { describe, test, expect, beforeEach } from "vitest";
import { usersCRUD } from "./crud.js";
import { testUser } from "../test/data.js";

describe("user.test.ts", () => {
    beforeEach(async () => {
        await usersCRUD.deleteAll();
    });

    test("set", async () => {
        await usersCRUD.set(testUser);
    });

    test("update", async () => {
        await usersCRUD.set(testUser);
        await usersCRUD.update(testUser);
    });

    test("get", async () => {
        await usersCRUD.set(testUser);
        const user = await usersCRUD.get(testUser.id);
        expect(user).toStrictEqual(testUser);
    });

    test("getAll", async () => {
        await usersCRUD.set(testUser);
        const users = await usersCRUD.getAll();

        expect(users.length).toBe(1);
        expect(users[0]).toStrictEqual(testUser);
    });

    test("where", async () => {
        await usersCRUD.set(testUser);
        const users = await usersCRUD.getWhere({ email: testUser.email });

        expect(users.length).toBe(1);
        expect(users[0]).toStrictEqual(testUser);
    });
});
