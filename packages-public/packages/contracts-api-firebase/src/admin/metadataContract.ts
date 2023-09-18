import { TRPCError } from "@trpc/server";
import { CollectionReference, DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { cid } from "is-ipfs";
import { MetadataContract } from "../models/MetadataContract.js";

const metadataNotFoundError = new TRPCError({
    message: "Contract metadata not found",
    code: "NOT_FOUND",
});

export async function createMetadataContract(
    metadataContractsCol: CollectionReference<MetadataContract>,
    metadataContract: MetadataContract,
): Promise<{ id: string; metadataContract: MetadataContract }> {
    const doc = metadataContractsCol.doc();
    const { id } = doc;

    try {
        await doc.set(metadataContract);
    } catch (e) {
        console.error("Error creating contract metadata in firestore: ", e);
        throw new TRPCError({ message: "Error creating contract metadata", code: "INTERNAL_SERVER_ERROR" });
    }

    return { id, metadataContract };
}

export async function createMetadataContractWithName(
    metadataContractsCol: CollectionReference<MetadataContract>,
    name: string,
    userId: string,
    imageUrl?: string,
): Promise<{ id: string; metadataContract: MetadataContract }> {
    // Create a default metadata object
    const metadataJson = { name, image_url: imageUrl };
    const metadataContract: MetadataContract = {
        id: crypto.randomUUID(),
        owner: userId,
        metadataJson: metadataJson,
        type: "firebase",
        name: name,
    };
    return await createMetadataContract(metadataContractsCol, metadataContract);
}

export async function getMetadataContractSnapshotById(
    metadataContractsCol: CollectionReference<MetadataContract>,
    id: string,
): Promise<DocumentSnapshot<MetadataContract>> {
    let snapshot: DocumentSnapshot<MetadataContract>;

    const metadataContractRef = metadataContractsCol.doc(id);
    try {
        snapshot = await metadataContractRef.get();
    } catch (e) {
        console.error("Error getting contract metadata in firestore: ", e);
        throw e;
    }

    if (!snapshot.exists) {
        throw metadataNotFoundError;
    }

    return snapshot;
}

export async function getMetadataContractSnapshotByIpfsHash(
    metadataContractsCol: CollectionReference<MetadataContract>,
    ipfsHash: string,
): Promise<DocumentSnapshot<MetadataContract>> {
    const metadataContractQuery = metadataContractsCol.where("ipfsHash", "==", ipfsHash);

    let querySnapshot: QuerySnapshot<MetadataContract>;
    try {
        querySnapshot = await metadataContractQuery.get();
    } catch (e) {
        console.error("Error getting contract metadata in firestore: ", e);
        throw e;
    }

    if (querySnapshot.empty) {
        throw metadataNotFoundError;
    }
    return querySnapshot.docs[0];
}

export async function getMetadataContractSnapshotByIdOrIpfsHash(
    metadataContractsCol: CollectionReference<MetadataContract>,
    metadataIdOrIpfsHash: string,
): Promise<DocumentSnapshot<MetadataContract>> {
    if (cid(metadataIdOrIpfsHash)) {
        const ipfsHash = metadataIdOrIpfsHash;
        return await getMetadataContractSnapshotByIpfsHash(metadataContractsCol, ipfsHash);
    }

    const id = metadataIdOrIpfsHash;
    return await getMetadataContractSnapshotById(metadataContractsCol, id);
}

// TODO: handle changes if using ipfs
export async function updateMetadataContract(
    metadataContractSnapshot: DocumentSnapshot<MetadataContract>,
    userId: string,
    patch: boolean,
    updatedMetadataJson?: Record<string, any>,
    type?: "ipfs" | "firebase",
    name?: string,
): Promise<MetadataContract> {
    if (!metadataContractSnapshot.exists) {
        throw metadataNotFoundError;
    }

    const metadataContractOwner = metadataContractSnapshot.data()!.owner;
    if (metadataContractOwner != userId) {
        throw new TRPCError({
            message: "Can't update a contract metadata that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    const updatedMetadataContract = metadataContractSnapshot.data()!;
    if (updatedMetadataJson) {
        if (patch) {
            //TODO: This will NOT work with deep-merge. Is this a problem?
            // Merge `metadataJson` with the values from `updatedMetadataJson`
            // Note: if both have the same key, the value from `updatedMetadataJson` will be kept
            const patchedMetadataJson = Object.assign(updatedMetadataContract.metadataJson, updatedMetadataJson);
            updatedMetadataContract.metadataJson = patchedMetadataJson;
        } else {
            updatedMetadataContract.metadataJson = updatedMetadataJson;
        }
    }

    if (type) {
        updatedMetadataContract.type = type;
    }

    if (name) {
        updatedMetadataContract.name = name;
    }

    const docRef = metadataContractSnapshot.ref;
    try {
        await docRef.set(updatedMetadataContract);
    } catch (e) {
        console.error("Error updating contract metadata in firestore: ", e);
        throw e;
    }

    return updatedMetadataContract;
}

export async function deleteMetadataContract(
    metadataContractSnapshot: DocumentSnapshot<MetadataContract>,
    userId: string,
) {
    const docRef = metadataContractSnapshot.ref;

    if (!metadataContractSnapshot.exists) {
        throw metadataNotFoundError;
    }

    const metadataContractOwner = metadataContractSnapshot.data()!.owner;
    if (metadataContractOwner != userId) {
        throw new TRPCError({
            message: "Can't delete a contract metadata that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    try {
        await docRef.delete();
    } catch (e) {
        console.error("Error deleting contract metadata in firestore: ", e);
        throw e;
    }
}

export async function getMetadataContractsByOwner(
    metadataContractsCol: CollectionReference<MetadataContract>,
    userId: string,
): Promise<Array<{ id: string; name: string }>> {
    const metadataContractsQuery = metadataContractsCol.where("owner", "==", userId);

    const querySnapshot = await metadataContractsQuery.get();

    return querySnapshot.docs.map((doc) => {
        return { id: doc.id, name: doc.data().name };
    });
}
