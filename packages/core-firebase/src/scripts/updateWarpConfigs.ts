import { projectWarpConfigResource, projectResource } from "../admin/resources.js";

export async function migrateWarpConfig() {
    try {
        // get project ids
        const projects = await projectResource.getAll();
        const projectIds = projects.map((project) => project.projectId);

        const warpConfigs = await Promise.all(
            projectIds.map((projectId) => projectWarpConfigResource.getAll({ projectId })),
        );

        const allWarpConfigs = warpConfigs.flat();

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

// await migrateWarpConfig();
