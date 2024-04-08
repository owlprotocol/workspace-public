import { getFirebaseQueryResource, Query } from "@owlprotocol/crud-firebase/web";
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
} from "../models/index.js";
import { NetworkId, encodeNetworkId, decodeNetworkId } from "../models/Network.js";

export const ethBlockGroupQuery = getFirebaseQueryResource<
    BlockDecoded,
    EthBlockId,
    NetworkId,
    BlockInput,
    BlockEncoded,
    Query<"web", BlockEncoded>
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
    Query<"web", EthBytecodeEncoded>
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
    Query<"web", TransactionEncoded>
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
    Query<"web", TransactionReceiptEncoded>
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
    Query<"web", LogEncoded>
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
    Query<"web", UserOpEncoded>
>(ethUserOpColGroup, {
    decodeId: decodeEthUserOpId,
    encodeDataPartial: userOpEncodeZod.partial().parse as (userOp: Partial<UserOpInput>) => Partial<UserOpEncoded>,
    decodeData: userOpDecodeZod.parse as unknown as (userOp: UserOpEncoded) => UserOpDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
