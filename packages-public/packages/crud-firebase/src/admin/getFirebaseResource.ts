/***** Generics for Firebase Admin CRUD *****/
import { CollectionReference, DocumentReference, UpdateData, Firestore } from "firebase-admin/firestore";
import { zip } from "lodash-es";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ResourceAccessControl, getFirebaseQueryResource } from "./getFirebaseQueryResource.js";
import { DecodeRef } from "./getDecodeRefSnapshot.js";
import { getFirestorePathValue } from "../utils/getFirestorePathValue.js";
import { getFirestoreUpdateData } from "../utils/getFirestoreUpdateData.js";
import {
    FirebaseResourceFactory,
    ResourceIdDefault,
    FirebaseResource,
    ResourceQueryOptions,
    ResourceDataValidators,
    ResourceIdValidators,
} from "../resource.js";

/**
 * Firebase Resource. create, get, getAll, update, delete, deleteAll and more
 * @template ResourceData Resource data
 * @template ResourceIdPartial Resource id params
 * @param firestore Firestore instance
 * @param collectionPath Collection path (eg. `/users`)
 * @param validators Validators for id and data.
 * @param accessControl Access control functions for firebase admin. (Firestore Rules don't apply on admin)
 * @returns wrapper functions for access Firebase
 */
export function getFirebaseResource<
    ResourceData extends Record<string, any>,
    ResourceIdPartial extends Record<string, any> = ResourceIdDefault,
    AccessControlParams extends any[] = [],
>(
    firestore: Firestore,
    collectionPath: string,
    validators: DecodeRef<Required<ResourceIdPartial>> &
        ResourceDataValidators<ResourceData> &
        ResourceIdValidators<ResourceIdPartial>,
    options?: ResourceAccessControl<ResourceData, AccessControlParams>,
) {
    type ResourceId = Required<ResourceIdPartial>;
    type Resource = ResourceId & ResourceData;

    const { encodeId, decodeId, validateDataPartial } = validators;
    const validateData = (validators.validateData ?? validateDataPartial) as (item: ResourceData) => ResourceData;

    const { readAccessCheck, setAccessCheck, updateAccessCheck, deleteAccessCheck } = options ?? {};

    const col = firestore.collection(collectionPath) as CollectionReference<ResourceData>;
    const { getAll, getWhere, getWhereCount, getWhereFirst } = getFirebaseQueryResource(col, validators, options);

    const getDocRef = (id: ResourceId | string): DocumentReference<ResourceData> => {
        return col.doc(encodeId(id));
    };

    /**
     * Get doc by id, no security checks
     * @param id
     * @returns doc by id
     */
    const _get = async (id: ResourceId | string): Promise<Resource> => {
        const ref = getDocRef(id);
        const refSnapshot = await ref.get();

        if (!refSnapshot.exists) {
            throw new Error(`${col.path}/${id} not found`);
        }

        return { ...refSnapshot.data(), ...decodeId(ref.id) } as Resource;
    };

    /**
     * Get doc by id
     * @param id
     * @params security checks
     * @returns doc by id
     */
    const get = async (id: ResourceId | string, accessParams?: AccessControlParams): Promise<Resource> => {
        const data = await _get(id);
        //check read access
        if (accessParams && readAccessCheck && !readAccessCheck(data, accessParams)) {
            throw new Error(`${col.path}/${id} permission-denied`);
        }

        return data;
    };

    /**
     * Get doc by id, no security checks
     * @param id
     * @returns doc by id
     */
    const _getOrUndefined = async (id: ResourceId | string): Promise<Resource | undefined> => {
        const ref = getDocRef(id);
        const refSnapshot = await ref.get();

        if (!refSnapshot.exists) {
            return undefined;
        }

        return { ...refSnapshot.data(), ...decodeId(ref.id) } as Resource;
    };

    /**
     * Get doc by id
     * @param id
     * @params security checks
     * @returns doc by id
     */
    const getOrUndefined = async (
        id: ResourceId | string,
        accessParams?: AccessControlParams,
    ): Promise<Resource | undefined> => {
        const data = await _getOrUndefined(id);
        //check read access
        if (data && accessParams && readAccessCheck && !readAccessCheck(data, accessParams)) {
            throw new Error(`${col.path}/${id} permission-denied`);
        }

        return data;
    };

    /**
     * Get docs by id, no security checks
     * @param ids
     * @returns docs by id
     * //TODO: Is this the fastest way? https://stackoverflow.com/questions/59572943/is-there-a-way-to-batch-read-firebase-documents
     */
    const _getBatch = async (ids: ResourceId[] | string[]): Promise<(Resource | undefined)[]> => {
        const refSnapshots = await firestore.runTransaction(async (transaction) => {
            const operations = ids.map((id) => {
                const ref = getDocRef(id);
                return transaction.get(ref);
            });

            return await Promise.all(operations);
        });

        return refSnapshots.map((refSnapshot) => {
            return { ...refSnapshot.data(), ...decodeId(refSnapshot.id) } as Resource;
        });
    };

    /**
     * Get docs by id
     * @param ids
     * @param params security check
     * @returns docs by id
     */
    const getBatch = async (
        ids: ResourceId[] | string[],
        accessParams?: AccessControlParams,
    ): Promise<(Resource | undefined)[]> => {
        let data = await _getBatch(ids);
        //Filter un-authorized results
        if (accessParams && readAccessCheck) {
            data = data.filter((item) => (item ? readAccessCheck(item, accessParams) : undefined));
        }

        return data;
    };

    /**
     * Set doc, returns id, no security checks
     * @param item (id optional)
     * @returns id (parameter or default autogenerated with crypto.randomUUID())
     */
    const _set = async (item: ResourceIdPartial & ResourceData): Promise<string> => {
        const id = encodeId(item);
        const ref = getDocRef(id);
        await ref.set(validateData(item));
        return id;
    };

    /**
     * Set doc, returns id
     * @param item (id optional)
     * @params security checks
     * @returns
     */
    const set = async (item: ResourceIdPartial & ResourceData, accessParams?: AccessControlParams): Promise<string> => {
        if (!accessParams || !setAccessCheck) {
            return _set(item);
        } else {
            return await firestore.runTransaction(async (transaction) => {
                const id = encodeId(item);
                //if item can exists (has id), check permissions
                const ref = getDocRef(id);
                const refSnapshot = await transaction.get(ref);
                if (refSnapshot.exists) {
                    //check write access on existing data
                    if (!setAccessCheck(refSnapshot.data()!, accessParams)) {
                        throw new Error(`${col.path}/${ref.id} permission-denied`);
                    }
                } else {
                    //check write access on new data
                    if (!setAccessCheck(item, accessParams)) {
                        throw new Error(`${col.path}/${`${JSON.stringify(item)}`} permission-denied`);
                    }
                }

                transaction.set(ref, validateData(item));

                return id;
            });
        }
    };

    /**
     * Set docs as a transaction (max 500 writes), no security checks
     * @param items (all with ids or none with ids)
     * @returns ids (parameter or default autogenerated with crypto.randomUUID())
     */
    const _setBatch = async (items: (ResourceIdPartial & ResourceData)[]): Promise<string[]> => {
        const ids = items.map(encodeId);

        await firestore.runTransaction(async (transaction) => {
            const operations = zip(ids, items).map(([id, item]) => {
                const ref = getDocRef(id!);
                return transaction.set(ref, validateData(item!));
            });

            await Promise.all(operations);
        });

        return ids;
    };

    /**
     * Set docs as a transaction (max 500 writes)
     * @param items (all with ids or none with ids)
     * @param params security checks
     * @returns ids (parameter or default autogenerated with crypto.randomUUID())
     */
    const setBatch = async (
        items: (ResourceIdPartial & ResourceData)[],
        accessParams?: AccessControlParams,
    ): Promise<string[]> => {
        if (!accessParams || !setAccessCheck) {
            return _setBatch(items);
        } else {
            const ids = items.map(encodeId);

            await firestore.runTransaction(async (transaction) => {
                //if items can exists (has id), check permissions
                const snapshot = await Promise.all(
                    ids.map((id) => {
                        const ref = getDocRef(id);
                        return transaction.get(ref);
                    }),
                );
                zip(items, snapshot).forEach(([item, ref]) => {
                    if (ref!.exists) {
                        //check write access on existing data
                        if (!setAccessCheck(ref!.data()!, accessParams)) {
                            throw new Error(`${col.path}/${ref!.id} permission-denied`);
                        }
                    } else {
                        //check write access on new data
                        if (!setAccessCheck(item!, accessParams)) {
                            throw new Error(`${col.path}/${`${JSON.stringify(item)}`} permission-denied`);
                        }
                    }
                });

                const operations = zip(items, ids).map(([item, id]) => {
                    const ref = getDocRef(id!);
                    return transaction.set(ref, validateData(item!));
                });

                await Promise.all(operations);
            });

            return ids;
        }
    };

    /**
     * Get doc or create new one, no security checks
     * @param id
     * @param initialValue
     * @returns doc or initialValue
     */
    const _getOrCreate = async (id: ResourceId | string, initialValue: ResourceData): Promise<Resource> => {
        const ref = getDocRef(id);
        const initialValueValidated = validateData(initialValue);

        const dataExisting = await firestore.runTransaction(async (transaction) => {
            const refSnapshot = await transaction.get(ref);
            if (!refSnapshot.exists) {
                transaction.set(ref, initialValueValidated);
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
     * Get doc or create new one
     * @param id
     * @param initialValue
     * @returns doc or initialValue
     */
    const getOrCreate = async (
        id: ResourceId | string,
        initialValue: ResourceData,
        accessParams?: AccessControlParams,
    ): Promise<Resource> => {
        if (!accessParams || (!setAccessCheck && !readAccessCheck)) {
            return _getOrCreate(id, initialValue);
        } else {
            const ref = getDocRef(id);
            const initialValueValidated = validateData(initialValue);

            const dataExisting = await firestore.runTransaction(async (transaction) => {
                const refSnapshot = await transaction.get(ref);
                if (!refSnapshot.exists) {
                    if (setAccessCheck) {
                        //check write access on new data
                        if (!setAccessCheck(initialValueValidated, accessParams)) {
                            throw new Error(`${col.path}/${id} permission-denied`);
                        }
                    }
                    transaction.set(ref, initialValueValidated);
                    return undefined;
                } else {
                    const data = refSnapshot.data()!;
                    if (readAccessCheck) {
                        //check write access on new data
                        if (!readAccessCheck(initialValueValidated, accessParams)) {
                            throw new Error(`${col.path}/${id} permission-denied`);
                        }
                    }

                    return data;
                }
            });

            const data = dataExisting
                ? { ...dataExisting, ...decodeId(ref.id) }
                : { ...initialValueValidated, ...decodeId(ref.id) };

            return data;
        }
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
        accessParams?: AccessControlParams,
    ): Promise<Resource> => {
        const existing = await getWhereFirst(filter, options, accessParams);
        if (!existing) {
            const id = await set(initialValue, accessParams);
            return { ...validateData(initialValue), ...decodeId(id) };
        }
        return existing;
    };

    /**
     * Update existing doc, no security checks
     * @param item
     * @returns
     */
    const _update = async (item: ResourceId & Partial<ResourceData>): Promise<void> => {
        const ref = getDocRef(item);
        await ref.update(getFirestoreUpdateData(validateDataPartial(item)) as UpdateData<ResourceData>);
    };

    /**
     * Update existing doc
     * @param item
     * @params security checks
     * @returns
     */
    const update = async (
        item: ResourceId & Partial<ResourceData>,
        accessParams?: AccessControlParams,
    ): Promise<void> => {
        if (!accessParams || !updateAccessCheck) {
            _update(item);
        } else {
            await firestore.runTransaction(async (transaction) => {
                const ref = getDocRef(item);
                const refSnapshot = await transaction.get(ref);
                if (!refSnapshot.exists) {
                    throw new Error(`${col.path}/${ref.id} not found`);
                }

                //check write access on existing data
                if (!updateAccessCheck(refSnapshot.data()!, accessParams)) {
                    throw new Error(`${col.path}/${ref.id} permission-denied`);
                }

                transaction.update(ref, getFirestoreUpdateData(validateDataPartial(item)) as UpdateData<ResourceData>);
            });
        }
    };

    /**
     * Update existing docs as a transaction (max 500 writes), no security checks
     * @param items
     * @returns
     */
    const _updateBatch = async (items: (ResourceId & Partial<ResourceData>)[]): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const operations = items.map((item) => {
                const ref = getDocRef(item);
                return transaction.update(
                    ref,
                    getFirestoreUpdateData(validateDataPartial(item)) as UpdateData<ResourceData>,
                );
            });

            await Promise.all(operations);
        });
    };

    /**
     * Update docs as a transaction (max 500 writes)
     * @param items
     * @param params security checks
     * @returns ids (parameter or default autogenerated with crypto.randomUUID())
     */
    const updateBatch = async (
        items: (ResourceId & Partial<ResourceData>)[],
        accessParams?: AccessControlParams,
    ): Promise<void> => {
        if (!accessParams || !updateAccessCheck) {
            return _updateBatch(items);
        } else {
            const refs = items.map(getDocRef);

            await firestore.runTransaction(async (transaction) => {
                const snapshot = await Promise.all(
                    refs.map((ref) => {
                        return transaction.get(ref);
                    }),
                );
                snapshot.forEach((ref) => {
                    if (!ref.exists) {
                        throw new Error(`${col.path}/${ref.id} not found`);
                    }
                    //check write access on existing data
                    if (!updateAccessCheck(ref.data()!, accessParams)) {
                        throw new Error(`${col.path}/${ref.id} permission-denied`);
                    }
                });

                const operations = zip(items, refs).map(([item, ref]) => {
                    return transaction.update(
                        ref!,
                        getFirestoreUpdateData(validateDataPartial(item!)) as UpdateData<ResourceData>,
                    );
                });

                await Promise.all(operations);
            });
        }
    };

    /**
     * Delete doc, no security checks
     * @param id
     * @returns
     */
    const _deleteById = async (id: ResourceId | string): Promise<void> => {
        const ref = getDocRef(id);
        await ref.delete();
    };

    /**
     * Delete doc
     * @param id
     * @params security checks
     * @returns
     */
    const deleteById = async (id: ResourceId | string, accessParams?: AccessControlParams): Promise<void> => {
        if (!accessParams || !deleteAccessCheck) {
            _deleteById(id);
        } else {
            await firestore.runTransaction(async (transaction) => {
                const ref = getDocRef(id);
                const refSnapshot = await transaction.get(ref);
                if (!refSnapshot.exists) {
                    throw new Error(`${col.path}/${ref.id} not found`);
                }

                //check write access on existing data
                if (!deleteAccessCheck(refSnapshot.data()!, accessParams)) {
                    throw new Error(`${col.path}/${ref.id} permission-denied`);
                }

                transaction.delete(ref);
            });
        }
    };

    /**
     * Delete docs as transaction (max 500 writes), no security checks
     */
    const _deleteBatch = async (ids: ResourceId[] | string[]): Promise<void> => {
        const refs = ids.map(getDocRef);

        await firestore.runTransaction(async (transaction) => {
            const operations = refs.map((ref) => {
                return transaction.delete(ref);
            });

            await Promise.all(operations);
        });
    };

    /**
     * Delete docs as transaction (max 500 writes)s
     * @param ids
     * @param params security checks
     * @returns ids (parameter or default autogenerated with crypto.randomUUID())
     */
    const deleteBatch = async (ids: ResourceId[] | string[], accessParams?: AccessControlParams): Promise<void> => {
        if (accessParams && deleteAccessCheck) {
            const refs = ids.map(getDocRef);

            await firestore.runTransaction(async (transaction) => {
                const snapshot = await Promise.all(
                    refs.map((ref) => {
                        return transaction.get(ref);
                    }),
                );
                snapshot.forEach((ref) => {
                    if (!ref.exists) {
                        throw new Error(`${col.path}/${ref.id} not found`);
                    }
                    //check write access on existing data
                    if (!deleteAccessCheck(ref.data()!, accessParams)) {
                        throw new Error(`${col.path}/${ref.id} permission-denied`);
                    }
                });

                const operations = refs.map((ref) => {
                    return transaction.delete(ref);
                });

                await Promise.all(operations);
            });
        } else {
            return _deleteBatch(ids);
        }
    };

    /**
     * Delete all docs, no security checks
     */
    const _deleteAll = async (): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const snapshot = await col.get();
            const operations = snapshot.docs.map((doc) => {
                const ref = col.doc(doc.id);
                return transaction.delete(ref);
            });

            await Promise.all(operations);
        });
    };

    /**
     * Delete all docs
     * @param params security checks
     * @returns ids (parameter or default autogenerated with crypto.randomUUID())
     */
    const deleteAll = async (accessParams?: AccessControlParams): Promise<void> => {
        if (accessParams && deleteAccessCheck) {
            await firestore.runTransaction(async (transaction) => {
                const snapshot = await col.get();

                snapshot.forEach((ref) => {
                    //check write access on existing data
                    if (!deleteAccessCheck(ref.data()!, accessParams)) {
                        throw new Error(`${col.path}/${ref.id} permission-denied`);
                    }
                });

                const operations = snapshot.docs.map((doc) => {
                    const ref = col.doc(doc.id);
                    return transaction.delete(ref);
                });

                await Promise.all(operations);
            });
        } else {
            return _deleteAll();
        }
    };

    /**
     * Increment string value, no security checks
     * @param id
     * @param path key or nested key
     * @param value
     */
    const _incrementStr = async (id: ResourceId | string, path: string, value: BigNumberish): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const ref = getDocRef(id);
            const refSnapshot = await transaction.get(ref);
            if (!refSnapshot.exists) {
                throw new Error(`${col.path}/${id} not found`);
            }

            const incrValue = BigNumber.from(value);
            const currValueStr: BigNumberish = getFirestorePathValue(refSnapshot.data(), path) ?? "0";
            const currValue = BigNumber.from(currValueStr);
            const newValue = currValue.add(incrValue);

            transaction.update(ref, { [path]: newValue.toString() } as UpdateData<ResourceData>);
        });
    };

    /**
     * Increment string value
     * @param id
     * @param path key or nested key
     * @param value
     * @params security checks
     */
    const incrementStr = async (
        id: ResourceId | string,
        path: string,
        value: BigNumberish,
        accessParams?: AccessControlParams,
    ): Promise<void> => {
        if (!accessParams || !updateAccessCheck) {
            return _incrementStr(id, path, value);
        } else {
            await firestore.runTransaction(async (transaction) => {
                const ref = getDocRef(id);
                const refSnapshot = await transaction.get(ref);
                if (!refSnapshot.exists) {
                    throw new Error(`${col.path}/${id} not found`);
                }
                //check write access on existing data
                if (updateAccessCheck && !updateAccessCheck(refSnapshot.data()!, accessParams)) {
                    throw new Error(`${col.path}/${ref.id} permission-denied`);
                }

                const incrValue = BigNumber.from(value);
                const currValueStr: BigNumberish = getFirestorePathValue(refSnapshot.data(), path) ?? "0";
                const currValue = BigNumber.from(currValueStr);
                const newValue = currValue.add(incrValue);

                transaction.update(ref, { [path]: newValue.toString() } as UpdateData<ResourceData>);
            });
        }
    };

    /**
     * Decrement string value
     * @param id
     * @param path key or nested key
     * @param value
     */
    const decrementStr = async (
        id: ResourceId | string,
        path: string,
        value: BigNumberish,
        accessParams?: AccessControlParams,
    ): Promise<void> => {
        return incrementStr(id, path, BigNumber.from("0").sub(BigNumber.from(value)), accessParams);
    };

    /**
     * Increment number value, no security checks
     * @param id
     * @param path key or nested key
     * @param value
     */
    const _incrementNumber = async (id: ResourceId | string, path: string, value: number): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const ref = getDocRef(id);
            const refSnapshot = await transaction.get(ref);
            if (!refSnapshot.exists) {
                throw new Error(`${col.path}/${id} not found`);
            }

            const currValue: number = getFirestorePathValue(refSnapshot.data(), path) ?? 0;
            const newValue = currValue + value;

            transaction.update(ref, { [path]: newValue } as UpdateData<ResourceData>);
        });
    };

    /**
     * Increment number value
     * @param id
     * @param path key or nested key
     * @param value
     * @params security checks
     */
    const incrementNumber = async (
        id: ResourceId | string,
        path: string,
        value: number,
        accessParams?: AccessControlParams,
    ): Promise<void> => {
        if (!accessParams || !updateAccessCheck) {
            return _incrementNumber(id, path, value);
        } else {
            await firestore.runTransaction(async (transaction) => {
                const ref = getDocRef(id);
                const refSnapshot = await transaction.get(ref);
                if (!refSnapshot.exists) {
                    throw new Error(`${col.path}/${id} not found`);
                }

                // Check write access on existing data
                if (updateAccessCheck && !updateAccessCheck(refSnapshot.data()!, accessParams)) {
                    throw new Error(`${col.path}/${ref.id} permission-denied`);
                }

                const currValue: number = getFirestorePathValue(refSnapshot.data(), path) ?? 0;
                const newValue = currValue + value;

                transaction.update(ref, { [path]: newValue } as UpdateData<ResourceData>);
            });
        }
    };

    /**
     * Decrement number value
     * @param id
     * @param path key or nested key
     * @param value
     */
    const decrementNumber = async (
        id: ResourceId | string,
        path: string,
        value: number,
        accessParams?: AccessControlParams,
    ): Promise<void> => {
        return incrementNumber(id, path, value * -1, accessParams);
    };

    const resource = {
        get,
        getOrUndefined,
        getBatch,
        getAll,
        getWhere,
        getWhereCount,
        getWhereFirst,
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
    } satisfies FirebaseResource<ResourceData, ResourceIdPartial>;

    return {
        collection: col,
        doc: getDocRef,
        ...resource,
    };
}

/**
 * Return factory function for generating Firebase resource when dealing with subcollections.
 * @template CollectionId Subcollection Params
 * @template ResourceData Resource data
 * @template ResourceIdPartial Resource id params
 * @param firestore Firestore instance
 * @param collectionPathTemplate Template string to generate collection (eg. `/project/{projectId}/contract`)
 * @param validators Validators for id and data.
 */
export function getFirebaseResourceFactory<
    CollectionId extends Record<string, NonNullable<any>>,
    ResourceData extends Record<string, any>,
    ResourceIdPartial extends Record<string, any> = ResourceIdDefault,
>(
    firestore: Firestore,
    collectionPathTemplate: string,
    validators: DecodeRef<Required<ResourceIdPartial>> &
        ResourceDataValidators<ResourceData> &
        ResourceIdValidators<ResourceIdPartial>,
): FirebaseResourceFactory<CollectionId, ResourceData, ResourceIdPartial> {
    return function getFirebaseResource2(params: CollectionId) {
        const collectionPath = Object.entries(params).reduce(
            (acc, [key, val]) => acc.replace(`{${key}}`, val),
            collectionPathTemplate,
        );
        return getFirebaseResource(firestore, collectionPath, validators);
    };
}
