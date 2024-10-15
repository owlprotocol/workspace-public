import {
    UserOpDecoded,
    UserOpEncoded,
    UserOpInput,
    bytes32Zod,
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

export type EthUserOpInput = UserOpInput & { userOpHash: `0x${string}` };

export type EthUserOpEncoded = UserOpEncoded & { userOpHash: `0x${string}` };

export type EthUserOpDecoded = UserOpDecoded & { userOpHash: `0x${string}` };

export const ethUserOpEncodeZod = userOpEncodeZod.extend({
    userOpHash: bytes32Zod,
});

export const ethUserOpDecodeZod = userOpDecodeZod.extend({
    userOpHash: bytes32Zod,
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
