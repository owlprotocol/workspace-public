import {
    FirestoreSDK,
    FirebaseQueryResource,
    Query,
    FirebaseResource,
    FieldOverridesSchema,
} from "@owlprotocol/crud-firebase";
import { addressZod, quantityDecodeZod, quantityEncodeZod } from "@owlprotocol/zod-sol";
import { expectType, TypeOf } from "ts-expect";
import { z } from "zod";
import { Address } from "viem";
import { NetworkId } from "../Network.js";

/** ERC20Allowance id components */
export interface ERC20AllowanceId {
    readonly address: Address;
    readonly account: Address;
    readonly spender: Address;
}
export const erc20AllowanceIdZod = z
    .object({ address: addressZod, account: addressZod, spender: addressZod })
    .transform(({ address, account, spender }) => `${address}-${account}-${spender}`);
export const encodeERC20AllowanceId: (id: ERC20AllowanceId) => string = erc20AllowanceIdZod.parse;

export const erc20AllowanceIdRegex =
    /^(?<address>0x[a-fA-F0-9]{40})-(?<account>0x[a-fA-F0-9]{40})-(?<spender>0x[a-fA-F0-9]{40})$/;
export const decodeERC20AllowanceId: (id: string) => ERC20AllowanceId = (id) =>
    erc20AllowanceIdRegex.exec(id)!.groups! as unknown as ERC20AllowanceId;

/**
 * Cached ERC20 allowance. Store last known block.
 * Matches both encoded RPC & decoded TS types.
 */
export interface ERC20AllowanceInput {
    readonly address: Address;
    readonly account: Address;
    readonly spender: Address;
    balance: `0x${string}` | number | bigint;
    blockNumber: `0x${string}` | number | bigint;
}

/**
 * Cached ERC20 allowance. Store last known block.
 * Bigint converted to Hex to support Firebase.
 */
export interface ERC20AllowanceEncoded {
    readonly address: Address;
    readonly account: Address;
    readonly spender: Address;
    balance: `0x${string}`;
    blockNumber: `0x${string}`;
}

/**
 * Cached ERC20 allowance. Store last known block.
 * Bigint decoded from Hex stored on Firebase.
 */
export interface ERC20AllowanceDecoded {
    readonly address: Address;
    readonly account: Address;
    readonly spender: Address;
    balance: bigint;
    blockNumber: bigint;
}

export const erc20AllowanceEncodeZod = z.object({
    address: addressZod,
    account: addressZod,
    spender: addressZod,
    balance: quantityEncodeZod,
    blockNumber: quantityEncodeZod,
});

export const erc20AllowanceDecodeZod = z.object({
    address: addressZod,
    account: addressZod,
    spender: addressZod,
    balance: quantityDecodeZod,
    blockNumber: quantityDecodeZod,
});

export const encodeERC20AllowanceData: (data: ERC20AllowanceInput) => ERC20AllowanceEncoded =
    erc20AllowanceEncodeZod.parse;
export const encodeERC20AllowanceDataPartial: (data: Partial<ERC20AllowanceInput>) => Partial<ERC20AllowanceEncoded> =
    erc20AllowanceEncodeZod.partial().parse;
export const decodeERC20AllowanceData: (data: ERC20AllowanceEncoded) => ERC20AllowanceDecoded =
    erc20AllowanceDecodeZod.parse;

export type ERC20Allowance = ERC20AllowanceId & ERC20AllowanceInput;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC20AllowanceResource = FirebaseResource<
    FirestoreSDK,
    ERC20AllowanceDecoded,
    ERC20AllowanceId,
    NetworkId,
    ERC20AllowanceInput,
    ERC20AllowanceEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC20AllowanceQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC20AllowanceDecoded,
    ERC20AllowanceId,
    NetworkId,
    ERC20AllowanceInput,
    ERC20AllowanceEncoded
>;
export type ERC20AllowanceGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC20AllowanceDecoded,
    ERC20AllowanceId,
    NetworkId,
    ERC20AllowanceInput,
    ERC20AllowanceEncoded,
    Query<FirestoreSDK, ERC20AllowanceEncoded>
>;

//Check zod validator matches interface
expectType<TypeOf<z.input<typeof erc20AllowanceEncodeZod>, ERC20AllowanceInput>>(true);
expectType<TypeOf<z.output<typeof erc20AllowanceEncodeZod>, ERC20AllowanceEncoded>>(true);
expectType<TypeOf<z.input<typeof erc20AllowanceDecodeZod>, ERC20AllowanceEncoded>>(true);
expectType<TypeOf<z.output<typeof erc20AllowanceDecodeZod>, ERC20AllowanceDecoded>>(true);

export const ERC20AllowanceFieldOverrides: FieldOverridesSchema<keyof ERC20AllowanceInput> = {
    address: "COLLECTION_GROUP",
    account: "COLLECTION_GROUP",
    spender: "COLLECTION_GROUP",
    balance: "IGNORE",
    blockNumber: "IGNORE",
};
