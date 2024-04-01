import { where, limit, orderBy, startAfter } from "./query.js";
import { getWhereQueryForSdk } from "../getWhereQuery.js";

/**
 * Returns filter query that can be used to get items, count the query or compose with additional queries.
 * @param col collection
 * @param filter, will try to match the key-value pairs of this object as `where(key, "==", value)` queries.
 *      For nested keys, this gets reformated as `where(key.subkey, "==", value)` similar as to the update function
 * @param options limit, orderBy, order, skip
 * @returns firebase query object
 */
export const getWhereQuery = getWhereQueryForSdk<"admin">({
    where,
    limit,
    orderBy,
    startAfter,
});
