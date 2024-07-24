import { getFirebaseApp } from "@owlprotocol/crud-firebase/admin";

export async function migrateAuthUsers() {
    const { auth } = getFirebaseApp();
    const users = await auth.listUsers(10);
    console.log(users);
    // TODO: for all users listed, get their email from the users collection, and add the email to the auth users using `updateUser`
    // const uid = "user_2VKdvYq9WgokilCPzkWWHHoWGAb";
    // const update = await auth.updateUser(uid, { email: "leo@owlprotocol.xyz" });
    // console.log(update);
}

// await migrateAuthUsers();
