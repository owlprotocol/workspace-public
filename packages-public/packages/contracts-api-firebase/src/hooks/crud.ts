/***** Generics for Firebase Web CRUD *****/
import {
    CollectionReference,
    DocumentData,
    DocumentSnapshot,
    Firestore,
    QuerySnapshot,
    collection,
    limit,
    orderBy,
} from "firebase/firestore";
import { doc, query, where, QueryConstraint } from "firebase/firestore";
//@ts-expect-error
import { useFirestoreCollection, useFirestoreDoc, ObservableStatus } from "reactfire";
import { firestore } from "../web/config.js";
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
export function getFirebaseHooks<T extends Record<string, any> & { id: string }>(
    firestore: Firestore,
    collectionPath: string,
) {
    const col = collection(firestore, collectionPath) as CollectionReference<Omit<T, "id">>;

    /**
     * Get doc by id
     * @param id
     * @returns doc by id
     */
    const useGet = (
        id: string | undefined,
    ): [T | undefined, ObservableStatus<DocumentSnapshot<Omit<T, "id">, DocumentData>>] => {
        //undefined | "" path breaks, we set it to empty
        const result = useFirestoreDoc(doc(col, id ?? "empty"));
        const refSnapshot = result.data;
        const data = (refSnapshot ? { ...refSnapshot.data(), id } : undefined) as T | undefined;

        return [data, result];
    };

    /**
     * Get all docs
     * @returns docs
     */
    const useGetAll = (): [T[] | undefined, ObservableStatus<QuerySnapshot<Omit<T, "id">, DocumentData>>] => {
        const result = useFirestoreCollection(col);
        const snapshot = result.data;
        const data = (
            snapshot
                ? //TODO: Remove any
                  snapshot.docs.map((d: any) => {
                      return { ...d.data(), id: d.id };
                  })
                : undefined
        ) as T[] | undefined;

        return [data, result];
    };

    /**
     * Get docs that match filter
     * @param filter
     * @param options limit, orderBy, order
     * @returns docs
     */
    const useGetWhere = (
        filter: Partial<Omit<T, "id">>,
        options?: QueryOptions,
    ): [T[] | undefined, ObservableStatus<QuerySnapshot<Omit<T, "id">, DocumentData>>] => {
        const queryFilterConstraints: QueryConstraint[] = Object.entries(filter).map(([key, value]) => {
            return where(key, "==", value);
        });
        if (options?.orderBy) {
            queryFilterConstraints.push(orderBy(options.orderBy, options.order ?? "asc"));
        }
        if (options?.limit) {
            queryFilterConstraints.push(limit(options.limit));
        }

        const result = useFirestoreCollection(query(col, ...queryFilterConstraints));
        const snapshot = result.data;
        const data = (
            snapshot
                ? //TODO: Remove any
                  snapshot.docs.map((d: any) => {
                      return { ...d.data(), id: d.id };
                  })
                : undefined
        ) as T[] | undefined;

        return [data, result] as [T[] | undefined, typeof result];
    };

    /**
     * Get docs that match filter
     * @param filter
     * @param options limit, orderBy, order
     * @returns docs
     */
    const useGetWhereFirst = (
        filter: Partial<Omit<T, "id">>,
        options?: Omit<QueryOptions, "limit">,
    ): [T | undefined, ObservableStatus<QuerySnapshot<Omit<T, "id">, DocumentData>>] => {
        const [data, result] = useGetWhere(filter, { ...options, limit: 1 });

        return [data ? data[0] : undefined, result];
    };

    return {
        useGet,
        useGetAll,
        useGetWhere,
        useGetWhereFirst,
    };
}

//ethmodels
export const ethLogsHooks = getFirebaseHooks<EthLog>(firestore, "ethLogs");
export const ethLogAbisHooks = getFirebaseHooks<EthLogAbi>(firestore, "ethLogAbis");
export const ethTransactionsHooks = getFirebaseHooks<EthTransaction>(firestore, "ethTransactions");
//shopify
export const storesHooks = getFirebaseHooks<Store>(firestore, "stores");
export const storePrivatesHooks = getFirebaseHooks<StorePrivate>(firestore, "storePrivates");
export const couponCampaignsHooks = getFirebaseHooks<CouponCampaign>(firestore, "couponCampaigns");
export const couponDefinitionsHooks = getFirebaseHooks<CouponDefinition>(firestore, "couponDefinitions");
export const couponInstancesHooks = getFirebaseHooks<CouponInstance>(firestore, "couponInstances");
//tokens
export const metadataTokensHooks = getFirebaseHooks<MetadataTokens>(firestore, "metadataTokens");
export const tokenLazyMintsReadOnlyHooks = getFirebaseHooks<TokenLazyMintReadOnly>(firestore, "tokenLazyMintsReadOnly");
//users
export const apiKeysPersonalHooks = getFirebaseHooks<ApiKeyPersonal>(firestore, "apiKeysPersonal");
export const inviteCodesReadOnlyHooks = getFirebaseHooks<InviteCodeReadOnly>(firestore, "inviteCodesReadOnly");
export const organizationsReadOnlyHooks = getFirebaseHooks<OrganizationReadOnly>(firestore, "organizationsReadOnly");
export const usersHooks = getFirebaseHooks<User>(firestore, "users");
export const dfnsWalletsReadOnlyHooks = getFirebaseHooks<DfnsWalletReadOnly>(firestore, "dfnsWalletsReadOnly");
export const safeWalletsReadOnlyHooks = getFirebaseHooks<SafeWalletReadOnly>(firestore, "safeWalletsReadOnly");
//networks
export const networksReadOnlyHooks = getFirebaseHooks<NetworkReadOnly>(firestore, "networksReadOnly");
export const networksPrivateHooks = getFirebaseHooks<NetworkPrivate>(firestore, "networksPrivate");
//gasexpense
export const gasExpensesDailyPublicHooks = getFirebaseHooks<GasExpenseDailyPublic>(firestore, "gasExpensesDailyPublic");
export const gasExpensesMonthlyPublicHooks = getFirebaseHooks<GasExpenseMonthlyPublic>(
    firestore,
    "gasExpensesMonthlyPublic",
);
export const gasExpensesDailyReadOnlyHooks = getFirebaseHooks<GasExpenseDailyReadOnly>(
    firestore,
    "gasExpensesDailyReadOnly",
);
export const gasExpensesMonthlyReadOnlyHooks = getFirebaseHooks<GasExpenseMonthlyReadOnly>(
    firestore,
    "gasExpensesMonthlyReadOnly",
);
export const gasBudgetRulesGlobalReadOnlyHooks = getFirebaseHooks<GasBudgetRuleGlobalReadOnly>(
    firestore,
    "gasBudgetRulesGlobalReadOnly",
);
export const gasBudgetRulesByContractReadOnlyHooks = getFirebaseHooks<GasBudgetRuleByContractReadOnly>(
    firestore,
    "gasBudgetRulesByContractReadOnly",
);
//other
export const projectTemplatesHooks = getFirebaseHooks<ProjectTemplate>(firestore, "projectTemplates");
export const requestTemplatesHooks = getFirebaseHooks<RequestTemplate>(firestore, "requestTemplates");
export const contractsHooks = getFirebaseHooks<Contract>(firestore, "contracts");
export const projectsHooks = getFirebaseHooks<Project>(firestore, "projects");
export const metadataContractsHooks = getFirebaseHooks<MetadataContract>(firestore, "metadataContracts");
export const emailsHooks = getFirebaseHooks<Email>(firestore, "emails");
export const blogsHooks = getFirebaseHooks<Blog>(firestore, "blogs");
export const invitesHooks = getFirebaseHooks<Invites>(firestore, "invites");