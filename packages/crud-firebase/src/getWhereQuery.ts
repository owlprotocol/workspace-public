/***** Generics for Firebase Web CRUD *****/
import type { DocumentData, FirestoreSDK } from "./document.js";
import type { Query, limitType, orderByType, startAfterType, whereType } from "./query.js";
import type { ResourceQueryOptions } from "./resource.js";
import { getFirestoreUpdateData } from "./utils/getFirestoreUpdateData.js";

export type getWhereQueryFn<
    SDK extends FirestoreSDK,
    ResourceDataEncoded extends DocumentData = DocumentData,
    Q extends Query<SDK, ResourceDataEncoded> = Query<SDK, ResourceDataEncoded>,
> = (col: Q, filter: Partial<ResourceDataEncoded> | undefined, options?: ResourceQueryOptions) => Q;

/**
 * Create getWhereQuery function for sdk
 * @param sdk
 * @returns
 */
export function getWhereQueryForSdk<SDK extends FirestoreSDK = FirestoreSDK>(sdk: {
    where: whereType<SDK>;
    limit: limitType<SDK>;
    orderBy: orderByType<SDK>;
    startAfter: startAfterType<SDK>;
}): getWhereQueryFn<SDK> {
    function getWhereQuery<
        ResourceDataEncoded extends DocumentData = DocumentData,
        Q extends Query<SDK, ResourceDataEncoded> = Query<SDK, ResourceDataEncoded>,
    >(col: Q, filter: Partial<ResourceDataEncoded> | undefined, options?: ResourceQueryOptions): Q {
        //Cast to specific query type (resource data)
        const { where, limit, orderBy, startAfter } = sdk as unknown as {
            where: whereType<SDK, ResourceDataEncoded, Q>;
            limit: limitType<SDK, ResourceDataEncoded, Q>;
            orderBy: orderByType<SDK, ResourceDataEncoded, Q>;
            startAfter: startAfterType<SDK, ResourceDataEncoded, Q>;
        };

        let query: Q = col;

        if (filter) {
            Object.entries(getFirestoreUpdateData(filter)).forEach(([key, value]) => {
                query = where(query, key, "==", value);
            });
        }
        if (options?.orderBy) {
            query = orderBy(query, options.orderBy, options.order ?? "asc");
        }
        if (options?.limit) {
            query = limit(query, options.limit);
        }
        if (options?.skip) {
            query = startAfter(query, options.skip);
        }

        return query;
    }

    return getWhereQuery;
}
