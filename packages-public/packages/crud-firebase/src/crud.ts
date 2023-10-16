import { BigNumberish } from "@ethersproject/bignumber";
import { omit, sortBy } from "lodash-es";

/** Shared crud utils */
export interface QueryOptions {
    limit?: number;
    orderBy?: string;
    order?: "asc" | "desc";
}

export function identity<T>(item: T): T {
    return item;
}

export function omitIdDefault<T>(item: T): T {
    return omit(item as any, "id");
}

export function getIdParamsDefault(id: string) {
    return { id };
}

export function joinSorted<T extends Record<string, any> = Record<string, any>>(item: T) {
    return sortBy(Object.entries(item), ([key]) => {
        return key;
    })
        .map(([, v]) => v)
        .join("-");
}

export type ItemIdDefault = { readonly id?: string };

export type CrudValidators<
    ItemData extends Record<string, any>,
    ItemIdPartial extends Record<string, any> = { readonly id?: string },
> = {
    getId?: (idParams: Required<ItemIdPartial>) => string;
    getIdParams?: (id: string) => Required<ItemIdPartial>;
    validateData?: (item: Partial<ItemData>) => Partial<ItemData>;
    validateId?: (idParams: ItemIdPartial) => Required<ItemIdPartial>;
};

export type CrudWebWrapper<
    ItemData extends Record<string, any>,
    ItemIdPartial extends Record<string, any> = { readonly id?: string },
> = {
    get: (id: string | Required<ItemIdPartial>) => Promise<Required<ItemIdPartial> & ItemData>;
    getBatch: (
        id: string[] | Required<ItemIdPartial>[],
    ) => Promise<((Required<ItemIdPartial> & ItemData) | undefined)[]>;
    getAll: () => Promise<(Required<ItemIdPartial> & ItemData)[]>;
    getWhere: (filter: Partial<ItemData>, options?: QueryOptions) => Promise<(Required<ItemIdPartial> & ItemData)[]>;
    getWhereCount: (filter: Partial<ItemData>, options?: QueryOptions) => Promise<number>;
    getWhereFirst: (
        filter: Partial<ItemData>,
        options?: Omit<QueryOptions, "limit">,
    ) => Promise<(Required<ItemIdPartial> & ItemData) | undefined>;
    set: (item: ItemIdPartial & ItemData) => Promise<string>;
    setBatch: (items: (ItemIdPartial & ItemData)[]) => Promise<string[]>;
    getOrCreate: (
        id: string | Required<ItemIdPartial>,
        initialValue: ItemData,
    ) => Promise<Required<ItemIdPartial> & ItemData>;
    getWhereFirstOrCreate: (
        filter: Partial<ItemData>,
        initialValue: ItemIdPartial & ItemData,
        options?: Omit<QueryOptions, "limit">,
    ) => Promise<Required<ItemIdPartial> & ItemData>;
    update: (item: Required<ItemIdPartial> & Partial<ItemData>) => Promise<void>;
    updateBatch: (item: (Required<ItemIdPartial> & Partial<ItemData>)[]) => Promise<void>;
    delete: (id: Required<ItemIdPartial> | string) => Promise<void>;
    deleteBatch: (ids: Required<ItemIdPartial>[] | string[]) => Promise<void>;
    deleteAll: () => Promise<void>;
    increment: (id: Required<ItemIdPartial> | string, path: string, value: BigNumberish) => Promise<void>;
    decrement: (id: Required<ItemIdPartial> | string, path: string, value: BigNumberish) => Promise<void>;
    [k: string]: any;
};

export type CrudAdminWrapper<
    ItemData extends Record<string, any>,
    ItemIdPartial extends Record<string, any> = { readonly id?: string },
> = {
    _get: (id: string | Required<ItemIdPartial>) => Promise<Required<ItemIdPartial> & ItemData>;
    _getBatch: (
        id: string[] | Required<ItemIdPartial>[],
    ) => Promise<((Required<ItemIdPartial> & ItemData) | undefined)[]>;
    _getAll: () => Promise<(Required<ItemIdPartial> & ItemData)[]>;
    _getWhere: (filter: Partial<ItemData>, options?: QueryOptions) => Promise<(Required<ItemIdPartial> & ItemData)[]>;
    _getWhereCount: (filter: Partial<ItemData>, options?: QueryOptions) => Promise<number>;
    _getWhereFirst: (
        filter: Partial<ItemData>,
        options?: Omit<QueryOptions, "limit">,
    ) => Promise<(Required<ItemIdPartial> & ItemData) | undefined>;
    _set: (item: ItemIdPartial & ItemData) => Promise<string>;
    _setBatch: (items: (ItemIdPartial & ItemData)[]) => Promise<string[]>;
    _getOrCreate: (
        id: string | Required<ItemIdPartial>,
        initialValue: ItemData,
    ) => Promise<Required<ItemIdPartial> & ItemData>;
    _getWhereFirstOrCreate: (
        filter: Partial<ItemData>,
        initialValue: ItemIdPartial & ItemData,
        options?: Omit<QueryOptions, "limit">,
    ) => Promise<Required<ItemIdPartial> & ItemData>;
    _update: (item: Required<ItemIdPartial> & Partial<ItemData>) => Promise<void>;
    _updateBatch: (item: (Required<ItemIdPartial> & Partial<ItemData>)[]) => Promise<void>;
    _delete: (id: Required<ItemIdPartial> | string) => Promise<void>;
    _deleteBatch: (ids: Required<ItemIdPartial>[] | string[]) => Promise<void>;
    _deleteAll: () => Promise<void>;
    _increment: (id: Required<ItemIdPartial> | string, path: string, value: BigNumberish) => Promise<void>;
    _decrement: (id: Required<ItemIdPartial> | string, path: string, value: BigNumberish) => Promise<void>;
    [k: string]: any;
};

//ethmodels
export const ethLogsPath = "ethLogs";
export const ethLogAbisPath = "ethLogAbis";
export const ethTransactionsPath = "ethTransactions";
//shopify
export const storesPath = "stores";
export const storePrivatesPath = "storePrivates";
export const couponCampaignsPath = "couponCampaigns";
export const couponDefinitionsPath = "couponDefinitions";
export const couponInstancesPath = "couponInstances";
//tokens
export const metadataTokensPath = "metadataTokens";
export const tokenLazyMintsReadOnlyPath = "tokenLazyMintsReadOnly";
//users
export const apiKeysPersonalPath = "apiKeysPersonal";
export const inviteCodesReadOnlyPath = "inviteCodesReadOnly";
export const organizationsReadOnlyPath = "organizationsReadOnly";
export const usersPath = "users";
export const dfnsWalletsReadOnlyPath = "dfnsWalletsReadOnly";
export const safeWalletsReadOnlyPath = "safeWalletsReadOnly";
//networks
export const networksReadOnlyPath = "networksReadOnly";
export const networksPrivatePath = "networksPrivate";
export const networkCreate2FactoryTransactionsPath = "networkCreate2FactoryTransactions";
//gasexpense
export const gasExpensesDailyPublicPath = "gasExpensesDailyPublic";
export const gasExpensesMonthlyPublicPath = "gasExpensesMonthlyPublic";

export const gasExpensesDailyReadOnlyPath = "gasExpensesDailyReadOnly";
export const gasExpensesMonthlyReadOnlyPath = "gasExpensesMonthlyReadOnly";

export const gasBudgetRulesGlobalReadOnlyPath = "gasBudgetRulesGlobalReadOnly";
export const gasBudgetRulesByContractReadOnlyPath = "gasBudgetRulesByContractReadOnly";
//other
export const projectTemplatesPath = "projectTemplates";
export const requestTemplatesPath = "requestTemplates";
export const contractsPath = "contracts";
export const projectsPath = "projects";
export const metadataContractsPath = "metadataContracts";
export const emailsPath = "emails";
export const blogsPath = "blogs";
export const invitesPath = "invites";
