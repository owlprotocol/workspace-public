import { firestore, getFirebaseResource } from "@owlprotocol/crud-firebase/web";
import {
    BlockDecoded,
    BlockInput,
    BlockEncoded,
    blockEncodeZod,
    blockDecodeZod,
    TransactionDecoded,
    TransactionInput,
    TransactionEncoded,
    transactionEncodeZod,
    transactionDecodeZod,
    LogDecoded,
    LogInput,
    LogEncoded,
    logEncodeZod,
    logDecodeZod,
    UserOpDecoded,
    UserOpEncoded,
    UserOpInput,
    userOpDecodeZod,
    userOpEncodeZod,
    TransactionReceiptDecoded,
    TransactionReceiptEncoded,
    TransactionReceiptInput,
    transactionReceiptDecodeZod,
    transactionReceiptEncodeZod,
} from "@owlprotocol/zod-sol";
import {
    ethBlockCol,
    ethTransactionCol,
    ethTransactionReceiptCol,
    ethLogCol,
    ethUserOpCol,
    ethBytecodeCol,
} from "./collection.js";
import {
    EthBlockId,
    encodeEthBlockId,
    decodeEthBlockId,
    EthTransactionId,
    encodeEthTransactionId,
    decodeEthTransactionId,
    EthTransactionReceiptId,
    encodeEthTransactionReceiptId,
    decodeEthTransactionReceiptId,
    EthLogId,
    encodeEthLogId,
    decodeEthLogId,
    EthUserOpId,
    encodeEthUserOpId,
    decodeEthUserOpId,
    encodeEthBytecodeData,
    EthBytecodeInput,
    EthBytecodeId,
    decodeEthBytecodeData,
    decodeEthBytecodeId,
    encodeEthBytecodeDataPartial,
    encodeEthBytecodeId,
    EthBytecodeDecoded,
    EthBytecodeEncoded,
} from "../models/index.js";
import { NetworkId, encodeNetworkId, decodeNetworkId } from "../models/Network.js";

export const ethBlockResource = getFirebaseResource<BlockDecoded, EthBlockId, NetworkId, BlockInput, BlockEncoded>(
    firestore,
    ethBlockCol,
    {
        encodeId: encodeEthBlockId,
        decodeId: decodeEthBlockId,
        encodeDataPartial: blockEncodeZod.partial().parse as (block: Partial<BlockInput>) => Partial<BlockEncoded>,
        encodeData: blockEncodeZod.parse as (block: BlockInput) => BlockEncoded,
        decodeData: blockDecodeZod.parse as unknown as (block: BlockEncoded) => BlockDecoded,
        encodeParentDocId: encodeNetworkId,
        decodeParentDocId: decodeNetworkId,
    },
);
export const ethBytecodeResource = getFirebaseResource<
    EthBytecodeDecoded,
    EthBytecodeId,
    NetworkId,
    EthBytecodeInput,
    EthBytecodeEncoded
>(firestore, ethBytecodeCol, {
    encodeId: encodeEthBytecodeId,
    decodeId: decodeEthBytecodeId,
    encodeDataPartial: encodeEthBytecodeDataPartial,
    encodeData: encodeEthBytecodeData,
    decodeData: decodeEthBytecodeData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethTransactionResource = getFirebaseResource<
    TransactionDecoded,
    EthTransactionId,
    NetworkId,
    TransactionInput,
    TransactionEncoded
>(firestore, ethTransactionCol, {
    encodeId: encodeEthTransactionId,
    decodeId: decodeEthTransactionId,
    encodeDataPartial: transactionEncodeZod.partial().parse as (
        transaction: Partial<TransactionInput>,
    ) => Partial<TransactionEncoded>,
    encodeData: transactionEncodeZod.parse as unknown as (transaction: TransactionInput) => TransactionEncoded,
    decodeData: transactionDecodeZod.parse as unknown as (transaction: TransactionEncoded) => TransactionDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethTransactionReceiptResource = getFirebaseResource<
    TransactionReceiptDecoded,
    EthTransactionReceiptId,
    NetworkId,
    TransactionReceiptInput,
    TransactionReceiptEncoded
>(firestore, ethTransactionReceiptCol, {
    encodeId: encodeEthTransactionReceiptId,
    decodeId: decodeEthTransactionReceiptId,
    encodeDataPartial: transactionReceiptEncodeZod.partial().parse as (
        transactionReceipt: Partial<TransactionReceiptInput>,
    ) => Partial<TransactionReceiptEncoded>,
    encodeData: transactionReceiptEncodeZod.parse as (
        transactionReceipt: TransactionReceiptInput,
    ) => TransactionReceiptEncoded,
    decodeData: transactionReceiptDecodeZod.parse as unknown as (
        transactionReceipt: TransactionReceiptEncoded,
    ) => TransactionReceiptDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethLogResource = getFirebaseResource<LogDecoded, EthLogId, NetworkId, LogInput, LogEncoded>(
    firestore,
    ethLogCol,
    {
        encodeId: encodeEthLogId,
        decodeId: decodeEthLogId,
        encodeDataPartial: logEncodeZod.partial().parse as (log: Partial<LogInput>) => Partial<LogEncoded>,
        encodeData: logEncodeZod.parse as (log: LogInput) => LogEncoded,
        decodeData: logDecodeZod.parse as unknown as (log: LogEncoded) => LogDecoded,
        encodeParentDocId: encodeNetworkId,
        decodeParentDocId: decodeNetworkId,
    },
);
export const ethUserOpResource = getFirebaseResource<UserOpDecoded, EthUserOpId, NetworkId, UserOpInput, UserOpEncoded>(
    firestore,
    ethUserOpCol,
    {
        encodeId: encodeEthUserOpId,
        decodeId: decodeEthUserOpId,
        encodeDataPartial: userOpEncodeZod.partial().parse as (userOp: Partial<UserOpInput>) => Partial<UserOpEncoded>,
        encodeData: userOpEncodeZod.parse as (userOp: UserOpInput) => UserOpEncoded,
        decodeData: userOpDecodeZod.parse as unknown as (userOp: UserOpEncoded) => UserOpDecoded,
        encodeParentDocId: encodeNetworkId,
        decodeParentDocId: decodeNetworkId,
    },
);
