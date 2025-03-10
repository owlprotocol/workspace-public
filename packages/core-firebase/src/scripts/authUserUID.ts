import { getFirebaseApp } from "@owlprotocol/crud-firebase/admin";
import { userResource } from "../admin/resources.js";
import { User } from "../models/User.js";

export async function migrateAuthUserUID(email: string) {
    const { auth } = getFirebaseApp();

    const user = await auth.getUserByEmail(email);

    const userId = user.uid;

    const oldUserDocument = await userResource.getWhereFirst({ email });

    if (!oldUserDocument) {
        throw new Error("User document not found");
    }

    console.log({ authUserId: userId, oldUserId: oldUserDocument.userId });

    const newUserDocument: User = { email, userId, createdAt: Date.now() };

    const userUpdates = [userResource.set(newUserDocument), userResource.delete(oldUserDocument)];

    await Promise.all(userUpdates);
}

// if (!process.env.EMAIL) {
//     throw new Error("EMAIL environment variable not set");
// }
// await migrateAuthUserUID(process.env.EMAIL!);
