import { describe, test, expect, beforeAll } from "vitest";
import { deleteEmulatorData } from "@owlprotocol/crud-firebase/admin";
import { createTeam } from "./team.js";
import { TeamData } from "../../models/index.js";

describe("team.test.ts", function () {
    beforeAll(async () => {
        await deleteEmulatorData();
    });
    test("create team", async () => {
        const slug = "test";
        const name = "test";
        const owner = "test";

        const team: TeamData = {
            slug,
            owner,
            name,
        };
        await expect(createTeam(team)).resolves.toBeDefined();

        const team2: TeamData = {
            slug,
            owner,
            name,
        };
        await expect(createTeam(team2)).rejects.toThrow(
            `Team slug "${slug}" already exists. Please choose a unique slug.`,
        );
    });
});
