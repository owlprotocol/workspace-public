import { describe, test, expect, beforeEach } from "vitest";
import { usersCRUD } from "./crud.js";
import { testNetworkId, testUser, testUserId } from "../test/data.js";

describe("user.test.ts", () => {
    beforeEach(async () => {
        await usersCRUD.deleteAll();
    });

    test("set/get", async () => {
        await usersCRUD.set(testUser);
        const user = await usersCRUD.get(testUser.id);
        expect(user).toStrictEqual(testUser);
    });

    test("set, nested key", async () => {
        await usersCRUD.set(testUser);
        const testUserUpdate = {
            ...testUser,
            topupTotals: { [testNetworkId]: { token: "1" } },
        };
        await usersCRUD.set(testUserUpdate);
        const user = await usersCRUD.get(testUser.id);
        //Keys get overwritten
        expect(user).toStrictEqual(testUserUpdate);
    });

    test("setBatch", async () => {
        await usersCRUD.setBatch([testUser]);
        const user = await usersCRUD.get(testUser.id);
        expect(user).toStrictEqual(testUser);
    });

    test("setBatch, nested key", async () => {
        await usersCRUD.set(testUser);
        const testUserUpdate = {
            ...testUser,
            topupTotals: { [testNetworkId]: { token: "1" } },
        };
        await usersCRUD.setBatch([testUserUpdate]);
        const user = await usersCRUD.get(testUser.id);
        //Keys get overwritten
        expect(user).toStrictEqual(testUserUpdate);
    });

    test("getBatch", async () => {
        await usersCRUD.set(testUser);
        const [user] = await usersCRUD.getBatch([testUser.id]);
        expect(user).toStrictEqual(testUser);
    });

    test("getOrCreate, get", async () => {
        const testUser2 = { ...testUser, email: "jane.doe@gmail.com" };
        await usersCRUD.set(testUser);
        const user = await usersCRUD.getOrCreate(testUser.id, testUser2);
        expect(user).toStrictEqual(testUser);
    });

    test("getOrCreate, create", async () => {
        const testUser2 = { ...testUser, email: "jane.doe@gmail.com" };
        const user = await usersCRUD.getOrCreate(testUser.id, testUser2);
        expect(user).toStrictEqual(testUser2);
    });

    test("getWhereFirstOrCreate, get", async () => {
        const testUser2 = { ...testUser, email: "jane.doe@gmail.com" };
        await usersCRUD.set(testUser);
        const user = await usersCRUD.getWhereFirstOrCreate({ email: testUser.email }, testUser2);
        expect(user).toStrictEqual(testUser);
    });

    test("getWhereFirstOrCreate, create", async () => {
        const testUser2 = { ...testUser, email: "jane.doe@gmail.com" };
        const user = await usersCRUD.getWhereFirstOrCreate({ email: testUser2.email }, testUser2);
        expect(user).toStrictEqual(testUser2);
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

    test("whereFirst", async () => {
        await usersCRUD.set(testUser);
        const user = await usersCRUD.getWhereFirst({ email: testUser.email });

        expect(user).toStrictEqual(testUser);
    });

    test("update", async () => {
        await usersCRUD.set(testUser);
        const testUserUpdated = { ...testUser, email: "jane.doe@gmail.com" };
        await usersCRUD.update(testUserUpdated);
        const user = await usersCRUD.get(testUser.id);
        expect(user).toStrictEqual(testUserUpdated);
    });

    test("update, nested key", async () => {
        await usersCRUD.set(testUser);
        const testUserUpdate = {
            ...testUser,
            topupTotals: { [testNetworkId]: { token: "1" } },
        };
        await usersCRUD.update(testUserUpdate);
        const user = await usersCRUD.get(testUser.id);
        //Keys get merged with existing data
        const testUserUpdated = {
            ...testUser,
            topupTotals: { [testNetworkId]: { native: "0", token: "1" } },
        };
        expect(user).toStrictEqual(testUserUpdated);
    });

    test("updateBatch", async () => {
        await usersCRUD.set(testUser);
        const testUserUpdated = { ...testUser, email: "jane.doe@gmail.com" };
        await usersCRUD.updateBatch([testUserUpdated]);
        const user = await usersCRUD.get(testUser.id);
        expect(user).toStrictEqual(testUserUpdated);
    });

    test("updateBatch, nested key", async () => {
        await usersCRUD.set(testUser);
        const testUserUpdate = {
            ...testUser,
            topupTotals: { [testNetworkId]: { token: "1" } },
        };
        await usersCRUD.updateBatch([testUserUpdate]);
        const user = await usersCRUD.get(testUser.id);
        //Keys get merged with existing data
        const testUserUpdated = {
            ...testUser,
            topupTotals: { [testNetworkId]: { native: "0", token: "1" } },
        };
        expect(user).toStrictEqual(testUserUpdated);
    });

    test("delete", async () => {
        await usersCRUD.set(testUser);
        await usersCRUD.delete(testUserId);
        const users = await usersCRUD.getAll();
        expect(users.length).toBe(0);
    });

    test("deleteBatch", async () => {
        await usersCRUD.set(testUser);
        await usersCRUD.deleteBatch([testUserId]);
        const users = await usersCRUD.getAll();
        expect(users.length).toBe(0);
    });

    test("increment", async () => {
        await usersCRUD.set(testUser);
        await usersCRUD.increment(testUser.id, `topupTotals.${testNetworkId}.native`, "10");

        const user = await usersCRUD.get(testUser.id);
        expect(user.topupTotals[testNetworkId].native).toStrictEqual("10");
    });

    test("decrement", async () => {
        await usersCRUD.set(testUser);
        await usersCRUD.decrement(testUser.id, `topupTotals.${testNetworkId}.native`, "10");

        const user = await usersCRUD.get(testUser.id);
        expect(user.topupTotals[testNetworkId].native).toStrictEqual("-10");
    });
});
