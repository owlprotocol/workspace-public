import { getFirebaseApp } from "@owlprotocol/crud-firebase/admin";
import { userResource } from "../admin/resources.js";

export async function migrateAuthUsers() {
    const { auth } = getFirebaseApp();

    const { users } = await auth.listUsers();

    const userIds = users.map((user) => ({
        userId: user.uid,
    }));

    const userDocuments = await userResource.getBatch(userIds);

    const userUpdates = userDocuments.map((user) => user && auth.updateUser(user!.userId, { email: user!.email }));

    await Promise.all(userUpdates);
}

// await migrateAuthUsers();
