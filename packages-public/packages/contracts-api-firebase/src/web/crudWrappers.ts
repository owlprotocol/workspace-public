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
    ERC20,
    EthLog,
    EthLogAbi,
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
    EthLogAbiId,
    getEthLogAbiId,
    getEthLogAbiIdParams,
    EthFunctionAbi,
    EthFunctionAbiId,
    getEthFunctionAbiId,
    getEthFunctionAbiIdParams,
    AddressPersonal,
    AddressPersonalId,
    AddressPublic,
    AddressPublicId,
    getAddressPersonalId,
    getAddressPersonalIdParams,
    getAddressPublicId,
    getAddressPublicIdParams,
    ERC20Id,
    getERC20Id,
    getERC20IdParams,
    ERC20Allowance,
    ERC1155,
    ERC1155Balance,
    ERC1155BalanceId,
    ERC1155Id,
    ERC20AllowanceId,
    ERC721,
    ERC721Id,
    getERC1155BalanceId,
    getERC1155BalanceIdParams,
    getERC1155Id,
    getERC1155IdParams,
    getERC20AllowanceId,
    getERC20AllowanceIdParams,
    getERC721Id,
    getERC721IdParams,
    OperatorId,
    Operator,
    getOperatorIdParams,
    getOperatorId,
    ERC20Balance,
    ERC20BalanceId,
    getERC20BalanceId,
    getERC20BalanceIdParams,
    validateERC1155BalanceId,
    validateERC1155Id,
    validateERC721Id,
    validateERC20AllowanceId,
    validateERC20BalanceId,
    validateERC20Id,
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
    ethFunctionAbisPath,
    addressesPublicPath,
    addressesPersonalPath,
    erc20Path,
    erc20AllowancePath,
    erc721Path,
    erc1155Path,
    erc1155BalancePath,
    operatorPath,
    erc20BalancePath,
} from "../crud.js";

//contractmodels
export const erc20CRUD = getFirebaseCRUD<ERC20, ERC20Id>(firestore, erc20Path, {
    getId: getERC20Id,
    getIdParams: getERC20IdParams,
    validateId: validateERC20Id,
});
export const erc20BalanceCRUD = getFirebaseCRUD<ERC20Balance, ERC20BalanceId>(firestore, erc20BalancePath, {
    getId: getERC20BalanceId,
    getIdParams: getERC20BalanceIdParams,
    validateId: validateERC20BalanceId,
});
export const erc20AllowanceCRUD = getFirebaseCRUD<ERC20Allowance, ERC20AllowanceId>(firestore, erc20AllowancePath, {
    getId: getERC20AllowanceId,
    getIdParams: getERC20AllowanceIdParams,
    validateId: validateERC20AllowanceId,
});
export const erc721CRUD = getFirebaseCRUD<ERC721, ERC721Id>(firestore, erc721Path, {
    getId: getERC721Id,
    getIdParams: getERC721IdParams,
    validateId: validateERC721Id,
});
export const erc1155CRUD = getFirebaseCRUD<ERC1155, ERC1155Id>(firestore, erc1155Path, {
    getId: getERC1155Id,
    getIdParams: getERC1155IdParams,
    validateId: validateERC1155Id,
});
export const erc1155BalanceCRUD = getFirebaseCRUD<ERC1155Balance, ERC1155BalanceId>(firestore, erc1155BalancePath, {
    getId: getERC1155BalanceId,
    getIdParams: getERC1155BalanceIdParams,
    validateId: validateERC1155BalanceId,
});
export const operatorCRUD = getFirebaseCRUD<Operator, OperatorId>(firestore, operatorPath, {
    getId: getOperatorId,
    getIdParams: getOperatorIdParams,
    validateId: identity,
});

//ethmodels
export const addressesPublicCRUD = getFirebaseCRUD<AddressPublic, AddressPublicId>(firestore, addressesPublicPath, {
    getId: getAddressPublicId,
    getIdParams: getAddressPublicIdParams,
    validateId: identity,
});
export const addressesPersonalCRUD = getFirebaseCRUD<AddressPersonal, AddressPersonalId>(
    firestore,
    addressesPersonalPath,
    {
        getId: getAddressPersonalId,
        getIdParams: getAddressPersonalIdParams,
        validateId: identity,
    },
);
export const ethLogsCRUD = getFirebaseCRUD<EthLog, EthLogId>(firestore, ethLogsPath, {
    getId: getEthLogId,
    getIdParams: getEthLogIdParams,
    validateId: identity,
});
export const ethLogAbisCRUD = getFirebaseCRUD<EthLogAbi, EthLogAbiId>(firestore, ethLogAbisPath, {
    getId: getEthLogAbiId,
    getIdParams: getEthLogAbiIdParams,
    validateId: identity,
});
export const ethFunctionAbisCRUD = getFirebaseCRUD<EthFunctionAbi, EthFunctionAbiId>(firestore, ethFunctionAbisPath, {
    getId: getEthFunctionAbiId,
    getIdParams: getEthFunctionAbiIdParams,
    validateId: identity,
});
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
