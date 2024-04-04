import { UseQueryOptions, queryOptions } from "@tanstack/react-query";
import { AsEmptyRecord, Prettify, TypeEqual } from "@owlprotocol/utils/types";
import {
    FirebaseQueryReactQueryOptions,
    FirebaseResourceReactQueryOptions,
    ROOT_KEY,
    RootKey,
} from "./queryOptions.js";
import { FirebaseCollectionKey, FirebaseQueryResource, FirebaseResource, ResourceQueryOptions } from "../resource.js";
import { CollectionReference, DocumentData } from "../document.js";
import { Query } from "../query.js";

/**
 * Firebase Query React Query options
 * To be used with Collection or CollectionGroup.
 *
 * Only read queries are supported (no write or id-based access).
 * - getAllOptions, getWhereOptions, getWhereCountOptions, getWhereFirstOptions
 * @template ResourceData Resource data
 * @template ResourceId Resource id params (some params may be optional if can be autogenerated)
 * @template CollectionId Resource parent collection id
 * @template ResourceDataInput Resource input data passed to `encodeData`, defaults to ResourceData
 * @template ResourceDataEncoded Resource encoded data passed to `decodeData`, defaults to ResourceData
 * @template Resource Full returned resource CollectionId & ResourceId & ResourceData
 * @param resource FirebaseQueryResource
 * @param rootQueryKey Root query key for all queries
 * @returns wrapper functions for access Firebase
 */
export function getFirebaseQueryReactQueryOptions<
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
>(
    resource: FirebaseQueryResource<
        "web",
        ResourceData,
        ResourceId,
        CollectionId,
        ResourceDataInput,
        ResourceDataEncoded,
        QueryFn,
        ResourceFilter,
        Resource
    >,
    rootQueryKey: TypeEqual<QueryFn, Query<"web", ResourceDataEncoded>> extends true
        ? FirebaseCollectionKey
        : (collectionId: CollectionId) => FirebaseCollectionKey,
): FirebaseQueryReactQueryOptions<
    ResourceData,
    ResourceId,
    CollectionId,
    ResourceDataInput,
    ResourceDataEncoded,
    QueryFn,
    ResourceFilter,
    Resource
> {
    //@ts-expect-error
    function getAllOptions(
        collectionId: CollectionId,
        options?: ResourceQueryOptions,
    ): UseQueryOptions<
        Resource[],
        Error,
        Resource[],
        readonly [RootKey, FirebaseCollectionKey, "getAll", CollectionId, ResourceQueryOptions | null]
    >;
    function getAllOptions(
        options?: ResourceQueryOptions,
    ): UseQueryOptions<
        Resource[],
        Error,
        Resource[],
        readonly [RootKey, FirebaseCollectionKey, "getAll", null, ResourceQueryOptions | null]
    >;
    function getAllOptions(
        collectionIdOrOptions?: CollectionId | ResourceQueryOptions,
        optionsOrNoParam?: ResourceQueryOptions,
    ): UseQueryOptions<
        Resource[],
        Error,
        Resource[],
        readonly [RootKey, FirebaseCollectionKey, "getAll", ResourceQueryOptions | null]
    > {
        const { collectionId, options } = resource.getCollectionIdQueryOptions(collectionIdOrOptions, optionsOrNoParam);
        const key =
            typeof rootQueryKey === "function"
                ? rootQueryKey(collectionId as CollectionId)
                : (rootQueryKey as FirebaseCollectionKey);
        return queryOptions({
            queryKey: [ROOT_KEY, key, "getAll", options ?? null] as const,
            //Overload errors
            //@ts-expect-error
            queryFn: () => resource.getAll(collectionIdOrOptions, optionsOrNoParam),
        });
    }

    //TODO: Use encodeData to make filter avoid duplicate cache keys
    function getWhereOptions(
        filter: ResourceFilter,
        options?: ResourceQueryOptions,
    ): UseQueryOptions<
        Resource[],
        Error,
        Resource[],
        readonly [RootKey, FirebaseCollectionKey, "getWhere", ResourceFilter, ResourceQueryOptions | null]
    > {
        const key =
            typeof rootQueryKey === "function"
                ? rootQueryKey(filter as unknown as CollectionId)
                : (rootQueryKey as FirebaseCollectionKey);
        return queryOptions({
            queryKey: [ROOT_KEY, key, "getWhere", filter, options ?? null] as const,
            queryFn: () => resource.getWhere(filter, options),
        });
    }

    function getWhereCountOptions(
        filter: ResourceFilter,
        options?: ResourceQueryOptions,
    ): UseQueryOptions<
        number,
        Error,
        number,
        readonly [RootKey, FirebaseCollectionKey, "getWhereCount", ResourceFilter, ResourceQueryOptions | null]
    > {
        const key =
            typeof rootQueryKey === "function"
                ? rootQueryKey(filter as unknown as CollectionId)
                : (rootQueryKey as FirebaseCollectionKey);
        return queryOptions({
            queryKey: [ROOT_KEY, key, "getWhereCount", filter, options ?? null] as const,
            queryFn: () => resource.getWhereCount(filter, options),
        });
    }

    function getWhereFirstOptions(
        filter: ResourceFilter,
        options?: Omit<ResourceQueryOptions, "limit">,
    ): UseQueryOptions<
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
    > {
        const key =
            typeof rootQueryKey === "function"
                ? rootQueryKey(filter as unknown as CollectionId)
                : (rootQueryKey as FirebaseCollectionKey);
        return queryOptions({
            queryKey: [ROOT_KEY, key, "getWhereFirst", filter, options ?? null] as const,
            queryFn: () => resource.getWhereFirst(filter, options),
        });
    }

    return {
        getAllOptions: getAllOptions as unknown as (
            ...parameters: TypeEqual<QueryFn, Query<"web", ResourceDataEncoded>> extends true
                ? [options?: ResourceQueryOptions]
                : [collectionId: CollectionId, options?: ResourceQueryOptions]
        ) => UseQueryOptions<
            Resource[],
            Error,
            Resource[],
            readonly [RootKey, FirebaseCollectionKey, "getAll", ResourceQueryOptions | null]
        >,
        getWhereOptions,
        getWhereCountOptions,
        getWhereFirstOptions,
    };
}

/**
 * Firebase Resource React Query options
 * To be used with Collection.
 *
 * Only read queries are supported but id based access is added
 * - getOptions, getOrNullOptions, getBatchOptions
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
 * @param resource FirebaseResource
 * @param rootQueryKey Root query key for all queries
 * @returns wrapper functions for access Firebase
 */
export function getFirebaseResourceReactQueryOptions<
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
>(
    resource: FirebaseResource<
        "web",
        ResourceData,
        Required<ResourceIdPartial>,
        CollectionId,
        ResourceDataInput,
        ResourceDataEncoded,
        CollectionFn,
        QueryFn,
        ResourceFilter,
        Resource,
        ResourceIdFull
    >,
    rootQueryKey: TypeEqual<QueryFn, Query<"web", ResourceDataEncoded>> extends true
        ? FirebaseCollectionKey
        : (collectionId: CollectionId) => FirebaseCollectionKey,
): FirebaseResourceReactQueryOptions<
    ResourceData,
    ResourceIdPartial,
    CollectionId,
    ResourceDataInput,
    ResourceDataEncoded,
    CollectionFn,
    QueryFn,
    ResourceFilter,
    Resource
> {
    type ResourceId = Required<ResourceIdPartial>;

    const { encodeId, doc } = resource;

    const { getAllOptions, getWhereOptions, getWhereCountOptions, getWhereFirstOptions } =
        getFirebaseQueryReactQueryOptions<
            ResourceData,
            ResourceId,
            CollectionId,
            ResourceDataInput,
            ResourceDataEncoded
            //@ts-expect-error resource inference
        >(resource, rootQueryKey) as unknown as FirebaseQueryReactQueryOptions<
            ResourceData,
            ResourceId,
            CollectionId,
            ResourceDataInput,
            ResourceDataEncoded,
            QueryFn,
            ResourceFilter,
            Resource
        >;

    function getOptions(
        idParams: ResourceIdFull,
    ): UseQueryOptions<Resource, Error, Resource, readonly [RootKey, FirebaseCollectionKey, "get", string]> {
        const key =
            typeof rootQueryKey === "function"
                ? rootQueryKey(idParams as unknown as CollectionId)
                : (rootQueryKey as FirebaseCollectionKey);
        const id = encodeId(idParams as ResourceId);

        return queryOptions({
            queryKey: [ROOT_KEY, key, "get", id] as const,
            queryFn: () => resource.get(idParams),
        });
    }

    function getOrNullOptions(
        idParams: ResourceIdFull,
    ): UseQueryOptions<
        Resource | null,
        Error,
        Resource | null,
        readonly [RootKey, FirebaseCollectionKey, "getOrNull", string]
    > {
        const key =
            typeof rootQueryKey === "function"
                ? rootQueryKey(idParams as unknown as CollectionId)
                : (rootQueryKey as FirebaseCollectionKey);
        const id = encodeId(idParams as ResourceId);

        return queryOptions({
            queryKey: [ROOT_KEY, key, "getOrNull", id] as const,
            queryFn: () => resource.getOrNull(idParams),
        });
    }

    function getBatchOptions(
        idParamsList: ResourceIdFull[],
    ): UseQueryOptions<
        (Resource | null)[],
        Error,
        (Resource | null)[],
        readonly [RootKey, FirebaseCollectionKey, "getBatch", string[]]
    > {
        const key: FirebaseCollectionKey = { collectionGroup: "*", prefixPath: [] };
        if (idParamsList.length > 0) {
            const keyFromParams0 =
                typeof rootQueryKey === "function"
                    ? rootQueryKey(idParamsList[0] as unknown as CollectionId)
                    : (rootQueryKey as FirebaseCollectionKey);
            //Multiple subcollections could be called, so we use collectionGroup and ignore prefixPath
            key.collectionGroup = keyFromParams0.collectionGroup;
        }

        //We use paths since ids can conflict
        const paths = idParamsList.map(doc).map((r) => r.path);

        return queryOptions({
            queryKey: [ROOT_KEY, key, "getBatch", paths] as const,
            queryFn: () => resource.getBatch(idParamsList),
        });
    }

    //TODO: Fix inference errors
    return {
        getAllOptions,
        getWhereOptions,
        getWhereCountOptions,
        getWhereFirstOptions,
        //@ts-expect-error
        getOptions,
        //@ts-expect-error
        getOrNullOptions,
        //@ts-expect-error
        getBatchOptions,
    };
}
