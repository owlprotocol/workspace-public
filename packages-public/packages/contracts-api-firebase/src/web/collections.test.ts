import { describe, test, expect, beforeEach } from "vitest";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { projectTemplatesCol, usersCol } from "./config.js";
import { getProjectTemplates } from "./projectTemplate.js";
import { testProjectTemplate, testProjectTemplateId, testUser, testUserId } from "../test/data.js";

const setup = async () => {
    await setDoc(doc(usersCol, testUserId), testUser);
    await setDoc(doc(projectTemplatesCol, testProjectTemplateId), testProjectTemplate);
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

describe("Project Template Tests", () => {
    beforeEach(async () => {
        await setup();
    });

    test("project templates", async () => {
        const result = await getProjectTemplates();
        expect(result.length).toStrictEqual(1);
    });
});
