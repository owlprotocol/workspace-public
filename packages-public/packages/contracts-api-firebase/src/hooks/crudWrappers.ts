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
    erc1155BalancePath,
    erc1155Path,
    erc20AllowancePath,
    erc20BalancePath,
    erc20Path,
    erc721Path,
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
    loyaltyProgramsPath,
    metadataContractsPath,
    metadataTokensPath,
    networksPrivatePath,
    networksReadOnlyPath,
    organizationsReadOnlyPath,
    projectApiKeysPersonalPath,
    projectDfnsWalletsReadOnlyPath,
    projectSafeWalletsReadOnlyPath,
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
    ERC1155,
    ERC1155Balance,
    ERC1155BalanceId,
    ERC1155Id,
    ERC20,
    ERC20Allowance,
    ERC20AllowanceId,
    ERC20Balance,
    ERC20BalanceId,
    ERC20Id,
    ERC721,
    ERC721Id,
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
    LoyaltyProgramData,
    MetadataContractData,
    MetadataTokensData,
    NetworkPrivate,
    NetworkReadOnly,
    OrganizationReadOnlyData,
    ProjectApiKeyPersonalData,
    ProjectData,
    ProjectDfnsWalletReadOnlyData,
    ProjectSafeWalletReadOnly,
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
    getERC1155BalanceId,
    getERC1155BalanceIdParams,
    getERC1155Id,
    getERC1155IdParams,
    getERC20AllowanceId,
    getERC20AllowanceIdParams,
    getERC20BalanceId,
    getERC20BalanceIdParams,
    getERC20Id,
    getERC20IdParams,
    getERC721Id,
    getERC721IdParams,
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
    validateERC1155BalanceId,
    validateERC1155Id,
    validateERC20AllowanceId,
    validateERC20BalanceId,
    validateERC20Id,
    validateERC721Id,
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
//erc models
export const erc20Hooks = getFirebaseHooks<ERC20, ERC20Id>(firestore, erc20Path, {
    getId: getERC20Id,
    getIdParams: getERC20IdParams,
    validateId: validateERC20Id,
});
export const erc20BalanceReadOnlyHooks = getFirebaseHooks<ERC20Balance, ERC20BalanceId>(firestore, erc20BalancePath, {
    getId: getERC20BalanceId,
    getIdParams: getERC20BalanceIdParams,
    validateId: validateERC20BalanceId,
});
export const erc20AllowanceHooks = getFirebaseHooks<ERC20Allowance, ERC20AllowanceId>(firestore, erc20AllowancePath, {
    getId: getERC20AllowanceId,
    getIdParams: getERC20AllowanceIdParams,
    validateId: validateERC20AllowanceId,
});
export const erc721Hooks = getFirebaseHooks<ERC721, ERC721Id>(firestore, erc721Path, {
    getId: getERC721Id,
    getIdParams: getERC721IdParams,
    validateId: validateERC721Id,
});
export const erc1155Hooks = getFirebaseHooks<ERC1155, ERC1155Id>(firestore, erc1155Path, {
    getId: getERC1155Id,
    getIdParams: getERC1155IdParams,
    validateId: validateERC1155Id,
});
export const erc1155BalanceHooks = getFirebaseHooks<ERC1155Balance, ERC1155BalanceId>(firestore, erc1155BalancePath, {
    getId: getERC1155BalanceId,
    getIdParams: getERC1155BalanceIdParams,
    validateId: validateERC1155BalanceId,
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

export const loyaltyProgramsHooks = getFirebaseHooks<LoyaltyProgramData>(firestore, loyaltyProgramsPath);
export const projectApiKeysPersonalHooks = getFirebaseHooks<ProjectApiKeyPersonalData>(
    firestore,
    projectApiKeysPersonalPath,
);
export const projectDfnsWalletsReadOnlyHooks = getFirebaseHooks<ProjectDfnsWalletReadOnlyData>(
    firestore,
    projectDfnsWalletsReadOnlyPath,
);
export const projectSafeWalletsReadOnlyHooks = getFirebaseHooks<ProjectSafeWalletReadOnly, SafeWalletId>(
    firestore,
    projectSafeWalletsReadOnlyPath,
    {
        getId: getSafeWalletId,
        getIdParams: getSafeWalletIdParams,
        validateId: validateSafeWalletId,
    },
);
