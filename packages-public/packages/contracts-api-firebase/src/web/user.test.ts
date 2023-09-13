import { describe, test, expect } from "vitest";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { usersCol } from "./config.js";
import { testUser, testUserId } from "../test/data.js";

describe("user.test.ts", async () => {
    test("users", async () => {
        await setDoc(doc(usersCol, testUserId), testUser);
        const snapshot = await getDoc(doc(usersCol, testUserId));
        const result = snapshot.data();
        expect(result).toStrictEqual(testUser);
    });
});
