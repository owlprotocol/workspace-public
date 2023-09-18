import { ethers } from "ethers";
import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { FirebaseError } from "firebase-admin/app";
import * as crypto from "crypto";
import { usersCol } from "./config.js";
import { User } from "../models/User.js";

export async function getUser(id: string): Promise<User> {
    const userRef = usersCol.doc(id);
    let userSnapshot: DocumentData;
    try {
        userSnapshot = await userRef.get();
    } catch (e) {
        //Assume error has code = FirebaseError
        if ((e as any).code) {
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

export async function updateUser(userId: string, user: Omit<User, "topupTotals" | "topupMax">) {
    const docRef = usersCol.doc(userId);
    await docRef.update(user);
}

//Starter balances for user (zero spent, 1 ETH max gas usage)
//TODO: Make default topupTotals default to zero, default topupMax to zero
const signupBalance = {
    topupTotals: {
        "80001": {
            native: "0",
        },
        "31337": {
            native: "0",
        },
    },
    topupMax: {
        "80001": {
            native: ethers.utils.parseUnits("1.0").toString(),
            //TODO: Store in TS data structure (maybe something similar to @thirdweb/chains package, does this exist for tokens?)
            //LINK
            "0x326C977E6efc84E512bB9C30f76E30c160eD06FB": ethers.utils.parseUnits("1.0").toString(),
        },
        "31337": {
            native: ethers.constants.MaxUint256.toString(),
        },
    },
};

export async function createUserByEmail(
    usersCol: CollectionReference<User>,
    email: string,
): Promise<{ userId: string; user: User }> {
    //create user id
    const userId = crypto.randomUUID();
    //create api key
    const apiKey = crypto.randomUUID();
    //initial user data
    const user: User = {
        id: userId,
        email,
        apiKey,
        gnosisAddress: {},
        ...signupBalance,
    };

    await usersCol.doc(userId).set(user);

    return { userId, user };
}

export async function getUserByEmail(
    usersCol: CollectionReference<User>,
    email: string,
): Promise<{ userId: string; user: User } | undefined> {
    const userQuery = usersCol.where("email", "==", email);
    const querySnapshot = await userQuery.get();

    if (querySnapshot.empty) return undefined;

    const userId = querySnapshot.docs[0].id;
    const user = querySnapshot.docs[0].data();

    return { userId, user };
}

export async function getUserByApiKey(
    usersCol: CollectionReference<User>,
    apiKey: string,
): Promise<{ userId: string; user: User } | undefined> {
    const userQuery = usersCol.where("apiKey", "==", apiKey);
    const querySnapshot = await userQuery.get();

    if (querySnapshot.empty) return undefined;

    const userId = querySnapshot.docs[0].id;
    const user = querySnapshot.docs[0].data();

    return { userId, user };
}

export async function getOrCreateUserAccount(
    usersCol: CollectionReference<User>,
    email: string,
): Promise<{ user: User; userId: string }> {
    const userQuery = await getUserByEmail(usersCol, email);
    let user: User;
    let userId: string;

    if (userQuery) {
        ({ user, userId } = userQuery);
    } else {
        ({ user, userId } = await createUserByEmail(usersCol, email));
    }

    return { user, userId };
}
