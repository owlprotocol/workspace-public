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
    blockDecodeZod,
    blockEncodeZod,
    logDecodeZod,
    logEncodeZod,
    transactionDecodeZod,
    transactionEncodeZod,
    transactionReceiptDecodeZod,
    transactionReceiptEncodeZod,
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
    ERC1155BalanceId,
    ERC20AllowanceId,
    ERC20BalanceId,
    ERC721Id,
    decodeERC1155BalanceId,
    decodeERC20AllowanceId,
    decodeERC20BalanceId,
    decodeERC721Id,
    encodeERC1155BalanceDataPartial,
    encodeERC20AllowanceDataPartial,
    encodeERC20BalanceDataPartial,
    encodeERC721DataPartial,
    ERC1155BalanceDecoded,
    ERC1155BalanceEncoded,
    ERC1155BalanceInput,
    ERC20AllowanceDecoded,
    ERC20AllowanceEncoded,
    ERC20AllowanceInput,
    ERC20BalanceDecoded,
    ERC20BalanceEncoded,
    ERC20BalanceInput,
    decodeERC20BalanceData,
    decodeERC20AllowanceData,
    decodeERC1155BalanceData,
    ERC721Encoded,
    ERC721Input,
    ERC721Decoded,
    decodeERC721Data,
    encodeEthUserOpDataPartial,
    decodeEthUserOpData,
    EthUserOpDecoded,
    EthUserOpEncoded,
    EthUserOpInput,
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
    EthUserOpDecoded,
    EthUserOpId,
    NetworkId,
    EthUserOpInput,
    EthUserOpEncoded,
    Query<"admin", EthUserOpEncoded>
>(ethUserOpColGroup, {
    decodeId: decodeEthUserOpId,
    encodeDataPartial: encodeEthUserOpDataPartial,
    decodeData: decodeEthUserOpData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});

//contractmodels
export const erc20BalanceGroupQuery = getFirebaseQueryResource<
    ERC20BalanceDecoded,
    ERC20BalanceId,
    NetworkId,
    ERC20BalanceInput,
    ERC20BalanceEncoded,
    Query<"admin", ERC20BalanceEncoded>
>(erc20BalanceColGroup, {
    decodeId: decodeERC20BalanceId,
    encodeDataPartial: encodeERC20BalanceDataPartial,
    decodeData: decodeERC20BalanceData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc20AllowanceGroupQuery = getFirebaseQueryResource<
    ERC20AllowanceDecoded,
    ERC20AllowanceId,
    NetworkId,
    ERC20AllowanceInput,
    ERC20AllowanceEncoded,
    Query<"admin", ERC20AllowanceEncoded>
>(erc20AllowanceColGroup, {
    decodeId: decodeERC20AllowanceId,
    encodeDataPartial: encodeERC20AllowanceDataPartial,
    decodeData: decodeERC20AllowanceData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc721GroupQuery = getFirebaseQueryResource<
    ERC721Decoded,
    ERC721Id,
    NetworkId,
    ERC721Input,
    ERC721Encoded,
    Query<"admin", ERC721Encoded>
>(erc721ColGroup, {
    decodeId: decodeERC721Id,
    encodeDataPartial: encodeERC721DataPartial,
    decodeData: decodeERC721Data,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc1155BalanceGroupQuery = getFirebaseQueryResource<
    ERC1155BalanceDecoded,
    ERC1155BalanceId,
    NetworkId,
    ERC1155BalanceInput,
    ERC1155BalanceEncoded,
    Query<"admin", ERC1155BalanceEncoded>
>(erc1155BalanceColGroup, {
    decodeId: decodeERC1155BalanceId,
    encodeDataPartial: encodeERC1155BalanceDataPartial,
    decodeData: decodeERC1155BalanceData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
