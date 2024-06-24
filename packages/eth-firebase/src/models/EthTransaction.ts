import { TransactionDecoded, TransactionEncoded, TransactionInput, bytes32Zod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import {
    FirestoreSDK,
    FirebaseQueryResource,
    Query,
    FirebaseResource,
    FieldOverridesSchema,
} from "@owlprotocol/crud-firebase";
import { Hash } from "viem";
import { NetworkId } from "./Network.js";
export * from "@owlprotocol/zod-sol/eth/Transaction";

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

export const EthTransactionFieldOverrides: FieldOverridesSchema<keyof TransactionInput> = {
    hash: "COLLECTION_GROUP",
    blockNumber: "COLLECTION",
    blockHash: "COLLECTION_GROUP",
    transactionIndex: "IGNORE",
    from: "COLLECTION_GROUP",
    to: "COLLECTION_GROUP",
    nonce: "IGNORE",
    input: "IGNORE",
    value: "IGNORE",
    gas: "IGNORE",
    r: "IGNORE",
    s: "IGNORE",
    v: "IGNORE",
    yParity: "IGNORE",
    type: "IGNORE",
    chainId: "IGNORE",
    accessList: "IGNORE",
    blobVersionedHashes: "IGNORE",
    gasPrice: "IGNORE",
    maxPriorityFeePerGas: "IGNORE",
    maxFeePerGas: "IGNORE",
    maxFeePerBlobGas: "IGNORE",
};
