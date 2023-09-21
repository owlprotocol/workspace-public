/***** Generics for Firebase Web CRUD *****/
import { CollectionReference } from "firebase/firestore";
import { doc, runTransaction, getDocs } from "firebase/firestore";
import { omit, mapValues, pick, isEmpty, zip } from "lodash-es";
import { awaitAllObj } from "@owlprotocol/utils";
import * as crypto from "crypto";
import { firestore, usersPersonalCol, usersPrivateCol } from "./config.js";
import { UserPersonal } from "../models/UserPersonal.js";
import { UserPrivate } from "../models/UserPrivate.js";
import { getFirestoreUpdateData } from "../utils/getFirestoreUpdateData.js";

export interface QueryOptions {
    limit?: number;
    orderBy?: string;
    order?: "asc" | "desc";
}

export type SplitSetFn<
    TMerged extends Record<string, any> & { id: string },
    TSplit extends Record<string, Record<string, any> & { id: string }>,
> = (item: Omit<TMerged, "id">) => { [K in keyof TSplit]: Omit<TSplit[K], "id"> };

export type SplitUpdateFn<
    TMerged extends Record<string, any> & { id: string },
    TSplit extends Record<string, Record<string, any> & { id: string }>,
> = (item: Partial<TMerged> & { id: string }) => { [K in keyof TSplit]: Partial<TSplit[K]> & { id: string } };

export type MergeFn<
    TMerged extends Record<string, any> & { id: string },
    TSplit extends Record<string, Record<string, any> & { id: string }>,
> = (itemSplit: { [K in keyof TSplit]: Omit<TSplit[K], "id"> }) => Omit<TMerged, "id">;

export function mergeFnDefault<
    TMerged extends Record<string, any> & { id: string },
    TSplit extends Record<string, Record<string, any> & { id: string }>,
>(itemSplit: { [K in keyof TSplit]: Omit<TSplit[K], "id"> }): Omit<TMerged, "id"> {
    return Object.values(itemSplit).reduce((acc, d) => {
        return { ...acc, ...d };
    }, {});
}

export type JoinFn<
    TMerged extends Record<string, any> & { id: string },
    TSplit extends Record<string, Record<string, any> & { id: string }>,
> = (itemSplitArr: { [K in keyof TSplit]: TSplit[K][] }) => TMerged[];

export function joinFnDefault<
    TMerged extends Record<string, any> & { id: string },
    TSplit extends Record<string, Record<string, any> & { id: string }>,
>(itemSplitArr: { [K in keyof TSplit]: TSplit[K][] }): TMerged[] {
    const splitCount = Object.keys(itemSplitArr).length;
    const itemsColExistsCount: Record<string, number> = {};
    const items: Record<string, TMerged> = {};

    mapValues(itemSplitArr, (values) => {
        values.forEach((item) => {
            itemsColExistsCount[item.id] = itemsColExistsCount[item.id] ?? 0 + 1;
            items[item.id] = { ...item, ...items[item.id] };
        });
    });

    return Object.values(items).filter((item) => {
        return itemsColExistsCount[item.id] != splitCount;
    });
}

/**
 * Firebase CRUD Wrappers for merged collection data.
 * This can be useful for when you need to use different permissions such as public/private user data and have to store this on separate documents (firestore security rules only apply to documents)
 * We assume depth-1 fields don't intersect between collections (except for id field which is used to join)
 * Similar to regular crud but uses batched writes to avoid race conditions and abstracts the complexity of joining data.
 * @template TMerged Generic type for merged collection data
 * @template TSplit Generic type for
 * @param collection
 * @returns
 */
export function getFirebaseCRUDMerged<
    TMerged extends Record<string, any> & { id: string },
    TSplit extends Record<string, Record<string, any> & { id: string }>,
    TSplitCollections extends { [K in keyof TSplit]: CollectionReference<Omit<TSplit[K], "id">> } = {
        [K in keyof TSplit]: CollectionReference<Omit<TSplit[K], "id">>;
    },
>(collections: TSplitCollections, splitKeys: { [K in keyof TSplit]: (keyof Omit<TMerged, "id">)[] }) {
    const splitSet: SplitSetFn<TMerged, TSplit> = (item) => {
        return mapValues(splitKeys, (keys) => {
            return pick(item, ...keys) as any;
        });
    };
    const splitUpdate: SplitUpdateFn<TMerged, TSplit> = (item) => {
        return mapValues(splitKeys, (keys) => {
            return pick(item, "id", ...keys) as any;
        });
    };
    const merge: MergeFn<TMerged, TSplit> = mergeFnDefault<TMerged, TSplit>;
    const join: JoinFn<TMerged, TSplit> = joinFnDefault<TMerged, TSplit>;
    /**
     * Get doc by id
     * Only returns intersections
     * @param id
     * @returns doc by id
     */
    const get = async (id: string): Promise<TMerged> => {
        const dataSplit = (await runTransaction(firestore, async (transaction) => {
            return awaitAllObj(
                mapValues(collections, async (collection) => {
                    const ref = doc(collection as any, id);
                    const refSnapshot = await transaction.get(ref);

                    if (!refSnapshot.exists()) {
                        throw new Error(`${collection.path}/${id} not found`);
                    }
                    return refSnapshot.data();
                }),
            );
        })) as unknown as TSplit;
        const data = merge(dataSplit);

        return { ...data, id } as TMerged;
    };

    /**
     * Get docs by id
     * Only returns intersections
     * @param ids
     * @returns docs by id
     * //TODO: Is this the fastest way? https://stackoverflow.com/questions/59572943/is-there-a-way-to-batch-read-firebase-documents
     */
    const getBatch = async (ids: string[]): Promise<(TMerged | undefined)[]> => {
        return await runTransaction(firestore, async (transaction) => {
            const operations = ids.map(async (id) => {
                let isIntersect = true;

                //Loop through collections
                const dataSplit = (await awaitAllObj(
                    mapValues(collections, async (collection) => {
                        const ref = doc(collection as any, id);
                        const refSnapshot = await transaction.get(ref);
                        if (!refSnapshot.exists()) {
                            //Failed intersec, return undefined for this id
                            isIntersect = false;
                        }
                        return refSnapshot.data();
                    }),
                )) as unknown as TSplit;
                if (!isIntersect) return undefined;

                const data = merge(dataSplit);
                return { ...data, id } as TMerged;
            });

            return await Promise.all(operations);
        });
    };

    /**
     * Get all docs (non-transaction)
     * Only returns intersections
     * @returns docs
     */
    const getAll = async (): Promise<TMerged[]> => {
        const dataSplitArr = await awaitAllObj(
            mapValues(collections, async (collection) => {
                const snapshot = await getDocs(collection as any);

                return snapshot.docs.map((refSnapshot: any) => {
                    return { ...refSnapshot.data(), id: refSnapshot.id } as TSplit[keyof TSplit];
                });
            }),
        );

        return join(dataSplitArr as any);
    };

    /**
     * Set doc
     * @param item (id optional)
     * @returns id (parameter or default autogenerated with crypto.randomUUID())
     */
    const set = async (item: Omit<TMerged, "id"> & { id?: string }): Promise<string> => {
        const idDefined = item.id ?? crypto.randomUUID();
        const itemSplit = splitSet(item);

        await runTransaction(firestore, async (transaction) => {
            return awaitAllObj(
                mapValues(itemSplit, async (item, key) => {
                    const collection = collections[key] as any;
                    const ref = doc(collection as any, idDefined);
                    await transaction.set(ref, omit(item, "id"));
                }),
            );
        });

        return idDefined;
    };

    /**
     * Set docs as a transaction (max 500 writes)
     * @param items (all with ids or none with ids)
     */
    const setBatch = async (items: TMerged[] | Omit<TMerged, "id">[]): Promise<string[]> => {
        const idsDefined = items.map((item) => item.id ?? crypto.randomUUID());
        await runTransaction(firestore, async (transaction) => {
            const operations = zip(items, idsDefined).map(([item, id]) => {
                const itemSplit = splitSet(item!);
                return awaitAllObj(
                    mapValues(itemSplit, async (item, key) => {
                        const collection = collections[key] as any;
                        const ref = doc(collection as any, id);
                        await transaction.set(ref, omit(item, "id"));
                    }),
                );
            });
            await Promise.all(operations);
        });

        return idsDefined;
    };

    /**
     * Update existing doc
     * @param item
     * @returns
     */
    const update = async (item: Partial<TMerged> & { id: string }): Promise<void> => {
        const itemSplit = splitUpdate(item);

        await runTransaction(firestore, async (transaction) => {
            return awaitAllObj(
                mapValues(itemSplit, async (item, key) => {
                    const collection = collections[key] as any;
                    const ref = doc(collection as any, item.id);
                    const updateData = getFirestoreUpdateData(omit(item, "id")) as any;
                    if (!isEmpty(updateData)) {
                        await transaction.update(ref, updateData);
                    }
                }),
            );
        });
    };

    /**
     * Update existing docs as a transaction (max 500 writes)
     * @param items
     * @returns
     */
    const updateBatch = async (items: (Partial<TMerged> & { id: string })[]): Promise<void> => {
        await runTransaction(firestore, async (transaction) => {
            const operations = items.map((item) => {
                const itemSplit = splitUpdate(item);
                return awaitAllObj(
                    mapValues(itemSplit, async (item, key) => {
                        const collection = collections[key] as any;
                        const ref = doc(collection as any, item.id);
                        const updateData = getFirestoreUpdateData(omit(item, "id")) as any;
                        if (!isEmpty(updateData)) {
                            await transaction.update(ref, updateData);
                        }
                    }),
                );
            });

            await Promise.all(operations);
        });
    };

    /**
     * Delete doc
     * @param item
     * @returns
     */
    const deleteById = async (id: string): Promise<void> => {
        await runTransaction(firestore, async (transaction) => {
            return awaitAllObj(
                mapValues(collections, async (collection) => {
                    const ref = doc(collection as any, id);
                    await transaction.delete(ref);
                }),
            );
        });
    };

    /**
     * Delete docs as transaction (max 500 writes)
     */
    const deleteBatch = async (ids: string[]): Promise<void> => {
        await runTransaction(firestore, async (transaction) => {
            return awaitAllObj(
                mapValues(collections, async (collection) => {
                    const operations = ids.map((id) => {
                        const ref = doc(collection as any, id);
                        return transaction.delete(ref);
                    });

                    return Promise.all(operations);
                }),
            );
        });
    };

    /**
     * Delete all docs
     */
    const deleteAll = async (): Promise<void> => {
        await runTransaction(firestore, async (transaction) => {
            return awaitAllObj(
                mapValues(collections, async (collection) => {
                    const snapshot = await getDocs(collection as any);
                    const operations = snapshot.docs.map((d) => {
                        const ref = doc(collection as any, d.id);
                        return transaction.delete(ref);
                    });

                    return Promise.all(operations);
                }),
            );
        });
    };

    return {
        collections,
        get,
        getBatch,
        getAll,
        set,
        setBatch,
        update,
        updateBatch,
        delete: deleteById,
        deleteBatch,
        deleteAll,
    };
}

export const usersCRUDMerged = getFirebaseCRUDMerged<
    UserPersonal & UserPrivate,
    { personal: UserPersonal; private: UserPrivate }
>(
    { personal: usersPersonalCol, private: usersPrivateCol },
    {
        personal: ["email", "type", "apiKey", "dfnsAddress", "gnosisAddress", "topupTotals", "topupMax"],
        private: ["dfnsId"],
    },
);
