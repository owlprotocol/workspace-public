/***** Generics for Firebase Web CRUD *****/
import { DocumentData, Query, QueryConstraint, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { ResourceQueryOptions } from "../resource.js";
import { getFirestoreUpdateData } from "../utils/getFirestoreUpdateData.js";

/**
 * Returns filter query that can be used to get items, count the query or compose with additional queries.
 * @param filter, will try to match the key-value pairs of this object as `where(key, "==", value)` queries.
 *      For nested keys, this gets reformated as `where(key.subkey, "==", value)` similar as to the update function
 * @param options limit, orderBy, order, skip
 * @returns firebase query object
 */
export function getWhereQuery<ResourceData extends Record<string, any>>(
    col: Query<ResourceData>,
    filter: Partial<ResourceData> | undefined,
    options?: ResourceQueryOptions,
): Query<ResourceData, DocumentData> {
    const queryFilterConstraints: QueryConstraint[] = filter
        ? Object.entries(getFirestoreUpdateData(filter)).map(([key, value]) => {
              return where(key, "==", value);
          })
        : [];
    if (options?.orderBy) {
        queryFilterConstraints.push(orderBy(options.orderBy, options.order ?? "asc"));
    }
    if (options?.limit) {
        queryFilterConstraints.push(limit(options.limit));
    }
    if (options?.skip) {
        queryFilterConstraints.push(startAfter(options.skip));
    }

    return query(col, ...queryFilterConstraints);
}
