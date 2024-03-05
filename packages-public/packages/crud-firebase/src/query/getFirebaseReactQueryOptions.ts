import { queryOptions } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import {
    FirebaseQueryReactQueryOptions,
    FirebaseResourceReactQueryOptions,
    FirebaseResourceReactQueryOptionsFactory,
    ROOT_KEY,
} from "./queryOptions.js";
import {
    FirebaseCollectionKey,
    FirebaseGetOp,
    FirebaseQueryOp,
    FirebaseQueryResource,
    FirebaseResource,
    FirebaseResourceFactory,
    ResourceIdDefault,
    ResourceQueryOptions,
} from "../resource.js";

/**
 * Firebase Query React Query options
 * To be used with Collection or CollectionGroup.
 *
 * Only read queries are supported (no write or id-based access).
 * - getAllOptions, getWhereOptions, getWhereCountOptions, getWhereFirstOptions
 * @template ResourceData Resource data
 * @template ResourceId Resource id params
 * @param resource FirebaseQueryResource
 * @param rootQueryKey Root query key for all queries
 * @returns wrapper functions for access Firebase
 */
export function getFirebaseQueryReactQueryOptions<
    ResourceData extends Record<string, any>,
    ResourceId extends Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
>(
    resource: FirebaseQueryResource<ResourceData, ResourceId, CollectionId & Required<ResourceId> & ResourceData>,
    rootQueryKey: FirebaseCollectionKey,
) {
    type Resource = CollectionId & Required<ResourceId> & ResourceData;

    const getAllOptions = (options?: ResourceQueryOptions) => {
        return queryOptions({
            queryKey: [ROOT_KEY, rootQueryKey, "getAll", options] as const,
            queryFn: () => resource.getAll(options),
        });
    };

    const getWhereOptions = (filter: Partial<ResourceData>, options?: ResourceQueryOptions) => {
        return queryOptions({
            queryKey: [ROOT_KEY, rootQueryKey, "getWhere", filter, options] as const,
            queryFn: () => resource.getWhere(filter, options),
        });
    };

    const getWhereCountOptions = (filter: Partial<ResourceData>, options?: ResourceQueryOptions) => {
        return queryOptions({
            queryKey: [ROOT_KEY, rootQueryKey, "getWhereCount", filter, options] as const,
            queryFn: () => resource.getWhereCount(filter, options),
        });
    };

    const getWhereFirstOptions = (filter: Partial<ResourceData>, options?: Omit<ResourceQueryOptions, "limit">) => {
        return queryOptions({
            queryKey: [ROOT_KEY, rootQueryKey, "getWhereFirst", filter, options] as const,
            queryFn: () => resource.getWhereFirst(filter, options),
        });
    };

    const helpers = {
        getAllOptions,
        getWhereOptions,
        getWhereCountOptions,
        getWhereFirstOptions,
    } satisfies FirebaseQueryReactQueryOptions<ResourceData, ResourceId, Resource>;

    return helpers as FirebaseQueryReactQueryOptions<ResourceData, ResourceId, Resource>;
}

/**
 * Firebase Resource React Query options
 * To be used with Collection.
 *
 * Only read queries are supported but id based access is added
 * - getOptions, getOrUndefinedOptions, getBatchOptions
 *
 * TODO: Support mutations for full compatibility with `FirebaseResource`
 * @template ResourceData Resource data
 * @template ResourceIdPartial Resource id params
 * @param resource FirebaseResource
 * @param rootQueryKey Root query key for all queries
 * @returns wrapper functions for access Firebase
 */
export function getFirebaseResourceReactQueryOptions<
    ResourceData extends Record<string, any>,
    ResourceIdPartial extends Record<string, any>,
>(
    resource: Pick<
        FirebaseResource<ResourceData, ResourceIdPartial>,
        FirebaseGetOp | "encodeId" | FirebaseQueryOp | "validateDataPartial"
    >,
    rootQueryKey: FirebaseCollectionKey,
) {
    type Resource = Required<ResourceIdPartial> & ResourceData;

    const { encodeId } = resource;

    const { getAllOptions, getWhereOptions, getWhereCountOptions, getWhereFirstOptions } =
        getFirebaseQueryReactQueryOptions<ResourceData, ResourceIdPartial, Resource>(resource, rootQueryKey);

    const getOptions = (idParams: string | Required<ResourceIdPartial>) => {
        const id = encodeId(idParams);
        return queryOptions({
            queryKey: [ROOT_KEY, rootQueryKey, "get", id] as const,
            queryFn: () => resource.get(id),
        });
    };

    const getOrUndefinedOptions = (idParams: string | Required<ResourceIdPartial>) => {
        const id = encodeId(idParams);
        return queryOptions({
            queryKey: [ROOT_KEY, rootQueryKey, "getOrUndefined", id] as const,
            queryFn: () => resource.getOrUndefined(id),
        });
    };

    const getBatchOptions = (idParamsList: string[] | Required<ResourceIdPartial>[]) => {
        const ids = idParamsList.map(encodeId);
        return queryOptions({
            queryKey: [ROOT_KEY, rootQueryKey, "getBatch", ids] as const,
            queryFn: () => resource.getBatch(ids),
        });
    };

    const helpers = {
        getAllOptions,
        getWhereOptions,
        getWhereCountOptions,
        getWhereFirstOptions,
        getOptions,
        getOrUndefinedOptions,
        getBatchOptions,
    } satisfies FirebaseResourceReactQueryOptions<ResourceData, ResourceIdPartial, Resource>;

    return helpers as FirebaseResourceReactQueryOptions<ResourceData, ResourceIdPartial, Resource>;
}

/**
 * Return factory function for generating Firebase Resource Query Options when dealing with subcollections.
 * @template CollectionId Subcollection Params
 * @template ResourceData Resource data
 * @template ResourceIdPartial Resource id params
 * @param firestore Firestore instance
 * @param collectionPathTemplate Template string to generate collection (eg. `/project/{projectId}/contract`)
 * @param validators Validators for id and data.
 */
export function getFirebaseResourceReactQueryOptionsFactory<
    CollectionId extends Record<string, any>,
    ResourceData extends Record<string, any>,
    ResourceIdPartial extends Record<string, any> = ResourceIdDefault,
>(
    factory: FirebaseResourceFactory<CollectionId, ResourceData, ResourceIdPartial>,
): FirebaseResourceReactQueryOptionsFactory<CollectionId, ResourceData, ResourceIdPartial> {
    //TODO: Validate collectionId params
    return function getFirebaseResourceReactQueryOptions2(params: CollectionId) {
        const resource = factory(params);
        const collectionPathComponents = resource.collectionPath.split("/");
        //last component is collection group, rest is prefix
        const collectionGroup = collectionPathComponents.pop();
        //collectionGroup MUST be defined
        invariant(
            collectionGroup,
            `Invalid collectionPath ${resource.collectionPath}, collectionGroup MUST be defined`,
        );
        //prefixPath MUST be of even length
        invariant(
            collectionPathComponents.length % 2 != 0,
            `Invalid collectionPath ${resource.collectionPath}, prefixPath length MUST be even ${JSON.stringify(
                collectionPathComponents,
            )}`,
        );

        return getFirebaseResourceReactQueryOptions(resource, {
            prefixPath: collectionPathComponents,
            collectionGroup,
        });
    };
}
