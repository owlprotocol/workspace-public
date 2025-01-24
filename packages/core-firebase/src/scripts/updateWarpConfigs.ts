import { projectWarpConfigResource, projectResource } from "../web/resources.js";

export async function migrateWarpConfig() {
    try {
        // get project ids
        const projects = await projectResource.getAll();
        const projectIds = projects.map((project) => project.projectId);

        const allWarpConfigs = [];

        // get all warp configs
        for (const projectId of projectIds) {
            const warpConfigs = await projectWarpConfigResource.getAll({ projectId });
            allWarpConfigs.push(...warpConfigs);
        }

        const toUpdate = allWarpConfigs.filter((doc) => !doc.createdAt);

        console.log(`Migration started: Updating ${toUpdate.length} Warp Config documents...`);

        // add createdAt field
        const updatedConfigs = toUpdate.map((doc) => ({
            ...doc,
            createdAt: Date.now(),
        }));

        await projectWarpConfigResource.setBatch(updatedConfigs);

        console.log(`Migration completed. Updated ${updatedConfigs.length} Warp Config documents.`);
    } catch (error) {
        console.error("Migration failed:", error);
    }
}

migrateWarpConfig();
