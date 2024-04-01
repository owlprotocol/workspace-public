import {
    getDoc as getDocWeb,
    setDoc as setDocWeb,
    updateDoc as updateDocWeb,
    deleteDoc as deleteDocWeb,
    doc as getDocRefWeb,
    collection as getColRefWeb,
    runTransaction as runTransactionWeb,
} from "firebase/firestore";
import type {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    QueryDocumentSnapshot,
    DocumentData,
    Firestore,
    Transaction,
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
>(reference: R, data: Partial<T>, options?: SetOptions): Promise<void>;
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
