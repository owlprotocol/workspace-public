import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod, quantityDecodeZod, quantityEncodeZod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { Address } from "viem";
import { NetworkId } from "../Network.js";

/** ERC1155Balance id components */
export interface ERC1155BalanceId {
    readonly address: Address;
    readonly account: Address;
    readonly id: string;
}
const tokenIdZod = z.string().regex(/^\d+$/).describe("tokenId");
export const erc1155BalanceIdZod = z
    .object({ address: addressZod, account: addressZod, id: tokenIdZod })
    .transform(({ address, account, id }) => `${address}-${account}-${id}`);
export const encodeERC1155BalanceId: (id: string | ERC1155BalanceId) => string = erc1155BalanceIdZod.parse;

export const erc1155BalanceIdRegex = /^(?<address>0x[a-fA-F0-9]{40})-(?<account>0x[a-fA-F0-9]{40})-(?<id>\d+$)/;
export const decodeERC1155BalanceId: (id: string) => ERC1155BalanceId = (id) =>
    erc1155BalanceIdRegex.exec(id)!.groups! as unknown as ERC1155BalanceId;

/**
 * Cached ERC1155 balance. Store last known block.
 * Matches both encoded RPC & decoded TS types.
 */
export interface ERC1155BalanceInput {
    readonly address: Address;
    readonly account: Address;
    readonly id: string;
    balance: `0x${string}` | number | bigint;
    blockNumber: `0x${string}` | number | bigint;
}

/**
 * Cached ERC1155 balance. Store last known block.
 * Bigint converted to Hex to support Firebase.
 */
export interface ERC1155BalanceEncoded {
    readonly address: Address;
    readonly account: Address;
    readonly id: string;
    balance: `0x${string}`;
    blockNumber: `0x${string}`;
}

/**
 * Cached ERC1155 balance. Store last known block.
 * Bigint decoded from Hex stored on Firebase.
 */
export interface ERC1155BalanceDecoded {
    readonly address: Address;
    readonly account: Address;
    readonly id: string;
    balance: bigint;
    blockNumber: bigint;
}

export const erc1155BalanceEncodeZod = z.object({
    address: addressZod,
    account: addressZod,
    id: tokenIdZod,
    balance: quantityEncodeZod,
    blockNumber: quantityEncodeZod,
});

export const erc1155BalanceDecodeZod = z.object({
    address: addressZod,
    account: addressZod,
    id: tokenIdZod,
    balance: quantityDecodeZod,
    blockNumber: quantityDecodeZod,
});

export const encodeERC1155BalanceData: (data: ERC1155BalanceInput) => ERC1155BalanceEncoded =
    erc1155BalanceEncodeZod.parse;
export const encodeERC1155BalanceDataPartial: (data: Partial<ERC1155BalanceInput>) => Partial<ERC1155BalanceEncoded> =
    erc1155BalanceEncodeZod.partial().parse;
export const decodeERC1155BalanceData: (data: ERC1155BalanceEncoded) => ERC1155BalanceDecoded =
    erc1155BalanceDecodeZod.parse;

export type ERC1155Balance = ERC1155BalanceId & ERC1155BalanceInput;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC1155BalanceResource = FirebaseResource<
    FirestoreSDK,
    ERC1155BalanceDecoded,
    ERC1155BalanceId,
    NetworkId,
    ERC1155BalanceInput,
    ERC1155BalanceEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC1155BalanceQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC1155BalanceDecoded,
    ERC1155BalanceId,
    NetworkId,
    ERC1155BalanceInput,
    ERC1155BalanceEncoded
>;
export type ERC1155BalanceGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC1155BalanceDecoded,
    ERC1155BalanceId,
    NetworkId,
    ERC1155BalanceInput,
    ERC1155BalanceEncoded,
    Query<FirestoreSDK, ERC1155BalanceEncoded>
>;

//Check zod validator matches interface
expectType<TypeOf<z.input<typeof erc1155BalanceEncodeZod>, ERC1155BalanceInput>>(true);
expectType<TypeOf<z.output<typeof erc1155BalanceEncodeZod>, ERC1155BalanceEncoded>>(true);
expectType<TypeOf<z.input<typeof erc1155BalanceDecodeZod>, ERC1155BalanceEncoded>>(true);
expectType<TypeOf<z.output<typeof erc1155BalanceDecodeZod>, ERC1155BalanceDecoded>>(true);
