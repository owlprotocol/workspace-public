/***** Generics for Firebase Web CRUD *****/
import { CollectionReference, DocumentData, DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { doc, query, where, QueryConstraint } from "firebase/firestore";
import { useFirestoreCollection, useFirestoreDoc, ObservableStatus } from "reactfire";
import {
    contractsCol,
    metadataContractsCol,
    metadataTokensCol,
    projectTemplatesCol,
    projectsCol,
    requestTemplatesCol,
    usersCol,
} from "../web/config.js";
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
export function getFirebaseHooks<T extends Record<string, any> & { id: string }>(
    collection: CollectionReference<Omit<T, "id">>,
) {
    /**
     * Get doc by id
     * @param id
     * @returns doc by id
     */
    const useGet = (
        id: string | undefined,
    ): [T | undefined, ObservableStatus<DocumentSnapshot<Omit<T, "id">, DocumentData>>] => {
        //undefined | "" path breaks, we set it to empty
        const result = useFirestoreDoc(doc(collection, id ?? "empty"));
        const refSnapshot = result.data;
        const data = (refSnapshot ? { ...refSnapshot.data(), id } : undefined) as T | undefined;

        return [data, result];
    };

    /**
     * Get all docs
     * @returns docs
     */
    const useGetAll = (): [T[] | undefined, ObservableStatus<QuerySnapshot<Omit<T, "id">, DocumentData>>] => {
        const result = useFirestoreCollection(collection);
        const snapshot = result.data;
        const data = (
            snapshot
                ? snapshot.docs.map((d) => {
                      return { ...d.data(), id: d.id };
                  })
                : undefined
        ) as T[] | undefined;

        return [data, result];
    };

    /**
     * Get docs that match filter
     * @returns docs
     */
    const useGetWhere = (
        filter: Partial<Omit<T, "id">>,
    ): [T[] | undefined, ObservableStatus<QuerySnapshot<Omit<T, "id">, DocumentData>>] => {
        const queryFilterConstraints: QueryConstraint[] = Object.entries(filter).map(([key, value]) => {
            return where(key, "==", value);
        });

        const result = useFirestoreCollection(query(collection, ...queryFilterConstraints));
        const snapshot = result.data;
        const data = (
            snapshot
                ? snapshot.docs.map((d) => {
                      return { ...d.data(), id: d.id };
                  })
                : undefined
        ) as T[] | undefined;

        return [data, result] as [T[] | undefined, typeof result];
    };

    return {
        useGet,
        useGetAll,
        useGetWhere,
    };
}

export const usersHooks = getFirebaseHooks<User>(usersCol);
export const projectTemplatesHooks = getFirebaseHooks<ProjectTemplate>(projectTemplatesCol);
export const requestTemplatesHooks = getFirebaseHooks<RequestTemplate>(requestTemplatesCol);
export const contractsHooks = getFirebaseHooks<Contract>(contractsCol);
export const projectsHooks = getFirebaseHooks<Project>(projectsCol);
export const metadataContractsHooks = getFirebaseHooks<MetadataContract>(metadataContractsCol);
export const metadataTokensHooks = getFirebaseHooks<MetadataTokens>(metadataTokensCol);
