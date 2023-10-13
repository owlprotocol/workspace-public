/***** Generics for Firebase Web CRUD *****/
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import {
    CollectionReference,
    DocumentData,
    DocumentReference,
    Firestore,
    QueryConstraint,
    collection,
    deleteDoc,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    runTransaction,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { omit, zip } from "lodash-es";
import { firestore } from "./config.js";
import { getFirestorePathValue } from "../utils/getFirestorePathValue.js";
import { getFirestoreUpdateData } from "../utils/getFirestoreUpdateData.js";
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
    Invites,
    NetworkCreate2FactoryTransaction,
} from "../models/index.js";
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
 * @returns
 */
export function getFirebaseCRUD<T extends Record<string, any> & { id: string }>(
    firestore: Firestore,
    collectionPath: string,
) {
    const col = collection(firestore, collectionPath) as CollectionReference<Omit<T, "id">>;

    const getDocRef = (id: string): DocumentReference<Omit<T, "id">, DocumentData> => {
        return doc(col, id);
    };

    /**
     * Get doc by id
     * @param id
     * @returns doc by id
     */
    const get = async (id: string): Promise<T> => {
        const ref = doc(col, id);
        const refSnapshot = await getDoc(ref);

        if (!refSnapshot.exists()) {
            throw new Error(`${col.path}/${id} not found`);
        }

        return { ...refSnapshot.data(), id: ref.id } as T;
    };

    /**
     * Get docs by id
     * @param ids
     * @returns docs by id
     * //TODO: Is this the fastest way? https://stackoverflow.com/questions/59572943/is-there-a-way-to-batch-read-firebase-documents
     */
    const getBatch = async (ids: string[]): Promise<(T | undefined)[]> => {
        const refSnapshots = await runTransaction(firestore, async (transaction) => {
            const operations = ids.map((id) => {
                const ref = doc(col, id);
                return transaction.get(ref);
            });

            return await Promise.all(operations);
        });

        return refSnapshots.map((refSnapshot) => {
            return { ...refSnapshot.data(), id: refSnapshot.id } as T;
        });
    };

    /**
     * Get all docs
     * @returns docs
     */
    const getAll = async (): Promise<T[]> => {
        const snapshot = await getDocs(col);
        return snapshot.docs.map((refSnapshot) => {
            return { ...refSnapshot.data(), id: refSnapshot.id } as T;
        });
    };

    /**
     * Get docs that match filter
     * @param filter
     * @param options limit, orderBy, order
     * @returns docs
     */
    const getWhere = async (filter: Partial<Omit<T, "id">>, options?: QueryOptions): Promise<T[]> => {
        const queryFilterConstraints: QueryConstraint[] = Object.entries(filter).map(([key, value]) => {
            return where(key, "==", value);
        });
        if (options?.orderBy) {
            queryFilterConstraints.push(orderBy(options.orderBy, options.order ?? "asc"));
        }
        if (options?.limit) {
            queryFilterConstraints.push(limit(options.limit));
        }

        const querySnapshot = await getDocs(query(col, ...queryFilterConstraints));
        return querySnapshot.docs.map((refSnapshot) => {
            return { ...refSnapshot.data(), id: refSnapshot.id } as T;
        });
    };

    /**
     * Get docs that match filter count
     * @param filter
     * @param options limit, orderBy, order
     * @returns docs
     */
    const getWhereCount = async (filter: Partial<Omit<T, "id">>, options?: QueryOptions): Promise<number> => {
        const queryFilterConstraints: QueryConstraint[] = Object.entries(filter).map(([key, value]) => {
            return where(key, "==", value);
        });
        if (options?.orderBy) {
            queryFilterConstraints.push(orderBy(options.orderBy, options.order ?? "asc"));
        }
        if (options?.limit) {
            queryFilterConstraints.push(limit(options.limit));
        }

        const querySnapshot = await getCountFromServer(query(col, ...queryFilterConstraints));
        return querySnapshot.data().count;
    };

    /**
     * Get first doc that matches filter
     * @param filter
     * @param options orderBy, order
     * @returns doc or undefined
     */
    const getWhereFirst = async (
        filter: Partial<Omit<T, "id">>,
        options?: Omit<QueryOptions, "limit">,
    ): Promise<T | undefined> => {
        const results = await getWhere(filter, { ...options, limit: 1 });
        return results[0];
    };

    /**
     * Set doc
     * @param item (id optional)
     * @returns id (parameter or default autogenerated with crypto.randomUUID())
     */
    const set = async (item: Omit<T, "id"> & { id?: string }): Promise<string> => {
        const idDefined = item.id ?? crypto.randomUUID();
        const ref = doc(col, idDefined);
        await setDoc(ref, omit(item, "id"));
        return idDefined;
    };

    /**
     * Set docs as a transaction (max 500 writes)
     * @param items (all with ids or none with ids)
     */
    const setBatch = async (items: T[] | Omit<T, "id">[]): Promise<string[]> => {
        const idsDefined = items.map((item) => item.id ?? crypto.randomUUID());
        await runTransaction(firestore, async (transaction) => {
            const operations = zip(items, idsDefined).map(([item, id]) => {
                const ref = doc(col, id);
                return transaction.set(ref, omit(item, "id"));
            });

            await Promise.all(operations);
        });

        return idsDefined;
    };

    /**
     * Get doc or create new one
     * @param id
     * @param initialValue
     * @returns doc or initialValue
     */
    const getOrCreate = async (id: string, initialValue: Omit<T, "id">): Promise<T> => {
        const dataExisting = await runTransaction(firestore, async (transaction) => {
            const ref = doc(col, id);
            const refSnapshot = await transaction.get(ref);
            if (!refSnapshot.exists()) {
                await transaction.set(ref, initialValue);
                return undefined;
            } else {
                return refSnapshot.data();
            }
        });

        const data = dataExisting ? { ...dataExisting, id } : { ...initialValue, id };
        return data as T;
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
    ): Promise<T> => {
        const existing = await getWhereFirst(filter, options);
        if (!existing) {
            const id = await set(initialValue);
            return { ...initialValue, id } as T;
        }
        return existing;
    };

    /**
     * Update existing doc
     * @param item
     * @returns
     */
    const update = async (item: Partial<T> & { id: string }): Promise<void> => {
        const ref = doc(col, item.id);
        await updateDoc(ref, getFirestoreUpdateData(omit(item, "id")));
    };

    /**
     * Update existing docs as a transaction (max 500 writes)
     * @param items
     * @returns
     */
    const updateBatch = async (items: (Partial<T> & { id: string })[]): Promise<void> => {
        await runTransaction(firestore, async (transaction) => {
            const operations = items.map((item) => {
                const ref = doc(col, item.id);
                return transaction.update(ref, getFirestoreUpdateData(omit(item, "id")));
            });

            await Promise.all(operations);
        });
    };

    /**
     * Delete doc
     * @param id
     * @returns
     */
    const deleteById = async (id: string): Promise<void> => {
        const ref = doc(col, id);
        return deleteDoc(ref);
    };

    /**
     * Delete docs as transaction (max 500 writes)
     */
    const deleteBatch = async (ids: string[]): Promise<void> => {
        await runTransaction(firestore, async (transaction) => {
            const operations = ids.map((id) => {
                const ref = doc(col, id);
                return transaction.delete(ref);
            });

            await Promise.all(operations);
        });
    };

    /**
     * Delete all docs
     */
    const deleteAll = async (): Promise<void> => {
        await runTransaction(firestore, async (transaction) => {
            const snapshot = await getDocs(col);
            const operations = snapshot.docs.map((d) => {
                const ref = doc(col, d.id);
                return transaction.delete(ref);
            });

            await Promise.all(operations);
        });
    };

    /**
     * Increment value
     * @param id
     * @param path key or nested key
     * @param value
     */
    const increment = async (id: string, path: string, value: BigNumberish): Promise<void> => {
        await runTransaction(firestore, async (transaction) => {
            const ref = doc(col, id);
            const refSnapshot = await transaction.get(ref);
            if (!refSnapshot.exists()) {
                throw new Error(`${col.path}/${id} not found`);
            }
            const incrValue = BigNumber.from(value);
            const currValueStr: BigNumberish = getFirestorePathValue(refSnapshot.data(), path) ?? "0";
            const currValue = BigNumber.from(currValueStr);
            const newValue = currValue.add(incrValue);

            transaction.update(ref, { [path]: newValue.toString() });
        });
    };

    /**
     * Decrement value
     * @param id
     * @param path key or nested key
     * @param value
     */
    const decrement = async (id: string, path: string, value: BigNumberish): Promise<void> => {
        return increment(id, path, BigNumber.from("0").sub(BigNumber.from(value)));
    };

    return {
        collection: col,
        doc: getDocRef,
        get,
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
        deleteBatch,
        delete: deleteById,
        deleteAll,
        increment,
        decrement,
    };
}

//ethmodels
export const ethLogsCRUD = getFirebaseCRUD<EthLog>(firestore, "ethLogs");
export const ethLogAbisCRUD = getFirebaseCRUD<EthLogAbi>(firestore, "ethLogAbis");
export const ethTransactionsCRUD = getFirebaseCRUD<EthTransaction>(firestore, "ethTransactions");
//shopify
export const storesCRUD = getFirebaseCRUD<Store>(firestore, "stores");
export const storePrivatesCRUD = getFirebaseCRUD<StorePrivate>(firestore, "storePrivates");
export const couponCampaignsCRUD = getFirebaseCRUD<CouponCampaign>(firestore, "couponCampaigns");
export const couponDefinitionsCRUD = getFirebaseCRUD<CouponDefinition>(firestore, "couponDefinitions");
export const couponInstancesCRUD = getFirebaseCRUD<CouponInstance>(firestore, "couponInstances");
//tokens
export const metadataTokensCRUD = getFirebaseCRUD<MetadataTokens>(firestore, "metadataTokens");
export const tokenLazyMintsReadOnlyCRUD = getFirebaseCRUD<TokenLazyMintReadOnly>(firestore, "tokenLazyMintsReadOnly");
//users
export const apiKeysPersonalCRUD = getFirebaseCRUD<ApiKeyPersonal>(firestore, "apiKeysPersonal");
export const inviteCodesReadOnlyCRUD = getFirebaseCRUD<InviteCodeReadOnly>(firestore, "inviteCodesReadOnly");
export const organizationsReadOnlyCRUD = getFirebaseCRUD<OrganizationReadOnly>(firestore, "organizationsReadOnly");
export const usersCRUD = getFirebaseCRUD<User>(firestore, "users");
export const dfnsWalletsReadOnlyCRUD = getFirebaseCRUD<DfnsWalletReadOnly>(firestore, "dfnsWalletsReadOnly");
export const safeWalletsReadOnlyCRUD = getFirebaseCRUD<SafeWalletReadOnly>(firestore, "safeWalletsReadOnly");
//networks
export const networksReadOnlyCRUD = getFirebaseCRUD<NetworkReadOnly>(firestore, "networksReadOnly");
export const networksPrivateCRUD = getFirebaseCRUD<NetworkPrivate>(firestore, "networksPrivate");
export const networkCreate2FactoryTransactionsCRUD = getFirebaseCRUD<NetworkCreate2FactoryTransaction>(
    firestore,
    "networkCreate2FactoryTransactions",
);
//gasexpense
export const gasExpensesDailyPublicCRUD = getFirebaseCRUD<GasExpenseDailyPublic>(firestore, "gasExpensesDailyPublic");
export const gasExpensesMonthlyPublicCRUD = getFirebaseCRUD<GasExpenseMonthlyPublic>(
    firestore,
    "gasExpensesMonthlyPublic",
);
export const gasExpensesDailyReadOnlyCRUD = getFirebaseCRUD<GasExpenseDailyReadOnly>(
    firestore,
    "gasExpensesDailyReadOnly",
);
export const gasExpensesMonthlyReadOnlyCRUD = getFirebaseCRUD<GasExpenseMonthlyReadOnly>(
    firestore,
    "gasExpensesMonthlyReadOnly",
);
export const gasBudgetRulesGlobalReadOnlyCRUD = getFirebaseCRUD<GasBudgetRuleGlobalReadOnly>(
    firestore,
    "gasBudgetRulesGlobalReadOnly",
);
export const gasBudgetRulesByContractReadOnlyCRUD = getFirebaseCRUD<GasBudgetRuleByContractReadOnly>(
    firestore,
    "gasBudgetRulesByContractReadOnly",
);
//other
export const projectTemplatesCRUD = getFirebaseCRUD<ProjectTemplate>(firestore, "projectTemplates");
export const requestTemplatesCRUD = getFirebaseCRUD<RequestTemplate>(firestore, "requestTemplates");
export const contractsCRUD = getFirebaseCRUD<Contract>(firestore, "contracts");
export const projectsCRUD = getFirebaseCRUD<Project>(firestore, "projects");
export const metadataContractsCRUD = getFirebaseCRUD<MetadataContract>(firestore, "metadataContracts");
export const emailsCRUD = getFirebaseCRUD<Email>(firestore, "emails");
export const blogsCRUD = getFirebaseCRUD<Blog>(firestore, "blogs");
export const invitesCRUD = getFirebaseCRUD<Invites>(firestore, "invites");
