import { describe, test, expect } from "vitest";
import { projectTemplatesCRUD } from "./crud.js";
import { testProjectTemplate } from "../test/data.js";

describe("projectTemplate.test.ts", () => {
    test("set", async () => {
        await projectTemplatesCRUD.set(testProjectTemplate);
    });

    test("get", async () => {
        await projectTemplatesCRUD.set(testProjectTemplate);
        const project = await projectTemplatesCRUD.get(testProjectTemplate.id);
        expect(project).toStrictEqual(testProjectTemplate);
    });

    test("where", async () => {
        await projectTemplatesCRUD.set(testProjectTemplate);
        const projects = await projectTemplatesCRUD.getWhere({ name: testProjectTemplate.name });

        expect(projects.length).toBe(1);
        expect(projects[0]).toStrictEqual(testProjectTemplate);
    });
});
