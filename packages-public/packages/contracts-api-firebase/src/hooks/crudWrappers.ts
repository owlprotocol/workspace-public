import { identity } from "@owlprotocol/crud-firebase";
import { getFirebaseHooks } from "@owlprotocol/crud-firebase/hooks";
import { firestore } from "@owlprotocol/crud-firebase/web";
import {
    apiKeysPersonalPath,
    blogsPath,
    collectionsPath,
    contractsPath,
    couponCampaignsPath,
    couponDefinitionsPath,
    couponInstancesPath,
    dfnsWalletsReadOnlyPath,
    emailsPath,
    erc20BalancePath,
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
    lazyMintInstancesPath,
    lazyMintsPath,
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
} from "../crud.js";
import { InvitesData } from "../models/Invites.js";
import {
    ApiKeyPersonalData,
    BlogData,
    Collection,
    CollectionId,
    Contract,
    ContractId,
    CouponCampaignData,
    CouponDefinitionData,
    CouponInstance,
    DfnsWalletReadOnlyData,
    ERC20Balance,
    ERC20BalanceId,
    EmailData,
    EthLog,
    EthLogAbi,
    EthLogAbiId,
    EthLogId,
    EthTransaction,
    EthTransactionId,
    GasBudgetRuleByContractReadOnlyData,
    GasBudgetRuleGlobalReadOnlyData,
    GasExpenseDailyPublicData,
    GasExpenseDailyReadOnlyData,
    GasExpenseMonthlyPublicData,
    GasExpenseMonthlyReadOnlyData,
    InviteCodeReadOnlyData,
    LazyMintData,
    LazyMintInstanceData,
    MetadataContractData,
    MetadataTokensData,
    NetworkPrivate,
    NetworkReadOnly,
    OrganizationReadOnlyData,
    ProjectData,
    ProjectTemplate,
    RequestTemplate,
    SafeWalletId,
    SafeWalletReadOnly,
    StoreData,
    StorePrivateData,
    TokenLazyMintReadOnlyData,
    UserData,
    getCollectionId,
    getCollectionIdParams,
    getContractId,
    getContractIdParams,
    getERC20BalanceId,
    getERC20BalanceIdParams,
    getEthLogAbiId,
    getEthLogAbiIdParams,
    getEthLogId,
    getEthLogIdParams,
    getEthTransactionId,
    getEthTransactionIdParams,
    getSafeWalletId,
    getSafeWalletIdParams,
    validateCollectionId,
    validateContractId,
    validateSafeWalletId,
} from "../models/index.js";

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
//erc20Balance
export const erc20BalanceReadOnlyHooks = getFirebaseHooks<ERC20Balance, ERC20BalanceId>(firestore, erc20BalancePath, {
    getId: getERC20BalanceId,
    getIdParams: getERC20BalanceIdParams,
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
