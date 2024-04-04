import {
    getDoc as getDocWeb,
    setDoc as setDocWeb,
    updateDoc as updateDocWeb,
    deleteDoc as deleteDocWeb,
    doc as getDocRefWeb,
    collection as getColRefWeb,
    runTransaction as runTransactionWeb,
    writeBatch as writeBatchWeb,
} from "firebase/firestore";
import type {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    QueryDocumentSnapshot,
    DocumentData,
    Firestore,
    Transaction,
    WriteBatch,
} from "../document.js";
import type { SetOptions, UpdateData } from "../types.js";

export function exists<
    T extends DocumentData = DocumentData,
    Q extends DocumentSnapshot<"web", T> = DocumentSnapshot<"web", T>,
>(
    doc: Q,
    //@ts-expect-error
): doc is QueryDocumentSnapshot<"web", T> {
    return doc.exists();
}

export function getColRef<T extends DocumentData = DocumentData>(
    firestore: Firestore<"web">,
    path: string,
): CollectionReference<"web", T> {
    return getColRefWeb(firestore, path) as CollectionReference<"web", T>;
}

export function getDocRef<
    T extends DocumentData = DocumentData,
    C extends CollectionReference<"web", T> = CollectionReference<"web", T>,
>(reference: C, path: string): DocumentReference<"web", T> {
    return getDocRefWeb(reference, path);
}

export function getDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(reference: R): Promise<DocumentSnapshot<"web", T>> {
    return getDocWeb(reference);
}

export function setDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(reference: R, data: T): Promise<void>;
export function setDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(reference: R, data: Partial<T>, options: SetOptions): Promise<void>;
export function setDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(reference: R, data: Partial<T>, options?: SetOptions): Promise<void> {
    return setDocWeb(reference, data, options ?? {}) as unknown as Promise<void>;
}

export function updateDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(reference: R, data: UpdateData<T>): Promise<void> {
    return updateDocWeb(reference as any, data as any) as unknown as Promise<void>;
}

export function deleteDoc<R extends DocumentReference<"web"> = DocumentReference<"web">>(reference: R): Promise<void> {
    return deleteDocWeb(reference) as unknown as Promise<void>;
}

/***** Write Batch *****/
export function getWriteBatch(firestore: Firestore<"web">): WriteBatch<"web"> {
    return writeBatchWeb(firestore);
}

export function setDocWriteBatch<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(batch: WriteBatch<"web">, reference: R, data: T): WriteBatch<"web">;
export function setDocWriteBatch<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(batch: WriteBatch<"web">, reference: R, data: Partial<T>, options?: SetOptions): WriteBatch<"web">;
export function setDocWriteBatch<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(batch: WriteBatch<"web">, reference: R, data: Partial<T>, options?: SetOptions): WriteBatch<"web"> {
    return batch.set(reference, data, options ?? {});
}

export function updateDocWriteBatch<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(batch: WriteBatch<"web">, reference: R, data: UpdateData<T>): WriteBatch<"web"> {
    return batch.update(reference, data as any);
}

export function deleteDocWriteBatch<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(batch: WriteBatch<"web">, reference: R): WriteBatch<"web"> {
    return batch.delete(reference);
}

export function commitWriteBatch(batch: WriteBatch<"web">): Promise<void> {
    return batch.commit();
}

/***** Transactions *****/
/** Run transaction */
export function runTransaction<T>(
    firestore: Firestore<"web">,
    updateFunction: (transaction: Transaction<"web">) => Promise<T>,
    transactionOptions?: { maxAttempts?: number },
): Promise<T> {
    return runTransactionWeb(firestore, updateFunction, transactionOptions);
}

export function getDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(transaction: Transaction<"web">, reference: R): Promise<DocumentSnapshot<"web", T>> {
    return transaction.get(reference);
}

export function setDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(transaction: Transaction<"web">, reference: R, data: T): Transaction<"web">;
export function setDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(transaction: Transaction<"web">, reference: R, data: Partial<T>, options?: SetOptions): Transaction<"web">;
export function setDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(transaction: Transaction<"web">, reference: R, data: Partial<T>, options?: SetOptions): Transaction<"web"> {
    return transaction.set(reference, data, options ?? {});
}

export function updateDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(transaction: Transaction<"web">, reference: R, data: UpdateData<T>): Transaction<"web"> {
    return transaction.update(reference, data as any);
}

export function deleteDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"web", T> = DocumentReference<"web", T>,
>(transaction: Transaction<"web">, reference: R): Transaction<"web"> {
    return transaction.delete(reference);
}
