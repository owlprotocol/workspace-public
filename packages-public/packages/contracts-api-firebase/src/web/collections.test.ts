import { describe, test, expect, beforeEach } from "vitest";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { projectTemplatesCol, projectsCol, usersCol } from "./config.js";
import { getProjectTemplates } from "./projectTemplate.js";
import { createProject, getProjectById, getProjectsByUserId } from "./project.js";
import {
    testProject,
    testProjectId,
    testProjectTemplate,
    testProjectTemplateId,
    testUser,
    testUserId,
} from "../test/data.js";

const setup = async () => {
    await setDoc(doc(usersCol, testUserId), testUser);
    await setDoc(doc(projectTemplatesCol, testProjectTemplateId), testProjectTemplate);
    await setDoc(doc(projectsCol, testProjectId), testProject);
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

describe("Project Tests", () => {
    beforeEach(async () => {
        await setup();
    });

    test("crete project", async () => {
        const { projectId, project } = await createProject("My Project", testUserId);
        expect(projectId).toBeTypeOf("string");
        expect(project.userId).toStrictEqual(testUserId);
    });

    test("get projects by userId", async () => {
        const project = await getProjectsByUserId(testUserId);
        expect(project.length).toStrictEqual(2);
    });

    test("get project by id", async () => {
        const project = await getProjectById(testProjectId);
        expect(project).toStrictEqual(testProject);
    });
});
