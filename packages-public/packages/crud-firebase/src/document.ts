import type {
    Firestore as FirestoreAdmin,
    WriteBatch as WriteBatchAdmin,
    Transaction as TransactionAdmin,
    CollectionReference as CollectionReferenceAdmin,
    DocumentReference as DocumentReferenceAdmin,
    DocumentSnapshot as DocumentSnapshotAdmin,
    QueryDocumentSnapshot as QueryDocumentSnapshotAdmin,
} from "firebase-admin/firestore";
import type {
    Firestore as FirestoreWeb,
    WriteBatch as WriteBatchWeb,
    Transaction as TransactionWeb,
    CollectionReference as CollectionReferenceWeb,
    DocumentReference as DocumentReferenceWeb,
    DocumentSnapshot as DocumentSnapshotWeb,
    QueryDocumentSnapshot as QueryDocumentSnapshotWeb,
} from "firebase/firestore";
import type { SetOptions, UpdateData } from "./types.js";

export type DocumentData = Record<string, any>;

/***** Firestore ******/
export type FirestoreSDK = "admin" | "web";
export type Firestore<SDK extends FirestoreSDK = FirestoreSDK> = SDK extends "admin"
    ? FirestoreAdmin
    : SDK extends "web"
    ? FirestoreWeb
    : FirestoreAdmin | FirestoreWeb;

/***** Collection Reference - Points to a set of multiple documents */
export type CollectionReference<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
> = SDK extends "admin"
    ? CollectionReferenceAdmin<T>
    : SDK extends "web"
    ? CollectionReferenceWeb<T>
    : CollectionReferenceAdmin<T> | CollectionReferenceWeb<T>;

/***** Document Reference - No Data, Just a reference *****/
export type DocumentReference<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
> = SDK extends "admin"
    ? DocumentReferenceAdmin<T>
    : SDK extends "web"
    ? DocumentReferenceWeb<T>
    : DocumentReferenceAdmin<T> | DocumentReferenceWeb<T>;

/***** Document Snapshot - Data MAY be undefined *****/
export type DocumentSnapshot<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
> = SDK extends "admin"
    ? DocumentSnapshotAdmin<T>
    : SDK extends "web"
    ? DocumentSnapshotWeb<T>
    : DocumentSnapshotAdmin<T> | DocumentSnapshotWeb<T>;

/***** Query Document Snapshot - Data ALWAYS defined */
export type QueryDocumentSnapshot<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
> = SDK extends "admin"
    ? QueryDocumentSnapshotAdmin<T>
    : SDK extends "web"
    ? QueryDocumentSnapshotWeb<T>
    : QueryDocumentSnapshotAdmin<T> | QueryDocumentSnapshotWeb<T>;

/***** Functions *****/
/* Collection Reference */
export type getColRefType<SDK extends FirestoreSDK = FirestoreSDK, T extends DocumentData = DocumentData> = (
    firestore: Firestore<SDK>,
    path: string,
) => CollectionReference<SDK, T>;

/* Document Reference */
export type getDocRefType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    C extends CollectionReference<SDK, T> = CollectionReference<SDK, T>,
> = {
    (col: C, path: string, ...pathSegments: string[]): DocumentReference<SDK, T>;
    (firestore: Firestore<SDK>, path: string, ...pathSegments: string[]): DocumentReference<SDK, T>;
};

/** Document Snapshot */
/** Snapshot exists */
//C extends CollectionReference<infer SDK, infer T> ? DocumentReference<SDK, T> : never;
export type existsType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    S extends DocumentSnapshot<SDK, T> = DocumentSnapshot<SDK, T>,
    //@ts-expect-error
> = (doc: S) => doc is QueryDocumentSnapshot<SDK, T>;

/** Get snapshot data */
export type getDocType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (ref: R) => Promise<DocumentSnapshot<SDK, T>>;

/** Write Document Reference */
/** Set doc */
export type setDocType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = { (reference: R, data: T): Promise<void>; (reference: R, data: Partial<T>, options: SetOptions): Promise<void> };

/** Update doc */
export type updateDocType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (reference: R, data: UpdateData<T>) => Promise<void>;

/** Delete doc */
export type deleteDocType<
    SDK extends FirestoreSDK = FirestoreSDK,
    R extends DocumentReference<SDK> = DocumentReference<SDK>,
> = (reference: R) => Promise<void>;

/***** WriteBatch ******/
export type WriteBatch<SDK extends FirestoreSDK = FirestoreSDK> = SDK extends "admin"
    ? WriteBatchAdmin
    : SDK extends "web"
    ? WriteBatchWeb
    : WriteBatchAdmin | WriteBatchWeb;

/** Create write batch */
export type getWriteBatchType<SDK extends FirestoreSDK = FirestoreSDK> = (firestore: Firestore<SDK>) => WriteBatch<SDK>;

/** Set doc with write batch */
export type setDocWriteBatchType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> =
    | ((batch: WriteBatch<SDK>, reference: R, data: T) => WriteBatch<SDK>)
    | ((batch: WriteBatch<SDK>, reference: R, data: Partial<T>, options?: SetOptions) => WriteBatch<SDK>);

/** Update doc with write batch */
export type updateDocWriteBatchType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (batch: WriteBatch<SDK>, reference: R, data: UpdateData<T>) => WriteBatch<SDK>;

/** Delete doc with write batch */
export type deleteDocWriteBatchType<
    SDK extends FirestoreSDK = FirestoreSDK,
    R extends DocumentReference<SDK> = DocumentReference<SDK>,
> = (batch: WriteBatch<SDK>, reference: R) => WriteBatch<SDK>;

/** Delete doc with write batch */
export type commitWriteBatchType<SDK extends FirestoreSDK = FirestoreSDK> = (batch: WriteBatch<SDK>) => Promise<void>;

/***** Transactions *****/
export type Transaction<SDK extends FirestoreSDK = FirestoreSDK> = SDK extends "admin"
    ? TransactionAdmin
    : SDK extends "web"
    ? TransactionWeb
    : TransactionAdmin | TransactionWeb;

//TODO: Add getAll, create, overloads
/** Run transaction */
export type runTransactionType<SDK extends FirestoreSDK = FirestoreSDK, T = any> = (
    firestore: Firestore<SDK>,
    updateFunction: (transaction: Transaction<SDK>) => Promise<T>,
    transactionOptions?: { maxAttempts?: number },
) => Promise<T>;

/** Get doc with transaction */
export type getDocTransactionType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (transaction: Transaction<SDK>, ref: R) => Promise<DocumentSnapshot<SDK, T>>;

/** Set doc with transaction */
export type setDocTransactionType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> =
    | ((transaction: Transaction<SDK>, reference: R, data: T) => Transaction<SDK>)
    | ((transaction: Transaction<SDK>, reference: R, data: Partial<T>, options?: SetOptions) => Transaction<SDK>);

/** Update doc with transaction */
export type updateDocTransactionType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (transaction: Transaction<SDK>, reference: R, data: UpdateData<T>) => Transaction<SDK>;

/** Delete doc with transaction */
export type deleteDocTransactionType<
    SDK extends FirestoreSDK = FirestoreSDK,
    R extends DocumentReference<SDK> = DocumentReference<SDK>,
> = (transaction: Transaction<SDK>, reference: R) => Transaction<SDK>;
