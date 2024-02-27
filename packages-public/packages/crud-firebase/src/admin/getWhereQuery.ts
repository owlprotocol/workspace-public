/***** Generics for Firebase Admin CRUD *****/
import { Query } from "firebase-admin/firestore";
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
): Query<ResourceData> {
    let query: Query<ResourceData> = col;

    if (filter) {
        Object.entries(getFirestoreUpdateData(filter)).forEach(([key, value]) => {
            query = query.where(key, "==", value);
        });
    }
    if (options?.orderBy) {
        query = query.orderBy(options.orderBy, options.order ?? "asc");
    }
    if (options?.limit) {
        query.limit(options.limit);
    }
    if (options?.skip) {
        query.startAfter(options.skip);
    }

    return query;
}
