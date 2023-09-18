/***** Generics for Firebase Admin CRUD *****/
import { UpdateData, CollectionReference, Query, DocumentReference } from "firebase-admin/firestore";
import { zip, omit } from "lodash-es";
import * as crypto from "crypto";
import {
    contractsCol,
    firestore,
    metadataContractsCol,
    metadataTokensCol,
    projectTemplatesCol,
    projectsCol,
    requestTemplatesCol,
    usersCol,
} from "./config.js";
import { Contract } from "../models/Contract.js";
import { User } from "../models/User.js";
import { Project } from "../models/Project.js";
import { ProjectTemplate } from "../models/ProjectTemplate.js";
import { RequestTemplate } from "../models/RequestTemplate.js";
import { MetadataContract } from "../models/MetadataContract.js";
import { MetadataTokens } from "../models/MetadataTokens.js";

/**
 * Firebase CRUD Wrappers. create, get, getAll, update, rdelete, deleteAll
 * @template T Generic type for collection data (inlcudes id but this is implicit in Firebase database as path)
 * @param collection
 * @returns
 */
export function getFirebaseCRUD<T extends Record<string, any> & { id: string }>(
    collection: CollectionReference<Omit<T, "id">>,
) {
    const getDocRef = (id: string): DocumentReference<Omit<T, "id">> => {
        return collection.doc(id);
    };

    /**
     * Set doc, returns id
     * @param item (id optional)
     * @returns id (parameter or default autogenerated with crypto.randomUUID())
     */
    const set = async (item: Omit<T, "id"> & { id?: string }): Promise<string> => {
        const idDefined = item.id ?? crypto.randomUUID();
        const ref = collection.doc(idDefined);
        await ref.set(omit(item, "id") as Omit<T, "id">);
        return idDefined;
    };

    /**
     * Set docs as a transaction (max 500 writes)
     * @param items (all with ids or none with ids)
     * @returns ids (parameter or default autogenerated with crypto.randomUUID())
     */
    const setBatch = async (items: (T | (Omit<T, "id"> & { id?: string }))[], ids?: string[]): Promise<string[]> => {
        const idsDefined = ids ?? items.map((item) => item.id ?? crypto.randomUUID());
        await firestore.runTransaction(async (transaction) => {
            const operations = zip(items, idsDefined).map(([item, id]) => {
                const ref = collection.doc(id!);
                return transaction.set(ref, omit(item, "id") as Omit<T, "id">);
            });

            await Promise.all(operations);
        });

        return idsDefined;
    };

    /**
     * Update existing doc
     * @param item
     * @returns
     */
    const update = async (item: T): Promise<void> => {
        const ref = collection.doc(item.id);
        await ref.update(ref, omit(item, "id") as Omit<T, "id">);
    };

    /**
     * Update existing docs as a transaction (max 500 writes)
     * @param items
     * @returns
     */
    const updateBatch = async (items: T[]): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const operations = items.map((item) => {
                const ref = collection.doc(item.id);
                return transaction.update(ref, omit(item, "id") as UpdateData<Omit<T, "id">>);
            });

            await Promise.all(operations);
        });
    };

    /**
     * Get doc by id
     * @param id
     * @returns doc by id
     */
    const get = async (id: string): Promise<T> => {
        const ref = collection.doc(id);
        const refSnapshot = await ref.get();

        if (!refSnapshot.exists) {
            throw new Error(`${collection.path}${id} not found`);
        }

        return { ...refSnapshot.data(), id: ref.id } as T;
    };

    /**
     * Get docs by id
     * @param ids
     * @returns docs by id
     * //TODO: Is this the fastest way? https://stackoverflow.com/questions/59572943/is-there-a-way-to-batch-read-firebase-documents
     */
    const getBatch = async (ids: string[]): Promise<(T | undefined)[]> => {
        const refSnapshots = await firestore.runTransaction(async (transaction) => {
            const operations = ids.map((id) => {
                const ref = collection.doc(id);
                return transaction.get(ref);
            });

            return await Promise.all(operations);
        });

        return refSnapshots.map((refSnapshot) => {
            return { ...refSnapshot.data(), id: refSnapshot.id } as T;
        });
    };

    /**
     * Get all docs
     * @returns docs
     */
    const getAll = async (): Promise<T[]> => {
        const snapshot = await collection.get();
        return snapshot.docs.map((refSnapshot) => {
            return { ...refSnapshot.data(), id: refSnapshot.id } as T;
        });
    };

    /**
     * Get docs that match filter
     * @returns docs
     */
    const getWhere = async (filter: Partial<T>): Promise<T[]> => {
        let query: Query | CollectionReference = collection;
        Object.entries(filter).forEach(([key, value]) => {
            if (!query) query = collection.where(key, "==", value);
            else query = query.where(key, "==", value);
        });
        const querySnapshot = await query.get();
        return querySnapshot.docs.map((refSnapshot) => {
            return { ...refSnapshot.data(), id: refSnapshot.id } as T;
        });
    };

    /**
     * Delete doc
     * @param id
     * @returns
     */
    const deleteById = async (id: string): Promise<FirebaseFirestore.WriteResult> => {
        const ref = collection.doc(id);
        return ref.delete();
    };

    /**
     * Delete docs as transaction (max 500 writes)
     */
    const deleteBatch = async (ids: string[]): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const operations = ids.map((id) => {
                const ref = collection.doc(id);
                return transaction.delete(ref);
            });

            await Promise.all(operations);
        });
    };

    /**
     * Delete all docs
     */
    const deleteAll = async (): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const snapshot = await collection.get();
            const operations = snapshot.docs.map((d) => {
                const ref = collection.doc(d.id);
                return transaction.delete(ref);
            });

            await Promise.all(operations);
        });
    };

    return {
        doc: getDocRef,
        set,
        setBatch,
        update,
        updateBatch,
        get,
        getBatch,
        getAll,
        getWhere,
        deleteBatch,
        delete: deleteById,
        deleteAll,
    };
}

export const usersCRUD = getFirebaseCRUD<User>(usersCol);
export const projectTemplatesCRUD = getFirebaseCRUD<ProjectTemplate>(projectTemplatesCol);
export const requestTemplatesCRUD = getFirebaseCRUD<RequestTemplate>(requestTemplatesCol);
export const contractsCRUD = getFirebaseCRUD<Contract>(contractsCol);
export const projectsCRUD = getFirebaseCRUD<Project>(projectsCol);
export const metadataContractsCRUD = getFirebaseCRUD<MetadataContract>(metadataContractsCol);
export const metadataTokensCRUD = getFirebaseCRUD<MetadataTokens>(metadataTokensCol);
