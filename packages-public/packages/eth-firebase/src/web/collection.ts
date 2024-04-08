import { firestore, getColRef, getColGroupRef } from "@owlprotocol/crud-firebase/web";
import {
    BlockEncoded,
    TransactionEncoded,
    TransactionReceiptEncoded,
    LogEncoded,
    UserOpEncoded,
} from "@owlprotocol/zod-sol";
import {
    ethBlockGroupPath,
    ethBlockPath,
    ethTransactionGroupPath,
    ethTransactionPath,
    ethTransactionReceiptGroupPath,
    ethTransactionReceiptPath,
    ethLogGroupPath,
    ethLogPath,
    ethUserOpGroupPath,
    ethUserOpPath,
    ethBytecodePath,
    ethBytecodeGroupPath,
} from "../collections.js";
import { NetworkId } from "../models/Network.js";
import { EthBytecodeEncoded } from "../models/index.js";

export const ethBlockColGroup = getColGroupRef<BlockEncoded>(firestore, ethBlockGroupPath);
export const ethBlockCol = (collectionId: NetworkId) => getColRef<BlockEncoded>(firestore, ethBlockPath(collectionId));

export const ethBytecodeColGroup = getColGroupRef<EthBytecodeEncoded>(firestore, ethBytecodeGroupPath);
export const ethBytecodeCol = (collectionId: NetworkId) =>
    getColRef<EthBytecodeEncoded>(firestore, ethBytecodePath(collectionId));

export const ethTransactionColGroup = getColGroupRef<TransactionEncoded>(firestore, ethTransactionGroupPath);
export const ethTransactionCol = (collectionId: NetworkId) =>
    getColRef<TransactionEncoded>(firestore, ethTransactionPath(collectionId));

export const ethTransactionReceiptColGroup = getColGroupRef<TransactionReceiptEncoded>(
    firestore,
    ethTransactionReceiptGroupPath,
);
export const ethTransactionReceiptCol = (collectionId: NetworkId) =>
    getColRef<TransactionReceiptEncoded>(firestore, ethTransactionReceiptPath(collectionId));

export const ethLogColGroup = getColGroupRef<LogEncoded>(firestore, ethLogGroupPath);
export const ethLogCol = (collectionId: NetworkId) => getColRef<LogEncoded>(firestore, ethLogPath(collectionId));

export const ethUserOpColGroup = getColGroupRef<UserOpEncoded>(firestore, ethUserOpGroupPath);
export const ethUserOpCol = (collectionId: NetworkId) =>
    getColRef<UserOpEncoded>(firestore, ethUserOpPath(collectionId));
