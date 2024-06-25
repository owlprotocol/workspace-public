import { UseQueryOptions } from "@tanstack/react-query";
import { AsEmptyRecord, Prettify, TypeEqual } from "@owlprotocol/utils/types";
import { FirebaseCollectionKey, ResourceQueryOptions } from "../resource.js";
import { CollectionReference, DocumentData } from "../document.js";
import { Query } from "../query.js";

export type RootKey = "__firebase__";
export const ROOT_KEY: RootKey = "__firebase__";

/**
 * Firebase Query React Query options
 * Created from a `FirebaseQueryResource` with the query functions
 * and returns helpers compatible with react-query
 *
 * Common Query operations for a resource defined on a collection (eg. /users) or group collection (eg. /xxx/users).
 * Note: id-based access is NOT possible with collection groups. See `FirebaseResource` for more complete interface
 * @template ResourceData Resource data
 * @template ResourceId Resource id params (some params may be optional if can be autogenerated)
 * @template CollectionId Resource parent collection id
 * @template ResourceDataInput Resource input data passed to `encodeData`, defaults to ResourceData
 * @template ResourceDataEncoded Resource encoded data passed to `decodeData`, defaults to ResourceData
 * @template QueryFn Query function, can be a query or a query factory function
 * @template ResourceFilter Full resource filter CollectionId & Partial<ResourceDataInput>
 * @template Resource Full returned resource CollectionId & ResourceId & ResourceData
 */
export interface FirebaseQueryReactQueryOptions<
    ResourceData extends DocumentData = DocumentData,
    ResourceId extends Record<string, any> = Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
    ResourceDataInput extends DocumentData = ResourceData,
    ResourceDataEncoded extends DocumentData = ResourceData,
    QueryFn extends TypeEqual<CollectionId, Record<string, never>> extends true
        ? Query<"web", ResourceDataEncoded> //undefined CollectionId, Query MUST be defined
        :
              | Query<"web", ResourceDataEncoded> //defined CollectionId, for group queries, for group queruesm Query MAY be defined, despite CollectionId defined, therefore union with QueryFactory
              | ((collectionId: CollectionId) => Query<"web", ResourceDataEncoded>) = TypeEqual<
        CollectionId,
        Record<string, never>
    > extends true
        ? Query<"web", ResourceDataEncoded> //Default type, undefined CollectionId, Query MUST be defined
        : (collectionId: CollectionId) => Query<"web", ResourceDataEncoded>, //Default type, defined CollectionId, QueryFactory
    ResourceFilter extends TypeEqual<QueryFn, Query<"web", ResourceDataEncoded>> extends true
        ? Partial<ResourceDataInput> //defined Query, filter by ResourceDataInput
        : //defined QueryFactory, for group queries, CollectionId MAY be omitted, so we use Partial<CollectionId>
          Prettify<Partial<AsEmptyRecord<CollectionId>> & Partial<ResourceDataInput>> = TypeEqual<
        QueryFn,
        Query<"web", ResourceDataEncoded>
    > extends true
        ? Partial<ResourceDataInput> //Default type, defined Query, filter by ResourceDataInput
        : Prettify<AsEmptyRecord<CollectionId> & Partial<ResourceDataInput>>, //Default type, defined QueryFactory, filter by CollectionId & ResourceDataInput
    Resource extends Prettify<AsEmptyRecord<CollectionId> & ResourceId & ResourceData> = Prettify<
        AsEmptyRecord<CollectionId> & ResourceId & ResourceData
    >,
> {
    getAllOptions: (
        ...parameters: TypeEqual<QueryFn, Query<"web", ResourceDataEncoded>> extends true
            ? [options?: ResourceQueryOptions]
            : [collectionId: CollectionId, options?: ResourceQueryOptions]
    ) => UseQueryOptions<
        Resource[],
        Error,
        Resource[],
        readonly [RootKey, FirebaseCollectionKey, "getAll", ResourceQueryOptions | null]
    >;
    getWhereOptions: (
        filter: ResourceFilter,
        options?: ResourceQueryOptions,
    ) => UseQueryOptions<
        Resource[],
        Error,
        Resource[],
        readonly [RootKey, FirebaseCollectionKey, "getWhere", ResourceFilter, ResourceQueryOptions | null]
    >;
    getWhereCountOptions: (
        filter: ResourceFilter,
        options?: ResourceQueryOptions,
    ) => UseQueryOptions<
        number,
        Error,
        number,
        readonly [RootKey, FirebaseCollectionKey, "getWhereCount", ResourceFilter, ResourceQueryOptions | null]
    >;
    getWhereFirstOptions: (
        filter: ResourceFilter,
        options?: Omit<ResourceQueryOptions, "limit">,
    ) => UseQueryOptions<
        Resource | null,
        Error,
        Resource | null,
        readonly [
            RootKey,
            FirebaseCollectionKey,
            "getWhereFirst",
            ResourceFilter,
            Omit<ResourceQueryOptions, "limit"> | null,
        ]
    >;
}

/**
 * Firebase Resource React Query options
 * Takes as input a `FirebaseResource` with the query functions
 * and returns helpers compatible with react-query
 *
 * TODO: Support mutations for full compatibility with `FirebaseResource`
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
 */
export interface FirebaseResourceReactQueryOptions<
    ResourceData extends DocumentData = DocumentData,
    ResourceIdPartial extends Record<string, any> = Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
    ResourceDataInput extends DocumentData = ResourceData,
    ResourceDataEncoded extends DocumentData = ResourceData,
    CollectionFn extends TypeEqual<CollectionId, Record<string, never>> extends true
        ? CollectionReference<"web", ResourceDataEncoded> //undefined CollectionId, Collection MUST be defined
        : //defined CollectionId, CollectionFactory MUST be defined
          (collectionId: CollectionId) => CollectionReference<"web", ResourceDataEncoded> = TypeEqual<
        CollectionId,
        Record<string, never>
    > extends true
        ? CollectionReference<"web", ResourceDataEncoded> //Default type, undefined CollectionId, Collection MUST be defined
        : (collectionId: CollectionId) => CollectionReference<"web", ResourceDataEncoded>, //Default type, defined CollectionId, CollectionFactory MUST be defined
    QueryFn extends TypeEqual<CollectionId, Record<string, never>> extends true
        ? Query<"web", ResourceDataEncoded> //undefined CollectionId, Query MUST be defined
        : //defined CollectionId, QueryFactory MUST be defined
          (collectionId: CollectionId) => Query<"web", ResourceDataEncoded> = TypeEqual<
        CollectionId,
        Record<string, never>
    > extends true
        ? Query<"web", ResourceDataEncoded> //Default type, undefined CollectionId, Query MUST be defined
        : (collectionId: CollectionId) => Query<"web", ResourceDataEncoded>, //Default type, defined CollectionId, QueryFactory MUST be defined
    ResourceFilter extends TypeEqual<QueryFn, Query<"web", ResourceDataEncoded>> extends true
        ? Partial<ResourceDataInput> //defined Query, filter by ResourceDataInput
        : //defined QueryFactory, for group queries, CollectionId MAY be omitted, so we use Partial<CollectionId>
          Prettify<Partial<AsEmptyRecord<CollectionId>> & Partial<ResourceDataInput>> = TypeEqual<
        QueryFn,
        Query<"web", ResourceDataEncoded>
    > extends true
        ? Partial<ResourceDataInput> //Default type, defined Query, filter by ResourceDataInput
        : Prettify<AsEmptyRecord<CollectionId> & Partial<ResourceDataInput>>, //Default type, defined QueryFactory, filter by CollectionId & ResourceDataInput
    Resource extends Prettify<AsEmptyRecord<CollectionId> & Required<ResourceIdPartial> & ResourceData> = Prettify<
        AsEmptyRecord<CollectionId> & Required<ResourceIdPartial> & ResourceData
    >,
    ResourceIdFull extends TypeEqual<CollectionFn, CollectionReference<"web", ResourceDataEncoded>> extends true
        ? Required<ResourceIdPartial> //defined Collection, get by ResourceId
        : //defined CollectionFactory, get by CollectionId & ResourceId
          Prettify<AsEmptyRecord<CollectionId> & Required<ResourceIdPartial>> = TypeEqual<
        CollectionFn,
        CollectionReference<"web", ResourceDataEncoded>
    > extends true
        ? Required<ResourceIdPartial> //defined Collection, get by ResourceId
        : //defined CollectionFactory, get by CollectionId & ResourceId
          Prettify<AsEmptyRecord<CollectionId> & Required<ResourceIdPartial>>,
> extends FirebaseQueryReactQueryOptions<
        ResourceData,
        Required<ResourceIdPartial>,
        CollectionId,
        ResourceDataInput,
        ResourceDataEncoded,
        QueryFn,
        ResourceFilter,
        Resource
    > {
    getOptions: (
        id: ResourceIdFull,
    ) => UseQueryOptions<Resource, Error, Resource, readonly [RootKey, FirebaseCollectionKey, "get", string]>;
    //TODO: Seems like opportuniy for sharing keys here. For now isolate for safety.
    getOrNullOptions: (
        id: ResourceIdFull,
    ) => UseQueryOptions<
        Resource | null,
        Error,
        Resource | null,
        readonly [RootKey, FirebaseCollectionKey, "getOrNull", string]
    >;
    //TODO: Can we do structural sharing? Batch is more efficient on network, but cache keys won't match here
    getBatchOptions: (
        ids: ResourceIdFull[],
    ) => UseQueryOptions<
        (Resource | null)[],
        Error,
        (Resource | null)[],
        readonly [RootKey, FirebaseCollectionKey, "getBatch", string[]]
    >;
}
