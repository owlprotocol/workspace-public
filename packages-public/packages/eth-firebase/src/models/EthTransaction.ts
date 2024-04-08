import { TransactionDecoded, TransactionEncoded, TransactionInput, bytes32Zod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Hash } from "viem";
import { NetworkId } from "./Network.js";

export interface EthTransactionId {
    readonly hash: Hash;
}
export const ethTransactionIdEncodeZod = z.object({ hash: bytes32Zod }).transform(({ hash }) => hash);
export const encodeEthTransactionId: (id: string | EthTransactionId) => string = ethTransactionIdEncodeZod.parse;
export const decodeEthTransactionId: (id: string) => EthTransactionId = (id) => {
    return { hash: id as Hash };
};

export type EthTransaction = EthTransactionId & TransactionInput;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthTransactionResource = FirebaseResource<
    FirestoreSDK,
    TransactionDecoded,
    EthTransactionId,
    NetworkId,
    TransactionInput,
    TransactionEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthTransactionQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    TransactionDecoded,
    EthTransactionId,
    NetworkId,
    TransactionInput,
    TransactionEncoded
>;
export type EthTransactionGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    TransactionDecoded,
    EthTransactionId,
    Record<string, never>,
    TransactionInput,
    TransactionEncoded,
    Query<FirestoreSDK, TransactionEncoded>
>;
