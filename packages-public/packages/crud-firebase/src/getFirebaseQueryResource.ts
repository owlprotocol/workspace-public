/***** Generics for Firebase Admin CRUD *****/
import type { FirebaseQueryResource, ResourceDataValidators, ResourceQueryOptions } from "./resource.js";
import type { getWhereQueryFn } from "./getWhereQuery.js";
import type { Query, QuerySnapshot, countType, getDocsType } from "./query.js";
import type { DocumentData, FirestoreSDK, QueryDocumentSnapshot } from "./document.js";
import { getDecodeRefSnapshot, type DecodeRef } from "./getDecodeRefSnapshot.js";

export type getFirebaseQueryResourceFn<SDK extends FirestoreSDK> = <
    ResourceData extends DocumentData = DocumentData,
    ResourceId extends Record<string, any> = Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
    Q extends Query<SDK, ResourceData> = Query<SDK, ResourceData>,
>(
    col: Q,
    validators: DecodeRef<Required<ResourceId>, CollectionId> &
        Pick<ResourceDataValidators<ResourceData>, "validateDataPartial">,
) => FirebaseQueryResource<SDK, ResourceData, ResourceId, CollectionId & Required<ResourceId> & ResourceData>;

/**
 * Factory function for generating Firebase Query Resource.
 * @template SDK Firestore sdk type ("admin" or "web")
 * @param sdk generic sdk functions
 */
export function getFirebaseQueryResourceForSdk<SDK extends FirestoreSDK = FirestoreSDK>(sdk: {
    getWhereQuery: getWhereQueryFn<SDK>;
    getDocs: getDocsType<SDK>;
    count: countType<SDK>;
}): getFirebaseQueryResourceFn<SDK> {
    return function getFirebaseQueryResource<
        ResourceData extends DocumentData,
        ResourceId extends Record<string, any>,
        CollectionId extends Record<string, any> = Record<string, never>,
        Q extends Query<SDK, ResourceData> = Query<SDK, ResourceData>,
    >(
        col: Q,
        validators: DecodeRef<Required<ResourceId>, CollectionId> &
            Pick<ResourceDataValidators<ResourceData>, "validateDataPartial">,
    ) {
        const { getWhereQuery, getDocs, count } = sdk as unknown as {
            getWhereQuery: getWhereQueryFn<SDK, ResourceData, Q>;
            getDocs: getDocsType<SDK, ResourceData, Q>;
            count: countType<SDK, ResourceData, Q>;
        };

        type Resource = CollectionId & Required<ResourceId> & ResourceData;
        type QSnapshot = QuerySnapshot<SDK, ResourceData>;
        type QDocumentSnapshot = QueryDocumentSnapshot<SDK, ResourceData>;

        const validateDataPartial = validators.validateDataPartial;
        const decodeRefSnapshot = getDecodeRefSnapshot<ResourceData, Required<ResourceId>, CollectionId>(validators);

        /**
         * Get all docs, no security checks
         * @returns docs
         */
        const getAllSnapshot = async (options?: ResourceQueryOptions): Promise<QSnapshot> => {
            const query = getWhereQuery(col, undefined, options);
            return getDocs(query);
        };

        const getAll = async (options?: ResourceQueryOptions): Promise<Resource[]> => {
            const docs = (await getAllSnapshot(options)).docs as QDocumentSnapshot[];
            return docs.map(decodeRefSnapshot);
        };

        /**
         * Returns filter query that can be used to get items, count the query or compose with additional queries.
         * @param filter, will try to match the key-value pairs of this object as `where(key, "==", value)` queries.
         *      For nested keys, this gets reformated as `where(key.subkey, "==", value)` similar as to the update function
         * @param options limit, orderBy, order
         * @returns firebase query object
         */
        const _getWhereQuery = (filter: Partial<ResourceData>, options?: ResourceQueryOptions): Q => {
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
        ): Promise<QSnapshot> => {
            return getDocs(_getWhereQuery(filter, options));
        };

        const getWhere = async (filter: Partial<ResourceData>, options?: ResourceQueryOptions): Promise<Resource[]> => {
            const docs = (await getWhereSnapshot(filter, options)).docs as QDocumentSnapshot[];
            return docs.map(decodeRefSnapshot);
        };

        const getWhereFirst = async (
            filter: Partial<ResourceData>,
            options?: Omit<ResourceQueryOptions, "limit">,
        ): Promise<Resource | null> => {
            const results = await getWhere(filter, { ...options, limit: 1 });
            return results[0] ?? null;
        };

        /**
         * Get docs that match filter count, no security checks
         * @param filter
         * @param options limit, orderBy, order
         * @returns docs
         */
        const getWhereCount = async (
            filter: Partial<ResourceData>,
            options?: ResourceQueryOptions,
        ): Promise<number> => {
            const querySnapshot = await count(_getWhereQuery(filter, options));
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
            validateDataPartial,
        };
    };
}
