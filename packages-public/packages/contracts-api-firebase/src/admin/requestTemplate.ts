import { TRPCError } from "@trpc/server";
import { CollectionReference } from "firebase-admin/firestore";
import { OnlineTrait } from "../models/OnlineTraits.js";
import { RequestTemplate } from "../models/RequestTemplate.js";

export async function getRequestTemplate(
    requestTemplatesCol: CollectionReference<RequestTemplate>,
    id: string,
): Promise<RequestTemplate> {
    const requestTemplateRef = requestTemplatesCol.doc(id);
    try {
        const requestTemplateSnapshot = await requestTemplateRef.get();

        if (!requestTemplateSnapshot.exists) {
            throw new TRPCError({
                message: "Request template not found",
                code: "NOT_FOUND",
            });
        }

        return requestTemplateSnapshot.data()!;
    } catch (e) {
        console.error("Error getting request template in firestore: ", e);
        throw e;
    }
}

export async function getRequestTemplatesByOwner(
    requestTemplatesCol: CollectionReference<RequestTemplate>,
    owner: string,
): Promise<RequestTemplate[]> {
    const requestTemplatesQuery = requestTemplatesCol.where("owner", "==", owner);

    const querySnapshot = await requestTemplatesQuery.get();
    //Add the id to the RequestTemplate, in case it is absent
    return querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
}

export async function createRequestTemplate(
    requestTemplatesCol: CollectionReference<RequestTemplate>,
    owner: string,
    onlineTraits: [OnlineTrait],
): Promise<string> {
    const requestTemplate: RequestTemplate = {
        id: crypto.randomUUID(),
        owner,
        onlineTraits,
    };

    try {
        const requestTemplateRef = await requestTemplatesCol.add(requestTemplate);
        return requestTemplateRef.id;
    } catch (e) {
        console.error("Error adding request template in firestore: ", e);
        throw e;
    }
}

export async function updateRequestTemplate(
    requestTemplatesCol: CollectionReference<RequestTemplate>,
    userId: string,
    requestTemplateId: string,
    onlineTraits: [OnlineTrait],
) {
    const docRef = requestTemplatesCol.doc(requestTemplateId);
    const requestTemplateSnapshot = await docRef.get();

    if (!requestTemplateSnapshot.exists) {
        throw new TRPCError({
            message: "Request template not found",
            code: "NOT_FOUND",
        });
    }

    const requestTemplate = requestTemplateSnapshot.data()!;

    const requestTemplateOwner = requestTemplate.owner;
    if (requestTemplateOwner != userId) {
        throw new TRPCError({
            message: "Can't update a request template that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    requestTemplate.onlineTraits = onlineTraits;

    try {
        await docRef.set(requestTemplate);
    } catch (e) {
        console.error("Error updating request template in firestore: ", e);
        throw e;
    }
}

export async function deleteRequestTemplate(
    requestTemplatesCol: CollectionReference<RequestTemplate>,
    userId: string,
    requestTemplateId: string,
) {
    const docRef = requestTemplatesCol.doc(requestTemplateId);
    const requestTemplateSnapshot = await docRef.get();

    if (!requestTemplateSnapshot.exists) {
        throw new TRPCError({
            message: "Request template not found",
            code: "NOT_FOUND",
        });
    }

    const requestTemplateOwner = requestTemplateSnapshot.data()!.owner;
    if (requestTemplateOwner != userId) {
        throw new TRPCError({
            message: "Can't delete a request template that you don't own",
            code: "UNAUTHORIZED",
        });
    }

    try {
        await docRef.delete();
    } catch (e) {
        console.error("Error deleting request template in firestore: ", e);
        throw e;
    }
}
