import { firestore, getFirebaseCRUD } from "@owlprotocol/crud-firebase/web";
import { identity } from "@owlprotocol/crud-firebase";
import {
    ApiKeyPersonalData,
    Contract,
    CouponCampaignData,
    CouponDefinitionData,
    CouponInstance,
    DfnsWalletReadOnlyData,
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
    EthLogId,
    getEthLogId,
    getEthLogIdParams,
    EthTransactionId,
    getEthTransactionId,
    getEthTransactionIdParams,
    ContractId,
    getContractId,
    getContractIdParams,
    validateContractId,
    getSafeWalletId,
    getSafeWalletIdParams,
    validateSafeWalletId,
    SafeWalletId,
    Collection,
    CollectionId,
    getCollectionId,
    getCollectionIdParams,
    validateCollectionId,
    ProjectData,
    LazyMintData,
    LazyMintInstanceData,
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
    collectionsPath,
    lazyMintsPath,
    lazyMintInstancesPath,
} from "../crud.js";

//ethmodels
export const ethLogsCRUD = getFirebaseCRUD<EthLog, EthLogId>(firestore, ethLogsPath, {
    getId: getEthLogId,
    getIdParams: getEthLogIdParams,
    validateId: identity,
});
export const ethLogAbisCRUD = getFirebaseCRUD<EthLogAbiData>(firestore, ethLogAbisPath);
export const ethTransactionsCRUD = getFirebaseCRUD<EthTransaction, EthTransactionId>(firestore, ethTransactionsPath, {
    getId: getEthTransactionId,
    getIdParams: getEthTransactionIdParams,
    validateId: identity,
});
//shopify
export const storesCRUD = getFirebaseCRUD<StoreData>(firestore, storesPath);
export const storePrivatesCRUD = getFirebaseCRUD<StorePrivateData>(firestore, storePrivatesPath);
export const couponCampaignsCRUD = getFirebaseCRUD<CouponCampaignData>(firestore, couponCampaignsPath);
export const couponDefinitionsCRUD = getFirebaseCRUD<CouponDefinitionData>(firestore, couponDefinitionsPath);
export const couponInstancesCRUD = getFirebaseCRUD<CouponInstance>(firestore, couponInstancesPath);
//tokens
export const metadataTokensCRUD = getFirebaseCRUD<MetadataTokensData>(firestore, metadataTokensPath);
export const tokenLazyMintsReadOnlyCRUD = getFirebaseCRUD<TokenLazyMintReadOnlyData>(
    firestore,
    tokenLazyMintsReadOnlyPath,
);
//users
export const apiKeysPersonalCRUD = getFirebaseCRUD<ApiKeyPersonalData>(firestore, apiKeysPersonalPath);
export const inviteCodesReadOnlyCRUD = getFirebaseCRUD<InviteCodeReadOnlyData>(firestore, inviteCodesReadOnlyPath);
export const organizationsReadOnlyCRUD = getFirebaseCRUD<OrganizationReadOnlyData>(
    firestore,
    organizationsReadOnlyPath,
);
export const usersCRUD = getFirebaseCRUD<UserData>(firestore, usersPath);
export const dfnsWalletsReadOnlyCRUD = getFirebaseCRUD<DfnsWalletReadOnlyData>(firestore, dfnsWalletsReadOnlyPath);
export const safeWalletsReadOnlyCRUD = getFirebaseCRUD<SafeWalletReadOnly, SafeWalletId>(
    firestore,
    safeWalletsReadOnlyPath,
    {
        getId: getSafeWalletId,
        getIdParams: getSafeWalletIdParams,
        validateId: validateSafeWalletId,
    },
);
//networks
export const networksReadOnlyCRUD = getFirebaseCRUD<NetworkReadOnly>(firestore, networksReadOnlyPath);
export const networksPrivateCRUD = getFirebaseCRUD<NetworkPrivate>(firestore, networksPrivatePath);
export const networkCreate2FactoryTransactionsCRUD = getFirebaseCRUD<NetworkCreate2FactoryTransaction>(
    firestore,
    networkCreate2FactoryTransactionsPath,
);
//gasexpense
export const gasExpensesDailyPublicCRUD = getFirebaseCRUD<GasExpenseDailyPublicData>(
    firestore,
    gasExpensesDailyPublicPath,
);
export const gasExpensesMonthlyPublicCRUD = getFirebaseCRUD<GasExpenseMonthlyPublicData>(
    firestore,
    gasExpensesMonthlyPublicPath,
);
export const gasExpensesDailyReadOnlyCRUD = getFirebaseCRUD<GasExpenseDailyReadOnlyData>(
    firestore,
    gasExpensesDailyReadOnlyPath,
);
export const gasExpensesMonthlyReadOnlyCRUD = getFirebaseCRUD<GasExpenseMonthlyReadOnlyData>(
    firestore,
    gasExpensesMonthlyReadOnlyPath,
);
export const gasBudgetRulesGlobalReadOnlyCRUD = getFirebaseCRUD<GasBudgetRuleGlobalReadOnlyData>(
    firestore,
    gasBudgetRulesGlobalReadOnlyPath,
);
export const gasBudgetRulesByContractReadOnlyCRUD = getFirebaseCRUD<GasBudgetRuleByContractReadOnlyData>(
    firestore,
    gasBudgetRulesByContractReadOnlyPath,
);
//other
export const projectTemplatesCRUD = getFirebaseCRUD<ProjectTemplate>(firestore, projectTemplatesPath);
export const requestTemplatesCRUD = getFirebaseCRUD<RequestTemplate>(firestore, requestTemplatesPath);
export const contractsCRUD = getFirebaseCRUD<Contract, ContractId>(firestore, contractsPath, {
    getId: getContractId,
    getIdParams: getContractIdParams,
    validateId: validateContractId,
});
export const collectionsCRUD = getFirebaseCRUD<Collection, CollectionId>(firestore, collectionsPath, {
    getId: getCollectionId,
    getIdParams: getCollectionIdParams,
    validateId: validateCollectionId,
});
export const projectsCRUD = getFirebaseCRUD<ProjectData>(firestore, projectsPath);
export const metadataContractsCRUD = getFirebaseCRUD<MetadataContractData>(firestore, metadataContractsPath);
export const emailsCRUD = getFirebaseCRUD<EmailData>(firestore, emailsPath);
export const blogsCRUD = getFirebaseCRUD<BlogData>(firestore, blogsPath);
export const invitesCRUD = getFirebaseCRUD<InvitesData>(firestore, invitesPath);
export const lazyMintsCRUD = getFirebaseCRUD<LazyMintData>(firestore, lazyMintsPath);
export const lazyMintInstancesCRUD = getFirebaseCRUD<LazyMintInstanceData>(firestore, lazyMintInstancesPath);
