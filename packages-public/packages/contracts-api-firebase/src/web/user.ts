import { DocumentData, doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { usersCol } from "./config.js";
import { User } from "../models/User.js";

export async function getUser(id: string): Promise<User> {
    const userRef = doc(usersCol, id);
    let userSnapshot: DocumentData;
    try {
        userSnapshot = await getDoc(userRef);
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
            const firebaseError = e as FirebaseError;
            console.log(firebaseError.code);
            if (firebaseError.code === "permission-denied") {
                throw new Error("User not allowed to get document");
            }
            throw new Error(`Error getting document: ${firebaseError.message}`);
        }
        throw new Error(`Error getting document: ${e}`);
    }

    if (!userSnapshot.exists()) {
        throw new Error("User not found");
    }

    return userSnapshot.data();
}
