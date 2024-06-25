import {
    UserOpDecoded,
    UserOpEncoded,
    UserOpInput,
    bytes32Zod,
    quantityDecodeZod,
    quantityEncodeZod,
    userOpDecodeZod,
    userOpEncodeZod,
} from "@owlprotocol/zod-sol";
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
import { EthLogId, ethLogIdZod } from "./EthLog.js";
export * from "@owlprotocol/zod-sol/eth/UserOp";

export interface EthUserOpId {
    readonly userOpHash: Hash;
}
export const ethUserOpIdEncodeZod = z.object({ userOpHash: bytes32Zod }).transform(({ userOpHash }) => userOpHash);
export const encodeEthUserOpId: (id: string | EthUserOpId) => string = ethUserOpIdEncodeZod.parse;
export const decodeEthUserOpId: (id: string) => EthUserOpId = (id) => {
    return { userOpHash: id as Hash };
};

export type EthUserOp = EthUserOpId & UserOpInput;

export interface EthUserOpInput extends UserOpInput {
    userOpHash: `0x${string}`;
    /***** Post-confirmation data *****/
    /** Block hash */
    blockHash?: `0x${string}`;
    /** Block number */
    blockNumber?: `0x${string}` | number | bigint;
    /** Transaction hash */
    transactionHash?: `0x${string}`;
    /** UserOp gas used */
    actualGasUsed?: `0x${string}` | number | bigint;
    /** UserOp gas cost */
    actualGasCost?: `0x${string}` | number | bigint;
    /** UserOp result */
    success?: boolean;
    /** Logs specific to this UserOp */
    logIds?: EthLogId[];
}

export interface EthUserOpEncoded extends UserOpEncoded {
    userOpHash: `0x${string}`;
    /***** Post-confirmation data *****/
    /** Block hash */
    blockHash?: `0x${string}`;
    /** Block number */
    blockNumber?: `0x${string}`;
    /** Transaction hash */
    transactionHash?: `0x${string}`;
    /** UserOp gas used */
    actualGasUsed?: `0x${string}`;
    /** UserOp gas cost */
    actualGasCost?: `0x${string}`;
    /** UserOp result */
    success?: boolean;
    /** Logs specific to this UserOp */
    logIds?: EthLogId[];
}

export interface EthUserOpDecoded extends UserOpDecoded {
    userOpHash: `0x${string}`;
    /***** Post-confirmation data *****/
    /** Block hash */
    blockHash?: `0x${string}`;
    /** Block number */
    blockNumber?: bigint;
    /** Transaction hash */
    transactionHash?: `0x${string}`;
    /** UserOp gas used */
    actualGasUsed?: bigint;
    /** UserOp gas cost */
    actualGasCost?: bigint;
    /** UserOp result */
    success?: boolean;
    /** Logs specific to this UserOp */
    logIds?: EthLogId[];
}

export const ethUserOpEncodeZod = userOpEncodeZod.extend({
    userOpHash: bytes32Zod.describe("UserOp hash"),
    blockHash: bytes32Zod.optional().describe("block hash"),
    blockNumber: quantityEncodeZod.optional().describe("block number"),
    transactionHash: bytes32Zod.optional().describe("transaction hash"),
    actualGasUsed: quantityEncodeZod.optional().describe("UserOp gas used"),
    actualGasCost: quantityEncodeZod.optional().describe("UserOp gas cost"),
    success: z.boolean().optional().describe("UserOp result"),
    logIds: z.array(ethLogIdZod).optional().describe("Logs specific to this UserOp"),
});

export const ethUserOpDecodeZod = userOpDecodeZod.extend({
    userOpHash: bytes32Zod.describe("UserOp hash"),
    blockHash: bytes32Zod.optional().describe("block hash"),
    blockNumber: quantityDecodeZod.optional().describe("block number"),
    transactionHash: bytes32Zod.optional().describe("transaction hash"),
    actualGasUsed: quantityDecodeZod.optional().describe("UserOp gas used"),
    actualGasCost: quantityDecodeZod.optional().describe("UserOp gas cost"),
    success: z.boolean().optional().describe("UserOp result"),
    logIds: z.array(ethLogIdZod).optional().describe("Logs specific to this UserOp"),
});

export const encodeEthUserOpData: (data: EthUserOpInput) => EthUserOpEncoded = ethUserOpEncodeZod.parse;
export const encodeEthUserOpDataPartial: (data: Partial<EthUserOpInput>) => Partial<EthUserOpEncoded> =
    ethUserOpEncodeZod.partial().parse;
export const decodeEthUserOpData: (data: EthUserOpEncoded) => EthUserOpDecoded = ethUserOpDecodeZod.parse;

//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthUserOpResource = FirebaseResource<
    FirestoreSDK,
    EthUserOpDecoded,
    EthUserOpId,
    NetworkId,
    EthUserOpInput,
    EthUserOpEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthUserOpQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    EthUserOpDecoded,
    EthUserOpId,
    NetworkId,
    EthUserOpInput,
    EthUserOpEncoded
>;
export type EthUserOpGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    EthUserOpDecoded,
    EthUserOpId,
    Record<string, never>,
    EthUserOpInput,
    EthUserOpEncoded,
    Query<FirestoreSDK, EthUserOpEncoded>
>;

export const EthUserOpFieldOverrides: FieldOverridesSchema<keyof EthUserOpInput> = {
    userOpHash: "COLLECTION_GROUP",
    blockHash: "COLLECTION_GROUP",
    blockNumber: "COLLECTION",
    transactionHash: "COLLECTION_GROUP",
    actualGasUsed: "IGNORE",
    actualGasCost: "IGNORE",
    success: "IGNORE",
    logIds: "IGNORE",
    sender: "COLLECTION_GROUP",
    nonce: "IGNORE",
    factory: "COLLECTION",
    factoryData: "IGNORE",
    callData: "IGNORE",
    callGasLimit: "IGNORE",
    verificationGasLimit: "IGNORE",
    preVerificationGas: "IGNORE",
    maxFeePerGas: "IGNORE",
    maxPriorityFeePerGas: "IGNORE",
    paymaster: "COLLECTION",
    paymasterVerificationGasLimit: "IGNORE",
    paymasterPostOpGasLimit: "IGNORE",
    paymasterData: "IGNORE",
    signature: "IGNORE",
};
