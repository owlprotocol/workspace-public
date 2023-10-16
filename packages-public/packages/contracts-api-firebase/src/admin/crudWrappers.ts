import { ItemIdDefault, identity } from "@owlprotocol/crud-firebase";
import { firestore, getFirebaseCRUD } from "@owlprotocol/crud-firebase/admin";
import {
    ApiKeyPersonalData,
    Contract,
    CouponCampaignData,
    CouponDefinitionData,
    DfnsWalletReadOnly,
    SafeWalletReadOnly,
    EmailData,
    EthLog,
    EthLogAbiData,
    EthTransaction,
    InviteCodeReadOnlyData,
    MetadataContractData,
    MetadataTokensData,
    NetworkPrivate,
    NetworkReadOnly,
    OrganizationReadOnlyData,
    Project,
    ProjectTemplate,
    RequestTemplate,
    StoreData,
    StorePrivateData,
    TokenLazyMintReadOnlyData,
    UserData,
    GasExpenseDailyPublicData,
    GasExpenseMonthlyPublicData,
    GasExpenseDailyReadOnlyData,
    GasExpenseMonthlyReadOnlyData,
    GasBudgetRuleGlobalReadOnlyData,
    GasBudgetRuleByContractReadOnlyData,
    BlogData,
    InvitesData,
    NetworkCreate2FactoryTransaction,
    CouponInstanceData,
    getEthLogId,
    getEthLogIdParams,
    EthLogId,
    getEthTransactionId,
    getEthTransactionIdParams,
    EthTransactionId,
    ContractId,
    getContractId,
    getContractIdParams,
    validateContractId,
} from "../models/index.js";
import {
    apiKeysPersonalPath,
    blogsPath,
    contractsPath,
    couponCampaignsPath,
    couponDefinitionsPath,
    couponInstancesPath,
    dfnsWalletsReadOnlyPath,
    emailsPath,
    ethLogAbisPath,
    ethLogsPath,
    ethTransactionsPath,
    gasBudgetRulesByContractReadOnlyPath,
    gasBudgetRulesGlobalReadOnlyPath,
    gasExpensesDailyPublicPath,
    gasExpensesDailyReadOnlyPath,
    gasExpensesMonthlyPublicPath,
    gasExpensesMonthlyReadOnlyPath,
    inviteCodesReadOnlyPath,
    invitesPath,
    metadataContractsPath,
    metadataTokensPath,
    networkCreate2FactoryTransactionsPath,
    networksPrivatePath,
    networksReadOnlyPath,
    organizationsReadOnlyPath,
    projectTemplatesPath,
    projectsPath,
    requestTemplatesPath,
    safeWalletsReadOnlyPath,
    storePrivatesPath,
    storesPath,
    tokenLazyMintsReadOnlyPath,
    usersPath,
} from "../crud.js";

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
export const ethLogsCRUD = getFirebaseCRUD<EthLog, EthLogId, [userId: string]>(
    firestore,
    ethLogsPath,
    {
        getId: getEthLogId,
        getIdParams: getEthLogIdParams,
        validateId: identity,
    },
    readOnlyChecks,
);
export const ethLogAbisCRUD = getFirebaseCRUD<EthLogAbiData, ItemIdDefault, [userId: string]>(
    firestore,
    ethLogAbisPath,
    undefined,
    readOnlyChecks,
);
export const ethTransactionsCRUD = getFirebaseCRUD<EthTransaction, EthTransactionId, [userId: string]>(
    firestore,
    ethTransactionsPath,
    {
        getId: getEthTransactionId,
        getIdParams: getEthTransactionIdParams,
        validateId: identity,
    },
    readOnlyChecks,
);
//shopify
export const storesCRUD = getFirebaseCRUD<StoreData, ItemIdDefault, [userId: string]>(
    firestore,
    storesPath,
    undefined,
    ownerOnlyWriteChecks,
);
export const storePrivatesCRUD = getFirebaseCRUD<StorePrivateData, ItemIdDefault, [userId: string]>(
    firestore,
    storePrivatesPath,
    undefined,
    ownerOnlyChecks,
);
export const couponCampaignsCRUD = getFirebaseCRUD<CouponCampaignData, ItemIdDefault, [userId: string]>(
    firestore,
    couponCampaignsPath,
    undefined,
    ownerOnlyWriteChecks,
);
export const couponDefinitionsCRUD = getFirebaseCRUD<CouponDefinitionData, ItemIdDefault, [userId: string]>(
    firestore,
    couponDefinitionsPath,
    undefined,
    ownerOnlyWriteChecks,
);
export const couponInstancesCRUD = getFirebaseCRUD<CouponInstanceData, ItemIdDefault, [userId: string]>(
    firestore,
    couponInstancesPath,
    undefined,
    ownerOnlyWriteChecks,
);
//tokens
export const metadataTokensCRUD = getFirebaseCRUD<MetadataTokensData, ItemIdDefault, [userId: string]>(
    firestore,
    metadataTokensPath,
    undefined,
    ownerOnlyChecks,
);
export const tokenLazyMintsReadOnlyCRUD = getFirebaseCRUD<TokenLazyMintReadOnlyData, ItemIdDefault, [userId: string]>(
    firestore,
    tokenLazyMintsReadOnlyPath,
    undefined,
    ownerOnlyChecks,
);
//users
export const apiKeysPersonalCRUD = getFirebaseCRUD<ApiKeyPersonalData, ItemIdDefault, [userId: string]>(
    firestore,
    apiKeysPersonalPath,
    undefined,
    ownerOnlyChecks,
);
export const inviteCodesReadOnlyCRUD = getFirebaseCRUD<InviteCodeReadOnlyData, ItemIdDefault, [userId: string]>(
    firestore,
    inviteCodesReadOnlyPath,
    undefined,
    ownerOnlyChecks,
);
export const organizationsReadOnlyCRUD = getFirebaseCRUD<OrganizationReadOnlyData, ItemIdDefault, [userId: string]>(
    firestore,
    organizationsReadOnlyPath,
    undefined,
    ownerOnlyChecks,
);
//TODO: Fix access control?
export const usersCRUD = getFirebaseCRUD<UserData, ItemIdDefault, [userId: string]>(firestore, usersPath, undefined, {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    readAccessCheck: (_user, _userId) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setAccessCheck: (_user, _userId) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateAccessCheck: (_user, _userId) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteAccessCheck: (_user, _userId) => true,
});
export const dfnsWalletsReadOnlyCRUD = getFirebaseCRUD<DfnsWalletReadOnly, ItemIdDefault, [userId: string]>(
    firestore,
    dfnsWalletsReadOnlyPath,
    undefined,
    ownerOnlyChecks,
);
export const safeWalletsReadOnlyCRUD = getFirebaseCRUD<SafeWalletReadOnly, ItemIdDefault, [userId: string]>(
    firestore,
    safeWalletsReadOnlyPath,
    undefined,
    ownerOnlyChecks,
);
//networks
export const networksReadOnlyCRUD = getFirebaseCRUD<NetworkReadOnly, ItemIdDefault>(
    firestore,
    networksReadOnlyPath,
    undefined,
    readOnlyChecks,
);
export const networksPrivateCRUD = getFirebaseCRUD<NetworkPrivate>(
    firestore,
    networksPrivatePath,
    undefined,
    readOnlyChecks,
);
export const networkCreate2FactoryTransactionsCRUD = getFirebaseCRUD<NetworkCreate2FactoryTransaction>(
    firestore,
    networkCreate2FactoryTransactionsPath,
    undefined,
    readOnlyChecks,
);
//gasexpense
export const gasExpensesDailyPublicCRUD = getFirebaseCRUD<GasExpenseDailyPublicData, ItemIdDefault, [userId: string]>(
    firestore,
    gasExpensesDailyPublicPath,
    undefined,
    readOnlyChecks,
);
export const gasExpensesMonthlyPublicCRUD = getFirebaseCRUD<
    GasExpenseMonthlyPublicData,
    ItemIdDefault,
    [userId: string]
>(firestore, gasExpensesMonthlyPublicPath, undefined, readOnlyChecks);
export const gasExpensesDailyReadOnlyCRUD = getFirebaseCRUD<
    GasExpenseDailyReadOnlyData,
    ItemIdDefault,
    [userId: string]
>(firestore, gasExpensesDailyReadOnlyPath, undefined, ownerOnlyChecks);
export const gasExpensesMonthlyReadOnlyCRUD = getFirebaseCRUD<
    GasExpenseMonthlyReadOnlyData,
    ItemIdDefault,
    [userId: string]
>(firestore, gasExpensesMonthlyReadOnlyPath, undefined, ownerOnlyChecks);
export const gasBudgetRulesGlobalReadOnlyCRUD = getFirebaseCRUD<
    GasBudgetRuleGlobalReadOnlyData,
    ItemIdDefault,
    [userId: string]
>(firestore, gasBudgetRulesGlobalReadOnlyPath, undefined, ownerOnlyChecks);
export const gasBudgetRulesByContractReadOnlyCRUD = getFirebaseCRUD<
    GasBudgetRuleByContractReadOnlyData,
    ItemIdDefault,
    [userId: string]
>(firestore, gasBudgetRulesByContractReadOnlyPath, undefined, ownerOnlyChecks);
//other
export const projectTemplatesCRUD = getFirebaseCRUD<ProjectTemplate, ItemIdDefault, [userId: string]>(
    firestore,
    projectTemplatesPath,
    undefined,
    readOnlyChecks,
);
export const requestTemplatesCRUD = getFirebaseCRUD<RequestTemplate, ItemIdDefault, [userId: string]>(
    firestore,
    requestTemplatesPath,
    undefined,
    ownerOnlyChecks,
);
export const contractsCRUD = getFirebaseCRUD<Contract, ContractId, [userId: string]>(
    firestore,
    contractsPath,
    {
        getId: getContractId,
        getIdParams: getContractIdParams,
        validateId: validateContractId,
    },
    ownerOnlyChecks,
);
export const projectsCRUD = getFirebaseCRUD<Project, ItemIdDefault, [userId: string]>(
    firestore,
    projectsPath,
    undefined,
    ownerOnlyChecks,
);
export const metadataContractsCRUD = getFirebaseCRUD<MetadataContractData, ItemIdDefault, [userId: string]>(
    firestore,
    metadataContractsPath,
    undefined,
    ownerOnlyChecks,
);

export const emailsCRUD = getFirebaseCRUD<EmailData, ItemIdDefault, [userId: string]>(
    firestore,
    emailsPath,
    undefined,
    {
        readAccessCheck: () => false,
        setAccessCheck: () => true,
        updateAccessCheck: () => false,
        deleteAccessCheck: () => false,
    },
);
export const blogsCRUD = getFirebaseCRUD<BlogData, ItemIdDefault>(firestore, blogsPath);
export const invitesCRUD = getFirebaseCRUD<InvitesData, ItemIdDefault, [userId: string]>(
    firestore,
    invitesPath,
    undefined,
    {
        readAccessCheck: () => false,
        setAccessCheck: () => true,
        updateAccessCheck: () => false,
        deleteAccessCheck: () => false,
    },
);
