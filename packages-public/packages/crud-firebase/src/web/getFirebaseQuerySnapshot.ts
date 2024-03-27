/***** Generics for Firebase Web CRUD *****/
import {
    DocumentData,
    Query,
    QueryDocumentSnapshot,
    QuerySnapshot,
    getCountFromServer,
    getDocs,
} from "firebase/firestore";
import { getWhereQuery } from "./getWhereQuery.js";
import { ResourceQueryOptions } from "../resource.js";

/**
 * Firebase Query Snapshot. To be used with Collection or CollectionGroup (or any Query).
 * Only read queries are supported (no write or id-based access) and return the snapshot.
 * - getAll, getWhere, getWhereCount, getWhereFirst
 * @template ResourceData Resource data
 * @template Resource Resource data + additional data derived from `doc.id` and/or `doc.parent.path`
 * @param col Firestore Collection Reference or CollectionGroup (technically any query will do)
 * @param validateDataPartial Validate query data.
 * @param decodeRefSnapshot Decode document ref
 * @returns wrapper functions for access Firebase
 */
export function getFirebaseQuerySnapshot<
    ResourceData extends Record<string, any>,
    Resource extends ResourceData = ResourceData,
>(
    col: Query<ResourceData>,
    validateDataPartial: (data: Partial<ResourceData>) => Partial<ResourceData>,
    decodeRefSnapshot: (refSnapshot: QueryDocumentSnapshot<ResourceData>) => Resource,
) {
    /**
     * Get all docs
     * @returns docs
     */
    const getAllSnapshot = async (options?: ResourceQueryOptions): Promise<QuerySnapshot<ResourceData>> => {
        const query = getWhereQuery(col, undefined, options);
        return getDocs(query);
    };

    const getAll = async (options?: ResourceQueryOptions): Promise<Resource[]> => {
        return (await getAllSnapshot(options)).docs.map(decodeRefSnapshot);
    };

    /**
     * Returns filter query that can be used to get items, count the query or compose with additional queries.
     * @param filter, will try to match the key-value pairs of this object as `where(key, "==", value)` queries.
     *      For nested keys, this gets reformated as `where(key.subkey, "==", value)` similar as to the update function
     * @param options limit, orderBy, order
     * @returns firebase query object
     */
    const _getWhereQuery = (
        filter: Partial<ResourceData>,
        options?: ResourceQueryOptions,
    ): Query<ResourceData, DocumentData> => {
        return getWhereQuery(col, validateDataPartial(filter), options);
    };

    /**
     * Get docs that match filter
     * @param filter, will try to match the key-value pairs of this object as `where(key, "==", value)` queries.
     *      For nested keys, this gets reformated as `where(key.subkey, "==", value)` similar as to the update function
     * @param options limit, orderBy, order
     * @returns docs
     */
    const getWhereSnapshot = async (
        filter: Partial<ResourceData>,
        options?: ResourceQueryOptions,
    ): Promise<QuerySnapshot<ResourceData>> => {
        return getDocs(_getWhereQuery(filter, options));
    };

    const getWhere = async (filter: Partial<ResourceData>, options?: ResourceQueryOptions): Promise<Resource[]> => {
        return (await getWhereSnapshot(filter, options)).docs.map(decodeRefSnapshot);
    };

    const getWhereFirst = async (
        filter: Partial<ResourceData>,
        options?: Omit<ResourceQueryOptions, "limit">,
    ): Promise<Resource | null> => {
        const results = await getWhere(filter, { ...options, limit: 1 });
        return results[0] ?? null;
    };

    /**
     * Get docs that match filter count
     * @param filter
     * @param options limit, orderBy, order
     * @returns docs
     */
    const getWhereCount = async (filter: Partial<ResourceData>, options?: ResourceQueryOptions): Promise<number> => {
        const querySnapshot = await getCountFromServer(_getWhereQuery(filter, options));
        return querySnapshot.data().count;
    };

    return {
        getAllSnapshot,
        getAll,
        _getWhereQuery,
        getWhereSnapshot,
        getWhere,
        getWhereFirst,
        getWhereCount,
    };
}
