import {
    UserOpInput,
    UserOpReceiptDecoded,
    UserOpReceiptEncoded,
    UserOpReceiptInput,
    bytes32Zod,
    quantityDecodeZod,
    quantityEncodeZod,
    userOpReceiptDecodeZod,
    userOpReceiptEncodeZod,
} from "@owlprotocol/zod-sol";
import { z } from "zod";
import {
    FirestoreSDK,
    FirebaseQueryResource,
    Query,
    FirebaseResource,
    FieldOverridesSchema,
} from "@owlprotocol/crud-firebase";
import { Hash, Prettify } from "viem";
import { NetworkId } from "./Network.js";
import { EthLogId, ethLogIdZod } from "./EthLog.js";
export * from "@owlprotocol/zod-sol/eth/UserOp";

export interface EthUserOpReceiptId {
    readonly userOpHash: Hash;
}
export const ethUserOpReceiptIdEncodeZod = z
    .object({ userOpHash: bytes32Zod })
    .transform(({ userOpHash }) => userOpHash);
export const encodeEthUserOpReceiptId: (id: string | EthUserOpReceiptId) => string = ethUserOpReceiptIdEncodeZod.parse;
export const decodeEthUserOpReceiptId: (id: string) => EthUserOpReceiptId = (id) => {
    return { userOpHash: id as Hash };
};

export type EthUserOpReceipt = EthUserOpReceiptId & UserOpInput;

export type EthUserOpReceiptInput = Prettify<
    Omit<UserOpReceiptInput, "receipt" | "logs"> & {
        userOpHash: `0x${string}`;
        /***** Post-confirmation data *****/
        /** Block hash */
        blockHash: `0x${string}`;
        /** Block number */
        blockNumber: `0x${string}` | number | bigint;
        /** Transaction hash */
        transactionHash: `0x${string}`;
        /** Logs specific to this UserOp */
        logIds: EthLogId[];
    }
>;

export type EthUserOpReceiptEncoded = Prettify<
    Omit<UserOpReceiptEncoded, "receipt" | "logs"> & {
        userOpHash: `0x${string}`;
        /***** Post-confirmation data *****/
        /** Block hash */
        blockHash: `0x${string}`;
        /** Block number */
        blockNumber: `0x${string}`;
        /** Transaction hash */
        transactionHash: `0x${string}`;
        /** Logs specific to this UserOp */
        logIds: EthLogId[];
    }
>;

export type EthUserOpReceiptDecoded = Prettify<
    Omit<UserOpReceiptDecoded, "receipt" | "logs"> & {
        userOpHash: `0x${string}`;
        /***** Post-confirmation data *****/
        /** Block hash */
        blockHash: `0x${string}`;
        /** Block number */
        blockNumber: bigint;
        /** Transaction hash */
        transactionHash: `0x${string}`;
        /** Logs specific to this UserOp */
        logIds: EthLogId[];
    }
>;

export const ethUserOpReceiptEncodeZod = userOpReceiptEncodeZod.omit({ receipt: true, logIds: true }).extend({
    userOpHash: bytes32Zod.describe("UserOp hash"),
    blockHash: bytes32Zod.describe("block hash"),
    blockNumber: quantityEncodeZod.describe("block number"),
    transactionHash: bytes32Zod.describe("transaction hash"),
    logIds: z.array(ethLogIdZod).describe("Logs specific to this UserOp"),
});

export const ethUserOpReceiptDecodeZod = userOpReceiptDecodeZod.omit({ receipt: true, logIds: true }).extend({
    userOpHash: bytes32Zod.describe("UserOp hash"),
    blockHash: bytes32Zod.describe("block hash"),
    blockNumber: quantityDecodeZod.describe("block number"),
    transactionHash: bytes32Zod.describe("transaction hash"),
    logIds: z.array(ethLogIdZod).describe("Logs specific to this UserOp"),
});

export const encodeEthUserOpReceiptData: (data: EthUserOpReceiptInput) => EthUserOpReceiptEncoded =
    ethUserOpReceiptEncodeZod.parse;
export const encodeEthUserOpReceiptDataPartial: (
    data: Partial<EthUserOpReceiptInput>,
) => Partial<EthUserOpReceiptEncoded> = ethUserOpReceiptEncodeZod.partial().parse;
export const decodeEthUserOpReceiptData: (data: EthUserOpReceiptEncoded) => EthUserOpReceiptDecoded =
    ethUserOpReceiptDecodeZod.parse;

//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthUserOpReceiptResource = FirebaseResource<
    FirestoreSDK,
    EthUserOpReceiptDecoded,
    EthUserOpReceiptId,
    NetworkId,
    EthUserOpReceiptInput,
    EthUserOpReceiptEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthUserOpReceiptQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    EthUserOpReceiptDecoded,
    EthUserOpReceiptId,
    NetworkId,
    EthUserOpReceiptInput,
    EthUserOpReceiptEncoded
>;
export type EthUserOpReceiptGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    EthUserOpReceiptDecoded,
    EthUserOpReceiptId,
    Record<string, never>,
    EthUserOpReceiptInput,
    EthUserOpReceiptEncoded,
    Query<FirestoreSDK, EthUserOpReceiptEncoded>
>;

export const EthUserOpReceiptFieldOverrides: FieldOverridesSchema<keyof EthUserOpReceiptInput> = {
    userOpHash: "COLLECTION_GROUP",
    blockHash: "COLLECTION_GROUP",
    blockNumber: "COLLECTION",
    transactionHash: "COLLECTION_GROUP",
    actualGasUsed: "IGNORE",
    actualGasCost: "IGNORE",
    entryPoint: "IGNORE",
    reason: "IGNORE",
    success: "IGNORE",
    logIds: "IGNORE",
    sender: "COLLECTION_GROUP",
    nonce: "IGNORE",
    paymaster: "COLLECTION",
};
