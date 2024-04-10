import { addressZod, quantityDecodeZod, quantityEncodeZod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Address } from "viem";
import { NetworkId } from "../Network.js";

/** ERC721 id components */
export interface ERC721Id {
    readonly address: Address;
    readonly tokenId: string;
}
const tokenIdZod = z.string().regex(/^\d+$/).describe("tokenId");
export const erc721IdZod = z
    .object({ address: addressZod, tokenId: tokenIdZod })
    .transform(({ address, tokenId }) => `${address}-${tokenId}`);
export const encodeERC721Id: (id: ERC721Id) => string = erc721IdZod.parse;

export const erc721IdRegex = /^(?<address>0x[a-fA-F0-9]{40})-(?<tokenId>\d+$)/;
export const decodeERC721Id: (id: string) => ERC721Id = (id) => erc721IdRegex.exec(id)!.groups! as unknown as ERC721Id;

export interface ERC721Metadata {
    name?: string;
    image?: string;
    [k: string]: any;
}

/**
 * Cached ERC721. Store last known block for owner, approved.
 * Matches both encoded RPC & decoded TS types.
 */
export interface ERC721Input {
    readonly address: Address;
    readonly tokenId: string;
    owner?: Address;
    ownerBlockNumber?: `0x${string}` | number | bigint;
    approved?: Address;
    approvedBlockNumber?: `0x${string}` | number | bigint;
    tokenURI?: string;
    tokenURIBlockNumber?: `0x${string}` | number | bigint;
    metadata?: ERC721Metadata;
    metadataUpdatedAt?: number;
}

/**
 * Cached ERC721. Store last known block for owner, approved.
 * Bigint converted to Hex to support Firebase.
 */
export interface ERC721Encoded {
    readonly address: Address;
    readonly tokenId: string;
    owner?: Address;
    ownerBlockNumber?: `0x${string}`;
    approved?: Address;
    approvedBlockNumber?: `0x${string}`;
    tokenURI?: string;
    tokenURIBlockNumber?: `0x${string}`;
    metadata?: ERC721Metadata;
    metadataUpdatedAt?: number;
}

/**
 * Cached ERC721. Store last known block for owner, approved.
 * Bigint decoded from Hex stored on Firebase.
 */
export interface ERC721Decoded {
    readonly address: Address;
    readonly tokenId: string;
    owner?: Address;
    ownerBlockNumber?: bigint;
    approved?: Address;
    approvedBlockNumber?: bigint;
    tokenURI?: string;
    tokenURIBlockNumber?: bigint;
    metadata?: ERC721Metadata;
    metadataUpdatedAt?: number;
}

export const erc721EncodeZod = z.object({
    address: addressZod,
    tokenId: tokenIdZod,
    owner: addressZod.optional(),
    ownerBlockNumber: quantityEncodeZod.optional(),
    approved: addressZod.optional(),
    approvedBlockNumber: quantityEncodeZod.optional(),
    tokenURI: z.string().url().optional(),
    tokenURIBlockNumber: quantityEncodeZod.optional(),
    metadata: z.any().optional(),
    metadataUpdatedAt: z.number().optional(),
});

export const erc721DecodeZod = z.object({
    address: addressZod,
    tokenId: tokenIdZod,
    owner: addressZod.optional(),
    ownerBlockNumber: quantityDecodeZod.optional(),
    approved: addressZod.optional(),
    approvedBlockNumber: quantityDecodeZod.optional(),
    tokenURI: z.string().url().optional(),
    tokenURIBlockNumber: quantityDecodeZod.optional(),
    metadata: z.any().optional(),
    metadataUpdatedAt: z.number().optional(),
});

export const encodeERC721Data: (data: ERC721Input) => ERC721Encoded = erc721EncodeZod.parse;
export const encodeERC721DataPartial: (data: Partial<ERC721Input>) => Partial<ERC721Encoded> =
    erc721EncodeZod.partial().parse;
export const decodeERC721Data: (data: ERC721Encoded) => ERC721Decoded = erc721DecodeZod.parse;

export type ERC721 = ERC721Id & ERC721Input;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC721Resource = FirebaseResource<
    FirestoreSDK,
    ERC721Decoded,
    ERC721Id,
    NetworkId,
    ERC721Input,
    ERC721Encoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC721QueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC721Decoded,
    ERC721Id,
    NetworkId,
    ERC721Input,
    ERC721Encoded
>;
export type ERC721GroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC721Decoded,
    ERC721Id,
    NetworkId,
    ERC721Input,
    ERC721Encoded,
    Query<FirestoreSDK, ERC721Encoded>
>;

//Check zod validator matches interface
expectType<TypeOf<z.input<typeof erc721EncodeZod>, ERC721Input>>(true);
expectType<TypeOf<z.output<typeof erc721EncodeZod>, ERC721Encoded>>(true);
expectType<TypeOf<z.input<typeof erc721DecodeZod>, ERC721Encoded>>(true);
expectType<TypeOf<z.output<typeof erc721DecodeZod>, ERC721Decoded>>(true);
