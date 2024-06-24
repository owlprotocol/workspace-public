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

/*********************************************************************
 *
 *                  Standardized Firebase SDK Types
 *
 * These types standardize types between the firebase/firestore and
 * firebase-admin packages. This enables us to write shared code
 * that can work both on the client and server.
 *
 * Sometimes types have to be cast to unknown to get the desired outcome
 * as the packages do not fully overlap. When this is done, we ALWAYS
 * make sure this makes sense by checking the underlying package.
 *
 *********************************************************************/

/********** SDK Interfaces **********/

/** Firestore SDK Type */
export type FirestoreSDK = "admin" | "web";
/**
 * Firestore instance for sdk
 * @template SDK Firebase SDK type
 */
export type Firestore<SDK extends FirestoreSDK = FirestoreSDK> = SDK extends "admin"
    ? FirestoreAdmin
    : SDK extends "web"
    ? FirestoreWeb
    : FirestoreAdmin | FirestoreWeb;

/**
 * Collection Reference for sdk - Points to a set of multiple documents
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 */
export type CollectionReference<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
> = SDK extends "admin"
    ? CollectionReferenceAdmin<T>
    : SDK extends "web"
    ? CollectionReferenceWeb<T>
    : CollectionReferenceAdmin<T> | CollectionReferenceWeb<T>;

/**
 * Document Reference for skd - No Data, Just a reference
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 */
export type DocumentReference<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
> = SDK extends "admin"
    ? DocumentReferenceAdmin<T>
    : SDK extends "web"
    ? DocumentReferenceWeb<T>
    : DocumentReferenceAdmin<T> | DocumentReferenceWeb<T>;

/**
 * Document Snapshot - Data MAY be undefined
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 */
export type DocumentSnapshot<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
> = SDK extends "admin"
    ? DocumentSnapshotAdmin<T>
    : SDK extends "web"
    ? DocumentSnapshotWeb<T>
    : DocumentSnapshotAdmin<T> | DocumentSnapshotWeb<T>;

/**
 * Query Document Snapshot - Data ALWAYS defined
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 */
export type QueryDocumentSnapshot<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
> = SDK extends "admin"
    ? QueryDocumentSnapshotAdmin<T>
    : SDK extends "web"
    ? QueryDocumentSnapshotWeb<T>
    : QueryDocumentSnapshotAdmin<T> | QueryDocumentSnapshotWeb<T>;

/********** SDK Functions **********/
/***** Get Document Reference *****/

/**
 * Get a Collection Reference
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 * @param firestore Firestore instance
 * @param path Path to collection
 * @returns collection reference
 */
export type getColRefType<SDK extends FirestoreSDK = FirestoreSDK, T extends DocumentData = DocumentData> = (
    firestore: Firestore<SDK>,
    path: string,
) => CollectionReference<SDK, T>;

/**
 * Get a Document Reference
 * Function is polymorphic, supports collection and firestore object as parameter.
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 * @template C CollectionReference type (mostly use default)
 * @param col collection or firestore
 * @param path paths
 * @returns document reference
 */
export type getDocRefType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    C extends CollectionReference<SDK, T> = CollectionReference<SDK, T>,
> = {
    (col: C, path: string, ...pathSegments: string[]): DocumentReference<SDK, T>;
    (firestore: Firestore<SDK>, path: string, ...pathSegments: string[]): DocumentReference<SDK, T>;
};

/**
 * Document Snapshot Exists
 * If true, this triggers a typeguard converting to a QueryDocumentSnapshot
 * which has `data: T` instead of `data: T | undefined`.
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 * @template S DocumentSnapshot type (mostly use default)
 * @template doc document snapshot
 * @returns whether document exists (has data)
 */
export type existsType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    S extends DocumentSnapshot<SDK, T> = DocumentSnapshot<SDK, T>,
    //@ts-expect-error
> = (doc: S) => doc is QueryDocumentSnapshot<SDK, T>;

/***** Read Document *****/

/**
 * Get snapshot for document reference
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 * @template R DocumentReference type (mostly use default)
 * @param ref document reference
 * @returns document snapshot with potentially data
 */
export type getDocType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (ref: R) => Promise<DocumentSnapshot<SDK, T>>;

/***** Write Document *****/

/**
 * Set doc data
 * @warning Function is polymorphic, if data is `Partial<T>`, user MUST provide
 * `SetOptions` to define how to merge fields with potentially existing data. This
 * logic comes from both firebase sdks.
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 * @template R DocumentReference type (mostly use default)
 * @param reference document reference
 * @param data set data
 * @returns `Promise<void>` resolves when doc is set
 */
export type setDocType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = { (reference: R, data: T): Promise<void>; (reference: R, data: Partial<T>, options: SetOptions): Promise<void> };

/**
 * Update doc data
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 * @template R DocumentReference type (mostly use default)
 * @param reference document reference
 * @param data update data
 * @returns `Promise<void>` resolves when doc is updated
 */
export type updateDocType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (reference: R, data: UpdateData<T>) => Promise<void>;

/**
 * Delete doc
 * @template SDK Firebase SDK type
 * @template R DocumentReference type (mostly use default)
 * @param reference document reference
 * @returns `Promise<void>` resolves when doc is deleted
 */
export type deleteDocType<
    SDK extends FirestoreSDK = FirestoreSDK,
    R extends DocumentReference<SDK> = DocumentReference<SDK>,
> = (reference: R) => Promise<void>;

/***** WriteBatch ******/
/**
 * WriteBatch for sdk
 * @template SDK Firebase SDK type
 */
export type WriteBatch<SDK extends FirestoreSDK = FirestoreSDK> = SDK extends "admin"
    ? WriteBatchAdmin
    : SDK extends "web"
    ? WriteBatchWeb
    : WriteBatchAdmin | WriteBatchWeb;

/**
 * Create a write batch
 * @template SDK Firebase SDK type
 * @param firestore Firestore instance
 * @returns write batch
 */
export type getWriteBatchType<SDK extends FirestoreSDK = FirestoreSDK> = (firestore: Firestore<SDK>) => WriteBatch<SDK>;

/**
 * Set doc with write batch
 * @warning Function is polymorphic, if data is `Partial<T>`, user MUST provide
 * `SetOptions` to define how to merge fields with potentially existing data. This
 * logic comes from both firebase sdks.
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 * @template R DocumentReference type (mostly use default)
 * @param batch write batch
 * @param reference document reference
 * @param data set data
 * @param options set options (eg. `merge: boolean | undefined`)
 * @returns updated write batch
 */
export type setDocWriteBatchType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = {
    (batch: WriteBatch<SDK>, reference: R, data: T): WriteBatch<SDK>;
    (batch: WriteBatch<SDK>, reference: R, data: Partial<T>, options: SetOptions): WriteBatch<SDK>;
};

/**
 * Update doc with write batch
 * @template SDK Firebase SDK type
 * @template T DocumentData type
 * @template R DocumentReference type (mostly use default)
 * @param batch write batch
 * @param reference document reference
 * @param data update data
 * @returns updated write batch
 */
export type updateDocWriteBatchType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (batch: WriteBatch<SDK>, reference: R, data: UpdateData<T>) => WriteBatch<SDK>;

/**
 * Delete doc with write batch
 * @template SDK Firebase SDK type
 * @template R DocumentReference type (mostly use default)
 * @param batch write batch
 * @param reference document reference
 * @returns updated write batch
 */
export type deleteDocWriteBatchType<
    SDK extends FirestoreSDK = FirestoreSDK,
    R extends DocumentReference<SDK> = DocumentReference<SDK>,
> = (batch: WriteBatch<SDK>, reference: R) => WriteBatch<SDK>;

/**
 * Commit write batch
 * @template SDK Firebase SDK type
 * @param batch write batch
 * @returns `Promise<void>` resolves when batch is committed
 */
export type commitWriteBatchType<SDK extends FirestoreSDK = FirestoreSDK> = (batch: WriteBatch<SDK>) => Promise<void>;

/***** Transactions *****/
/**
 * Firebase transaction to execute complex changes atomically.
 * @template SDK Firebase SDK type
 */
export type Transaction<SDK extends FirestoreSDK = FirestoreSDK> = SDK extends "admin"
    ? TransactionAdmin
    : SDK extends "web"
    ? TransactionWeb
    : TransactionAdmin | TransactionWeb;

//TODO: Add getAll, create, overloads

/**
 * Run transaction, can execute a sequence of reads, and after that a sequence of writes.
 * @template SDK Firebase SDK type
 * @template T Transaction return type
 * @param firestore Firestore instance
 * @param updateFunction A function to update the transaction and execute its logic
 * @param transactionOptions Additional options to replay transaction (default `maxAttempts = 5`)
 * @returns a Firestore transaction
 */
export type runTransactionType<SDK extends FirestoreSDK = FirestoreSDK, T = any> = (
    firestore: Firestore<SDK>,
    updateFunction: (transaction: Transaction<SDK>) => Promise<T>,
    transactionOptions?: { maxAttempts?: number },
) => Promise<T>;

/**
 * Get doc with transaction
 * @template SDK Firebase SDK type
 * @template T Transaction return type
 * @template R DocumentReference type (mostly use default)
 * @param transaction transaction to use
 * @param ref document reference
 * @returns document snapshot with potentially data
 */
export type getDocTransactionType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (transaction: Transaction<SDK>, ref: R) => Promise<DocumentSnapshot<SDK, T>>;

/**
 * Set doc with transaction
 * @warning Function is polymorphic, if data is `Partial<T>`, user MUST provide
 * `SetOptions` to define how to merge fields with potentially existing data. This
 * logic comes from both firebase sdks.
 * @template SDK Firebase SDK type
 * @template T Transaction return type
 * @template R DocumentReference type (mostly use default)
 * @param transaction transaction to use
 * @param reference document reference
 * @param data set data
 * @returns updated transaction
 */
export type setDocTransactionType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = {
    (transaction: Transaction<SDK>, reference: R, data: T): Transaction<SDK>;
    (transaction: Transaction<SDK>, reference: R, data: Partial<T>, options: SetOptions): Transaction<SDK>;
};

/**
 * Update doc with transaction
 * @template SDK Firebase SDK type
 * @template T Transaction return type
 * @template R DocumentReference type (mostly use default)
 * @param transaction transaction to use
 * @param reference document reference
 * @param data update data
 * @returns updated transaction
 */
export type updateDocTransactionType<
    SDK extends FirestoreSDK = FirestoreSDK,
    T extends DocumentData = DocumentData,
    R extends DocumentReference<SDK, T> = DocumentReference<SDK, T>,
> = (transaction: Transaction<SDK>, reference: R, data: UpdateData<T>) => Transaction<SDK>;

/**
 * Delete doc with transaction
 * @template SDK Firebase SDK type
 * @template R DocumentReference type (mostly use default)
 * @param transaction transaction to use
 * @param reference document reference
 * @returns updated transaction
 */
export type deleteDocTransactionType<
    SDK extends FirestoreSDK = FirestoreSDK,
    R extends DocumentReference<SDK> = DocumentReference<SDK>,
> = (transaction: Transaction<SDK>, reference: R) => Transaction<SDK>;
