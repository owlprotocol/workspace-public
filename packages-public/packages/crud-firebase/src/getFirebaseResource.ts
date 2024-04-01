/***** Generics for Firebase Admin CRUD *****/
import { zip } from "lodash-es";

import type { DecodeRef } from "./getDecodeRefSnapshot.js";
import { LRUMapWithDelete } from "./vendor/mnemonist.js";
import { getFirestorePathValue } from "./utils/getFirestorePathValue.js";
import { getFirestoreUpdateData } from "./utils/getFirestoreUpdateData.js";
import type {
    ResourceIdDefault,
    FirebaseResource,
    ResourceQueryOptions,
    ResourceDataValidators,
    ResourceIdValidators,
    FirebaseResourceOptions,
    FirebaseQueryResource,
} from "./resource.js";
import type { CacheWithDelete } from "./cache.js";
import type { BigNumberish } from "./common.js";
import type {
    DocumentData,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    FirestoreSDK,
    deleteDocTransactionType,
    deleteDocType,
    existsType,
    getColRefType,
    getDocRefType,
    getDocTransactionType,
    getDocType,
    runTransactionType,
    setDocTransactionType,
    setDocType,
    updateDocTransactionType,
    updateDocType,
} from "./document.js";
import type { UpdateData } from "./types.js";
import { getFirebaseQueryResourceFn } from "./getFirebaseQueryResource.js";

export type getFirebaseResourceFn<SDK extends FirestoreSDK> = <
    ResourceData extends DocumentData = DocumentData,
    ResourceIdPartial extends Record<string, any> = ResourceIdDefault,
>(
    firestore: Firestore<SDK>,
    collectionPath: string,
    validators: DecodeRef<Required<ResourceIdPartial>> &
        ResourceDataValidators<ResourceData> &
        ResourceIdValidators<ResourceIdPartial>,
    options?: FirebaseResourceOptions,
) => FirebaseResource<SDK, ResourceData, ResourceIdPartial>;

export function getFirebaseResourceForSdk<SDK extends FirestoreSDK = FirestoreSDK>(sdk: {
    getColRef: getColRefType<SDK>;
    getDocRef: getDocRefType<SDK>;
    getDoc: getDocType<SDK>;
    setDoc: setDocType<SDK>;
    updateDoc: updateDocType<SDK>;
    deleteDoc: deleteDocType<SDK>;
    exists: existsType<SDK>;
    runTransaction: runTransactionType<SDK>;
    getDocTransaction: getDocTransactionType<SDK>;
    setDocTransaction: setDocTransactionType<SDK>;
    updateDocTransaction: updateDocTransactionType<SDK>;
    deleteDocTransaction: deleteDocTransactionType<SDK>;
    getFirebaseQueryResource: getFirebaseQueryResourceFn<SDK>;
}): getFirebaseResourceFn<SDK> {
    return function getFirebaseResource<
        ResourceData extends DocumentData = DocumentData,
        ResourceIdPartial extends Record<string, any> = ResourceIdDefault,
    >(
        firestore: Firestore<SDK>,
        collectionPath: string,
        validators: DecodeRef<Required<ResourceIdPartial>> &
            ResourceDataValidators<ResourceData> &
            ResourceIdValidators<ResourceIdPartial>,
        options?: FirebaseResourceOptions,
    ): FirebaseResource<SDK, ResourceData, ResourceIdPartial> {
        //Cast to specific query type (resource data)
        const f = sdk as unknown as {
            getColRef: getColRefType<SDK, ResourceData>;
            getDocRef: getDocRefType<SDK, ResourceData>;
            getDoc: getDocType<SDK, ResourceData>;
            setDoc: setDocType<SDK, ResourceData>;
            updateDoc: updateDocType<SDK, ResourceData>;
            deleteDoc: deleteDocType<SDK>;
            exists: existsType<SDK, ResourceData>;
            runTransaction: runTransactionType<SDK>;
            getDocTransaction: getDocTransactionType<SDK, ResourceData>;
            setDocTransaction: setDocTransactionType<SDK, ResourceData>;
            updateDocTransaction: updateDocTransactionType<SDK, ResourceData>;
            deleteDocTransaction: deleteDocTransactionType<SDK>;
            getFirebaseQueryResource: getFirebaseQueryResourceFn<SDK>;
        };

        type ResourceId = Required<ResourceIdPartial>;
        type Resource = ResourceId & ResourceData;
        const cache: CacheWithDelete<string, Resource> | undefined = options?.lruCacheSize
            ? //@ts-expect-error
              new LRUMapWithDelete(options.lruCacheSize)
            : undefined;

        const { encodeId, decodeId, validateDataPartial } = validators;
        const validateData = (validators.validateData ?? validateDataPartial) as (item: ResourceData) => ResourceData;

        const col = f.getColRef(firestore, collectionPath);
        const read = f.getFirebaseQueryResource(col, validators) as FirebaseQueryResource<
            SDK,
            ResourceData,
            ResourceIdPartial
        >;

        const getDocRef = (id: ResourceId | string): DocumentReference<SDK, ResourceData> => {
            return f.getDocRef(col, encodeId(id));
        };

        /**
         * Get doc by id, no security checks
         * @param id
         * @returns doc by id
         */
        const get = async (id: ResourceId | string): Promise<Resource> => {
            const ref = getDocRef(id);
            if (cache) {
                //Check LRU cache
                const cacheResult = cache.get(ref.id);
                if (cacheResult) return cacheResult;
            }

            const refSnapshot = await f.getDoc(ref);

            if (!f.exists(refSnapshot)) {
                throw new Error(`${ref.path} not found`);
            }

            const result = { ...refSnapshot.data(), ...decodeId(ref.id) } as Resource;
            cache?.set(ref.id, result);
            return result;
        };

        /**
         * Get doc by id, no security checks
         * @param id
         * @returns doc by id
         */
        const getOrNull = async (id: ResourceId | string): Promise<Resource | null> => {
            const ref = getDocRef(id);
            if (cache) {
                //Check LRU cache
                const cacheResult = cache.get(ref.id);
                if (cacheResult) return cacheResult;
            }

            const refSnapshot = await f.getDoc(ref);

            if (!f.exists(refSnapshot)) {
                return null;
            }

            const result = { ...refSnapshot.data(), ...decodeId(ref.id) } as Resource;
            cache?.set(ref.id, result);
            return result;
        };

        /** @deprecated renamed to getOrNull */
        const getOrUndefined = getOrNull;

        /**
         * Get docs by id, no security checks
         * @param ids
         * @returns docs by id
         * //TODO: Is this the fastest way? https://stackoverflow.com/questions/59572943/is-there-a-way-to-batch-read-firebase-documents
         */
        const getBatch = async (ids: ResourceId[] | string[]): Promise<(Resource | null)[]> => {
            const refSnapshots: DocumentSnapshot<SDK, ResourceData>[] = await f.runTransaction(
                firestore,
                async (transaction) => {
                    //TODO: Promises in tx?
                    const operations = ids.map((id) => {
                        const ref = getDocRef(id);
                        return f.getDocTransaction(transaction, ref);
                    });

                    return await Promise.all(operations);
                },
            );

            return refSnapshots.map((refSnapshot) => {
                return f.exists(refSnapshot)
                    ? ({ ...refSnapshot.data(), ...decodeId(refSnapshot.id) } as Resource)
                    : null;
            });
        };

        /**
         * Set doc, returns id, no security checks
         * @param item (id optional)
         * @returns id (parameter or default autogenerated with uuidv4())
         */
        const set = async (item: ResourceIdPartial & ResourceData): Promise<string> => {
            const ref = getDocRef(encodeId(item));

            if (cache) {
                //Purge LRU cache
                cache.delete(ref.id);
            }

            await f.setDoc(ref, validateData(item));
            return ref.id;
        };

        /**
         * Set docs as a transaction (max 500 writes), no security checks
         * @param items (all with ids or none with ids)
         * @returns ids (parameter or default autogenerated with uuidv4())
         */
        const setBatch = async (items: (ResourceIdPartial & ResourceData)[]): Promise<string[]> => {
            const refs = items.map((item) => getDocRef(encodeId(item)));

            if (cache) {
                //Purge LRU cache
                refs.map((ref) => cache.delete(ref.id));
            }

            await f.runTransaction(firestore, async (transaction) => {
                const operations = zip(refs, items).map(([ref, item]) => {
                    return f.setDocTransaction(transaction, ref!, validateData(item!));
                });

                return operations;
            });

            return refs.map((r) => r.id);
        };

        /**
         * Get doc or create new one, no security checks
         * @param id
         * @param initialValue
         * @returns doc or initialValue
         */
        const getOrCreate = async (id: ResourceId | string, initialValue: ResourceData): Promise<Resource> => {
            const ref = getDocRef(id);
            if (cache) {
                //Check LRU cache
                const cacheResult = cache.get(ref.id);
                if (cacheResult) return cacheResult;
            }

            const initialValueValidated = validateData(initialValue);

            const dataExisting = await f.runTransaction(firestore, async (transaction) => {
                const refSnapshot = await f.getDocTransaction(transaction, ref);
                if (!f.exists(refSnapshot)) {
                    f.setDocTransaction(transaction, ref, initialValueValidated);
                    return undefined;
                } else {
                    return refSnapshot.data();
                }
            });

            const data = dataExisting
                ? { ...dataExisting, ...decodeId(ref.id) }
                : { ...initialValueValidated, ...decodeId(ref.id) };
            return data as Resource;
        };

        /**
         * Get first doc that matches filter or create new one
         * WARNING: NOT executed as transaction (only get supported in transaction)
         * @param filter
         * @param initialValue
         * @param options orderBy, order
         * @returns doc or initialValue
         */
        const getWhereFirstOrCreate = async (
            filter: Partial<ResourceData>,
            initialValue: ResourceIdPartial & ResourceData,
            options?: Omit<ResourceQueryOptions, "limit">,
        ): Promise<Resource> => {
            const existing = await read.getWhereFirst(filter, options);
            if (!existing) {
                const id = await set(initialValue);
                return { ...validateData(initialValue), ...decodeId(id) };
            }
            return existing;
        };

        /**
         * Update existing doc, no security checks
         * @param item
         * @returns
         */
        const update = async (item: ResourceId & Partial<ResourceData>): Promise<void> => {
            const ref = getDocRef(item);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.id);
            }

            return f.updateDoc(ref, getFirestoreUpdateData(validateDataPartial(item)) as UpdateData<ResourceData>);
        };

        /**
         * Update existing docs as a transaction (max 500 writes), no security checks
         * @param items
         * @returns
         */
        const updateBatch = async (items: (ResourceId & Partial<ResourceData>)[]): Promise<void> => {
            const refs = items.map(getDocRef);
            if (cache) {
                //Purge LRU cache
                refs.map((ref) => cache.delete(ref.id));
            }

            return f.runTransaction(firestore, async (transaction) => {
                const operations = zip(refs, items).map(([ref, item]) => {
                    return f.updateDocTransaction(
                        transaction,
                        ref!,
                        getFirestoreUpdateData(validateDataPartial(item!)) as UpdateData<ResourceData>,
                    );
                });

                return operations;
            });
        };

        /**
         * Delete doc, no security checks
         * @param id
         * @returns
         */
        const deleteById = async (id: ResourceId | string): Promise<void> => {
            const ref = getDocRef(id);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.id);
            }

            return f.deleteDoc(ref);
        };

        /**
         * Delete docs as transaction (max 500 writes), no security checks
         */
        const deleteBatch = async (ids: ResourceId[] | string[]): Promise<void> => {
            const refs = ids.map(getDocRef);
            if (cache) {
                //Purge LRU cache
                refs.map((ref) => cache.delete(ref.id));
            }

            return f.runTransaction(firestore, async (transaction) => {
                const operations = refs.map((ref) => {
                    return f.deleteDocTransaction(transaction, ref);
                });

                return operations;
            });
        };

        /**
         * Delete all docs, no security checks
         */
        const deleteAll = async (): Promise<void> => {
            return f.runTransaction(firestore, async (transaction) => {
                //TOPDO:
                const snapshot = await read.getAllSnapshot();
                if (cache) {
                    //Purge LRU cache
                    snapshot.docs.map((d) => cache.delete(d.id));
                }

                const operations = snapshot.docs.map((doc) => {
                    return f.deleteDocTransaction(transaction, doc.ref as DocumentReference<SDK>);
                });

                return operations;
            }) as any;
        };

        /**
         * Increment string value, no security checks
         * @param id
         * @param path key or nested key
         * @param value
         */
        const incrementStr = async (id: ResourceId | string, path: string, value: BigNumberish): Promise<void> => {
            const ref = getDocRef(id);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.id);
            }

            return f.runTransaction(firestore, async (transaction) => {
                const refSnapshot = await f.getDocTransaction(transaction, ref);
                if (!f.exists(refSnapshot)) {
                    throw new Error(`${ref.path} not found`);
                }

                const incrValue = BigInt(value);
                const currValueStr: BigNumberish = getFirestorePathValue(refSnapshot.data(), path) ?? "0";
                const currValue = BigInt(currValueStr);
                const newValue = currValue + incrValue;

                return f.updateDocTransaction(transaction, ref, {
                    [path]: newValue.toString(),
                } as UpdateData<ResourceData>);
            }) as any;
        };

        /**
         * Decrement string value
         * @param id
         * @param path key or nested key
         * @param value
         */
        const decrementStr = async (id: ResourceId | string, path: string, value: BigNumberish): Promise<void> => {
            return incrementStr(id, path, -BigInt(value));
        };

        /**
         * Increment number value, no security checks
         * @param id
         * @param path key or nested key
         * @param value
         */
        const incrementNumber = async (id: ResourceId | string, path: string, value: number): Promise<void> => {
            const ref = getDocRef(id);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.id);
            }

            return f.runTransaction(firestore, async (transaction) => {
                const refSnapshot = await f.getDocTransaction(transaction, ref);
                if (!f.exists(refSnapshot)) {
                    throw new Error(`${ref.path} not found`);
                }

                const currValue: number = getFirestorePathValue(refSnapshot.data(), path) ?? 0;
                const newValue = currValue + value;

                return f.updateDocTransaction(transaction, ref, { [path]: newValue } as UpdateData<ResourceData>);
            });
        };

        /**
         * Decrement number value
         * @param id
         * @param path key or nested key
         * @param value
         */
        const decrementNumber = async (id: ResourceId | string, path: string, value: number): Promise<void> => {
            return incrementNumber(id, path, value * -1);
        };

        return {
            //read
            ...read,
            collectionPath,
            //validators
            encodeId,
            decodeId,
            validateData,
            //queries
            get,
            getOrNull,
            getOrUndefined,
            getBatch,
            set,
            setBatch,
            getOrCreate,
            getWhereFirstOrCreate,
            update,
            updateBatch,
            delete: deleteById,
            deleteBatch,
            deleteAll,
            incrementStr,
            decrementStr,
            incrementNumber,
            decrementNumber,
            //other
            collection: col,
            doc: getDocRef,
            cache,
        };
    };
}
