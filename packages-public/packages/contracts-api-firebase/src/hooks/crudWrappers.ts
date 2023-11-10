import { firestore } from "@owlprotocol/crud-firebase/web";
import { getFirebaseHooks } from "@owlprotocol/crud-firebase/hooks";
import { identity } from "@owlprotocol/crud-firebase";
import { InvitesData } from "../models/Invites.js";
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
    EthLogAbi,
    EthTransaction,
    InviteCodeReadOnlyData,
    MetadataContractData,
    MetadataTokensData,
    NetworkPrivate,
    NetworkReadOnly,
    OrganizationReadOnlyData,
    ProjectData,
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
    EthLogId,
    EthTransactionId,
    ContractId,
    getContractId,
    getContractIdParams,
    getEthLogId,
    getEthLogIdParams,
    getEthTransactionId,
    getEthTransactionIdParams,
    validateContractId,
    SafeWalletId,
    getSafeWalletIdParams,
    getSafeWalletId,
    validateSafeWalletId,
    Collection,
    CollectionId,
    getCollectionId,
    getCollectionIdParams,
    validateCollectionId,
    LazyMintData,
    LazyMintInstanceData,
    getEthLogAbiId,
    getEthLogAbiIdParams,
    EthLogAbiId,
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
    collectionsPath,
    lazyMintsPath,
    lazyMintInstancesPath,
} from "../crud.js";

//ethmodels
export const ethLogsHooks = getFirebaseHooks<EthLog, EthLogId>(firestore, ethLogsPath, {
    getId: getEthLogId,
    getIdParams: getEthLogIdParams,
    validateId: identity,
});
export const ethLogAbisHooks = getFirebaseHooks<EthLogAbi, EthLogAbiId>(firestore, ethLogAbisPath, {
    getId: getEthLogAbiId,
    getIdParams: getEthLogAbiIdParams,
    validateId: identity,
});
export const ethTransactionsHooks = getFirebaseHooks<EthTransaction, EthTransactionId>(firestore, ethTransactionsPath, {
    getId: getEthTransactionId,
    getIdParams: getEthTransactionIdParams,
    validateId: identity,
});
//shopify
export const storesHooks = getFirebaseHooks<StoreData>(firestore, storesPath);
export const storePrivatesHooks = getFirebaseHooks<StorePrivateData>(firestore, storePrivatesPath);
export const couponCampaignsHooks = getFirebaseHooks<CouponCampaignData>(firestore, couponCampaignsPath);
export const couponDefinitionsHooks = getFirebaseHooks<CouponDefinitionData>(firestore, couponDefinitionsPath);
export const couponInstancesHooks = getFirebaseHooks<CouponInstance>(firestore, couponInstancesPath);
//tokens
export const metadataTokensHooks = getFirebaseHooks<MetadataTokensData>(firestore, metadataTokensPath);
export const tokenLazyMintsReadOnlyHooks = getFirebaseHooks<TokenLazyMintReadOnlyData>(
    firestore,
    tokenLazyMintsReadOnlyPath,
);
//users
export const apiKeysPersonalHooks = getFirebaseHooks<ApiKeyPersonalData>(firestore, apiKeysPersonalPath);
export const inviteCodesReadOnlyHooks = getFirebaseHooks<InviteCodeReadOnlyData>(firestore, inviteCodesReadOnlyPath);
export const organizationsReadOnlyHooks = getFirebaseHooks<OrganizationReadOnlyData>(
    firestore,
    organizationsReadOnlyPath,
);
export const usersHooks = getFirebaseHooks<UserData>(firestore, "users");
export const dfnsWalletsReadOnlyHooks = getFirebaseHooks<DfnsWalletReadOnlyData>(firestore, dfnsWalletsReadOnlyPath);
export const safeWalletsReadOnlyHooks = getFirebaseHooks<SafeWalletReadOnly, SafeWalletId>(
    firestore,
    safeWalletsReadOnlyPath,
    {
        getId: getSafeWalletId,
        getIdParams: getSafeWalletIdParams,
        validateId: validateSafeWalletId,
    },
);
//networks
export const networksReadOnlyHooks = getFirebaseHooks<NetworkReadOnly>(firestore, networksReadOnlyPath);
export const networksPrivateHooks = getFirebaseHooks<NetworkPrivate>(firestore, networksPrivatePath);
//gasexpense
export const gasExpensesDailyPublicHooks = getFirebaseHooks<GasExpenseDailyPublicData>(
    firestore,
    gasExpensesDailyPublicPath,
);
export const gasExpensesMonthlyPublicHooks = getFirebaseHooks<GasExpenseMonthlyPublicData>(
    firestore,
    gasExpensesMonthlyPublicPath,
);
export const gasExpensesDailyReadOnlyHooks = getFirebaseHooks<GasExpenseDailyReadOnlyData>(
    firestore,
    gasExpensesDailyReadOnlyPath,
);
export const gasExpensesMonthlyReadOnlyHooks = getFirebaseHooks<GasExpenseMonthlyReadOnlyData>(
    firestore,
    gasExpensesMonthlyReadOnlyPath,
);
export const gasBudgetRulesGlobalReadOnlyHooks = getFirebaseHooks<GasBudgetRuleGlobalReadOnlyData>(
    firestore,
    gasBudgetRulesGlobalReadOnlyPath,
);
export const gasBudgetRulesByContractReadOnlyHooks = getFirebaseHooks<GasBudgetRuleByContractReadOnlyData>(
    firestore,
    gasBudgetRulesByContractReadOnlyPath,
);
//other
export const projectTemplatesHooks = getFirebaseHooks<ProjectTemplate>(firestore, projectTemplatesPath);
export const requestTemplatesHooks = getFirebaseHooks<RequestTemplate>(firestore, requestTemplatesPath);
export const contractsHooks = getFirebaseHooks<Contract, ContractId>(firestore, contractsPath, {
    getId: getContractId,
    getIdParams: getContractIdParams,
    validateId: validateContractId,
});
export const collectionsHooks = getFirebaseHooks<Collection, CollectionId>(firestore, collectionsPath, {
    getId: getCollectionId,
    getIdParams: getCollectionIdParams,
    validateId: validateCollectionId,
});
export const projectsHooks = getFirebaseHooks<ProjectData>(firestore, projectsPath);
export const metadataContractsHooks = getFirebaseHooks<MetadataContractData>(firestore, metadataContractsPath);
export const emailsHooks = getFirebaseHooks<EmailData>(firestore, emailsPath);
export const blogsHooks = getFirebaseHooks<BlogData>(firestore, blogsPath);
export const invitesHooks = getFirebaseHooks<InvitesData>(firestore, invitesPath);
export const lazyMintsHooks = getFirebaseHooks<LazyMintData>(firestore, lazyMintsPath);
export const lazyMintInstancesHooks = getFirebaseHooks<LazyMintInstanceData>(firestore, lazyMintInstancesPath);
