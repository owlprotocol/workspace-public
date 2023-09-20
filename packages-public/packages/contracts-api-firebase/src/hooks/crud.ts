/***** Generics for Firebase Web CRUD *****/
import { CollectionReference, DocumentData, DocumentSnapshot, QuerySnapshot, limit, orderBy } from "firebase/firestore";
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

export interface QueryOptions {
    limit?: number;
    orderBy?: string;
    order?: "asc" | "desc";
}

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
     * @param filter
     * @param options limit, orderBy, order
     * @returns docs
     */
    const useGetWhere = (
        filter: Partial<Omit<T, "id">>,
        options?: QueryOptions,
    ): [T[] | undefined, ObservableStatus<QuerySnapshot<Omit<T, "id">, DocumentData>>] => {
        const queryFilterConstraints: QueryConstraint[] = Object.entries(filter).map(([key, value]) => {
            return where(key, "==", value);
        });
        if (options?.orderBy) {
            queryFilterConstraints.push(orderBy(options.orderBy, options.order ?? "asc"));
        }
        if (options?.limit) {
            queryFilterConstraints.push(limit(options.limit));
        }

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

    /**
     * Get docs that match filter
     * @param filter
     * @param options limit, orderBy, order
     * @returns docs
     */
    const useGetWhereFirst = (
        filter: Partial<Omit<T, "id">>,
        options?: Omit<QueryOptions, "limit">,
    ): [T | undefined, ObservableStatus<QuerySnapshot<Omit<T, "id">, DocumentData>>] => {
        const [data, result] = useGetWhere(filter, { ...options, limit: 1 });

        return [data ? data[0] : undefined, result];
    };

    return {
        useGet,
        useGetAll,
        useGetWhere,
        useGetWhereFirst,
    };
}

export const usersHooks = getFirebaseHooks<User>(usersCol);
export const projectTemplatesHooks = getFirebaseHooks<ProjectTemplate>(projectTemplatesCol);
export const requestTemplatesHooks = getFirebaseHooks<RequestTemplate>(requestTemplatesCol);
export const contractsHooks = getFirebaseHooks<Contract>(contractsCol);
export const projectsHooks = getFirebaseHooks<Project>(projectsCol);
export const metadataContractsHooks = getFirebaseHooks<MetadataContract>(metadataContractsCol);
export const metadataTokensHooks = getFirebaseHooks<MetadataTokens>(metadataTokensCol);
