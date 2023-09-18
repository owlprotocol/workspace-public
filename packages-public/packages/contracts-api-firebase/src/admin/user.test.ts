import { describe, test, expect } from "vitest";
import { usersCRUD } from "./crud.js";
import { testUser } from "../test/data.js";

describe("user.test.ts", async () => {
    test("set", async () => {
        await usersCRUD.set(testUser);
    });

    test("get", async () => {
        await usersCRUD.set(testUser);
        const project = await usersCRUD.get(testUser.id);
        expect(project).toStrictEqual(testUser);
    });

    test("where", async () => {
        await usersCRUD.set(testUser);
        const projects = await usersCRUD.getWhere({ email: testUser.email });

        expect(projects.length).toBe(1);
        expect(projects[0]).toStrictEqual(testUser);
    });
});
