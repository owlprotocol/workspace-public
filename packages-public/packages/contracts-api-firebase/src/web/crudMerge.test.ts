import { describe, test, expect, beforeEach } from "vitest";
import { usersCRUDMerged as usersCRUD } from "./crudMerged.js";
import { testNetworkId, testUser } from "../test/data.js";

describe("crudMerge.test.ts", () => {
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

    test("getAll", async () => {
        await usersCRUD.set(testUser);
        const users = await usersCRUD.getAll();

        expect(users.length).toBe(1);
        expect(users[0]).toStrictEqual(testUser);
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
        await usersCRUD.delete(testUser.id);
        const users = await usersCRUD.getAll();
        expect(users.length).toBe(0);
    });

    test("deleteBatch", async () => {
        await usersCRUD.set(testUser);
        await usersCRUD.deleteBatch([testUser.id]);
        const users = await usersCRUD.getAll();
        expect(users.length).toBe(0);
    });
});
