import { describe, test, expect, beforeEach } from "vitest";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { templatesCol, usersCol } from "./config.js";
import { getTemplates } from "./template.js";
import { testTemplate, testTemplateId, testUser, testUserId } from "../test/data.js";

const setup = async () => {
    await setDoc(doc(usersCol, testUserId), testUser);
    await setDoc(doc(templatesCol, testTemplateId), testTemplate);
};

describe("User Tests", () => {
    beforeEach(async () => {
        await setup();
    });

    test("users", async () => {
        const snapshot = await getDoc(doc(usersCol, testUserId));
        const result = snapshot.data();
        expect(result).toStrictEqual(testUser);
    });
});

describe("Template Tests", () => {
    beforeEach(async () => {
        await setup();
    });

    test("templates", async () => {
        const result = await getTemplates();
        expect(result.length).toStrictEqual(1);
    });
});
