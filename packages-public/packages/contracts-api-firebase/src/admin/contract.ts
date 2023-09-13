import { TRPCError } from "@trpc/server";
import { CollectionReference } from "firebase-admin/firestore";
import { Contract } from "../models/Contract.js";

export function getContractId(address: string, networkId: string): string {
    return `${address}-${networkId}`;
}

export async function setContract(contractsCol: CollectionReference<Contract>, contract: Contract): Promise<Contract> {
    const contractId = getContractId(contract.address, contract.networkId);
    await contractsCol.doc(contractId).set(contract);
    return contract;
}

export async function getContract(contractsCol: CollectionReference<Contract>, id: string): Promise<Contract> {
    const contractRef = contractsCol.doc(id);
    try {
        const contractSnapshot = await contractRef.get();

        if (!contractSnapshot.exists) {
            throw new TRPCError({
                message: "Contract not found",
                code: "NOT_FOUND",
            });
        }

        return contractSnapshot.data()!;
    } catch (e) {
        console.error("Error getting contract in firestore: ", e);
        throw e;
    }
}

export async function updateContract(
    contractsCol: CollectionReference<Contract>,
    userId: string,
    contractId: string,
    updatedContract: Contract,
) {
    const docRef = contractsCol.doc(contractId);
    const contractSnapshot = await docRef.get();

    if (!contractSnapshot.exists) {
        throw new TRPCError({
            message: "Contract not found",
            code: "NOT_FOUND",
        });
    }

    const contractOwner = contractSnapshot.data()!.owner;
    if (contractOwner != userId) {
        throw new TRPCError({
            message: "Can't update a contract that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    try {
        await docRef.set(updatedContract);
    } catch (e) {
        console.error("Error updating contract in firestore: ", e);
        throw e;
    }
}

export async function deleteContract(contractsCol: CollectionReference<Contract>, userId: string, contractId: string) {
    const docRef = contractsCol.doc(contractId);
    const contractSnapshot = await docRef.get();

    if (!contractSnapshot.exists) {
        throw new TRPCError({
            message: "Contract not found",
            code: "NOT_FOUND",
        });
    }

    const contractOwner = contractSnapshot.data()!.owner;
    if (contractOwner != userId) {
        throw new TRPCError({
            message: "Can't delete a contract that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    try {
        await docRef.delete();
    } catch (e) {
        console.error("Error deleting contract in firestore: ", e);
        throw e;
    }
}

export async function getContractsByOwner(
    contractsCol: CollectionReference<Contract>,
    userId: string,
): Promise<Contract[]> {
    const contractsQuery = contractsCol.where("owner", "==", userId);

    const querySnapshot = await contractsQuery.get();

    return querySnapshot.docs.map((doc) => {
        return doc.data();
    });
}
