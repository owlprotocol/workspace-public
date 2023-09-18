import { Bucket } from "@google-cloud/storage";
import { TRPCError } from "@trpc/server";
import { CollectionReference, DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { cid } from "is-ipfs";
import * as jp from "jsonpath";
import { isEmpty } from "lodash-es";
import { uploadFile } from "./storage.js";
import { MetadataTokens } from "../models/MetadataTokens.js";

const metadataNotFoundError = new TRPCError({
    message: "Tokens metadata not found",
    code: "NOT_FOUND",
});

export async function createMetadataTokens(
    metadataTokensCol: CollectionReference<MetadataTokens>,
    metadataTokens: MetadataTokens,
): Promise<{ id: string; metadataTokens: MetadataTokens }> {
    const doc = metadataTokensCol.doc();
    const { id } = doc;

    try {
        await doc.set(metadataTokens);
    } catch (e) {
        console.error("Error creating tokens metadata in firestore: ", e);
        throw new TRPCError({ message: "Error creating tokens metadata", code: "INTERNAL_SERVER_ERROR" });
    }

    return { id, metadataTokens };
}

/**
 * createMetadataTokensWithName creates a MetadataTokens document with the given name, sets the owner to `userId`, sets the tokenMap of the object, and returns the object and its id.
 * @param metadataTokensCol a MetadataTokens Firebase collection
 * @param name the name attribute of the MetadataTokens object to create
 * @param userId the id of the user trying to create the MetadataTokens object. Sets the owner of the MetadataTokens to this
 * @param tokenMap an optional of token id to token metadata
 * @returns the MetadataTokens object created and its id
 */
export async function createMetadataTokensWithName(
    metadataTokensCol: CollectionReference<MetadataTokens>,
    name: string,
    userId: string,
    tokenMap: Record<string, Record<string, any>> = {},
): Promise<{ id: string; metadataTokens: MetadataTokens }> {
    // Create a default metadata object
    const metadataTokens: MetadataTokens = {
        id: crypto.randomUUID(),
        owner: userId,
        type: "firebase",
        tokenMap: tokenMap,
        name: `${name} tokens metadata`,
    };
    return await createMetadataTokens(metadataTokensCol, metadataTokens);
}

/**
 * getMetadataTokensSnapshotById returns the DocumentSnapshot of a MetadataTokens by its id
 * @param metadataTokensCol a MetadataTokens Firebase collection
 * @param id the id of a MetadataTokens
 * @returns the DocumentSnapshot of the matching MetadataTokens, if it exists
 */
export async function getMetadataTokensSnapshotById(
    metadataTokensCol: CollectionReference<MetadataTokens>,
    id: string,
): Promise<DocumentSnapshot<MetadataTokens>> {
    let snapshot: DocumentSnapshot<MetadataTokens>;

    const metadataTokensRef = metadataTokensCol.doc(id);
    try {
        snapshot = await metadataTokensRef.get();
    } catch (e) {
        throw new TRPCError({
            message: `Error getting tokens metadata from firestore: ${e}`,
            code: "INTERNAL_SERVER_ERROR",
        });
    }

    if (!snapshot.exists) {
        throw metadataNotFoundError;
    }

    return snapshot;
}

export async function getMetadataTokensSnapshotByIpfsHash(
    metadataTokensCol: CollectionReference<MetadataTokens>,
    ipfsHash: string,
): Promise<DocumentSnapshot<MetadataTokens>> {
    const metadataTokensQuery = metadataTokensCol.where("ipfsHash", "==", ipfsHash);

    let querySnapshot: QuerySnapshot<MetadataTokens>;
    try {
        querySnapshot = await metadataTokensQuery.get();
    } catch (e) {
        throw new TRPCError({
            message: `Error getting tokens metadata from firestore: ${e}`,
            code: "INTERNAL_SERVER_ERROR",
        });
    }

    if (querySnapshot.empty) {
        throw metadataNotFoundError;
    }
    return querySnapshot.docs[0];
}

export async function getMetadataTokensSnapshotByIdOrIpfsHash(
    metadataTokensCol: CollectionReference<MetadataTokens>,
    metadataIdOrIpfsHash: string,
): Promise<DocumentSnapshot<MetadataTokens>> {
    if (cid(metadataIdOrIpfsHash)) {
        const ipfsHash = metadataIdOrIpfsHash;
        return await getMetadataTokensSnapshotByIpfsHash(metadataTokensCol, ipfsHash);
    }

    const id = metadataIdOrIpfsHash;
    return await getMetadataTokensSnapshotById(metadataTokensCol, id);
}

// TODO: handle changes if using ipfs
export async function updateMetadataTokens(
    metadataTokensSnapshot: DocumentSnapshot<MetadataTokens>,
    userId: string,
    patch: boolean,
    updatedTokenMap?: Record<string, any>,
    type?: "ipfs" | "firebase",
    name?: string,
): Promise<MetadataTokens> {
    if (!metadataTokensSnapshot.exists) {
        throw metadataNotFoundError;
    }

    //TODO: Design data model to leverage nested documents
    //TODO: Should only load owner and specific tokens that are getting changed
    const updatedMetadataTokens = metadataTokensSnapshot.data()!;
    const metadataTokensOwner = updatedMetadataTokens.owner;
    if (metadataTokensOwner != userId) {
        throw new TRPCError({
            message: "Can't update a token metadata that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    if (updatedTokenMap) {
        if (patch) {
            // Merge `tokenMap` with the values from `updatedTokenMap`
            // Note: if both have the same key, the value from `updatedTokenMap` will be kept
            const patchedTokenMap = Object.assign(updatedMetadataTokens.tokenMap, updatedTokenMap);
            updatedMetadataTokens.tokenMap = patchedTokenMap;
        } else {
            updatedMetadataTokens.tokenMap = updatedTokenMap;
        }
    }

    if (type) {
        updatedMetadataTokens.type = type;
    }

    if (name) {
        updatedMetadataTokens.name = name;
    }

    const docRef = metadataTokensSnapshot.ref;
    try {
        await docRef.set(updatedMetadataTokens);
    } catch (e) {
        throw new TRPCError({
            message: `Error updating tokens metadata from firestore: ${e}`,
            code: "INTERNAL_SERVER_ERROR",
        });
    }

    return updatedMetadataTokens;
}

export async function deleteMetadataTokens(metadataTokensSnapshot: DocumentSnapshot<MetadataTokens>, userId: string) {
    const docRef = metadataTokensSnapshot.ref;

    if (!metadataTokensSnapshot.exists) {
        throw metadataNotFoundError;
    }

    const metadataTokensOwner = metadataTokensSnapshot.data()!.owner;
    if (metadataTokensOwner != userId) {
        throw new TRPCError({
            message: "Can't delete a tokens metadata that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    try {
        await docRef.delete();
    } catch (e) {
        throw new TRPCError({
            message: `Error deleting tokens metadata from firestore: ${e}`,
            code: "INTERNAL_SERVER_ERROR",
        });
    }
}

export async function getMetadataTokensByOwner(
    metadataTokensCol: CollectionReference<MetadataTokens>,
    userId: string,
): Promise<Array<{ id: string; name: string }>> {
    const metadataTokensQuery = metadataTokensCol.where("owner", "==", userId);

    let querySnapshot: QuerySnapshot<MetadataTokens>;
    try {
        querySnapshot = await metadataTokensQuery.get();
    } catch (e) {
        throw new TRPCError({
            message: `Error getting tokens metadata from firestore: ${e}`,
            code: "INTERNAL_SERVER_ERROR",
        });
    }

    return querySnapshot.docs.map((doc) => {
        return { id: doc.id, name: doc.data().name };
    });
}

/**
 * getTokenIdMetadata returns a tokens's metadata by its id. Returns an empty object if there is not entry for this id
 * @param metadataTokens the MetadataTokens object to search in
 * @param tokenId the id of the token to search
 * @returns the metadata of the given token if it exists, or an empty object
 * TODO: consider getting the metadata without getting the full MetadataTokens object
 */
export function getTokenIdMetadata(metadataTokens: MetadataTokens, tokenId: string): Record<string, any> {
    const { tokenMap } = metadataTokens;

    const entry = tokenMap[tokenId];
    if (!entry) {
        return {};
    }

    return entry;
}

/**
 * getTokenIdMetadataJsonPath returns the first match within a tokens's metadata with the given JSON path.
 * @param metadataTokens the MetadataTokens object to search in
 * @param tokenId the id of the token to search
 * @param jsonPath the JSON path of the data to return
 * @returns the first match of the JSON path of the token's metadata
 */
export function getTokenIdMetadataJsonPath(metadataTokens: MetadataTokens, tokenId: string, jsonPath: string): any {
    const entry = getTokenIdMetadata(metadataTokens, tokenId);

    if (isEmpty(entry)) {
        // Don't bother if the object is empty
        return entry;
    }

    if (jsonPath === "") {
        // Return the entrie object if no path is specified
        return entry;
    }

    try {
        return jp.value(entry, jsonPath);
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.startsWith("Lexical error")) {
                throw new TRPCError({ message: "Lexical error in JSON path", code: "BAD_REQUEST" });
            }
        }

        throw new TRPCError({ message: `Error parsing JSON path: ${e}`, code: "INTERNAL_SERVER_ERROR" });
    }
}

/**
 * updateTokenIdMetadata update the metadata of a token by its id, and returns the token's updated metadata.
 * If patch is set to true, the token's metadata will be merged with the token's existing metadata
 * TODO: handle changes if using ipfs
 * @param metadataTokensSnapshot the DocumentSnapshot of the MetadataTokens to update
 * @param userId the id of the user trying to update the token metadata. Used to check if the user is allowed to modify the given MetadataTokens
 * @param tokenId the id of the token to update
 * @param patch if true, merges the `tokenMetadata` with the token's existing metadata. Else, overwrites the existing metadatah
 * @param token
 */
export async function updateTokenIdMetadata(
    metadataTokensSnapshot: DocumentSnapshot<MetadataTokens>,
    userId: string,
    tokenId: string,
    patch: boolean,
    tokenMetadata: Record<string, any>,
): Promise<Record<string, any>> {
    if (!metadataTokensSnapshot.exists) {
        throw metadataNotFoundError;
    }

    const metadataTokensOwner = metadataTokensSnapshot.data()!.owner;
    if (metadataTokensOwner != userId) {
        throw new TRPCError({
            message: "Can't update a token metadata that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    let updatedTokenMetadata = tokenMetadata;
    if (patch) {
        // Merge token metadata with the values from `tokenMetadata`
        const metadataTokens = metadataTokensSnapshot.data()!;
        const tokenIdMetadata = getTokenIdMetadata(metadataTokens, tokenId);

        // Note: if both have the same key, the value from `tokenIdMetadata` will be kept
        updatedTokenMetadata = Object.assign(tokenIdMetadata, tokenMetadata);
    }

    const tokenMapKey = `tokenMap.${tokenId}`;
    const updateObject = {
        [tokenMapKey]: updatedTokenMetadata,
    };

    const docRef = metadataTokensSnapshot.ref;
    try {
        await docRef.update(updateObject);
    } catch (e) {
        throw new TRPCError({
            message: `Error updating token metadata from firestore: ${e}`,
            code: "INTERNAL_SERVER_ERROR",
        });
    }

    return tokenMetadata;
}

/**
 * uploadAndSetTokenIdImage uploads the image for a given token id, sets `public_url` in the token metadata to the uploaded image's url, and returns the updated metadata of the token.
 * If patch is set to true, the token's metadata will be merged with the token's existing metadata
 * @param metadataTokensSnapshot the DocumentSnapshot of the MetadataTokens to update
 * @param bucket the Google Cloud storage bucket where the image will be uploaded
 * @param userId the id of the user trying to update the token metadata. Used to check if the user is allowed to modify the given MetadataTokens
 * @param tokenId the id of the token to update
 * @param patch if true, merges the `image_url` with the token's existing metadata. Else, overwrites the existing metadata
 * @param imageContent the content of the image to upload, encoded in base64
 * @param imageSuffix the file extension of the image (eg. "jpg"). Important for the image to be read properly once uploaded
 * @returns the updated token s metadata, and the URL of the uploaded image
 */
export async function uploadAndSetTokenIdImage(
    metadataTokensSnapshot: DocumentSnapshot<MetadataTokens>,
    bucket: Bucket,
    userId: string,
    tokenId: string,
    patch: boolean,
    imageContent: string,
    imageSuffix: string,
): Promise<{ tokenMetadata: Record<string, any>; imageUrl: string }> {
    if (!metadataTokensSnapshot.exists) {
        throw metadataNotFoundError;
    }

    const metadataTokensOwner = metadataTokensSnapshot.data()!.owner;
    if (metadataTokensOwner != userId) {
        throw new TRPCError({
            message: "Can't update a token metadata that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    const { publicUrl } = await uploadFile(bucket, imageContent, imageSuffix, userId);

    const publicUrlMetadata = { public_url: publicUrl };
    const tokenMetadata = await updateTokenIdMetadata(
        metadataTokensSnapshot,
        userId,
        tokenId,
        patch,
        publicUrlMetadata,
    );

    return { tokenMetadata, imageUrl: publicUrl };
}
