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
    Q extends DocumentSnapshot<"admin", T> = DocumentSnapshot<"admin", T>,
>(
    doc: Q,
    //@ts-expect-error
): doc is QueryDocumentSnapshot<"admin", T> {
    return doc.exists;
}

export function getColRef<T extends DocumentData = DocumentData>(
    firestore: Firestore<"admin">,
    path: string,
): CollectionReference<"admin", T> {
    return firestore.collection(path) as CollectionReference<"admin", T>;
}

export function getDocRef<
    T extends DocumentData = DocumentData,
    C extends CollectionReference<"admin", T> = CollectionReference<"admin", T>,
>(reference: C, path: string): DocumentReference<"admin", T> {
    return reference.doc(path);
}

export function getDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(reference: R): Promise<DocumentSnapshot<"admin", T>> {
    return reference.get();
}

export function setDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(reference: R, data: T): Promise<void>;
export function setDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(reference: R, data: Partial<T>, options?: SetOptions): Promise<void>;
export function setDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(reference: R, data: Partial<T>, options?: SetOptions): Promise<void> {
    return reference.set(data, options ?? {}) as unknown as Promise<void>;
}

export function updateDoc<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(reference: R, data: UpdateData<T>): Promise<void> {
    return reference.update(data) as unknown as Promise<void>;
}

export function deleteDoc<R extends DocumentReference<"admin"> = DocumentReference<"admin">>(
    reference: R,
): Promise<void> {
    return reference.delete() as unknown as Promise<void>;
}

/***** Transactions *****/
/** Run transaction */
export function runTransaction<T>(
    firestore: Firestore<"admin">,
    updateFunction: (transaction: Transaction<"admin">) => Promise<T>,
    transactionOptions?: { maxAttempts?: number },
): Promise<T> {
    return firestore.runTransaction(updateFunction, transactionOptions);
}

export function getDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(transaction: Transaction<"admin">, reference: R): Promise<DocumentSnapshot<"admin", T>> {
    return transaction.get(reference);
}

export function setDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(transaction: Transaction<"admin">, reference: R, data: T): Transaction<"admin">;
export function setDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(transaction: Transaction<"admin">, reference: R, data: Partial<T>, options?: SetOptions): Transaction<"admin">;
export function setDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(transaction: Transaction<"admin">, reference: R, data: Partial<T>, options?: SetOptions): Transaction<"admin"> {
    return transaction.set(reference, data, options ?? {});
}

export function updateDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(transaction: Transaction<"admin">, reference: R, data: UpdateData<T>): Transaction<"admin"> {
    return transaction.update(reference, data as any);
}

export function deleteDocTransaction<
    T extends DocumentData = DocumentData,
    R extends DocumentReference<"admin", T> = DocumentReference<"admin", T>,
>(transaction: Transaction<"admin">, reference: R): Transaction<"admin"> {
    return transaction.delete(reference);
}
