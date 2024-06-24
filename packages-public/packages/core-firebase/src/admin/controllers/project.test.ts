import { describe, test, expect, beforeAll } from "vitest";
import { deleteEmulatorData } from "@owlprotocol/crud-firebase/admin";
import { networkResource } from "@owlprotocol/eth-firebase/admin";
import { createProject } from "./project.js";
import { ProjectData } from "../../models/index.js";
import { chainId1337, networks } from "../../data/dev-local.js";

describe("project.test.ts", function () {
    beforeAll(async () => {
        await deleteEmulatorData();
        await networkResource.setBatch(networks);
    });
    test("create project", async () => {
        const slug = "test";
        const teamId = "1";
        const name = "test";
        const defaultChainId = chainId1337;

        const project: ProjectData = {
            slug,
            teamId,
            name,
            defaultChainId,
        };
        await expect(createProject(project)).resolves.toBeDefined();

        const project2: ProjectData = {
            slug,
            teamId,
            name,
            defaultChainId,
        };
        await expect(createProject(project2)).rejects.toThrow(
            `Project slug "${slug}" already exists. Please choose a unique slug.`,
        );
    });
});
