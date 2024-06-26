import { Prettify, TypeEqual, AsEmptyRecord } from "@owlprotocol/utils/types";
import type { BigNumberish } from "./common.js";
import type {
    CollectionReference,
    DocumentData,
    DocumentReference,
    FirestoreSDK,
    QueryDocumentSnapshot,
} from "./document.js";
import type { Query, QuerySnapshot } from "./query.js";
import type { CacheWithDelete } from "./cache.js";
import type { SetOptions } from "./types.js";

/**
 * @interface ResourceQueryOptions to sort/order firebase query
 */
export interface ResourceQueryOptions {
    limit?: number;
    skip?: number;
    orderBy?: string;
    order?: "asc" | "desc";
}

/**
 * @type Default resource id is a simple id string that can be autogenerated as uuid
 */
export type ResourceIdDefault = { readonly id?: string };

/**
 * @type Resource data validators. Validate data.
 * @template ResourceData Resource data
 * @template ResourceIdPartial Resource id params (some params may be optional if can be autogenerated)
 * @template CollectionId Resource parent collection id
 * @template ResourceDataInput Resource input data passed to `encodeData`, defaults to ResourceData
 * @template ResourceDataEncoded Resource encoded data passed to `decodeData`, defaults to ResourceData
 * @field encodeId encode document id
 * @field encodeDataPartial encode partial document data. Used in where()/update(). All validated fields MUST be optional.
 * @field encodeData encode document data. Used in set() (defaults to encodeDataPartial).  Some or all validated fields MAY be required.
 * @field encodeParentDocId encode path to collection
 * @field decodedId decode document id
 * @field decodeData decode document data
 * @field decodeParentDocId decode path to collection
 */
export type ResourceDataValidators<
    ResourceData extends DocumentData,
    ResourceId extends Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
    ResourceDataInput extends DocumentData = ResourceData,
    ResourceDataEncoded extends DocumentData = ResourceData,
> = {
    encodeId: (idParams: ResourceId) => string;
    encodeDataPartial?: (data: Partial<ResourceDataInput>) => Partial<ResourceDataEncoded>;
    encodeData?: (data: ResourceDataInput) => ResourceDataEncoded;
    encodeParentDocId?: (collectionIdParams: CollectionId) => string;
    decodeId: (id: string) => Required<ResourceId>;
    decodeData?: (data: ResourceDataEncoded) => ResourceData;
    decodeParentDocId?: (collectionId: string) => CollectionId;
};

/**
 * Uniquely identifies a query collection.
 * Inspired to replicate the Firebase IndexedDB local cache structure.
 * - prefixPath: Prefix to reach subcollecion. For top-level collections, empty array.
 * - collectionGroup: Final collection group.
 *
 * In this way we can indentify collections, subcollections, and collection group queries.
 * - collection: { prefixPath: [], collectionGroup: "myCollection" }
 * - subcollection: { prefixPath: ["myCollection", "collection-1"], collectionGroup: "mySubcollection" }
 * - group query: { prefixPath: [], collectionGroup: "mySubcollection" }
 *
 */
export type FirebaseCollectionKey = { collectionGroup: string; prefixPath: string[] };

export type FirebaseQueryOp = "getAll" | "getWhere" | "getWhereCount" | "getWhereFirst";
export type FirebaseGetOp = "get" | "getOrNull" | "getBatch";
export type FirebaseWriteOp = "set" | "setBatch" | "update" | "updateBatch" | "delete" | "deleteBatch" | "deleteAll";
export type FirebaseUpsertOp = "getOrCreate" | "getWhereFirstOrCreate";
export type FirebaseIncrOp = "incrementStr" | "decrementStr" | "incrementNumber" | "decrementNumber";

/**
 * Common Query operations for a resource defined on a collection (eg. /users) or group collection (eg. /xxx/users).
 * Note: id-based access is NOT possible with collection groups. See `FirebaseResource` for more complete interface
 * @template SDK Firestore sdk type
 * @template ResourceData Resource data
 * @template ResourceId Resource id params (some params may be optional if can be autogenerated)
 * @template CollectionId Resource parent collection id
 * @template ResourceDataInput Resource input data passed to `encodeData`, defaults to ResourceData
 * @template ResourceDataEncoded Resource encoded data passed to `decodeData`, defaults to ResourceData
 * @template QueryFn Query function, can be a query or a query factory function
 * @template ResourceFilter Full resource filter CollectionId & Partial<ResourceDataInput>
 * @template Resource Full returned resource CollectionId & ResourceId & ResourceData
 * @template QSnapshot Full query snapshot type QuerySnapshot<SDK, ResourceDataEncoded>
 */

export interface FirebaseQueryResource<
    SDK extends FirestoreSDK,
    ResourceData extends DocumentData = DocumentData,
    ResourceId extends Record<string, any> = Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
    ResourceDataInput extends DocumentData = ResourceData,
    ResourceDataEncoded extends DocumentData = ResourceData,
    QueryFn extends TypeEqual<CollectionId, Record<string, never>> extends true
        ? Query<SDK, ResourceDataEncoded> //undefined CollectionId, Query MUST be defined
        :
              | Query<SDK, ResourceDataEncoded> //defined CollectionId, for group queries, for group queruesm Query MAY be defined, despite CollectionId defined, therefore union with QueryFactory
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
    QSnapshot extends QuerySnapshot<SDK, ResourceDataEncoded> = QuerySnapshot<SDK, ResourceDataEncoded>,
> {
    //TODO: Remove this?, required for now for groupQuery path used in react-query
    //Same as getQuery
    /**
     * `Query` object or query function `(collectionId) => Query`
     */
    query: QueryFn;
    /**
     * Decode polymorphic parameters, if `Query` is object, simply return options, else return collectionId and options.
     * @param collectionIdOrOptions
     * @param optionsOrNoParam
     */
    getCollectionIdQueryOptions(
        collectionIdOrOptions?: CollectionId | ResourceQueryOptions,
        optionsOrNoParam?: ResourceQueryOptions,
    ): { collectionId: CollectionId | undefined; options: ResourceQueryOptions | undefined };
    /**
     * Get base firebase query, `Query` object or query function `(collectionId) => Query`
     * @param parameters empty tuple if `Query` object, else collectionId if query function `(collectionId) => Query`
     * @returns
     */
    getQuery: (
        ...parameters: TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
            ? []
            : [collectionId: CollectionId]
    ) => Query<SDK, ResourceDataEncoded>;
    /**
     * Get firebase query from filter
     * @param filter filter fields by equality
     * @param options additional query options (limit, skip, order)
     * @returns
     */
    getWhereQuery: (filter: ResourceFilter, options?: ResourceQueryOptions) => Query<SDK, ResourceDataEncoded>;
    /**
     * Get all docs, no filter
     * @param parameters (collectionId, options)
     * @returns array of all docs
     */
    getAll: (
        ...parameters: TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
            ? [options?: ResourceQueryOptions]
            : [collectionId: CollectionId, options?: ResourceQueryOptions]
    ) => Promise<Resource[]>;
    /**
     * Get all docs without decoding (raw Firestore encoding), no filter
     * @param parameters (collectionId, options)
     * @returns array of all docs raw encoded data
     */
    getAllEncoded: (
        ...parameters: TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
            ? [options?: ResourceQueryOptions]
            : [collectionId: CollectionId, options?: ResourceQueryOptions]
    ) => Promise<Prettify<ResourceDataEncoded>[]>;
    /**
     * Get all snapshot, no filter
     * @param parameters (collectionId, options)
     * @returns snapshot of all docs
     */
    getAllSnapshot: (
        ...parameters: TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
            ? [options?: ResourceQueryOptions]
            : [collectionId: CollectionId, options?: ResourceQueryOptions]
    ) => Promise<QSnapshot>;
    /**
     * Get all docs that match filter
     * @param filter filter fields by equality
     * @param options additional query options (limit, skip, order)
     * @returns array of matching docs
     */
    getWhere: (filter: ResourceFilter, options?: ResourceQueryOptions) => Promise<Resource[]>;
    /**
     * Get all docs that match filter without decoding (raw Firestore encoding)
     * @param filter filter fields by equality
     * @param options additional query options (limit, skip, order)
     * @returns array of matching docs raw encoded data
     */
    getWhereEncoded: (
        filter: ResourceFilter,
        options?: ResourceQueryOptions,
    ) => Promise<Prettify<ResourceDataEncoded>[]>;
    /**
     * Get all docs that match filter snapshot
     * @param filter filter fields by equality
     * @param options additional query options (limit, skip, order)
     * @returns firebase snapshot for query
     */
    getWhereSnapshot: (filter: ResourceFilter, options?: ResourceQueryOptions) => Promise<QSnapshot>;
    /**
     * Get count of docs that match filter
     * @param filter filter fields by equality
     * @param options additional query options (limit, skip, order)
     * @returns count of matching docs
     */
    getWhereCount: (filter: ResourceFilter, options?: ResourceQueryOptions) => Promise<number>;
    /**
     * Get first doc that matches filter
     * @param filter filter fields by equality
     * @param options additional query options (limit, skip, order)
     * @returns first doc that matches query or `null`
     */
    getWhereFirst: (filter: ResourceFilter, options?: Omit<ResourceQueryOptions, "limit">) => Promise<Resource | null>;
    /**
     * Get first doc that matches filter without decoding (raw Firestore encoding)
     * @param filter filter fields by equality
     * @param options additional query options (limit, skip, order)
     * @returns first doc that matches query raw encoded data or `null`
     */
    getWhereFirstEncoded: (
        filter: ResourceFilter,
        options?: Omit<ResourceQueryOptions, "limit">,
    ) => Promise<Prettify<ResourceDataEncoded> | null>;
}

/**
 * Common CRUD operations for a resource defined on a static collection (eg. /users).
 * @template SDK Firestore sdk type
 * @template ResourceData Resource data
 * @template ResourceIdPartial Resource id params (some params may be optional if can be autogenerated)
 * @template CollectionId Resource parent collection id
 * @template ResourceDataInput Resource input data passed to `encodeData`, defaults to ResourceData
 * @template ResourceDataEncoded Resource encoded data passed to `decodeData`, defaults to ResourceData
 * @template CollectionFn Collection function, can be a collection or a collection factory function
 * @template QueryFn Query function, can be a query or a query factory function
 * @template ResourceFilter Full resource filter CollectionId & Partial<ResourceDataInput>
 * @template Resource Full returned resource CollectionId & Required<ResourceIdPartial> & ResourceData
 * @template ResourceIdFull Full resource id CollectionId & Required<ResourceIdPartial>
 * @template QSnapshot Full query snapshot type QuerySnapshot<SDK, ResourceDataEncoded>
 */
export interface FirebaseResource<
    SDK extends FirestoreSDK,
    ResourceData extends DocumentData = DocumentData,
    ResourceIdPartial extends Record<string, any> = Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
    ResourceDataInput extends DocumentData = ResourceData,
    ResourceDataEncoded extends DocumentData = ResourceData,
    CollectionFn extends TypeEqual<CollectionId, Record<string, never>> extends true
        ? CollectionReference<SDK, ResourceDataEncoded> //undefined CollectionId, Collection MUST be defined
        : //defined CollectionId, CollectionFactory MUST be defined
          (collectionId: CollectionId) => CollectionReference<SDK, ResourceDataEncoded> = TypeEqual<
        CollectionId,
        Record<string, never>
    > extends true
        ? CollectionReference<SDK, ResourceDataEncoded> //Default type, undefined CollectionId, Collection MUST be defined
        : (collectionId: CollectionId) => CollectionReference<SDK, ResourceDataEncoded>, //Default type, defined CollectionId, CollectionFactory MUST be defined
    QueryFn extends TypeEqual<CollectionId, Record<string, never>> extends true
        ? Query<SDK, ResourceDataEncoded> //undefined CollectionId, Query MUST be defined
        : //defined CollectionId, QueryFactory MUST be defined
          (collectionId: CollectionId) => Query<SDK, ResourceDataEncoded> = TypeEqual<
        CollectionId,
        Record<string, never>
    > extends true
        ? Query<SDK, ResourceDataEncoded> //Default type, undefined CollectionId, Query MUST be defined
        : (collectionId: CollectionId) => Query<SDK, ResourceDataEncoded>, //Default type, defined CollectionId, QueryFactory MUST be defined
    ResourceFilter extends TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
        ? Partial<ResourceDataInput> //defined Query, filter by ResourceDataInput
        : //defined QueryFactory, for group queries, CollectionId MAY be omitted, so we use Partial<CollectionId>
          Prettify<Partial<AsEmptyRecord<CollectionId>> & Partial<ResourceDataInput>> = TypeEqual<
        QueryFn,
        Query<SDK, ResourceDataEncoded>
    > extends true
        ? Partial<ResourceDataInput> //Default type, defined Query, filter by ResourceDataInput
        : Prettify<AsEmptyRecord<CollectionId> & Partial<ResourceDataInput>>, //Default type, defined QueryFactory, filter by CollectionId & ResourceDataInput
    Resource extends Prettify<AsEmptyRecord<CollectionId> & Required<ResourceIdPartial> & ResourceData> = Prettify<
        AsEmptyRecord<CollectionId> & Required<ResourceIdPartial> & ResourceData
    >,
    ResourceIdFull extends TypeEqual<CollectionFn, CollectionReference<SDK, ResourceDataEncoded>> extends true
        ? Required<ResourceIdPartial> //defined Collection, get by ResourceId
        : //defined CollectionFactory, get by CollectionId & ResourceId
          Prettify<AsEmptyRecord<CollectionId> & Required<ResourceIdPartial>> = TypeEqual<
        CollectionFn,
        CollectionReference<SDK, ResourceDataEncoded>
    > extends true
        ? Required<ResourceIdPartial> //defined Collection, get by ResourceId
        : //defined CollectionFactory, get by CollectionId & ResourceId
          Prettify<AsEmptyRecord<CollectionId> & Required<ResourceIdPartial>>,
    QSnapshot extends QuerySnapshot<SDK, ResourceDataEncoded> = QuerySnapshot<SDK, ResourceDataEncoded>,
> extends FirebaseQueryResource<
            SDK,
            ResourceData,
            Required<ResourceIdPartial>,
            CollectionId,
            ResourceDataInput,
            ResourceDataEncoded,
            QueryFn,
            ResourceFilter,
            Resource,
            QSnapshot
        >,
        ResourceDataValidators<ResourceData, ResourceIdPartial, CollectionId, ResourceDataInput, ResourceDataEncoded> {
    /**
     * Get firebase collection reference, `CollectionReference` object or collection function `(collectionId) => CollectionReference`
     * @param parameters empty tuple if `CollectionReference` object, else collectionId if collection function `(collectionId) => CollectionReference`
     * @returns
     */
    collection: (
        ...parameters: TypeEqual<CollectionFn, CollectionReference<SDK, ResourceDataEncoded>> extends true
            ? []
            : [collectionId: CollectionId]
    ) => CollectionReference<SDK, ResourceDataEncoded>;
    /**
     * Get document reference
     * @param id full document id (includes `CollectionId` if this is a subcollection, aka `collection()` is function)
     * @returns
     */
    doc: (id: ResourceIdFull) => DocumentReference<SDK, ResourceDataEncoded>;
    /**
     * Local cache by id. Useful for static objects that don't change by id.
     */
    cache: CacheWithDelete<string, QueryDocumentSnapshot<FirestoreSDK, ResourceDataEncoded>> | undefined;
    /**
     * Get doc by id
     * @throws if document not found
     * @param id doc id (includes `CollectionId` if this is a subcollection)
     * @returns doc with id
     */
    get: (id: ResourceIdFull) => Promise<Resource>;
    /**
     * Get doc by id
     * @throws if document not found
     * @param id doc id (includes `CollectionId` if this is a subcollection)
     * @returns doc raw encoded data
     */
    getEncoded: (id: ResourceIdFull) => Promise<Prettify<ResourceDataEncoded>>;
    /**
     * Get doc by id. Avoids throwing on not found.
     * @param id doc id (includes `CollectionId` if this is a subcollection)
     * @returns doc with id or `null`
     */
    getOrNull: (id: ResourceIdFull) => Promise<Resource | null>;
    /**
     * Get doc by id. Avoids throwing on not found.
     * @param id doc id (includes `CollectionId` if this is a subcollection)
     * @returns doc raw encoded data or `null`
     */
    getOrNullEncoded: (id: ResourceIdFull) => Promise<Prettify<ResourceDataEncoded> | null>;
    /**
     * Get docs by id.
     * @param ids doc ids (includes `CollectionId` if this is a subcollection)
     * @returns mixed array of docs with id and/or `null`
     */
    getBatch: (ids: ResourceIdFull[]) => Promise<(Resource | null)[]>;
    /**
     * Get docs by id.
     * @param ids doc ids (includes `CollectionId` if this is a subcollection)
     * @returns mixed array of docs raw data and/or `null`
     */
    getBatchEncoded: (ids: ResourceIdFull[]) => Promise<(Prettify<ResourceDataEncoded> | null)[]>;
    /**
     * Set doc. Will overwrite existing data.
     * @param item doc with data and id (includes `CollectionId` if this is a subcollection)
     * @param options optional parameter to set `merge fields`
     * @returns doc id
     */
    set: {
        (item: Prettify<AsEmptyRecord<CollectionId> & ResourceIdPartial & ResourceDataInput>): Promise<string>;
        (item: Prettify<ResourceIdFull & Partial<ResourceDataInput>>, options: SetOptions): Promise<string>;
    };
    /**
     * Upsert doc. Will merge with existing data or create new document.
     * @param item doc to upsert
     * @returns doc id
     */
    upsert: (item: Prettify<ResourceIdFull & ResourceDataInput>) => Promise<string>;
    /**
     * Set docs as a batch commit (max 500 writes). Will overwrite existing data.
     * @warning All docs in batch MUST have same `CollectionId`.
     * @param items docs with data and id (includes `CollectionId` if this is a subcollection)
     * @param options optional parameter to set `merge fields`
     * @returns item ids, resolves batch commit on completion
     */
    setBatch: {
        (items: Prettify<AsEmptyRecord<CollectionId> & ResourceIdPartial & ResourceDataInput>[]): Promise<string[]>;
        (items: Prettify<ResourceIdFull & Partial<ResourceDataInput>>[], options: SetOptions): Promise<string[]>;
    };
    /**
     * Upsert docs as a batch commit (max 500 writes). Will merge with existing data or create new documents.
     * @param items  items to upser
     * @returns item ids, resolves batch commit on completion
     */
    upsertBatch: (items: Prettify<ResourceIdFull & ResourceDataInput>[]) => Promise<string[]>;
    /**
     * Get doc or create new one, no security checks
     * @param id
     * @param initialData
     * @returns doc or initialValue
     */
    getOrCreate: (id: ResourceIdFull, initialValue: ResourceDataInput) => Promise<Resource>;
    /**
     * Get first doc that matches filter or create new one
     * WARNING: NOT executed as transaction (only get supported in transaction)
     * @param filter query filter (included in initialData)
     * @param initialData initialData (write if query returns null)
     * @param options orderBy, order
     * @returns doc or initialValue
     */
    getWhereFirstOrCreate: (
        filter: ResourceFilter,
        initialValue: Prettify<AsEmptyRecord<CollectionId> & ResourceIdPartial & ResourceDataInput>,
        options?: Omit<ResourceQueryOptions, "limit">,
    ) => Promise<Resource>;
    /**
     * Update existing doc
     * @throws if doc does not exist
     * @param item
     * @returns `Promise<void>` resolves on batch commit completion
     */
    update: (item: Prettify<ResourceIdFull & Partial<ResourceDataInput>>) => Promise<void>;
    /**
     * Update existing docs as a batch commit (max 500 writes)
     * @throws if a doc does not exist
     * @param items
     * @returns `Promise<void>` resolves on batch commit completion
     */
    updateBatch: (item: Prettify<ResourceIdFull & Partial<ResourceDataInput>>[]) => Promise<void>;
    /**
     * Delete doc
     * @param id doc id (includes `CollectionId` if this is a subcollection)
     * @returns `Promise<void>` resolves on batch commit completion
     */
    delete: (id: ResourceIdFull) => Promise<void>;
    /**
     * Delete docs as a batch commit (max 500 writes)
     * @param ids doc ids (includes `CollectionId` if this is a subcollection)
     * @returns `Promise<void>` resolves on batch commit completion
     */
    deleteBatch: (ids: ResourceIdFull[]) => Promise<void>;
    /**
     * Delete all docs
     * @param parameters empty tuple if `CollectionReference` object, else collectionId if collection function `(collectionId) => CollectionReference`
     * @returns `Promise<void>` resolves on batch commit completion
     */
    deleteAll: (
        ...parameters: TypeEqual<CollectionFn, CollectionReference<SDK, ResourceDataEncoded>> extends true
            ? []
            : [collectionId: CollectionId]
    ) => Promise<void>;
    /**
     * Increment hex-encoded numerical document field using transaction
     * @param id doc id (includes `CollectionId` if this is a subcollection)
     * @param path document field path (eg. `value`)
     * @param value increment value
     * @returns `Promise<void>` resolves on transaction commit completion
     */
    incrementStr: (id: ResourceIdFull, path: string, value: BigNumberish) => Promise<void>;
    /**
     * Decrement hex-encoded numerical document field using transaction
     * @param id doc id (includes `CollectionId` if this is a subcollection)
     * @param path document field path (eg. `value`)
     * @param value decrement value
     * @returns `Promise<void>` resolves on transaction commit completion
     */
    decrementStr: (id: ResourceIdFull, path: string, value: BigNumberish) => Promise<void>;
    /**
     * Increment numerical document field using transaction
     * @param id doc id (includes `CollectionId` if this is a subcollection)
     * @param path document field path (eg. `value`)
     * @param value increment value
     * @returns `Promise<void>` resolves on transaction commit completion
     */
    incrementNumber: (id: ResourceIdFull, path: string, value: number) => Promise<void>;
    /**
     * Decrement numerical document field using transaction
     * @param id doc id (includes `CollectionId` if this is a subcollection)
     * @param path document field path (eg. `value`)
     * @param value decrement value
     * @returns `Promise<void>` resolves on transaction commit completion
     */
    decrementNumber: (id: ResourceIdFull, path: string, value: number) => Promise<void>;
}

/**
 * Additional options to initialize Firebase resource
 * @field lruCacheSize enable mnemonist LRUCache for get,getBatch
 * WARNING: Cache behaviour is NOT perfect right now and should ONLY be used with static models
 * Ignore caching for MOST models except if you stand to gain significant performance.
 *
 * It is reasonably robust
 *  - cache hits
 *      - basic reads: get, getOrNull
 *      - transactional reads: getOrCreate
 *      - TODO: getBatch not implemented
 *  - cache purge
 *      - basic writes: set, setBatch, update, updateBatch, deleteById, deleteBatch, deleteAll
 *      - transactional writes: incrementStr, incrementNumber, getWhereFirstOrCreate (implied)
 *      //TODO: Should queries purge cache?
 *      - queries (NOT IMPLEMENTED): Not really required as the types of models that are static will only be accessed by id
 */
export type FirebaseResourceOptions = {
    lruCacheSize?: number;
};
