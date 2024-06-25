import type { Query as QueryAdmin, QuerySnapshot as QuerySnapshotAdmin } from "firebase-admin/firestore";
import type {
    AggregateQuerySnapshot as AggregateQuerySnapshotAdmin,
    AggregateSpec as AggregateSpecAdmin,
    AggregateField as AggregateFieldAdmin,
} from "@google-cloud/firestore";
import type {
    Query as QueryWeb,
    QuerySnapshot as QuerySnapshotWeb,
    AggregateQuerySnapshot as AggregateQuerySnapshotWeb,
    AggregateSpec as AggregateSpecWeb,
    AggregateField as AggregateFieldWeb,
} from "firebase/firestore";
import type { DocumentData, FirestoreSDK } from "./document.js";
import type { OrderByDirection, WhereFilterOp } from "./types.js";

/***** Query *****/
export type Query<SDK extends FirestoreSDK = FirestoreSDK, T extends DocumentData = DocumentData> = SDK extends "admin"
    ? QueryAdmin<T>
    : SDK extends "web"
    ? QueryWeb<T>
    : QueryAdmin<T> | QueryWeb<T>;

/***** Query Snapshot *****/
export type QuerySnapshot<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
> = SDK extends "admin"
    ? QuerySnapshotAdmin<T>
    : SDK extends "web"
    ? QuerySnapshotWeb<T>
    : QuerySnapshotAdmin<T> | QuerySnapshotWeb<T>;

export type AggregateField<SDK extends FirestoreSDK = FirestoreSDK, T = any> = SDK extends "admin"
    ? AggregateFieldAdmin<T>
    : SDK extends "web"
    ? AggregateFieldWeb<T>
    : AggregateFieldAdmin<T> | AggregateFieldWeb<T>;

export type AggregateSpec<SDK extends FirestoreSDK = FirestoreSDK> = SDK extends "admin"
    ? AggregateSpecAdmin
    : SDK extends "web"
    ? AggregateSpecWeb
    : AggregateSpecAdmin | AggregateSpecWeb;

//TODO: Check sdk extends admin/web?
export type AggregateQuerySnapshot<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends AggregateSpec<SDK> = AggregateSpec<SDK>,
> = T extends AggregateSpecAdmin
    ? AggregateQuerySnapshotAdmin<T>
    : T extends AggregateSpecWeb
    ? AggregateQuerySnapshotWeb<T>
    : never;

export type whereType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    Q extends Query<SDK, T> = Query<SDK, T>,
> = (query: Q, fieldPath: string, opString: WhereFilterOp, value: unknown) => Q;

export type limitType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    Q extends Query<SDK, T> = Query<SDK, T>,
> = (query: Q, limit: number) => Q;
export type orderByType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    Q extends Query<SDK, T> = Query<SDK, T>,
> = (query: Q, fieldPath: string, directionStr: OrderByDirection) => Q;
export type startAfterType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    Q extends Query<SDK, T> = Query<SDK, T>,
> = (query: Q, startAfter: number) => Q;
export type countType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    Q extends Query<SDK, T> = Query<SDK, T>,
> = (
    query: Q,
) => Promise<
    SDK extends "admin"
        ? AggregateQuerySnapshotAdmin<{ count: AggregateFieldAdmin<number> }>
        : SDK extends "web"
        ? AggregateQuerySnapshotWeb<{ count: AggregateFieldWeb<number> }>
        :
              | AggregateQuerySnapshotAdmin<{ count: AggregateFieldAdmin<number> }>
              | AggregateQuerySnapshotWeb<{ count: AggregateFieldWeb<number> }>
>;
export type getDocsType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    Q extends Query<SDK, T> = Query<SDK, T>,
> = (query: Q) => Promise<QuerySnapshot<SDK, T>>;
