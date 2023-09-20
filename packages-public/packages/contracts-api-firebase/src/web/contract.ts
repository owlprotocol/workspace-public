import { doc, getDoc, getDocs } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { contractsCol } from "./config.js";
import { Contract } from "../models/Contract.js";

function handleFirebaseError(e: FirebaseError) {
    console.error(e);
    console.log(e.code);
    if (e.code === "permission-denied") {
        throw new Error("User not allowed to access the data");
    }
    throw new Error(`Firebase error: ${e.message}`);
}

export async function getContract(id: string): Promise<Contract> {
    const contractRef = doc(contractsCol, id);
    try {
        const contractSnapshot = await getDoc(contractRef);
        if (!contractSnapshot.exists()) {
            throw new Error("Contract not found");
        }
        return contractSnapshot.data() as Contract;
    } catch (e) {
        if (e instanceof FirebaseError) {
            handleFirebaseError(e);
        }
        throw new Error(`Error getting document: ${e}`);
    }
}

export async function getAllContracts(): Promise<Contract[]> {
    try {
        const querySnapshot = await getDocs(contractsCol);
        return querySnapshot.docs.map((doc) => doc.data() as Contract);
    } catch (e) {
        if (e instanceof FirebaseError) {
            handleFirebaseError(e);
        }
        throw new Error(`Error getting documents: ${e}`);
    }
}
