import { describe, test, expect, beforeEach } from "vitest";
import { usersCRUD } from "./crud.js";
import { testNetworkId, testUser, testUserId } from "../test/data.js";

describe("user.test.ts", async () => {
    beforeEach(async () => {
        await usersCRUD._deleteAll();
    });

    describe("privileged access, no security checks", () => {
        test("_set/_get", async () => {
            await usersCRUD._set(testUser);
            const user = await usersCRUD._get(testUser.id);
            expect(user).toStrictEqual(testUser);
        });

        test("_set, nested key", async () => {
            await usersCRUD._set(testUser);
            const testUserUpdate = {
                ...testUser,
                topupTotals: { [testNetworkId]: { token: "1" } },
            };
            await usersCRUD._set(testUserUpdate);
            const user = await usersCRUD._get(testUser.id);
            //Keys get overwritten
            expect(user).toStrictEqual(testUserUpdate);
        });

        test("_setBatch", async () => {
            await usersCRUD._setBatch([testUser]);
            const user = await usersCRUD._get(testUser.id);
            expect(user).toStrictEqual(testUser);
        });

        test("_setBatch, nested key", async () => {
            await usersCRUD._set(testUser);
            const testUserUpdate = {
                ...testUser,
                topupTotals: { [testNetworkId]: { token: "1" } },
            };
            await usersCRUD._setBatch([testUserUpdate]);
            const user = await usersCRUD._get(testUser.id);
            //Keys get overwritten
            expect(user).toStrictEqual(testUserUpdate);
        });

        test("_getBatch", async () => {
            await usersCRUD._set(testUser);
            const [user] = await usersCRUD._getBatch([testUser.id]);
            expect(user).toStrictEqual(testUser);
        });

        test("_getOrCreate, get", async () => {
            const testUser2 = { ...testUser, email: "jane.doe@gmail.com" };
            await usersCRUD._set(testUser);
            const user = await usersCRUD._getOrCreate(testUser.id, testUser2);
            expect(user).toStrictEqual(testUser);
        });

        test("_getOrCreate, create", async () => {
            const testUser2 = { ...testUser, email: "jane.doe@gmail.com" };
            const user = await usersCRUD._getOrCreate(testUser.id, testUser2);
            expect(user).toStrictEqual(testUser2);
        });

        test("_getWhereFirstOrCreate, get", async () => {
            const testUser2 = { ...testUser, email: "jane.doe@gmail.com" };
            await usersCRUD._set(testUser);
            const user = await usersCRUD._getWhereFirstOrCreate({ email: testUser.email }, testUser2);
            expect(user).toStrictEqual(testUser);
        });

        test("_getWhereFirstOrCreate, create", async () => {
            const testUser2 = { ...testUser, email: "jane.doe@gmail.com" };
            const user = await usersCRUD._getWhereFirstOrCreate({ email: testUser2.email }, testUser2);
            expect(user).toStrictEqual(testUser2);
        });

        test("_getAll", async () => {
            await usersCRUD._set(testUser);
            const users = await usersCRUD._getAll();

            expect(users.length).toBe(1);
            expect(users[0]).toStrictEqual(testUser);
        });

        test("_where", async () => {
            await usersCRUD._set(testUser);
            const users = await usersCRUD._getWhere({ email: testUser.email });

            expect(users.length).toBe(1);
            expect(users[0]).toStrictEqual(testUser);
        });

        test("_whereFirst", async () => {
            await usersCRUD._set(testUser);
            const user = await usersCRUD._getWhereFirst({ email: testUser.email });

            expect(user).toStrictEqual(testUser);
        });

        test("_update", async () => {
            await usersCRUD._set(testUser);
            const testUserUpdated = { ...testUser, email: "jane.doe@gmail.com" };
            await usersCRUD._update(testUserUpdated);
            const user = await usersCRUD._get(testUser.id);
            expect(user).toStrictEqual(testUserUpdated);
        });

        test("_update, nested key", async () => {
            await usersCRUD._set(testUser);
            const testUserUpdate = {
                ...testUser,
                topupTotals: { [testNetworkId]: { token: "1" } },
            };
            await usersCRUD._update(testUserUpdate);
            const user = await usersCRUD._get(testUser.id);
            //Keys get merged with existing data
            const testUserUpdated = {
                ...testUser,
                topupTotals: { [testNetworkId]: { native: "0", token: "1" } },
            };
            expect(user).toStrictEqual(testUserUpdated);
        });

        test("_updateBatch", async () => {
            await usersCRUD._set(testUser);
            const testUserUpdated = { ...testUser, email: "jane.doe@gmail.com" };
            await usersCRUD._updateBatch([testUserUpdated]);
            const user = await usersCRUD._get(testUser.id);
            expect(user).toStrictEqual(testUserUpdated);
        });

        test("_updateBatch, nested key", async () => {
            await usersCRUD._set(testUser);
            const testUserUpdate = {
                ...testUser,
                topupTotals: { [testNetworkId]: { token: "1" } },
            };
            await usersCRUD._updateBatch([testUserUpdate]);
            const user = await usersCRUD._get(testUser.id);
            //Keys get merged with existing data
            const testUserUpdated = {
                ...testUser,
                topupTotals: { [testNetworkId]: { native: "0", token: "1" } },
            };
            expect(user).toStrictEqual(testUserUpdated);
        });

        test("_increment", async () => {
            await usersCRUD._set(testUser);
            await usersCRUD._increment(testUser.id, `topupTotals.${testNetworkId}.native`, "10");

            const user = await usersCRUD._get(testUser.id);
            expect(user.topupTotals[testNetworkId].native).toStrictEqual("10");
        });

        test("_decrement", async () => {
            await usersCRUD._set(testUser);
            await usersCRUD._decrement(testUser.id, `topupTotals.${testNetworkId}.native`, "10");

            const user = await usersCRUD._get(testUser.id);
            expect(user.topupTotals[testNetworkId].native).toStrictEqual("-10");
        });
    });

    //TODO: Test security guards on failure
    describe("security checks", () => {
        test("set/get", async () => {
            await usersCRUD.set(testUser, testUserId);
            const user = await usersCRUD.get(testUser.id, testUserId);
            expect(user).toStrictEqual(testUser);
        });

        test("setBatch", async () => {
            await usersCRUD.setBatch([testUser], testUserId);
            const user = await usersCRUD.get(testUser.id, testUserId);
            expect(user).toStrictEqual(testUser);
        });

        test("getBatch", async () => {
            await usersCRUD.set(testUser, testUserId);
            const [user] = await usersCRUD.getBatch([testUser.id], testUserId);
            expect(user).toStrictEqual(testUser);
        });

        test("update", async () => {
            await usersCRUD.set(testUser, testUserId);
            const testUserUpdated = { ...testUser, email: "jane.doe@gmail.com" };
            await usersCRUD.update(testUserUpdated, testUserId);
            const user = await usersCRUD.get(testUser.id, testUserId);
            expect(user).toStrictEqual(testUserUpdated);
        });

        test("updateBatch", async () => {
            await usersCRUD.set(testUser, testUserId);
            const testUserUpdated = { ...testUser, email: "jane.doe@gmail.com" };
            await usersCRUD.updateBatch([testUserUpdated], testUserId);
            const user = await usersCRUD.get(testUser.id, testUserId);
            expect(user).toStrictEqual(testUserUpdated);
        });

        test("where", async () => {
            await usersCRUD.set(testUser, testUserId);
            const users = await usersCRUD.getWhere({ email: testUser.email }, undefined, testUserId);

            expect(users.length).toBe(1);
            expect(users[0]).toStrictEqual(testUser);
        });

        test("getAll", async () => {
            await usersCRUD.set(testUser, testUserId);
            const users = await usersCRUD.getAll(testUserId);

            expect(users.length).toBe(1);
            expect(users[0]).toStrictEqual(testUser);
        });

        test("where", async () => {
            await usersCRUD.set(testUser, testUserId);
            const users = await usersCRUD.getWhere({ email: testUser.email }, undefined, testUserId);

            expect(users.length).toBe(1);
            expect(users[0]).toStrictEqual(testUser);
        });
    });
});
