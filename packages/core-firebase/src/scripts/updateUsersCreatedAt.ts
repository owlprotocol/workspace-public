import { projectUserGroupQuery } from "../admin/groupQueries.js";
import { projectUserResource, userResource } from "../admin/resources.js";

export async function updateUsersCreatedAt() {
    try {
        // Bypass zod verification
        const usersSnapshot = await userResource.getAllSnapshot();
        const users = usersSnapshot.docs.map((d) => ({
            data: d.data(),
            createdAt: d.createTime.toMillis(),
            userId: d.id,
        }));

        const usersNoCreatedAt = users.filter((u) => u.data.createdAt === undefined);

        if (usersNoCreatedAt.length > 0) {
            const usersUpdated = usersNoCreatedAt.map((u) => {
                return { ...u.data, createdAt: u.createdAt, userId: u.userId };
            });

            await userResource.setBatch(usersUpdated);

            console.log(`Updated ${usersUpdated.length} users.`);
        }

        // Bypass zod verification
        const projectUsersSnapshot = await projectUserGroupQuery.getAllSnapshot();

        const projectUsers = projectUsersSnapshot.docs.map((d) => ({
            data: d.data(),
            projectId: d.ref.parent.parent!.id,
            createdAt: d.createTime.toMillis(),
        }));

        const projectUsersNoCreatedAt = projectUsers.filter((u) => u.data.createdAt === undefined);

        if (projectUsersNoCreatedAt.length > 0) {
            const projectUsersUpdated = projectUsersNoCreatedAt.map((u) => {
                return {
                    ...u.data,
                    createdAt: u.createdAt,
                    projectId: u.projectId,
                };
            });

            await projectUserResource.setBatch(projectUsersUpdated);

            console.log(`Updated ${projectUsersUpdated.length} project users.`);
        }
    } catch (error) {
        console.error("Update failed:", error);
    }
}

// await updateUsersCreatedAt();
