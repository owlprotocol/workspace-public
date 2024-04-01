import { count, getDocs } from "./query.js";
import { getWhereQuery } from "./getWhereQuery.js";
import { getFirebaseQueryResourceForSdk } from "../getFirebaseQueryResource.js";

/**
 * Firebase Query Resource. To be used with Collection or CollectionGroup.
 * Only read queries are supported (no write or id-based access).
 * - getAll, getWhere, getWhereCount, getWhereFirst
 * @template ResourceData Resource data
 * @template ResourceId Resource id params
 * @template CollectionId Resource parent collection id
 * @param col Firestore Collection Reference or CollectionGroup
 * @param validators Validators for decoding id and validating query data.
 * @returns wrapper functions for access Firebase
 */
export const getFirebaseQueryResource = getFirebaseQueryResourceForSdk<"admin">({
    getWhereQuery,
    getDocs,
    count,
});
