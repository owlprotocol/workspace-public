import type { DocumentData } from "../document.js";
import type { AggregateField, AggregateQuerySnapshot, Query, QuerySnapshot } from "../query.js";
import type { OrderByDirection, WhereFilterOp } from "../types.js";

export function where<Q extends Query<"admin"> = Query<"admin">>(
    query: Q,
    fieldPath: string,
    opString: WhereFilterOp,
    value: unknown,
): Q {
    return query.where(fieldPath, opString, value) as Q;
}

export function limit<Q extends Query<"admin"> = Query<"admin">>(query: Q, limit: number): Q {
    return query.limit(limit) as Q;
}

export function orderBy<Q extends Query<"admin"> = Query<"admin">>(
    query: Q,
    fieldPath: string,
    directionStr: OrderByDirection = "asc",
): Q {
    return query.orderBy(fieldPath, directionStr) as Q;
}

export function startAfter<Q extends Query<"admin"> = Query<"admin">>(query: Q, startAfter: number): Q {
    return query.startAfter(startAfter) as Q;
}

export function count<Q extends Query<"admin"> = Query<"admin">>(
    query: Q,
): Promise<AggregateQuerySnapshot<"admin", { count: AggregateField<"admin", number> }>> {
    return query.count().get();
}

export function getDocs<T extends DocumentData = DocumentData, Q extends Query<"admin", T> = Query<"admin", T>>(
    query: Q,
): Promise<QuerySnapshot<"admin", T>> {
    return query.get() as Promise<QuerySnapshot<"admin", T>>;
}
