import { describe, test, expect, beforeEach } from "vitest";
import { createProject, deleteProjectsAll, getProjectById, getProjectsByUserId } from "./project.js";
import { testUserId } from "../test/data.js";

describe("Project Tests", () => {
    beforeEach(async () => {
        await deleteProjectsAll();
    });

    test("createProject", async () => {
        const { projectId, project } = await createProject("My Project", testUserId);
        expect(projectId).toBeTypeOf("string");
        expect(project.userId).toStrictEqual(testUserId);
    });

    test("getProjectsByUserId", async () => {
        const result = await createProject("My Project", testUserId);
        const projectExpected = result.project;
        const projects = await getProjectsByUserId(testUserId);

        expect(projects.length).toStrictEqual(1);
        expect(projects[0]).toStrictEqual(projectExpected);
    });

    test("getProjectById", async () => {
        const result = await createProject("My Project", testUserId);
        const projectExpected = result.project;
        const project = await getProjectById(result.projectId);
        expect(project).toStrictEqual(projectExpected);
    });
});
