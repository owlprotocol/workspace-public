/***** Generics for Firebase Admin CRUD *****/
import { Query, QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { getWhereQuery } from "./getWhereQuery.js";
import { ResourceQueryOptions } from "../resource.js";

/**
 * Firebase Query Resource. To be used with Collection or CollectionGroup.
 * Only read queries are supported (no write or id-based access).
 * - getAll, getWhere, getWhereCount, getWhereFirst
 * @template ResourceData Resource data
 * @template Resource Resource data + additional data derived from `doc.id` and/or `doc.parent.path`
 * @param col Firestore Collection Reference or CollectionGroup
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
     * Get all docs, no security checks
     * @returns docs
     */
    const getAllSnapshot = async (options?: ResourceQueryOptions): Promise<QuerySnapshot<ResourceData>> => {
        const query = getWhereQuery(col, undefined, options);
        return query.get();
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
    const _getWhereQuery = (filter: Partial<ResourceData>, options?: ResourceQueryOptions): Query<ResourceData> => {
        return getWhereQuery(col, validateDataPartial(filter), options);
    };

    /**
     * Get docs that match filter, no security checks
     * @param filter, will try to match the key-value pairs of this object as `where(key, "==", value)` queries.
     *      For nested keys, this gets reformated as `where(key.subkey, "==", value)` similar as to the update function
     * @param options limit, orderBy, order
     * @returns docs
     */
    const getWhereSnapshot = async (
        filter: Partial<ResourceData>,
        options?: ResourceQueryOptions,
    ): Promise<QuerySnapshot<ResourceData>> => {
        return _getWhereQuery(validateDataPartial(filter), options).get();
    };

    const getWhere = async (filter: Partial<ResourceData>, options?: ResourceQueryOptions): Promise<Resource[]> => {
        return (await getWhereSnapshot(filter, options)).docs.map(decodeRefSnapshot);
    };

    const getWhereFirst = async (
        filter: Partial<ResourceData>,
        options?: Omit<ResourceQueryOptions, "limit">,
    ): Promise<Resource | undefined> => {
        const results = await getWhere(filter, { ...options, limit: 1 });
        return results[0];
    };

    /**
     * Get docs that match filter count, no security checks
     * @param filter
     * @param options limit, orderBy, order
     * @returns docs
     */
    const getWhereCount = async (filter: Partial<ResourceData>, options?: ResourceQueryOptions): Promise<number> => {
        const querySnapshot = await _getWhereQuery(filter, options).count().get();
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
