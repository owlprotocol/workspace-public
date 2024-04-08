import {
    TransactionReceiptDecoded,
    TransactionReceiptEncoded,
    TransactionReceiptInput,
    bytes32Zod,
} from "@owlprotocol/zod-sol";
import { z } from "zod";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Hash } from "viem";
import { NetworkId } from "./Network.js";

export interface EthTransactionReceiptId {
    readonly transactionHash: Hash;
}
export const ethTransactionReceiptIdEncodeZod = z
    .object({ transactionHash: bytes32Zod })
    .transform(({ transactionHash }) => transactionHash);
export const encodeEthTransactionReceiptId: (id: string | EthTransactionReceiptId) => string =
    ethTransactionReceiptIdEncodeZod.parse;
export const decodeEthTransactionReceiptId: (id: string) => EthTransactionReceiptId = (id) => {
    return { transactionHash: id as Hash };
};

export type EthTransactionReceipt = EthTransactionReceiptId & TransactionReceiptInput;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthTransactionReceiptResource = FirebaseResource<
    FirestoreSDK,
    TransactionReceiptDecoded,
    EthTransactionReceiptId,
    NetworkId,
    TransactionReceiptInput,
    TransactionReceiptEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthTransactionReceiptQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    TransactionReceiptDecoded,
    EthTransactionReceiptId,
    NetworkId,
    TransactionReceiptInput,
    TransactionReceiptEncoded
>;
export type EthTransactionReceiptGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    TransactionReceiptDecoded,
    EthTransactionReceiptId,
    Record<string, never>,
    TransactionReceiptInput,
    TransactionReceiptEncoded,
    Query<FirestoreSDK, TransactionReceiptEncoded>
>;
