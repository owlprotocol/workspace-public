import { getFirebaseQueryResource, Query } from "@owlprotocol/crud-firebase/admin";
import {
    BlockDecoded,
    BlockEncoded,
    BlockInput,
    LogDecoded,
    LogEncoded,
    LogInput,
    TransactionDecoded,
    TransactionEncoded,
    TransactionInput,
    TransactionReceiptDecoded,
    TransactionReceiptEncoded,
    TransactionReceiptInput,
    UserOpDecoded,
    UserOpEncoded,
    UserOpInput,
    blockDecodeZod,
    blockEncodeZod,
    logDecodeZod,
    logEncodeZod,
    transactionDecodeZod,
    transactionEncodeZod,
    transactionReceiptDecodeZod,
    transactionReceiptEncodeZod,
    userOpDecodeZod,
    userOpEncodeZod,
} from "@owlprotocol/zod-sol";
import {
    ethBlockColGroup,
    ethTransactionColGroup,
    ethTransactionReceiptColGroup,
    ethLogColGroup,
    ethUserOpColGroup,
    ethBytecodeColGroup,
    erc1155BalanceColGroup,
    erc20AllowanceColGroup,
    erc20BalanceColGroup,
    erc721ColGroup,
} from "./collection.js";
import {
    EthBlockId,
    decodeEthBlockId,
    EthTransactionId,
    decodeEthTransactionId,
    EthTransactionReceiptId,
    decodeEthTransactionReceiptId,
    EthLogId,
    decodeEthLogId,
    EthUserOpId,
    decodeEthUserOpId,
    EthBytecodeInput,
    EthBytecodeId,
    decodeEthBytecodeData,
    decodeEthBytecodeId,
    encodeEthBytecodeDataPartial,
    EthBytecodeDecoded,
    EthBytecodeEncoded,
    ERC1155BalanceData,
    ERC1155BalanceId,
    ERC20AllowanceData,
    ERC20AllowanceId,
    ERC20BalanceData,
    ERC20BalanceId,
    ERC721Data,
    ERC721Id,
    decodeERC1155BalanceId,
    decodeERC20AllowanceId,
    decodeERC20BalanceId,
    decodeERC721Id,
    encodeERC1155BalanceData,
    encodeERC1155BalanceDataPartial,
    encodeERC20AllowanceData,
    encodeERC20AllowanceDataPartial,
    encodeERC20BalanceData,
    encodeERC20BalanceDataPartial,
    encodeERC721Data,
    encodeERC721DataPartial,
} from "../models/index.js";
import { NetworkId, encodeNetworkId, decodeNetworkId } from "../models/Network.js";

export const ethBlockGroupQuery = getFirebaseQueryResource<
    BlockDecoded,
    EthBlockId,
    NetworkId,
    BlockInput,
    BlockEncoded,
    Query<"admin", BlockEncoded>
>(ethBlockColGroup, {
    decodeId: decodeEthBlockId,
    encodeDataPartial: blockEncodeZod.partial().parse as (block: Partial<BlockInput>) => Partial<BlockEncoded>,
    decodeData: blockDecodeZod.parse as unknown as (block: BlockEncoded) => BlockDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethBytecodeGroupQuery = getFirebaseQueryResource<
    EthBytecodeDecoded,
    EthBytecodeId,
    NetworkId,
    EthBytecodeInput,
    EthBytecodeEncoded,
    Query<"admin", EthBytecodeEncoded>
>(ethBytecodeColGroup, {
    decodeId: decodeEthBytecodeId,
    encodeDataPartial: encodeEthBytecodeDataPartial,
    decodeData: decodeEthBytecodeData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethTransactionGroupQuery = getFirebaseQueryResource<
    TransactionDecoded,
    EthTransactionId,
    NetworkId,
    TransactionInput,
    TransactionEncoded,
    Query<"admin", TransactionEncoded>
>(ethTransactionColGroup, {
    decodeId: decodeEthTransactionId,
    encodeDataPartial: transactionEncodeZod.partial().parse as (
        transaction: Partial<TransactionInput>,
    ) => Partial<TransactionEncoded>,
    decodeData: transactionDecodeZod.parse as unknown as (transaction: TransactionEncoded) => TransactionDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethTransactionReceiptGroupQuery = getFirebaseQueryResource<
    TransactionReceiptDecoded,
    EthTransactionReceiptId,
    NetworkId,
    TransactionReceiptInput,
    TransactionReceiptEncoded,
    Query<"admin", TransactionReceiptEncoded>
>(ethTransactionReceiptColGroup, {
    decodeId: decodeEthTransactionReceiptId,
    encodeDataPartial: transactionReceiptEncodeZod.partial().parse as (
        transactionReceipt: Partial<TransactionReceiptInput>,
    ) => Partial<TransactionReceiptEncoded>,
    decodeData: transactionReceiptDecodeZod.parse as unknown as (
        transactionReceipt: TransactionReceiptEncoded,
    ) => TransactionReceiptDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethLogGroupQuery = getFirebaseQueryResource<
    LogDecoded,
    EthLogId,
    NetworkId,
    LogInput,
    LogEncoded,
    Query<"admin", LogEncoded>
>(ethLogColGroup, {
    decodeId: decodeEthLogId,
    encodeDataPartial: logEncodeZod.partial().parse as (log: Partial<LogInput>) => Partial<LogEncoded>,
    decodeData: logDecodeZod.parse as unknown as (log: LogEncoded) => LogDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethUserOpGroupQuery = getFirebaseQueryResource<
    UserOpDecoded,
    EthUserOpId,
    NetworkId,
    UserOpInput,
    UserOpEncoded,
    Query<"admin", UserOpEncoded>
>(ethUserOpColGroup, {
    decodeId: decodeEthUserOpId,
    encodeDataPartial: userOpEncodeZod.partial().parse as (userOp: Partial<UserOpInput>) => Partial<UserOpEncoded>,
    decodeData: userOpDecodeZod.parse as unknown as (userOp: UserOpEncoded) => UserOpDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});

//contractmodels
export const erc20BalanceGroupQuery = getFirebaseQueryResource<
    ERC20BalanceData,
    ERC20BalanceId,
    NetworkId,
    ERC20BalanceData,
    ERC20BalanceData,
    Query<"admin", ERC20BalanceData>
>(erc20BalanceColGroup, {
    decodeId: decodeERC20BalanceId,
    encodeDataPartial: encodeERC20BalanceDataPartial,
    decodeData: encodeERC20BalanceData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc20AllowanceGroupQuery = getFirebaseQueryResource<
    ERC20AllowanceData,
    ERC20AllowanceId,
    NetworkId,
    ERC20AllowanceData,
    ERC20AllowanceData,
    Query<"admin", ERC20AllowanceData>
>(erc20AllowanceColGroup, {
    decodeId: decodeERC20AllowanceId,
    encodeDataPartial: encodeERC20AllowanceDataPartial,
    decodeData: encodeERC20AllowanceData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc721GroupQuery = getFirebaseQueryResource<
    ERC721Data,
    ERC721Id,
    NetworkId,
    ERC721Data,
    ERC721Data,
    Query<"admin", ERC721Data>
>(erc721ColGroup, {
    decodeId: decodeERC721Id,
    encodeDataPartial: encodeERC721DataPartial,
    decodeData: encodeERC721Data,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc1155BalanceGroupQuery = getFirebaseQueryResource<
    ERC1155BalanceData,
    ERC1155BalanceId,
    NetworkId,
    ERC1155BalanceData,
    ERC1155BalanceData,
    Query<"admin", ERC1155BalanceData>
>(erc1155BalanceColGroup, {
    decodeId: decodeERC1155BalanceId,
    encodeDataPartial: encodeERC1155BalanceDataPartial,
    decodeData: encodeERC1155BalanceData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
