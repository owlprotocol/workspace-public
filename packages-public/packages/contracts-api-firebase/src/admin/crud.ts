/***** Generics for Firebase Admin CRUD *****/
import { CollectionReference, Query, DocumentReference, UpdateData, Firestore } from "firebase-admin/firestore";
import { zip, omit, reduce } from "lodash-es";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import crypto from "node:crypto";
import { firestore } from "./config.js";
import { getFirestorePathValue } from "../utils/getFirestorePathValue.js";
import { getFirestoreUpdateData } from "../utils/getFirestoreUpdateData.js";
import { Invites } from "../models/Invites.js";
import {
    ApiKeyPersonal,
    Contract,
    CouponCampaign,
    CouponDefinition,
    CouponInstance,
    DfnsWalletReadOnly,
    SafeWalletReadOnly,
    Email,
    EthLog,
    EthLogAbi,
    EthTransaction,
    InviteCodeReadOnly,
    MetadataContract,
    MetadataTokens,
    NetworkPrivate,
    NetworkReadOnly,
    OrganizationReadOnly,
    Project,
    ProjectTemplate,
    RequestTemplate,
    Store,
    StorePrivate,
    TokenLazyMintReadOnly,
    User,
    GasExpenseDailyPublic,
    GasExpenseMonthlyPublic,
    GasExpenseDailyReadOnly,
    GasExpenseMonthlyReadOnly,
    GasBudgetRuleGlobalReadOnly,
    GasBudgetRuleByContractReadOnly,
    Blog,
} from "../models/index.js";

export interface AccessControl<T, AccessControlParams extends any[] = []> {
    readAccessCheck?: (item: T, ...params: AccessControlParams) => boolean;
    //id optional since item might not be created yet
    setAccessCheck?: (item: Omit<T, "id"> & { id?: string }, ...params: AccessControlParams) => boolean;
    updateAccessCheck?: (item: Partial<T> & { id: string }, ...params: AccessControlParams) => boolean;
    deleteAccessCheck?: (item: T, ...params: AccessControlParams) => boolean;
}

export interface QueryOptions {
    limit?: number;
    orderBy?: string;
    order?: "asc" | "desc";
}
/**
 * Firebase CRUD Wrappers. create, get, getAll, update, rdelete, deleteAll
 * @template T Generic type for collection data (inlcudes id but this is implicit in Firebase database as path)
 * @param firestore
 * @param collectionPath
 * @param readAccessCheck admin sdk has no security rules. This wraps functions to check if it can read.
 * @param writeAccessCheck admin sdk has no security rules. This wraps functions to check if it can write.
 * @returns
 */
export function getFirebaseCRUD<T extends Record<string, any> & { id: string }, AccessControlParams extends any[] = []>(
    firestore: Firestore,
    collectionPath: string,
    options?: AccessControl<T, AccessControlParams>,
) {
    const col = firestore.collection(collectionPath) as CollectionReference<Omit<T, "id">>;
    const { readAccessCheck, setAccessCheck, updateAccessCheck, deleteAccessCheck } = options ?? {};

    const getDocRef = (id: string): DocumentReference<Omit<T, "id">> => {
        return col.doc(id);
    };

    /**
     * Get doc by id, no security checks
     * @param id
     * @returns doc by id
     */
    const _get = async (id: string): Promise<T> => {
        const ref = col.doc(id);
        const refSnapshot = await ref.get();

        if (!refSnapshot.exists) {
            throw new Error(`${col.path}/${id} not found`);
        }

        return { ...refSnapshot.data(), id: ref.id } as T;
    };

    /**
     * Get doc by id
     * @param id
     * @params security checks
     * @returns doc by id
     */
    const get = async (id: string, ...params: AccessControlParams): Promise<T> => {
        const data = await _get(id);
        //check read access
        if (readAccessCheck && !readAccessCheck(data, ...params)) {
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
    const _getBatch = async (ids: string[]): Promise<(T | undefined)[]> => {
        const refSnapshots = await firestore.runTransaction(async (transaction) => {
            const operations = ids.map((id) => {
                const ref = col.doc(id);
                return transaction.get(ref);
            });

            return await Promise.all(operations);
        });

        return refSnapshots.map((refSnapshot) => {
            return { ...refSnapshot.data(), id: refSnapshot.id } as T;
        });
    };

    /**
     * Get docs by id
     * @param ids
     * @param params security check
     * @returns docs by id
     */
    const getBatch = async (ids: string[], ...params: AccessControlParams): Promise<(T | undefined)[]> => {
        let data = await _getBatch(ids);
        //Filter un-authorized results
        if (readAccessCheck) {
            data = data.filter((item) => (item ? readAccessCheck(item, ...params) : undefined));
        }

        return data;
    };

    /**
     * Get all docs, no security checks
     * @returns docs
     */
    const _getAll = async (): Promise<T[]> => {
        const snapshot = await col.get();
        return snapshot.docs.map((refSnapshot) => {
            return { ...refSnapshot.data(), id: refSnapshot.id } as T;
        });
    };

    /**
     * Get all docs
     * @params security checks
     * @returns docs
     */
    const getAll = async (...params: AccessControlParams): Promise<T[]> => {
        let data = await _getAll();

        //Filter un-authorized results
        if (readAccessCheck) {
            data = data.filter((item) => readAccessCheck(item, ...params));
        }

        return data;
    };

    /**
     * Get docs that match filter, no security checks
     * @param filter
     * @param options limit, orderBy, order
     * @returns docs
     */
    const _getWhere = async (filter: Partial<Omit<T, "id">>, options?: QueryOptions): Promise<T[]> => {
        let query: Query | CollectionReference = col;
        Object.entries(filter).forEach(([key, value]) => {
            if (!query) query = col.where(key, "==", value);
            else query = query.where(key, "==", value);
        });
        if (options?.orderBy) {
            query = query.orderBy(options.orderBy, options.order ?? "asc");
        }
        if (options?.limit) {
            query.limit(options.limit);
        }

        const querySnapshot = await query.get();
        return querySnapshot.docs.map((refSnapshot) => {
            return { ...refSnapshot.data(), id: refSnapshot.id } as T;
        });
    };

    /**
     * Get docs that match filter
     * @param filter
     * @param options limit, orderBy, order
     * @params security checks
     * @returns docs
     */
    const getWhere = async (
        filter: Partial<Omit<T, "id">>,
        options?: QueryOptions,
        ...params: AccessControlParams
    ): Promise<T[]> => {
        let data = await _getWhere(filter, options); //Filter un-authorized results

        if (readAccessCheck) {
            data = data.filter((item) => readAccessCheck(item, ...params));
        }

        return data;
    };

    /**
     * Get first doc that matches filter, no security checks
     * @param filter
     * @param options orderBy, order
     * @returns
     */
    const _getWhereFirst = async (
        filter: Partial<Omit<T, "id">>,
        options?: Omit<QueryOptions, "limit">,
    ): Promise<T | undefined> => {
        const results = await _getWhere(filter, { ...options, limit: 1 });
        return results[0];
    };

    /**
     * Get first doc that matches filter
     * @param filter
     * @param options orderBy, order
     * @param security checks
     * @returns
     */
    const getWhereFirst = async (
        filter: Partial<Omit<T, "id">>,
        options?: Omit<QueryOptions, "limit">,
        ...params: AccessControlParams
    ): Promise<T | undefined> => {
        const data = await _getWhereFirst(filter, options);

        //check read access
        if (data && readAccessCheck && !readAccessCheck(data, ...params)) {
            throw new Error(`${col.path}/${data.id} permission-denied`);
        }

        return data;
    };

    /**
     * Set doc, returns id, no security checks
     * @param item (id optional)
     * @returns id (parameter or default autogenerated with crypto.randomUUID())
     */
    const _set = async (item: Omit<T, "id"> & { id?: string }): Promise<string> => {
        const idDefined = item.id ?? crypto.randomUUID();
        const ref = col.doc(idDefined);
        await ref.set(omit(item, "id") as Omit<T, "id">);
        return idDefined;
    };

    /**
     * Set doc, returns id
     * @param item (id optional)
     * @params security checks
     * @returns
     */
    const set = async (item: Omit<T, "id"> & { id?: string }, ...params: AccessControlParams): Promise<string> => {
        if (setAccessCheck) {
            //check write access on new data
            if (!item.id && !setAccessCheck(item, ...params)) {
                throw new Error(`${col.path}/${item.id ?? `${JSON.stringify(item)}`} permission-denied`);
            }

            return await firestore.runTransaction(async (transaction) => {
                if (item.id) {
                    //if item can exists (has id), check permissions
                    const ref = col.doc(item.id);
                    const refSnapshot = await transaction.get(ref);
                    if (refSnapshot.exists) {
                        const data = { ...refSnapshot.data()!, id: refSnapshot.id } as T;
                        //check write access on existing data
                        if (!setAccessCheck(data, ...params)) {
                            throw new Error(`${col.path}/${ref.id} permission-denied`);
                        }
                    }
                }

                const idDefined = item.id ?? crypto.randomUUID();
                const ref = col.doc(idDefined);
                await transaction.set(ref, omit(item, "id") as Omit<T, "id">);

                return idDefined;
            });
        } else {
            return _set(item);
        }
    };

    /**
     * Set docs as a transaction (max 500 writes), no security checks
     * @param items (all with ids or none with ids)
     * @returns ids (parameter or default autogenerated with crypto.randomUUID())
     */
    const _setBatch = async (items: T[] | Omit<T, "id">[]): Promise<string[]> => {
        const idsDefined = items.map((item) => item.id ?? crypto.randomUUID());
        await firestore.runTransaction(async (transaction) => {
            const operations = zip(items, idsDefined).map(([item, id]) => {
                const ref = col.doc(id!);
                return transaction.set(ref, omit(item, "id") as Omit<T, "id">);
            });

            await Promise.all(operations);
        });

        return idsDefined;
    };

    /**
     * Set docs as a transaction (max 500 writes)
     * @param items (all with ids or none with ids)
     * @param params security checks
     * @returns ids (parameter or default autogenerated with crypto.randomUUID())
     */
    const setBatch = async (items: T[] | Omit<T, "id">[], ...params: AccessControlParams): Promise<string[]> => {
        if (setAccessCheck) {
            items.forEach((item) => {
                //check write access on new data
                if (!item.id && !setAccessCheck(item, ...params)) {
                    throw new Error(`${col.path}/${`${JSON.stringify(item)}`} permission-denied`);
                }
            });

            const idsDefined = items.map((item) => item.id ?? crypto.randomUUID());
            await firestore.runTransaction(async (transaction) => {
                const idExists = reduce(items, (acc, item) => acc || item.id != undefined, false);
                if (idExists) {
                    //if items can exists (has id), check permissions
                    const snapshot = await Promise.all(
                        idsDefined.map((id) => {
                            const ref = col.doc(id);
                            return transaction.get(ref);
                        }),
                    );
                    snapshot.forEach((ref) => {
                        if (ref.exists) {
                            const data = { ...ref.data()!, id: ref.id } as T;
                            //check write access on existing data
                            if (!setAccessCheck(data, ...params)) {
                                throw new Error(`${col.path}/${ref.id} permission-denied`);
                            }
                        }
                    });
                }

                const operations = zip(items, idsDefined).map(([item, id]) => {
                    const ref = col.doc(id!);
                    return transaction.set(ref, omit(item, "id") as Omit<T, "id">);
                });

                await Promise.all(operations);
            });

            return idsDefined;
        } else {
            return _setBatch(items);
        }
    };

    /**
     * Get doc or create new one, no security checks
     * @param id
     * @param initialValue
     * @returns doc or initialValue
     */
    const _getOrCreate = async (id: string, initalValue: Omit<T, "id">): Promise<T> => {
        const dataExisting = await firestore.runTransaction(async (transaction) => {
            const ref = col.doc(id);
            const refSnapshot = await transaction.get(ref);
            if (!refSnapshot.exists) {
                await transaction.set(ref, initalValue);
                return undefined;
            } else {
                return refSnapshot.data();
            }
        });

        const data = dataExisting ? { ...dataExisting, id } : { ...initalValue, id };
        return data as T;
    };

    /**
     * Get doc or create new one
     * @param id
     * @param initialValue
     * @returns doc or initialValue
     */
    const getOrCreate = async (id: string, initialValue: Omit<T, "id">, ...params: AccessControlParams): Promise<T> => {
        const dataExisting = await firestore.runTransaction(async (transaction) => {
            const ref = col.doc(id);
            const refSnapshot = await transaction.get(ref);
            if (!refSnapshot.exists) {
                if (setAccessCheck) {
                    //check write access on new data
                    if (!setAccessCheck(initialValue, ...params)) {
                        throw new Error(`${col.path}/${id} permission-denied`);
                    }
                }
                await transaction.set(ref, initialValue);
                return undefined;
            } else {
                const data = refSnapshot.data()!;
                if (readAccessCheck) {
                    //check write access on new data
                    if (!readAccessCheck({ ...data, id } as T, ...params)) {
                        throw new Error(`${col.path}/${id} permission-denied`);
                    }
                }

                return data;
            }
        });

        const data = dataExisting ? { ...dataExisting, id } : { ...initialValue, id };
        return data as T;
    };

    /**
     * Get first doc that matches filter or create new one, no security checks
     * WARNING: NOT executed as transaction (only get supported in transaction)
     * @param filter
     * @param initialValue
     * @param options orderBy, order
     * @returns doc or initialValue
     */
    const _getWhereFirstOrCreate = async (
        filter: Partial<Omit<T, "id">>,
        initialValue: Omit<T, "id">,
        options?: Omit<QueryOptions, "limit">,
    ): Promise<T> => {
        const existing = await _getWhereFirst(filter, options);
        if (!existing) {
            const id = await _set(initialValue);
            return { ...initialValue, id } as T;
        }
        return existing;
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
        filter: Partial<Omit<T, "id">>,
        initialValue: Omit<T, "id">,
        options?: Omit<QueryOptions, "limit">,
        ...params: AccessControlParams
    ): Promise<T> => {
        const existing = await getWhereFirst(filter, options, ...params);
        if (!existing) {
            const id = await set(initialValue, ...params);
            return { ...initialValue, id } as T;
        }
        return existing;
    };

    /**
     * Update existing doc, no security checks
     * @param item
     * @returns
     */
    const _update = async (item: Partial<T> & { id: string }): Promise<void> => {
        const ref = col.doc(item.id);
        await ref.update(getFirestoreUpdateData(omit(item, "id")) as UpdateData<Omit<T, "id">>);
    };

    /**
     * Update existing doc
     * @param item
     * @params security checks
     * @returns
     */
    const update = async (item: Partial<T> & { id: string }, ...params: AccessControlParams): Promise<void> => {
        if (updateAccessCheck) {
            await firestore.runTransaction(async (transaction) => {
                const ref = col.doc(item.id);
                const refSnapshot = await transaction.get(ref);
                if (!refSnapshot.exists) {
                    throw new Error(`${col.path}/${ref.id} not found`);
                }

                const data = { ...refSnapshot.data()!, id: refSnapshot.id } as T;
                //check write access on existing data
                if (!updateAccessCheck(data, ...params)) {
                    throw new Error(`${col.path}/${ref.id} permission-denied`);
                }

                await transaction.update(ref, getFirestoreUpdateData(omit(item, "id")));
            });
        } else {
            _update(item);
        }
    };

    /**
     * Update existing docs as a transaction (max 500 writes), no security checks
     * @param items
     * @returns
     */
    const _updateBatch = async (items: (Partial<T> & { id: string })[]): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const operations = items.map((item) => {
                const ref = col.doc(item.id);
                return transaction.update(ref, getFirestoreUpdateData(omit(item, "id")));
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
        items: (Partial<T> & { id: string })[],
        ...params: AccessControlParams
    ): Promise<void> => {
        if (updateAccessCheck) {
            const idsDefined = items.map((item) => item.id ?? crypto.randomUUID());
            await firestore.runTransaction(async (transaction) => {
                const snapshot = await Promise.all(
                    idsDefined.map((id) => {
                        const ref = col.doc(id);
                        return transaction.get(ref);
                    }),
                );
                snapshot.forEach((ref) => {
                    if (!ref.exists) {
                        throw new Error(`${col.path}/${ref.id} not found`);
                    }
                    const data = { ...ref.data()!, id: ref.id } as T;
                    //check write access on existing data
                    if (!updateAccessCheck(data, ...params)) {
                        throw new Error(`${col.path}/${ref.id} permission-denied`);
                    }
                });

                const operations = zip(items, idsDefined).map(([item, id]) => {
                    const ref = col.doc(id!);
                    return transaction.update(ref, getFirestoreUpdateData(omit(item, "id")));
                });

                await Promise.all(operations);
            });
        } else {
            return _updateBatch(items);
        }
    };

    /**
     * Delete doc, no security checks
     * @param id
     * @returns
     */
    const _deleteById = async (id: string): Promise<FirebaseFirestore.WriteResult> => {
        const ref = col.doc(id);
        return ref.delete();
    };

    /**
     * Delete doc
     * @param id
     * @params security checks
     * @returns
     */
    const deleteById = async (id: string, ...params: AccessControlParams): Promise<void> => {
        if (deleteAccessCheck) {
            await firestore.runTransaction(async (transaction) => {
                const ref = col.doc(id);
                const refSnapshot = await transaction.get(ref);
                if (!refSnapshot.exists) {
                    throw new Error(`${col.path}/${ref.id} not found`);
                }

                const data = { ...refSnapshot.data()!, id: refSnapshot.id } as T;
                //check write access on existing data
                if (!deleteAccessCheck(data, ...params)) {
                    throw new Error(`${col.path}/${ref.id} permission-denied`);
                }

                await transaction.delete(ref);
            });
        } else {
            _deleteById(id);
        }
    };

    /**
     * Delete docs as transaction (max 500 writes), no security checks
     */
    const _deleteBatch = async (ids: string[]): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const operations = ids.map((id) => {
                const ref = col.doc(id);
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
    const deleteBatch = async (ids: string[], ...params: AccessControlParams): Promise<void> => {
        if (deleteAccessCheck) {
            await firestore.runTransaction(async (transaction) => {
                const snapshot = await Promise.all(
                    ids.map((id) => {
                        const ref = col.doc(id);
                        return transaction.get(ref);
                    }),
                );
                snapshot.forEach((ref) => {
                    if (!ref.exists) {
                        throw new Error(`${col.path}/${ref.id} not found`);
                    }
                    const data = { ...ref.data()!, id: ref.id } as T;
                    //check write access on existing data
                    if (!deleteAccessCheck(data, ...params)) {
                        throw new Error(`${col.path}/${ref.id} permission-denied`);
                    }
                });

                const operations = ids.map((id) => {
                    const ref = col.doc(id);
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
    const deleteAll = async (...params: AccessControlParams): Promise<void> => {
        if (deleteAccessCheck) {
            await firestore.runTransaction(async (transaction) => {
                const snapshot = await col.get();

                snapshot.forEach((ref) => {
                    const data = { ...ref.data()!, id: ref.id } as T;
                    //check write access on existing data
                    if (!deleteAccessCheck(data, ...params)) {
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
     * Increment value, no security checks
     * @param id
     * @param path key or nested key
     * @param value
     */
    const _increment = async (id: string, path: string, value: BigNumberish): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const ref = col.doc(id);
            const refSnapshot = await transaction.get(ref);
            if (!refSnapshot.exists) {
                throw new Error(`${col.path}/${id} not found`);
            }

            const incrValue = BigNumber.from(value);
            const currValueStr: BigNumberish = getFirestorePathValue(refSnapshot.data(), path) ?? "0";
            const currValue = BigNumber.from(currValueStr);
            const newValue = currValue.add(incrValue);

            transaction.update(ref, { [path]: newValue.toString() } as UpdateData<Omit<T, "id">>);
        });
    };

    /**
     * Increment value
     * @param id
     * @param path key or nested key
     * @param value
     * @params security checks
     */
    const increment = async (
        id: string,
        path: string,
        value: BigNumberish,
        ...params: AccessControlParams
    ): Promise<void> => {
        await firestore.runTransaction(async (transaction) => {
            const ref = col.doc(id);
            const refSnapshot = await transaction.get(ref);
            if (!refSnapshot.exists) {
                throw new Error(`${col.path}/${id} not found`);
            }
            const data = { ...refSnapshot.data()!, id: refSnapshot.id } as T;
            //check write access on existing data
            if (updateAccessCheck && !updateAccessCheck(data, ...params)) {
                throw new Error(`${col.path}/${ref.id} permission-denied`);
            }

            const incrValue = BigNumber.from(value);
            const currValueStr: BigNumberish = getFirestorePathValue(refSnapshot.data(), path) ?? "0";
            const currValue = BigNumber.from(currValueStr);
            const newValue = currValue.add(incrValue);

            transaction.update(ref, { [path]: newValue.toString() } as UpdateData<Omit<T, "id">>);
        });
    };

    /**
     * Decrement value, no security checks
     * @param id
     * @param path key or nested key
     * @param value
     * @params security checks
     */
    const _decrement = async (id: string, path: string, value: BigNumberish): Promise<void> => {
        return _increment(id, path, BigNumber.from("0").sub(BigNumber.from(value)));
    };

    /**
     * Decrement value
     * @param id
     * @param path key or nested key
     * @param value
     */
    const decrement = async (
        id: string,
        path: string,
        value: BigNumberish,
        ...params: AccessControlParams
    ): Promise<void> => {
        return increment(id, path, BigNumber.from("0").sub(BigNumber.from(value)), ...params);
    };

    return {
        collection: col,
        doc: getDocRef,
        _get,
        get,
        _getBatch,
        getBatch,
        _getAll,
        getAll,
        _getWhere,
        getWhere,
        _getWhereFirst,
        getWhereFirst,
        _set,
        set,
        _setBatch,
        setBatch,
        _getOrCreate,
        getOrCreate,
        _getWhereFirstOrCreate,
        getWhereFirstOrCreate,
        _update,
        update,
        _updateBatch,
        updateBatch,
        _delete: _deleteById,
        delete: deleteById,
        _deleteBatch,
        deleteBatch,
        _deleteAll,
        deleteAll,
        _increment,
        increment,
        _decrement,
        decrement,
    };
}

const ownerCheck = ({ owner }: { owner?: string }, userId: string) => owner === userId;
const ownerOnlyChecks = {
    readAccessCheck: ownerCheck,
    setAccessCheck: ownerCheck,
    updateAccessCheck: ownerCheck,
    deleteAccessCheck: ownerCheck,
};
const readOnlyChecks = {
    readAccessCheck: () => true,
    setAccessCheck: () => false,
    updateAccessCheck: () => false,
    deleteAccessCheck: () => false,
};
const ownerOnlyWriteChecks = {
    readAccessCheck: () => true,
    setAccessCheck: ownerCheck,
    updateAccessCheck: ownerCheck,
    deleteAccessCheck: ownerCheck,
};

//ethmodels
export const ethLogsCRUD = getFirebaseCRUD<EthLog, [userId: string]>(firestore, "ethLogs", readOnlyChecks);
export const ethLogAbisCRUD = getFirebaseCRUD<EthLogAbi, [userId: string]>(firestore, "ethLogAbis", readOnlyChecks);
export const ethTransactionsCRUD = getFirebaseCRUD<EthTransaction, [userId: string]>(
    firestore,
    "ethTransactions",
    readOnlyChecks,
);
//shopify
export const storesCRUD = getFirebaseCRUD<Store, [userId: string]>(firestore, "stores", ownerOnlyWriteChecks);
export const storePrivatesCRUD = getFirebaseCRUD<StorePrivate, [userId: string]>(
    firestore,
    "storePrivates",
    ownerOnlyChecks,
);
export const couponCampaignsCRUD = getFirebaseCRUD<CouponCampaign, [userId: string]>(
    firestore,
    "couponCampaigns",
    ownerOnlyWriteChecks,
);
export const couponDefinitionsCRUD = getFirebaseCRUD<CouponDefinition, [userId: string]>(
    firestore,
    "couponDefinitions",
    ownerOnlyWriteChecks,
);
export const couponInstancesCRUD = getFirebaseCRUD<CouponInstance, [userId: string]>(
    firestore,
    "couponInstances",
    ownerOnlyWriteChecks,
);
//tokens
export const metadataTokensCRUD = getFirebaseCRUD<MetadataTokens, [userId: string]>(
    firestore,
    "metadataTokens",
    ownerOnlyChecks,
);
export const tokenLazyMintsReadOnlyCRUD = getFirebaseCRUD<TokenLazyMintReadOnly, [userId: string]>(
    firestore,
    "tokenLazyMintsReadOnly",
    ownerOnlyChecks,
);
//users
export const apiKeysPersonalCRUD = getFirebaseCRUD<ApiKeyPersonal, [userId: string]>(
    firestore,
    "apiKeysPersonal",
    ownerOnlyChecks,
);
export const inviteCodesReadOnlyCRUD = getFirebaseCRUD<InviteCodeReadOnly, [userId: string]>(
    firestore,
    "inviteCodesReadOnly",
    ownerOnlyChecks,
);
export const organizationsReadOnlyCRUD = getFirebaseCRUD<OrganizationReadOnly, [userId: string]>(
    firestore,
    "organizationsReadOnly",
    ownerOnlyChecks,
);
export const usersCRUD = getFirebaseCRUD<User, [userId: string]>(firestore, "users", {
    readAccessCheck: (user, userId) => user.id === userId,
    setAccessCheck: (user, userId) => user.id === undefined || user.id === userId,
    updateAccessCheck: (user, userId) => user.id === userId,
    deleteAccessCheck: (user, userId) => user.id === userId,
});
export const dfnsWalletsReadOnlyCRUD = getFirebaseCRUD<DfnsWalletReadOnly, [userId: string]>(
    firestore,
    "dfnsWalletsReadOnly",
    ownerOnlyChecks,
);
export const safeWalletsReadOnlyCRUD = getFirebaseCRUD<SafeWalletReadOnly, [userId: string]>(
    firestore,
    "safeWalletsReadOnly",
    ownerOnlyChecks,
);
//networks
export const networksReadOnlyCRUD = getFirebaseCRUD<NetworkReadOnly>(firestore, "networksReadOnly", readOnlyChecks);
export const networksPrivateCRUD = getFirebaseCRUD<NetworkPrivate>(firestore, "networksPrivate", readOnlyChecks);
//gasexpense
export const gasExpensesDailyPublicCRUD = getFirebaseCRUD<GasExpenseDailyPublic, [userId: string]>(
    firestore,
    "gasExpensesDailyPublic",
    readOnlyChecks,
);
export const gasExpensesMonthlyPublicCRUD = getFirebaseCRUD<GasExpenseMonthlyPublic, [userId: string]>(
    firestore,
    "gasExpensesMonthlyPublic",
    readOnlyChecks,
);
export const gasExpensesDailyReadOnlyCRUD = getFirebaseCRUD<GasExpenseDailyReadOnly, [userId: string]>(
    firestore,
    "gasExpensesDailyReadOnly",
    ownerOnlyChecks,
);
export const gasExpensesMonthlyReadOnlyCRUD = getFirebaseCRUD<GasExpenseMonthlyReadOnly, [userId: string]>(
    firestore,
    "gasExpensesMonthlyReadOnly",
    ownerOnlyChecks,
);
export const gasBudgetRulesGlobalReadOnlyCRUD = getFirebaseCRUD<GasBudgetRuleGlobalReadOnly, [userId: string]>(
    firestore,
    "gasBudgetRulesGlobalReadOnly",
    ownerOnlyChecks,
);
export const gasBudgetRulesByContractReadOnlyCRUD = getFirebaseCRUD<GasBudgetRuleByContractReadOnly, [userId: string]>(
    firestore,
    "gasBudgetRulesByContractReadOnly",
    ownerOnlyChecks,
);
//other
export const projectTemplatesCRUD = getFirebaseCRUD<ProjectTemplate, [userId: string]>(
    firestore,
    "projectTemplates",
    readOnlyChecks,
);
export const requestTemplatesCRUD = getFirebaseCRUD<RequestTemplate, [userId: string]>(
    firestore,
    "requestTemplates",
    ownerOnlyChecks,
);
export const contractsCRUD = getFirebaseCRUD<Contract, [userId: string]>(firestore, "contracts", ownerOnlyChecks);
export const projectsCRUD = getFirebaseCRUD<Project, [userId: string]>(firestore, "projects", ownerOnlyChecks);
export const metadataContractsCRUD = getFirebaseCRUD<MetadataContract, [userId: string]>(
    firestore,
    "metadataContracts",
    ownerOnlyChecks,
);

export const emailsCRUD = getFirebaseCRUD<Email, [userId: string]>(firestore, "emails", {
    readAccessCheck: () => false,
    setAccessCheck: () => true,
    updateAccessCheck: () => false,
    deleteAccessCheck: () => false,
});
export const blogsCRUD = getFirebaseCRUD<Blog>(firestore, "blogs");
export const invitesCRUD = getFirebaseCRUD<Invites, [userId: string]>(firestore, "invites", {
    readAccessCheck: () => false,
    setAccessCheck: () => true,
    updateAccessCheck: () => false,
    deleteAccessCheck: () => false,
});
