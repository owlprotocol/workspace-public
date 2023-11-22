import { ItemIdDefault, identity } from "@owlprotocol/crud-firebase";
import { firestore, getFirebaseCRUD } from "@owlprotocol/crud-firebase/admin";
import {
    ApiKeyPersonalData,
    Contract,
    CouponCampaignData,
    CouponDefinitionData,
    DfnsWalletReadOnlyData,
    SafeWalletReadOnly,
    EmailData,
    EthLog,
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
    getEthLogAbiId,
    getEthLogAbiIdParams,
    EthLogAbi,
    EthLogAbiId,
    EthFunctionAbi,
    EthFunctionAbiId,
    getEthFunctionAbiId,
    getEthFunctionAbiIdParams,
    AddressPublic,
    getAddressPublicId,
    getAddressPublicIdParams,
    AddressPublicId,
    AddressPersonal,
    AddressPersonalId,
    getAddressPersonalId,
    getAddressPersonalIdParams,
    ERC1155,
    ERC1155Balance,
    ERC1155BalanceId,
    ERC1155Id,
    ERC20,
    ERC20Allowance,
    ERC20AllowanceId,
    ERC20Id,
    ERC721,
    ERC721Id,
    getERC1155BalanceId,
    getERC1155BalanceIdParams,
    getERC1155Id,
    getERC1155IdParams,
    getERC20AllowanceId,
    getERC20AllowanceIdParams,
    getERC20Id,
    getERC20IdParams,
    getERC721Id,
    getERC721IdParams,
    Operator,
    OperatorId,
    getOperatorId,
    getOperatorIdParams,
    ERC20Balance,
    ERC20BalanceId,
    getERC20BalanceId,
    getERC20BalanceIdParams,
    ChatRoom,
    ChatRoomId,
    ChatMessageId,
    ChatMessage,
    ReferralCampaignId,
    ReferralUserId,
    ReferralRedemptionId,
    ReferralCampaignData,
    ReferralRedemptionData,
    ReferralUserData,
    validateERC20Id,
    validateERC20BalanceId,
    validateERC20AllowanceId,
    validateERC721Id,
    validateERC1155Id,
    validateERC1155BalanceId,
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
    erc1155BalancePath,
    erc1155Path,
    erc20AllowancePath,
    erc20Path,
    erc721Path,
    operatorPath,
    erc20BalancePath,
    chatRoomPath,
    chatMessagePath,
    referralCampaignPath,
    referralUserPath,
    referralRedemptionPath,
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
const ownerOnlyReadChecks = {
    readAccessCheck: ownerCheck,
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

//chat
export const chatRoomCRUD = getFirebaseCRUD<ChatRoom, ChatRoomId>(firestore, chatRoomPath);
export const getChatMessageCRUD = (roomId: string) =>
    getFirebaseCRUD<ChatMessage, ChatMessageId>(firestore, chatMessagePath.replace("{roomId}", roomId));

//referral
export const referralCampaignCRUD = getFirebaseCRUD<ReferralCampaignData, ReferralCampaignId>(
    firestore,
    referralCampaignPath,
);
export const getReferralUserCRUD = (campaignId: string) =>
    getFirebaseCRUD<ReferralUserData, ReferralUserId>(firestore, referralUserPath.replace("{campaignId}", campaignId));
export const getReferralRedemptionCRUD = (campaignId: string) =>
    getFirebaseCRUD<ReferralRedemptionData, ReferralRedemptionId>(
        firestore,
        referralRedemptionPath.replace("{campaignId}", campaignId),
    );

//contractmodels
export const erc20CRUD = getFirebaseCRUD<ERC20, ERC20Id>(
    firestore,
    erc20Path,
    {
        getId: getERC20Id,
        getIdParams: getERC20IdParams,
        validateId: validateERC20Id,
    },
    readOnlyChecks,
);
export const erc20BalanceCRUD = getFirebaseCRUD<ERC20Balance, ERC20BalanceId>(
    firestore,
    erc20BalancePath,
    {
        getId: getERC20BalanceId,
        getIdParams: getERC20BalanceIdParams,
        validateId: validateERC20BalanceId,
    },
    readOnlyChecks,
);
export const erc20AllowanceCRUD = getFirebaseCRUD<ERC20Allowance, ERC20AllowanceId>(
    firestore,
    erc20AllowancePath,
    {
        getId: getERC20AllowanceId,
        getIdParams: getERC20AllowanceIdParams,
        validateId: validateERC20AllowanceId,
    },
    readOnlyChecks,
);
export const erc721CRUD = getFirebaseCRUD<ERC721, ERC721Id>(
    firestore,
    erc721Path,
    {
        getId: getERC721Id,
        getIdParams: getERC721IdParams,
        validateId: validateERC721Id,
    },
    readOnlyChecks,
);
export const erc1155CRUD = getFirebaseCRUD<ERC1155, ERC1155Id>(
    firestore,
    erc1155Path,
    {
        getId: getERC1155Id,
        getIdParams: getERC1155IdParams,
        validateId: validateERC1155Id,
    },
    readOnlyChecks,
);
export const erc1155BalanceCRUD = getFirebaseCRUD<ERC1155Balance, ERC1155BalanceId>(
    firestore,
    erc1155BalancePath,
    {
        getId: getERC1155BalanceId,
        getIdParams: getERC1155BalanceIdParams,
        validateId: validateERC1155BalanceId,
    },
    readOnlyChecks,
);
export const operatorCRUD = getFirebaseCRUD<Operator, OperatorId>(
    firestore,
    operatorPath,
    {
        getId: getOperatorId,
        getIdParams: getOperatorIdParams,
        validateId: identity,
    },
    readOnlyChecks,
);

//ethmodels
export const addressesPublicCRUD = getFirebaseCRUD<AddressPublic, AddressPublicId, [userId: string]>(
    firestore,
    addressesPublicPath,
    {
        getId: getAddressPublicId,
        getIdParams: getAddressPublicIdParams,
        validateId: identity,
    },
    readOnlyChecks,
);
export const addressesPersonalCRUD = getFirebaseCRUD<AddressPersonal, AddressPersonalId, [userId: string]>(
    firestore,
    addressesPersonalPath,
    {
        getId: getAddressPersonalId,
        getIdParams: getAddressPersonalIdParams,
        validateId: identity,
    },
    ownerOnlyChecks,
);
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
export const ethLogAbisCRUD = getFirebaseCRUD<EthLogAbi, EthLogAbiId, [userId: string]>(
    firestore,
    ethLogAbisPath,
    {
        getId: getEthLogAbiId,
        getIdParams: getEthLogAbiIdParams,
        validateId: identity,
    },
    readOnlyChecks,
);
export const ethFunctionAbisCRUD = getFirebaseCRUD<EthFunctionAbi, EthFunctionAbiId, [userId: string]>(
    firestore,
    ethFunctionAbisPath,
    {
        getId: getEthFunctionAbiId,
        getIdParams: getEthFunctionAbiIdParams,
        validateId: identity,
    },
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
export const dfnsWalletsReadOnlyCRUD = getFirebaseCRUD<DfnsWalletReadOnlyData, ItemIdDefault, [userId: string]>(
    firestore,
    dfnsWalletsReadOnlyPath,
    undefined,
    ownerOnlyChecks,
);
export const safeWalletsReadOnlyCRUD = getFirebaseCRUD<SafeWalletReadOnly, SafeWalletId, [userId: string]>(
    firestore,
    safeWalletsReadOnlyPath,
    {
        getId: getSafeWalletId,
        getIdParams: getSafeWalletIdParams,
        validateId: validateSafeWalletId,
    },
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
export const collectionsCRUD = getFirebaseCRUD<Collection, CollectionId, [userId: string]>(
    firestore,
    collectionsPath,
    {
        getId: getCollectionId,
        getIdParams: getCollectionIdParams,
        validateId: validateCollectionId,
    },
    ownerOnlyChecks,
);
export const projectsCRUD = getFirebaseCRUD<ProjectData, ItemIdDefault, [userId: string]>(
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
export const lazyMintsCRUD = getFirebaseCRUD<LazyMintData, ItemIdDefault, [userId: string]>(
    firestore,
    lazyMintsPath,
    undefined,
    ownerOnlyWriteChecks,
);
export const lazyMintInstancesCRUD = getFirebaseCRUD<LazyMintInstanceData, ItemIdDefault, [userId: string]>(
    firestore,
    lazyMintInstancesPath,
    undefined,
    ownerOnlyReadChecks,
);
