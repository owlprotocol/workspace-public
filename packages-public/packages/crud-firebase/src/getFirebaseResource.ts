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
    QueryDocumentSnapshot,
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
 * For docs/comments on specific functions, refer to the `FirebaseResource` interface comments
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

        const cache: CacheWithDelete<string, QueryDocumentSnapshot<FirestoreSDK, ResourceDataEncoded>> | undefined =
            options?.lruCacheSize
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

        async function get(id: ResourceIdFull): Promise<Resource> {
            const ref = getDocRef(id);
            if (cache) {
                //Check LRU cache
                const cacheResult = cache.get(ref.path);
                if (cacheResult) return decodeRefSnapshot(cacheResult);
            }

            const refSnapshot = await f.getDoc(ref);
            if (!f.exists(refSnapshot)) {
                throw new Error(`${ref.path} not found`);
            }
            cache?.set(ref.path, refSnapshot);

            return decodeRefSnapshot(refSnapshot);
        }

        async function getEncoded(id: ResourceIdFull): Promise<ResourceDataEncoded> {
            //TODO: Fix cache
            const ref = getDocRef(id);
            if (cache) {
                //Check LRU cache
                const cacheResult = cache.get(ref.path);
                if (cacheResult) return cacheResult.data();
            }

            const refSnapshot = await f.getDoc(ref);
            if (!f.exists(refSnapshot)) {
                throw new Error(`${ref.path} not found`);
            }
            cache?.set(ref.path, refSnapshot);

            return refSnapshot.data();
        }

        async function getOrNull(id: ResourceIdFull): Promise<Resource | null> {
            const ref = getDocRef(id);
            if (cache) {
                //Check LRU cache
                const cacheResult = cache.get(ref.path);
                if (cacheResult) return decodeRefSnapshot(cacheResult);
            }

            const refSnapshot = await f.getDoc(ref);
            if (!f.exists(refSnapshot)) {
                return null;
            }
            cache?.set(ref.path, refSnapshot);

            return decodeRefSnapshot(refSnapshot);
        }

        async function getOrNullEncoded(id: ResourceIdFull): Promise<ResourceDataEncoded | null> {
            const ref = getDocRef(id);
            if (cache) {
                //Check LRU cache
                const cacheResult = cache.get(ref.path);
                if (cacheResult) return cacheResult.data();
            }

            const refSnapshot = await f.getDoc(ref);
            if (!f.exists(refSnapshot)) {
                return null;
            }
            cache?.set(ref.path, refSnapshot);

            return refSnapshot.data();
        }

        async function getBatch(ids: ResourceIdFull[]): Promise<(Resource | null)[]> {
            //TODO: Implement caching?
            const refSnapshots: DocumentSnapshot<SDK, ResourceDataEncoded>[] = await f.runTransaction(
                firestore,
                async (transaction) => {
                    //TODO: Is this the fastest way? https://stackoverflow.com/questions/59572943/is-there-a-way-to-batch-read-firebase-documents
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

        async function getBatchEncoded(ids: ResourceIdFull[]): Promise<(ResourceDataEncoded | null)[]> {
            //TODO: Implement caching?
            const refSnapshots: DocumentSnapshot<SDK, ResourceDataEncoded>[] = await f.runTransaction(
                firestore,
                async (transaction) => {
                    //TODO: Is this the fastest way? https://stackoverflow.com/questions/59572943/is-there-a-way-to-batch-read-firebase-documents
                    //TODO: Promises in tx?
                    const operations = ids.map((id) => {
                        const ref = getDocRef(id);
                        return f.getDocTransaction(transaction, ref);
                    });

                    return await Promise.all(operations);
                },
            );

            return refSnapshots.map((refSnapshot) => {
                return f.exists(refSnapshot) ? refSnapshot.data() : null;
            });
        }

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
                cache.delete(ref.path);
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
                refs.map((ref) => cache.delete(ref.path));
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

        async function getOrCreate(id: ResourceIdFull, initialData: ResourceDataInput): Promise<Resource> {
            const ref = getDocRef(id);
            if (cache) {
                //Check LRU cache
                const cacheResult = cache.get(ref.path);
                if (cacheResult) return decodeRefSnapshot(cacheResult);
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

        async function update(item: Prettify<ResourceIdFull & Partial<ResourceDataInput>>): Promise<void> {
            const ref = getDocRef(item as ResourceIdFull);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.path);
            }

            return f.updateDoc(ref, getFirestoreUpdateData(encodeDataPartial(item)) as UpdateData<ResourceDataEncoded>);
        }

        async function updateBatch(items: Prettify<ResourceIdFull & Partial<ResourceDataInput>>[]): Promise<void> {
            const refs = (items as ResourceIdFull[]).map(getDocRef);
            if (cache) {
                //Purge LRU cache
                refs.map((ref) => cache.delete(ref.path));
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

        async function deleteById(id: ResourceIdFull): Promise<void> {
            const ref = getDocRef(id);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.path);
            }

            return f.deleteDoc(ref);
        }

        async function deleteBatch(ids: ResourceIdFull[]): Promise<void> {
            const refs = ids.map(getDocRef);
            if (cache) {
                //Purge LRU cache
                refs.map((ref) => cache.delete(ref.path));
            }

            //Create batch, reduce over delete operations
            const batch = refs.reduce((b, ref) => {
                return f.deleteDocWriteBatch(b, ref);
            }, f.getWriteBatch(firestore));

            return f.commitWriteBatch(batch);
        }

        async function deleteAll(collectionId?: CollectionId): Promise<void> {
            return f.runTransaction(firestore, async (transaction) => {
                const snapshot = await f.getDocs(getColRef(collectionId!));
                if (cache) {
                    //Purge LRU cache
                    snapshot.docs.map((d) => cache.delete(d.ref.path));
                }

                const operations = snapshot.docs.map((doc) => {
                    return f.deleteDocTransaction(transaction, doc.ref as DocumentReference<SDK>);
                });

                return operations;
            });
        }

        async function incrementStr(id: ResourceIdFull, path: string, value: BigNumberish): Promise<void> {
            const ref = getDocRef(id);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.path);
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

        async function decrementStr(id: ResourceIdFull, path: string, value: BigNumberish): Promise<void> {
            return incrementStr(id, path, -BigInt(value));
        }

        async function incrementNumber(id: ResourceIdFull, path: string, value: number): Promise<void> {
            const ref = getDocRef(id);
            if (cache) {
                //Purge LRU cache
                cache.delete(ref.path);
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

        async function decrementNumber(id: ResourceIdFull, path: string, value: number): Promise<void> {
            return incrementNumber(id, path, value * -1);
        }

        return {
            //TODO: Include default validators?
            ...validators,
            ...read,
            //other
            collection: getColRef,
            doc: getDocRef,
            cache,
            //queries
            get,
            getEncoded,
            getOrNull,
            getOrNullEncoded,
            getBatch,
            getBatchEncoded,
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
            deleteAll,
            incrementStr,
            decrementStr,
            incrementNumber,
            decrementNumber,
        };
    };
}
