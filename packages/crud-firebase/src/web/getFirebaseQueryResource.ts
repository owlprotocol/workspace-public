import { count, getDocs } from "./query.js";
import { getWhereQuery } from "./getWhereQuery.js";
import { getFirebaseQueryResourceForSdk } from "../getFirebaseQueryResource.js";

/**
 * Firebase Query Resource. To be used with Collection or CollectionGroup.
 * Only read queries are supported (no write or id-based access).
 * - getAll, getWhere, getWhereCount, getWhereFirst
 * @template ResourceData Resource data
 * @template ResourceId Resource id params (some params may be optional if can be autogenerated)
 * @template ResourceDataInput Resource input data passed to `encodeData`, defaults to ResourceData
 * @template ResourceDataEncoded Resource encoded data passed to `decodeData`, defaults to ResourceData
 * @template CollectionId Resource collection id  (for use with query as function)
 * @param query Firestore Query (Query/Collection/CollectionGroup) or factory function `(collectionId) => query`
 * @param validators encodeDataPartial, encodeParentDocId, decodeId, decodeData, decodeParentDocId
 * @returns wrapper functions for access Firebase
 */
export const getFirebaseQueryResource = getFirebaseQueryResourceForSdk<"web">({
    getWhereQuery,
    getDocs,
    count,
});
