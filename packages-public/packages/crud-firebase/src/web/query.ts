import {
    collectionGroup as getColGroupRefWeb,
    query as queryWeb,
    where as whereWeb,
    limit as limitWeb,
    orderBy as orderByWeb,
    startAfter as startAfterWeb,
    getDocs as getDocsWeb,
    getCountFromServer,
} from "firebase/firestore";
import type { DocumentData, Firestore } from "../document.js";
import type { AggregateField, AggregateQuerySnapshot, Query, QuerySnapshot } from "../query.js";
import type { OrderByDirection, WhereFilterOp } from "../types.js";

export function getColGroupRef<T extends DocumentData = DocumentData>(
    firestore: Firestore<"web">,
    path: string,
): Query<"web", T> {
    return getColGroupRefWeb(firestore, path) as Query<"web", T>;
}

export function where<Q extends Query<"web"> = Query<"web">>(
    query: Q,
    fieldPath: string,
    opString: WhereFilterOp,
    value: unknown,
): Q {
    return queryWeb(query, whereWeb(fieldPath, opString, value)) as Q;
}

export function limit<Q extends Query<"web"> = Query<"web">>(query: Q, limit: number): Q {
    return queryWeb(query, limitWeb(limit)) as Q;
}

export function orderBy<Q extends Query<"web"> = Query<"web">>(
    query: Q,
    fieldPath: string,
    directionStr: OrderByDirection = "asc",
): Q {
    return queryWeb(query, orderByWeb(fieldPath, directionStr)) as Q;
}

export function startAfter<Q extends Query<"web"> = Query<"web">>(query: Q, startAfter: number): Q {
    return queryWeb(query, startAfterWeb(startAfter)) as Q;
}

export function count<Q extends Query<"web"> = Query<"web">>(
    query: Q,
): Promise<AggregateQuerySnapshot<"web", { count: AggregateField<"web", number> }>> {
    return getCountFromServer(query) as any;
}

export function getDocs<T extends DocumentData = DocumentData, Q extends Query<"web", T> = Query<"web", T>>(
    query: Q,
): Promise<QuerySnapshot<"web", T>> {
    return getDocsWeb(query) as Promise<QuerySnapshot<"web", T>>;
}
