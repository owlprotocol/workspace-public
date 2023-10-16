import { describe, test } from "vitest";
/*
import { collection } from "firebase/firestore";
import { getFirebaseCRUDMerged } from "./crudMerged.js";
import { firestore } from "./config.js";
import { testItem } from "../test/data.js";
*/

describe("web/crudMerge.test.ts", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    test("pass", () => {});
});

/*
const usersCRUD = getFirebaseCRUDMerged<UserPersonal & UserPrivate, { personal: UserPersonal; private: UserPrivate }>(
    { personal: collection(firestore, "usersPersonal") as any, private: collection(firestore, "usersPrivate") },
    {
        personal: ["email", "type", "apiKey", "dfnsAddress", "gnosisAddress", "topupTotals", "topupMax"],
        private: ["dfnsId"],
    },
);

describe("crudMerge.test.ts", () => {
    beforeEach(async () => {
        await usersCRUD.deleteAll();
    });

    test("set/get", async () => {
        await usersCRUD.set(testItem);
        const user = await usersCRUD.get(testItem.id);
        expect(user).toStrictEqual(testItem);
    });

    test("set, nested key", async () => {
        await usersCRUD.set(testItem);
        const testUserUpdate = {
            ...testItem,
            topupTotals: { [testNetworkId]: { token: "1" } },
        };
        await usersCRUD.set(testUserUpdate);
        const user = await usersCRUD.get(testItem.id);
        //Keys get overwritten
        expect(user).toStrictEqual(testUserUpdate);
    });

    test("setBatch", async () => {
        await usersCRUD.setBatch([testItem]);
        const user = await usersCRUD.get(testItem.id);
        expect(user).toStrictEqual(testItem);
    });

    test("setBatch, nested key", async () => {
        await usersCRUD.set(testItem);
        const testUserUpdate = {
            ...testItem,
            topupTotals: { [testNetworkId]: { token: "1" } },
        };
        await usersCRUD.setBatch([testUserUpdate]);
        const user = await usersCRUD.get(testItem.id);
        //Keys get overwritten
        expect(user).toStrictEqual(testUserUpdate);
    });

    test("getBatch", async () => {
        await usersCRUD.set(testItem);
        const [user] = await usersCRUD.getBatch([testItem.id]);
        expect(user).toStrictEqual(testItem);
    });

    test("getAll", async () => {
        await usersCRUD.set(testItem);
        const users = await usersCRUD.getAll();

        expect(users.length).toBe(1);
        expect(users[0]).toStrictEqual(testItem);
    });

    test("update", async () => {
        await usersCRUD.set(testItem);
        const testUserUpdated = { ...testItem, email: "jane.doe@gmail.com" };
        await usersCRUD.update(testUserUpdated);
        const user = await usersCRUD.get(testItem.id);
        expect(user).toStrictEqual(testUserUpdated);
    });

    test("update, nested key", async () => {
        await usersCRUD.set(testItem);
        const testUserUpdate = {
            ...testItem,
            topupTotals: { [testNetworkId]: { token: "1" } },
        };
        await usersCRUD.update(testUserUpdate);
        const user = await usersCRUD.get(testItem.id);
        //Keys get merged with existing data
        const testUserUpdated = {
            ...testItem,
            topupTotals: { [testNetworkId]: { native: "0", token: "1" } },
        };
        expect(user).toStrictEqual(testUserUpdated);
    });

    test("updateBatch", async () => {
        await usersCRUD.set(testItem);
        const testUserUpdated = { ...testItem, email: "jane.doe@gmail.com" };
        await usersCRUD.updateBatch([testUserUpdated]);
        const user = await usersCRUD.get(testItem.id);
        expect(user).toStrictEqual(testUserUpdated);
    });

    test("updateBatch, nested key", async () => {
        await usersCRUD.set(testItem);
        const testUserUpdate = {
            ...testItem,
            topupTotals: { [testNetworkId]: { token: "1" } },
        };
        await usersCRUD.updateBatch([testUserUpdate]);
        const user = await usersCRUD.get(testItem.id);
        //Keys get merged with existing data
        const testUserUpdated = {
            ...testItem,
            topupTotals: { [testNetworkId]: { native: "0", token: "1" } },
        };
        expect(user).toStrictEqual(testUserUpdated);
    });

    test("delete", async () => {
        await usersCRUD.set(testItem);
        await usersCRUD.delete(testItem.id);
        const users = await usersCRUD.getAll();
        expect(users.length).toBe(0);
    });

    test("deleteBatch", async () => {
        await usersCRUD.set(testItem);
        await usersCRUD.deleteBatch([testItem.id]);
        const users = await usersCRUD.getAll();
        expect(users.length).toBe(0);
    });
});
*/
