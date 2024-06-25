import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod, bytes32Zod, quantityDecodeZod, quantityEncodeZod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { Address, Hash } from "viem";
import { NetworkId } from "./Network.js";

export interface EthBytecodeId {
    readonly address: Address;
}
export const ethBytecodeIdZod = z
    .object({ address: addressZod })
    .transform((arg) => (typeof arg === "string" ? arg : arg.address));
export const encodeEthBytecodeId: (id: string | EthBytecodeId) => string = ethBytecodeIdZod.parse;
export const decodeEthBytecodeId: (id: string) => EthBytecodeId = (id) => {
    return { address: id as Address };
};

/**
 * Cached bytecode at address. Store last known block.
 * Matches both encoded RPC & decoded TS types.
 */
export interface EthBytecodeInput {
    readonly address: Address;
    readonly bytecodeHash: Hash;
    readonly blockNumber: `0x${string}` | number | bigint;
}

/**
 * Cached bytecode at address. Store last known block.
 * Bigint converted to Hex to support Firebase.
 */
export interface EthBytecodeEncoded {
    readonly address: Address;
    readonly bytecodeHash: Hash;
    readonly blockNumber: `0x${string}`;
}

/**
 * Cached bytecode at address. Store last known block.
 * Bigint decoded from Hex stored on Firebase.
 */
export interface EthBytecodeDecoded {
    readonly address: Address;
    readonly bytecodeHash: Hash;
    readonly blockNumber: bigint;
}

export const ethBytecodeEncodeZod = z.object({
    address: addressZod,
    bytecodeHash: bytes32Zod,
    blockNumber: quantityEncodeZod,
});
export const ethBytecodeDecodeZod = z.object({
    address: addressZod,
    bytecodeHash: bytes32Zod,
    blockNumber: quantityDecodeZod,
});
export const encodeEthBytecodeData: (data: EthBytecodeInput) => EthBytecodeEncoded = ethBytecodeEncodeZod.parse;
export const encodeEthBytecodeDataPartial: (data: Partial<EthBytecodeInput>) => Partial<EthBytecodeEncoded> =
    ethBytecodeEncodeZod.partial().parse;
export const decodeEthBytecodeData: (data: EthBytecodeEncoded) => EthBytecodeDecoded = ethBytecodeDecodeZod.parse;

export type EthBytecode = EthBytecodeId & EthBytecodeInput;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthBytecodeResource = FirebaseResource<
    FirestoreSDK,
    EthBytecodeDecoded,
    EthBytecodeId,
    NetworkId,
    EthBytecodeInput,
    EthBytecodeEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthBytecodeQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    EthBytecodeDecoded,
    EthBytecodeId,
    NetworkId,
    EthBytecodeInput,
    EthBytecodeEncoded
>;
export type EthBytecodeGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    EthBytecodeDecoded,
    EthBytecodeId,
    NetworkId,
    EthBytecodeInput,
    EthBytecodeEncoded,
    Query<FirestoreSDK, EthBytecodeEncoded>
>;
