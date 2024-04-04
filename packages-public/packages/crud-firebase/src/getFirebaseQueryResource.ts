/***** Generics for Firebase Admin CRUD *****/
import type { AsEmptyRecord, Prettify, TypeEqual } from "@owlprotocol/utils/types";
import type { FirebaseQueryResource, ResourceDataValidators, ResourceQueryOptions } from "./resource.js";
import type { getWhereQueryFn } from "./getWhereQuery.js";
import type { Query, QuerySnapshot, countType, getDocsType } from "./query.js";
import type { DocumentData, FirestoreSDK, QueryDocumentSnapshot } from "./document.js";
import { getDecodeRefSnapshot } from "./getDecodeRefSnapshot.js";

export type getFirebaseQueryResourceFn<SDK extends FirestoreSDK> = <
    ResourceData extends DocumentData = DocumentData,
    ResourceId extends Record<string, any> = Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
    ResourceDataInput extends DocumentData = ResourceData,
    ResourceDataEncoded extends DocumentData = ResourceData,
    QueryFn extends TypeEqual<CollectionId, Record<string, never>> extends true
        ? Query<SDK, ResourceDataEncoded> //undefined CollectionId, Query MUST be defined
        :
              | Query<SDK, ResourceDataEncoded> //defined CollectionId, for group queries, for group queries Query MAY be defined, despite CollectionId defined, therefore union with QueryFactory
              | ((collectionId: CollectionId) => Query<SDK, ResourceDataEncoded>) = TypeEqual<
        CollectionId,
        Record<string, never>
    > extends true
        ? Query<SDK, ResourceDataEncoded> //Default type, undefined CollectionId, Query MUST be defined
        : (collectionId: CollectionId) => Query<SDK, ResourceDataEncoded>, //Default type, defined CollectionId, QueryFactory
    ResourceFilter extends TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
        ? Partial<ResourceDataInput> //defined Query, filter by ResourceDataInput
        : //defined QueryFactory, for group queries, CollectionId MAY be omitted, so we use Partial<CollectionId>
          Prettify<Partial<AsEmptyRecord<CollectionId>> & Partial<ResourceDataInput>> = TypeEqual<
        QueryFn,
        Query<SDK, ResourceDataEncoded>
    > extends true
        ? Partial<ResourceDataInput> //Default type, defined Query, filter by ResourceDataInput
        : Prettify<AsEmptyRecord<CollectionId> & Partial<ResourceDataInput>>, //Default type, defined QueryFactory, filter by CollectionId & ResourceDataInput
    Resource extends Prettify<AsEmptyRecord<CollectionId> & ResourceId & ResourceData> = Prettify<
        AsEmptyRecord<CollectionId> & ResourceId & ResourceData
    >,
>(
    query: QueryFn,
    validators: Omit<
        ResourceDataValidators<ResourceData, ResourceId, CollectionId, ResourceDataInput, ResourceDataEncoded>,
        "encodeId" | "encodeData"
    >,
) => FirebaseQueryResource<
    SDK,
    ResourceData,
    ResourceId,
    CollectionId,
    ResourceDataInput,
    ResourceDataEncoded,
    QueryFn,
    ResourceFilter,
    Resource
>;

/**
 * Factory function for generating Firebase Query Resource.
 * @template SDK Firestore sdk type ("admin" or "web")
 * @param sdk generic sdk functions
 * @returns getFirebaseQueryResource function that works with relevant sdk
 */
export function getFirebaseQueryResourceForSdk<SDK extends FirestoreSDK = FirestoreSDK>(sdk: {
    getWhereQuery: getWhereQueryFn<SDK>;
    getDocs: getDocsType<SDK>;
    count: countType<SDK>;
}) {
    return function getFirebaseQueryResource<
        ResourceData extends DocumentData = DocumentData,
        ResourceId extends Record<string, any> = Record<string, any>,
        CollectionId extends Record<string, any> = Record<string, never>,
        ResourceDataInput extends DocumentData = ResourceData,
        ResourceDataEncoded extends DocumentData = ResourceData,
        QueryFn extends TypeEqual<CollectionId, Record<string, never>> extends true
            ? Query<SDK, ResourceDataEncoded> //undefined CollectionId, Query MUST be defined
            :
                  | Query<SDK, ResourceDataEncoded> //defined CollectionId, for group queries, for group queries Query MAY be defined, despite CollectionId defined, therefore union with QueryFactory
                  | ((collectionId: CollectionId) => Query<SDK, ResourceDataEncoded>) = TypeEqual<
            CollectionId,
            Record<string, never>
        > extends true
            ? Query<SDK, ResourceDataEncoded> //Default type, undefined CollectionId, Query MUST be defined
            : (collectionId: CollectionId) => Query<SDK, ResourceDataEncoded>, //Default type, defined CollectionId, QueryFactory
        ResourceFilter extends TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
            ? Partial<ResourceDataInput> //defined Query, filter by ResourceDataInput
            : //defined QueryFactory, for group queries, CollectionId MAY be omitted, so we use Partial<CollectionId>
              Prettify<Partial<AsEmptyRecord<CollectionId>> & Partial<ResourceDataInput>> = TypeEqual<
            QueryFn,
            Query<SDK, ResourceDataEncoded>
        > extends true
            ? Partial<ResourceDataInput> //Default type, defined Query, filter by ResourceDataInput
            : Prettify<AsEmptyRecord<CollectionId> & Partial<ResourceDataInput>>, //Default type, defined QueryFactory, filter by CollectionId & ResourceDataInput
        Resource extends Prettify<AsEmptyRecord<CollectionId> & ResourceId & ResourceData> = Prettify<
            AsEmptyRecord<CollectionId> & ResourceId & ResourceData
        >,
    >(
        query: QueryFn,
        validators: Omit<
            ResourceDataValidators<ResourceData, ResourceId, CollectionId, ResourceDataInput, ResourceDataEncoded>,
            "encodeId" | "encodeData"
        >,
    ): FirebaseQueryResource<
        SDK,
        ResourceData,
        ResourceId,
        CollectionId,
        ResourceDataInput,
        ResourceDataEncoded,
        QueryFn,
        ResourceFilter,
        Resource
    > {
        type Q = Query<SDK, ResourceDataEncoded>;
        type QSnapshot = QuerySnapshot<SDK, ResourceDataEncoded>;
        type QDocumentSnapshot = QueryDocumentSnapshot<SDK, ResourceDataEncoded>;

        const { getWhereQuery, getDocs, count } = sdk as unknown as {
            getWhereQuery: getWhereQueryFn<SDK, ResourceDataEncoded, Q>;
            getDocs: getDocsType<SDK, ResourceDataEncoded, Q>;
            count: countType<SDK, ResourceDataEncoded, Q>;
        };

        const encodeDataPartial =
            validators.encodeDataPartial ??
            ((data: Partial<ResourceDataInput>) => data as Partial<ResourceDataEncoded>);

        const decodeId = validators.decodeId;
        const decodeData = validators.decodeData ?? ((data: ResourceDataEncoded) => data as unknown as ResourceData);
        const decodeParentDocId = validators.decodeParentDocId;

        const decodeRefSnapshot = getDecodeRefSnapshot<
            ResourceData,
            ResourceId,
            CollectionId,
            ResourceDataEncoded,
            Resource
        >({
            decodeId,
            decodeData,
            decodeParentDocId,
        });

        const queryRef = typeof query === "function" ? undefined : (query as Query<SDK, ResourceDataEncoded>);

        function getQuery(): Q;
        function getQuery(collectionId: CollectionId): Q;
        function getQuery(collectionId?: CollectionId): Q {
            if (queryRef) {
                return queryRef;
            } else if (typeof query === "function") {
                if (!collectionId) {
                    throw new Error("query is function but collectionId undefined");
                }
                return query(collectionId);
            } else {
                throw new Error("query undefined");
            }
        }

        /**
         * Decode polymorphic parameters
         */
        function getCollectionIdQueryOptions(
            collectionIdOrOptions?: CollectionId | ResourceQueryOptions,
            optionsOrNoParam?: ResourceQueryOptions,
        ): { collectionId: CollectionId | undefined; options: ResourceQueryOptions | undefined } {
            if (queryRef) {
                return {
                    collectionId: undefined,
                    options: collectionIdOrOptions as ResourceQueryOptions | undefined,
                };
            } else {
                return {
                    collectionId: collectionIdOrOptions as CollectionId,
                    options: optionsOrNoParam,
                };
            }
        }

        /**
         * Get all docs, no security checks
         * @returns docs
         */
        async function getAllSnapshot(collectionId: CollectionId, options?: ResourceQueryOptions): Promise<QSnapshot>;
        async function getAllSnapshot(options?: ResourceQueryOptions): Promise<QSnapshot>;
        async function getAllSnapshot(
            collectionIdOrOptions?: CollectionId | ResourceQueryOptions,
            optionsOrNoParam?: ResourceQueryOptions,
        ): Promise<QSnapshot> {
            const { collectionId, options } = getCollectionIdQueryOptions(collectionIdOrOptions, optionsOrNoParam);
            const query = getWhereQuery(getQuery(collectionId!), undefined, options);
            return getDocs(query);
        }

        async function getAll(collectionId: CollectionId, options?: ResourceQueryOptions): Promise<Resource[]>;
        async function getAll(options?: ResourceQueryOptions): Promise<Resource[]>;
        async function getAll(
            collectionIdOrOptions?: CollectionId | ResourceQueryOptions,
            optionsOrNoParam?: ResourceQueryOptions,
        ): Promise<Resource[]> {
            //Overload errors
            //@ts-expect-error
            const docs = (await getAllSnapshot(collectionIdOrOptions, optionsOrNoParam)).docs as QDocumentSnapshot[];
            return docs.map(decodeRefSnapshot);
        }

        /**
         * Returns filter query that can be used to get items, count the query or compose with additional queries.
         * @param filter, will try to match the key-value pairs of this object as `where(key, "==", value)` queries.
         *      For nested keys, this gets reformated as `where(key.subkey, "==", value)` similar as to the update function
         * @param options limit, orderBy, order
         * @returns firebase query object
         */
        function _getWhereQuery(filter: ResourceFilter, options?: ResourceQueryOptions): Q {
            //@ts-expect-error
            return getWhereQuery(getQuery(filter), encodeDataPartial(filter), options);
        }

        /**
         * Get docs that match filter, no security checks
         * @param filter, will try to match the key-value pairs of this object as `where(key, "==", value)` queries.
         *      For nested keys, this gets reformated as `where(key.subkey, "==", value)` similar as to the update function
         * @param options limit, orderBy, order
         * @returns docs
         */
        async function getWhereSnapshot(filter: ResourceFilter, options?: ResourceQueryOptions): Promise<QSnapshot> {
            return getDocs(_getWhereQuery(filter, options));
        }

        async function getWhere(filter: ResourceFilter, options?: ResourceQueryOptions): Promise<Resource[]> {
            const docs = (await getWhereSnapshot(filter, options)).docs as QDocumentSnapshot[];
            return docs.map(decodeRefSnapshot);
        }

        async function getWhereFirst(
            filter: ResourceFilter,
            options?: Omit<ResourceQueryOptions, "limit">,
        ): Promise<Resource | null> {
            const results = await getWhere(filter, { ...options, limit: 1 });
            return results[0] ?? null;
        }

        /**
         * Get docs that match filter count, no security checks
         * @param filter
         * @param options limit, orderBy, order
         * @returns docs
         */
        async function getWhereCount(filter: ResourceFilter, options?: ResourceQueryOptions): Promise<number> {
            const querySnapshot = await count(_getWhereQuery(filter, options));
            return querySnapshot.data().count;
        }

        return {
            query,
            getCollectionIdQueryOptions,
            getQuery: getQuery as unknown as (
                ...parameters: TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
                    ? []
                    : [collectionId: CollectionId]
            ) => Query<SDK, ResourceDataEncoded>,
            getAllSnapshot: getAllSnapshot as unknown as (
                ...parameters: TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
                    ? [options?: ResourceQueryOptions]
                    : [collectionId: CollectionId, options?: ResourceQueryOptions]
            ) => Promise<QSnapshot>,
            getAll: getAll as unknown as (
                ...parameters: TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
                    ? [options?: ResourceQueryOptions]
                    : [collectionId: CollectionId, options?: ResourceQueryOptions]
            ) => Promise<Resource[]>,
            getWhereQuery: _getWhereQuery,
            getWhereSnapshot,
            getWhere,
            getWhereFirst,
            getWhereCount,
        };
    };
}
