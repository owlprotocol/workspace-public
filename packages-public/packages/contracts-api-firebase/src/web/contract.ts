import { DocumentData, doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { contractsCol } from "./config.js";
import { Contract } from "../models/Contract.js";

export async function getContract(id: string): Promise<Contract> {
    const contractRef = doc(contractsCol, id);
    let contractSnapshot: DocumentData;
    try {
        contractSnapshot = await getDoc(contractRef);
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

    if (!contractSnapshot.exists()) {
        throw new Error("Contract not found");
    }

    return contractSnapshot.data();
}
