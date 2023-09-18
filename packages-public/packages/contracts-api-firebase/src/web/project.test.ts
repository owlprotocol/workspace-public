import { describe, test, expect, beforeEach } from "vitest";
import { projectsCRUD } from "./crud.js";
import { testProject } from "../test/data.js";

describe("project.test.ts", () => {
    beforeEach(async () => {
        await projectsCRUD.deleteAll();
    });

    test("set", async () => {
        await projectsCRUD.set(testProject);
    });

    test("get", async () => {
        await projectsCRUD.set(testProject);
        const project = await projectsCRUD.get(testProject.id);
        expect(project).toStrictEqual(testProject);
    });

    test("where", async () => {
        await projectsCRUD.set(testProject);
        const projects = await projectsCRUD.getWhere({ userId: testProject.userId });

        expect(projects.length).toBe(1);
        expect(projects[0]).toStrictEqual(testProject);
    });
});
