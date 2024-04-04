/***** Generics for Firebase Admin CRUD *****/
import { zip } from "lodash-es";

import { AsEmptyRecord, Prettify, TypeEqual } from "@owlprotocol/utils/types";
import { getDecodeRefSnapshot } from "./getDecodeRefSnapshot.js";
import { LRUMapWithDelete } from "./vendor/mnemonist.js";
import { getFirestorePathValue } from "./utils/getFirestorePathValue.js";
import { getFirestoreUpdateData } from "./utils/getFirestoreUpdateData.js";
import type {
    FirebaseResource,
    ResourceQueryOptions,
    ResourceDataValidators,
    FirebaseResourceOptions,
} from "./resource.js";
import type { CacheWithDelete } from "./cache.js";
import type { BigNumberish } from "./common.js";
import type {
    CollectionReference,
    DocumentData,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    FirestoreSDK,
    WriteBatch,
    commitWriteBatchType,
    deleteDocTransactionType,
    deleteDocType,
    deleteDocWriteBatchType,
    existsType,
    getColRefType,
    getDocRefType,
    getDocTransactionType,
    getDocType,
    getWriteBatchType,
    runTransactionType,
    setDocTransactionType,
    setDocType,
    setDocWriteBatchType,
    updateDocTransactionType,
    updateDocType,
    updateDocWriteBatchType,
} from "./document.js";
import type { SetOptions, UpdateData } from "./types.js";
import { getFirebaseQueryResourceFn } from "./getFirebaseQueryResource.js";
import { Query, getDocsType } from "./query.js";

//TODO: Prettify all
export type getFirebaseResourceFn<SDK extends FirestoreSDK> = <
    ResourceData extends DocumentData = DocumentData,
    ResourceIdPartial extends Record<string, any> = Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
    ResourceDataInput extends DocumentData = ResourceData,
    ResourceDataEncoded extends DocumentData = ResourceData,
    CollectionFn extends TypeEqual<CollectionId, Record<string, never>> extends true
        ? CollectionReference<SDK, ResourceDataEncoded> //undefined CollectionId, Collection MUST be defined
        : //defined CollectionId, CollectionFactory MUST be defined
          (collectionId: CollectionId) => CollectionReference<SDK, ResourceDataEncoded> = TypeEqual<
        CollectionId,
        Record<string, never>
    > extends true
        ? CollectionReference<SDK, ResourceDataEncoded> //Default type, undefined CollectionId, Collection MUST be defined
        : (collectionId: CollectionId) => CollectionReference<SDK, ResourceDataEncoded>, //Default type, defined CollectionId, CollectionFactory MUST be defined
>(
    firestore: Firestore<SDK>,
    //TODO: Used to be called collectionPath
    collection: CollectionFn,
    validators: ResourceDataValidators<
        ResourceData,
        ResourceIdPartial,
        CollectionId,
        ResourceDataInput,
        ResourceDataEncoded
    >,
    options?: FirebaseResourceOptions,
) => FirebaseResource<
    SDK,
    ResourceData,
    ResourceIdPartial,
    CollectionId,
    ResourceDataInput,
    ResourceDataEncoded,
    CollectionFn
>;

/**
 * Factory function for generating Firebase Query Resource.
 * @template SDK Firestore sdk type ("admin" or "web")
 * @param sdk generic sdk functions
 * @returns getFirebaseResource function that works with relevant sdk
 */
export function getFirebaseResourceForSdk<SDK extends FirestoreSDK = FirestoreSDK>(sdk: {
    getColRef: getColRefType<SDK>;
    getDocRef: getDocRefType<SDK>;
    getDoc: getDocType<SDK>;
    getDocs: getDocsType<SDK>;
    setDoc: setDocType<SDK>;
    updateDoc: updateDocType<SDK>;
    deleteDoc: deleteDocType<SDK>;
    exists: existsType<SDK>;
    getWriteBatch: getWriteBatchType<SDK>;
    setDocWriteBatch: setDocWriteBatchType<SDK>;
    updateDocWriteBatch: updateDocWriteBatchType<SDK>;
    deleteDocWriteBatch: deleteDocWriteBatchType<SDK>;
    commitWriteBatch: commitWriteBatchType<SDK>;
    runTransaction: runTransactionType<SDK>;
    getDocTransaction: getDocTransactionType<SDK>;
    setDocTransaction: setDocTransactionType<SDK>;
    updateDocTransaction: updateDocTransactionType<SDK>;
    deleteDocTransaction: deleteDocTransactionType<SDK>;
    getFirebaseQueryResource: getFirebaseQueryResourceFn<SDK>;
}) {
    return function getFirebaseResource<
        ResourceData extends DocumentData = DocumentData,
        ResourceIdPartial extends Record<string, any> = Record<string, any>,
        CollectionId extends Record<string, any> = Record<string, never>,
        ResourceDataInput extends DocumentData = ResourceData,
        ResourceDataEncoded extends DocumentData = ResourceData,
        CollectionFn extends TypeEqual<CollectionId, Record<string, never>> extends true
            ? CollectionReference<SDK, ResourceDataEncoded> //undefined CollectionId, Collection MUST be defined
            : //defined CollectionId, CollectionFactory MUST be defined
              (collectionId: CollectionId) => CollectionReference<SDK, ResourceDataEncoded> = TypeEqual<
            CollectionId,
            Record<string, never>
        > extends true
            ? CollectionReference<SDK, ResourceDataEncoded> //Default type, undefined CollectionId, Collection MUST be defined
            : (collectionId: CollectionId) => CollectionReference<SDK, ResourceDataEncoded>, //Default type, defined CollectionId, CollectionFactory MUST be defined
        QueryFn extends TypeEqual<CollectionId, Record<string, never>> extends true
            ? Query<SDK, ResourceDataEncoded> //undefined CollectionId, Query MUST be defined
            : //defined CollectionId, QueryFactory MUST be defined
              (collectionId: CollectionId) => Query<SDK, ResourceDataEncoded> = TypeEqual<
            CollectionId,
            Record<string, never>
        > extends true
            ? Query<SDK, ResourceDataEncoded> //Default type, undefined CollectionId, Query MUST be defined
            : (collectionId: CollectionId) => Query<SDK, ResourceDataEncoded>, //Default type, defined CollectionId, QueryFactory MUST be defined
        ResourceFilter extends TypeEqual<QueryFn, Query<SDK, ResourceDataEncoded>> extends true
            ? Partial<ResourceDataInput> //defined Query, filter by ResourceDataInput
            : //defined QueryFactory, for group queries, CollectionId MAY be omitted, so we use Partial<CollectionId>
              Prettify<Partial<AsEmptyRecord<CollectionId>> & Partial<ResourceDataInput>> = TypeEqual<
            QueryFn,
            Query<SDK, ResourceDataEncoded>
        > extends true
            ? Partial<ResourceDataInput> //Default type, defined Query, filter by ResourceDataInput
            : Prettify<AsEmptyRecord<CollectionId> & Partial<ResourceDataInput>>, //Default type, defined QueryFactory, filter by CollectionId & ResourceDataInput
        Resource extends Prettify<AsEmptyRecord<CollectionId> & Required<ResourceIdPartial> & ResourceData> = Prettify<
            AsEmptyRecord<CollectionId> & Required<ResourceIdPartial> & ResourceData
        >,
        ResourceIdFull extends TypeEqual<CollectionFn, CollectionReference<SDK, ResourceDataEncoded>> extends true
            ? Required<ResourceIdPartial> //defined Collection, get by ResourceId
            : //defined CollectionFactory, get by CollectionId & ResourceId
              Prettify<AsEmptyRecord<CollectionId> & Required<ResourceIdPartial>> = TypeEqual<
            CollectionFn,
            CollectionReference<SDK, ResourceDataEncoded>
        > extends true
            ? Required<ResourceIdPartial> //defined Collection, get by ResourceId
            : //defined CollectionFactory, get by CollectionId & ResourceId
              Prettify<AsEmptyRecord<CollectionId> & Required<ResourceIdPartial>>,
    >(
        firestore: Firestore<SDK>,
        collection: CollectionFn,
        validators: ResourceDataValidators<
            ResourceData,
            ResourceIdPartial,
            CollectionId,
            ResourceDataInput,
            ResourceDataEncoded
        >,
        options?: FirebaseResourceOptions,
    ): FirebaseResource<
        SDK,
        ResourceData,
        ResourceIdPartial,
        CollectionId,
        ResourceDataInput,
        ResourceDataEncoded,
        CollectionFn,
        QueryFn,
        ResourceFilter,
        Resource,
        ResourceIdFull
    > {
        type ResourceId = Required<ResourceIdPartial>;

        //Cast to specific query type (resource data)
        const f = sdk as unknown as {
            getColRef: getColRefType<SDK, ResourceDataEncoded>;
            getDocRef: getDocRefType<SDK, ResourceDataEncoded>;
            getDoc: getDocType<SDK, ResourceDataEncoded>;
            getDocs: getDocsType<SDK, ResourceDataEncoded>;
            setDoc: setDocType<SDK, ResourceDataEncoded>;
            updateDoc: updateDocType<SDK, ResourceDataEncoded>;
            deleteDoc: deleteDocType<SDK>;
            exists: existsType<SDK, ResourceDataEncoded>;
            getWriteBatch: getWriteBatchType<SDK>;
            setDocWriteBatch: setDocWriteBatchType<SDK>;
            updateDocWriteBatch: updateDocWriteBatchType<SDK>;
            deleteDocWriteBatch: deleteDocWriteBatchType<SDK>;
            commitWriteBatch: commitWriteBatchType<SDK>;
            runTransaction: runTransactionType<SDK>;
            getDocTransaction: getDocTransactionType<SDK, ResourceDataEncoded>;
            setDocTransaction: setDocTransactionType<SDK, ResourceDataEncoded>;
            updateDocTransaction: updateDocTransactionType<SDK, ResourceDataEncoded>;
            deleteDocTransaction: deleteDocTransactionType<SDK>;
            getFirebaseQueryResource: getFirebaseQueryResourceFn<SDK>;
        };

        //TODO: Cache should use full path?
        const cache: CacheWithDelete<string, Resource> | undefined = options?.lruCacheSize
            ? //@ts-expect-error
              new LRUMapWithDelete(options.lruCacheSize)
            : undefined;

        const { encodeId, encodeParentDocId, decodeId, decodeParentDocId } = validators;

        //Default to encodeDataPartial
        //assumes Partial<ResourceDataInput> = ResourceDataInput
        //assumes Partial<ResourceDataEncoded> = ResourceDataEncoded
        const encodeDataPartial =
            validators.encodeDataPartial ??
            ((data: Partial<ResourceDataInput>) => data as Partial<ResourceDataEncoded>);
        const encodeData = (validators.encodeData ?? encodeDataPartial) as (
            item: ResourceDataInput,
        ) => ResourceDataEncoded;

        //Default to encodeData
        //assumes ResourceDataEncoded = ResourceData
        const decodeData =
            validators.decodeData ?? (encodeData as unknown as (item: ResourceDataEncoded) => ResourceData);

        const decodeRefSnapshot = getDecodeRefSnapshot<
            ResourceData,
            ResourceId,
            CollectionId,
            ResourceDataEncoded,
            Resource
        >(
            //Cast validators due to conditional type
            {
                decodeId,
                decodeData,
                decodeParentDocId,
            } as unknown as Pick<
                ResourceDataValidators<ResourceData, ResourceId, CollectionId, ResourceData, ResourceDataEncoded>,
                "decodeId" | "decodeData" | "decodeParentDocId"
            >,
        );

        const collectionRef =
            typeof collection === "function"
                ? undefined
                : (collection as CollectionReference<SDK, ResourceDataEncoded>);

        function getColRef(): CollectionReference<SDK, ResourceDataEncoded>;
        function getColRef(collectionId: CollectionId): CollectionReference<SDK, ResourceDataEncoded>;
        function getColRef(collectionId?: CollectionId): CollectionReference<SDK, ResourceDataEncoded> {
            if (collectionRef) {
                return collectionRef;
            } else if (typeof collection === "function") {
                if (!collectionId) {
                    throw new Error("collection is function but collectionId undefined");
                }
                return collection(collectionId);
            } else {
                throw new Error("collection undefined");
            }
        }

        const read = f.getFirebaseQueryResource<
            ResourceData,
            ResourceId,
            CollectionId,
            ResourceDataInput,
            ResourceDataEncoded,
            QueryFn,
            ResourceFilter,
            Resource
        >(
            //Cast getColRef due to conditional type
            (collectionRef ?? getColRef) as unknown as QueryFn,
            {
                encodeDataPartial,
                encodeParentDocId,
                decodeId,
                decodeData,
                decodeParentDocId,
                //Cast validators due to conditional type
            } as unknown as Pick<
                ResourceDataValidators<ResourceData, ResourceId, CollectionId, ResourceDataInput, ResourceDataEncoded>,
                "encodeDataPartial" | "encodeParentDocId" | "decodeId" | "decodeData" | "decodeParentDocId"
            >,
        );

        function getDocRef(id: ResourceIdFull): DocumentReference<SDK, ResourceDataEncoded> {
            return f.getDocRef(getColRef(id as unknown as CollectionId), encodeId(id));
        }

        /**
         * Get doc by id, no security checks
         * @param id
         * @returns doc by id
         */
        async function get(id: ResourceIdFull): Promise<Resource> {
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

            const result = decodeRefSnapshot(refSnapshot);
            cache?.set(ref.id, result);
            return result;
        }

        /**
         * Get doc by id, no security checks
         * @param id
         * @returns doc by id
         */
        async function getOrNull(id: ResourceIdFull): Promise<Resource | null> {
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

            const result = decodeRefSnapshot(refSnapshot);
            cache?.set(ref.id, result);
            return result;
        }

        /**
         * Get docs by id, no security checks
         * @param ids
         * @returns docs by id
         * //TODO: Is this the fastest way? https://stackoverflow.com/questions/59572943/is-there-a-way-to-batch-read-firebase-documents
         */
        async function getBatch(ids: ResourceIdFull[]): Promise<(Resource | null)[]> {
            const refSnapshots: DocumentSnapshot<SDK, ResourceDataEncoded>[] = await f.runTransaction(
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
                return f.exists(refSnapshot) ? decodeRefSnapshot(refSnapshot) : null;
            });
        }

        /**
         * Set doc, returns id, no security checks
         * @param item (id optional)
         * @returns id (parameter or default autogenerated with uuidv4())
         */
        async function set(
            item: Prettify<AsEmptyRecord<CollectionId> & ResourceIdPartial & ResourceDataInput>,
        ): Promise<string>;
        async function set(
            item: Prettify<ResourceIdFull & Partial<ResourceDataInput>>,
            options: SetOptions,
        ): Promise<string>;
        async function set(
            item:
                | Prettify<AsEmptyRecord<CollectionId> & ResourceIdPartial & ResourceDataInput>
                | Prettify<ResourceIdFull & Partial<ResourceDataInput>>,
            options?: SetOptions,
        ): Promise<string> {
            //@ts-expect-error generate id
            const ref = getDocRef(item);

            if (cache) {
                //Purge LRU cache
                cache.delete(ref.id);
            }

            if (!options) {
                //Regular set
                await f.setDoc(ref, encodeData(item as ResourceDataInput));
            } else {
                //Merged set
                await f.setDoc(ref, encodeDataPartial(item), options);
            }

            return ref.id;
        }

        async function upsert(item: Prettify<ResourceIdFull & ResourceDataInput>): Promise<string> {
            return set(item, { merge: true });
        }

        /**
         * Set docs as a transaction (max 500 writes), no security checks
         * @param items (all with ids or none with ids)
         * @returns ids (parameter or default autogenerated with uuidv4())
         */
        async function setBatch(
            items: Prettify<AsEmptyRecord<CollectionId> & ResourceIdPartial & ResourceDataInput>[],
        ): Promise<string[]>;
        async function setBatch(
            items: Prettify<ResourceIdFull & Partial<ResourceDataInput>>[],
            options: SetOptions,
        ): Promise<string[]>;
        async function setBatch(
            items:
                | Prettify<AsEmptyRecord<CollectionId> & ResourceIdPartial & ResourceDataInput>[]
                | Prettify<ResourceIdFull & Partial<ResourceDataInput>>[],
            options?: SetOptions,
        ): Promise<string[]> {
            //@ts-expect-error generate id
            const refs = items.map((item) => getDocRef(item));

            if (cache) {
                //Purge LRU cache
                refs.map((ref) => cache.delete(ref.id));
            }

            //Create batch, reduce over update operations
            let batch: WriteBatch<SDK>;
            if (!options) {
                //Regular set
                batch = zip(refs, items as unknown[]).reduce((b, [ref, item]) => {
                    return f.setDocWriteBatch(b, ref!, encodeData(item! as ResourceDataInput));
                }, f.getWriteBatch(firestore));
            } else {
                //Merged set
                batch = zip(refs, items as unknown[]).reduce((b, [ref, item]) => {
                    return f.setDocWriteBatch(b, ref!, encodeDataPartial(item!), options);
                }, f.getWriteBatch(firestore));
            }

            await f.commitWriteBatch(batch);
            return refs.map((r) => r.id);
        }

        async function upsertBatch(items: Prettify<ResourceIdFull & ResourceDataInput>[]): Promise<string[]> {
            return setBatch(items, { merge: true });
        }

        /**
         * Get doc or create new one, no security checks
         * @param id
         * @param initialData
         * @returns doc or initialValue
         */
        async function getOrCreate(id: ResourceIdFull, initialData: ResourceDataInput): Promise<Resource> {
            const ref = getDocRef(id);
            if (cache) {
                //Check LRU cache
                const cacheResult = cache.get(ref.id);
                if (cacheResult) return cacheResult;
            }

            const initialDataEncoded = encodeData(initialData);

            const refSnapshotExisting = await f.runTransaction(firestore, async (transaction) => {
                const refSnapshot = await f.getDocTransaction(transaction, ref);
                if (!f.exists(refSnapshot)) {
                    f.setDocTransaction(transaction, ref, initialDataEncoded);
                    return undefined;
                } else {
                    return refSnapshot;
                }
            });

            const data = refSnapshotExisting
                ? decodeRefSnapshot(refSnapshotExisting)
                : //Manually decode, same implementation as decodeRefSnapshot
                  ({
                      ...decodeData(initialDataEncoded),
                      ...decodeId(ref.id),
                      //Decode collection path
                      ...(decodeParentDocId ? decodeParentDocId(ref.parent.path) : {}),
                  } as Resource);

            return data;
        }

        /**
         * Get first doc that matches filter or create new one
         * WARNING: NOT executed as transaction (only get supported in transaction)
         * @param filter query filter (included in initialData)
         * @param initialData initialData (write if query returns null)
         * @param options orderBy, order
         * @returns doc or initialValue
         */
        async function getWhereFirstOrCreate(
            filter: ResourceFilter,
            initialData: Prettify<AsEmptyRecord<CollectionId> & ResourceIdPartial & ResourceDataInput>,
            options?: Omit<ResourceQueryOptions, "limit">,
        ): Promise<Resource> {
            const existing = await read.getWhereFirst(filter, options);
            if (!existing) {
                const id = await set({ ...filter, ...initialData });

                //TODO: Refactor with more low-level set functions that returns reference & data
                return {
                    ...decodeData(encodeData({ ...filter, ...initialData })),
                    ...decodeId(id),
                    //Decode collection path
                    ...(decodeParentDocId && encodeParentDocId
                        ? decodeParentDocId(encodeParentDocId(filter as unknown as CollectionId))
                        : {}),
                } as Resource;
            }
            return existing;
        }

        /**
         * Update existing doc, no security checks
         * @param item
         * @returns
         */
        async function update(item: Prettify<ResourceIdFull & Partial<ResourceDataInput>>): Promise<void> {
            const ref = getDocRef(item as ResourceIdFull);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.id);
            }

            return f.updateDoc(ref, getFirestoreUpdateData(encodeDataPartial(item)) as UpdateData<ResourceDataEncoded>);
        }

        /**
         * Update existing docs as a transaction (max 500 writes), no security checks
         * @param items
         * @returns
         */
        async function updateBatch(items: Prettify<ResourceIdFull & Partial<ResourceDataInput>>[]): Promise<void> {
            const refs = (items as ResourceIdFull[]).map(getDocRef);
            if (cache) {
                //Purge LRU cache
                refs.map((ref) => cache.delete(ref.id));
            }

            //Create batch, reduce over update operations
            const batch = zip(refs, items).reduce((b, [ref, item]) => {
                return f.updateDocWriteBatch(
                    b,
                    ref!,
                    getFirestoreUpdateData(encodeDataPartial(item!)) as UpdateData<ResourceDataEncoded>,
                );
            }, f.getWriteBatch(firestore));

            return f.commitWriteBatch(batch);
        }

        /**
         * Delete doc, no security checks
         * @param id
         * @returns
         */
        async function deleteById(id: ResourceIdFull): Promise<void> {
            const ref = getDocRef(id);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.id);
            }

            return f.deleteDoc(ref);
        }

        /**
         * Delete docs as transaction (max 500 writes), no security checks
         */
        async function deleteBatch(ids: ResourceIdFull[]): Promise<void> {
            const refs = ids.map(getDocRef);
            if (cache) {
                //Purge LRU cache
                refs.map((ref) => cache.delete(ref.id));
            }

            //Create batch, reduce over delete operations
            const batch = refs.reduce((b, ref) => {
                return f.deleteDocWriteBatch(b, ref);
            }, f.getWriteBatch(firestore));

            return f.commitWriteBatch(batch);
        }

        /**
         * Delete all docs, no security checks
         */
        async function deleteAll(collectionId: CollectionId): Promise<void>;
        async function deleteAll(): Promise<void>;
        async function deleteAll(collectionId?: CollectionId): Promise<void> {
            return f.runTransaction(firestore, async (transaction) => {
                const snapshot = await f.getDocs(getColRef(collectionId!));
                if (cache) {
                    //Purge LRU cache
                    snapshot.docs.map((d) => cache.delete(d.id));
                }

                const operations = snapshot.docs.map((doc) => {
                    return f.deleteDocTransaction(transaction, doc.ref as DocumentReference<SDK>);
                });

                return operations;
            });
        }

        /**
         * Increment string value, no security checks
         * @param id
         * @param path key or nested key
         * @param value
         */
        async function incrementStr(id: ResourceIdFull, path: string, value: BigNumberish): Promise<void> {
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
                } as UpdateData<ResourceDataEncoded>);
            }) as any;
        }

        /**
         * Decrement string value
         * @param id
         * @param path key or nested key
         * @param value
         */
        async function decrementStr(id: ResourceIdFull, path: string, value: BigNumberish): Promise<void> {
            return incrementStr(id, path, -BigInt(value));
        }

        /**
         * Increment number value, no security checks
         * @param id
         * @param path key or nested key
         * @param value
         */
        async function incrementNumber(id: ResourceIdFull, path: string, value: number): Promise<void> {
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

                return f.updateDocTransaction(transaction, ref, {
                    [path]: newValue,
                } as UpdateData<ResourceDataEncoded>);
            });
        }

        /**
         * Decrement number value
         * @param id
         * @param path key or nested key
         * @param value
         */
        async function decrementNumber(id: ResourceIdFull, path: string, value: number): Promise<void> {
            return incrementNumber(id, path, value * -1);
        }

        return {
            //TODO: Include default validators?
            ...validators,
            ...read,
            //other
            collection: getColRef as unknown as (
                ...parameters: TypeEqual<CollectionFn, CollectionReference<SDK, ResourceDataEncoded>> extends true
                    ? []
                    : [collectionId: CollectionId]
            ) => CollectionReference<SDK, ResourceDataEncoded>,
            doc: getDocRef,
            cache,
            //queries
            get,
            getOrNull,
            getBatch,
            set,
            upsert,
            setBatch,
            upsertBatch,
            getOrCreate,
            getWhereFirstOrCreate,
            update,
            updateBatch,
            delete: deleteById,
            deleteBatch,
            deleteAll: deleteAll as unknown as (
                ...parameters: TypeEqual<CollectionFn, CollectionReference<SDK, ResourceDataEncoded>> extends true
                    ? []
                    : [collectionId: CollectionId]
            ) => Promise<void>,
            incrementStr,
            decrementStr,
            incrementNumber,
            decrementNumber,
        };
    };
}
