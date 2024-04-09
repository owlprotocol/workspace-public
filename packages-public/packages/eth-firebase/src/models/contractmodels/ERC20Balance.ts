import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod, quantityDecodeZod, quantityEncodeZod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { Address } from "viem";
import { expectType, TypeOf } from "ts-expect";
import { NetworkId } from "../Network.js";

/** ERC20Balance id components */
export interface ERC20BalanceId {
    readonly address: Address;
    readonly account: Address;
}
export const erc20BalanceIdZod = z
    .object({ address: addressZod, account: addressZod })
    .transform(({ address, account }) => `${address}-${account}`);
export const encodeERC20BalanceId: (id: ERC20BalanceId) => string = erc20BalanceIdZod.parse;

export const erc20BalanceIdRegex = /^(?<address>0x[a-fA-F0-9]{40})-(?<account>0x[a-fA-F0-9]{40})$/;
export const decodeERC20BalanceId: (id: string) => ERC20BalanceId = (id) =>
    erc20BalanceIdRegex.exec(id)!.groups! as unknown as ERC20BalanceId;

/**
 * Cached ERC20 balance. Store last known block.
 * Matches both encoded RPC & decoded TS types.
 */
export interface ERC20BalanceInput {
    readonly address: Address;
    readonly account: Address;
    readonly balance: `0x${string}` | number | bigint;
    readonly blockNumber: `0x${string}` | number | bigint;
}

/**
 * Cached ERC20 balance. Store last known block.
 * Bigint converted to Hex to support Firebase.
 */
export interface ERC20BalanceEncoded {
    readonly address: Address;
    readonly account: Address;
    readonly balance: `0x${string}`;
    readonly blockNumber: `0x${string}`;
}

/**
 * Cached ERC20 balance. Store last known block.
 * Bigint decoded from Hex stored on Firebase.
 */
export interface ERC20BalanceDecoded {
    readonly address: Address;
    readonly account: Address;
    readonly balance: bigint;
    readonly blockNumber: bigint;
}

export const erc20BalanceEncodeZod = z.object({
    address: addressZod,
    account: addressZod,
    balance: quantityEncodeZod,
    blockNumber: quantityEncodeZod,
});

export const erc20BalanceDecodeZod = z.object({
    address: addressZod,
    account: addressZod,
    balance: quantityDecodeZod,
    blockNumber: quantityDecodeZod,
});

export const encodeERC20BalanceData: (data: ERC20BalanceInput) => ERC20BalanceEncoded = erc20BalanceEncodeZod.parse;
export const encodeERC20BalanceDataPartial: (data: Partial<ERC20BalanceInput>) => Partial<ERC20BalanceEncoded> =
    erc20BalanceEncodeZod.partial().parse;
export const decodeERC20BalanceData: (data: ERC20BalanceEncoded) => ERC20BalanceDecoded = erc20BalanceDecodeZod.parse;

export type ERC20Balance = ERC20BalanceId & ERC20BalanceInput;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC20BalanceResource = FirebaseResource<
    FirestoreSDK,
    ERC20BalanceDecoded,
    ERC20BalanceId,
    NetworkId,
    ERC20BalanceInput,
    ERC20BalanceEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC20BalanceQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC20BalanceDecoded,
    ERC20BalanceId,
    NetworkId,
    ERC20BalanceInput,
    ERC20BalanceEncoded
>;
export type ERC20BalanceGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC20BalanceDecoded,
    ERC20BalanceId,
    NetworkId,
    ERC20BalanceInput,
    ERC20BalanceEncoded,
    Query<FirestoreSDK, ERC20BalanceEncoded>
>;

//Check zod validator matches interface
expectType<TypeOf<z.input<typeof erc20BalanceEncodeZod>, ERC20BalanceInput>>(true);
expectType<TypeOf<z.output<typeof erc20BalanceEncodeZod>, ERC20BalanceEncoded>>(true);
expectType<TypeOf<z.input<typeof erc20BalanceDecodeZod>, ERC20BalanceEncoded>>(true);
expectType<TypeOf<z.output<typeof erc20BalanceDecodeZod>, ERC20BalanceDecoded>>(true);
