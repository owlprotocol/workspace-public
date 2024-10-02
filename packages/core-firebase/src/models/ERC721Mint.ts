import { addressZod, bytes32Zod } from "@owlprotocol/zod-sol";
import {
    type ERC721Metadata,
    FirebaseQueryResource,
    FirebaseResource,
    FirestoreSDK,
    NetworkId,
    Query,
    tokenIdZod,
} from "@owlprotocol/eth-firebase";
import { type Address, type Hash } from "viem";
import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";

/** ERC721Mint id components */
export interface ERC721MintId {
    address: Address;
    userOpHash: Hash;
    tokenIdOffset: string;
}

export const erc721MintIdZod = z
    .object({
        address: addressZod,
        userOpHash: bytes32Zod.describe("userOp hash"),
        tokenIdOffset: z.string().describe("token id offset"),
    })
    .transform(({ address, userOpHash, tokenIdOffset }) => `${address}-${userOpHash}-${tokenIdOffset}`);
export const encodeERC721MintId: (id: ERC721MintId) => string = erc721MintIdZod.parse;

export const erc721MintIdRegex =
    /^(?<address>0x[a-fA-F0-9]{40})-(?<userOpHash>0x[a-fA-F0-9]{64})-(?<tokenIdOffset>\d+$)/;

export const decodeERC721MintId: (id: string) => ERC721MintId = (id) =>
    erc721MintIdRegex.exec(id)!.groups! as unknown as ERC721MintId;

export interface ERC721MintData {
    address: Address;
    userOpHash: Hash;
    metadata?: ERC721Metadata;
    tokenId?: string;
    projectId: string;
    tokenIdOffsetInt: number;
}

export const erc721MintDataZod = z
    .object({
        address: addressZod,
        userOpHash: bytes32Zod.describe("userOp hash"),
        tokenId: tokenIdZod.optional(),
        metadata: z.any().optional(),
        projectId: z.string().describe("projectId"),
        tokenIdOffsetInt: z.number().describe("tokenIdOffset as an integer"),
    })
    .describe("erc721 pending mint");
export const encodeERC721MintData: (data: ERC721MintData) => ERC721MintData = erc721MintDataZod.parse;
export const encodeERC721MintDataPartial: (data: Partial<ERC721MintData>) => Partial<ERC721MintData> =
    erc721MintDataZod.partial().parse;

export type ERC721Mint = ERC721MintId & ERC721MintData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC721MintResource = FirebaseResource<FirestoreSDK, ERC721MintData, ERC721MintId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC721MintQueryResource = FirebaseQueryResource<FirestoreSDK, ERC721MintData, ERC721MintId>;
export type ERC721MintGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC721MintData,
    ERC721MintId,
    NetworkId,
    ERC721MintData,
    ERC721MintData,
    Query<FirestoreSDK, ERC721MintData>
>;

//Check zod validator matches interface
expectType<TypeOf<ERC721MintData, z.input<typeof erc721MintDataZod>>>(true);
expectType<TypeOf<ERC721MintData, z.output<typeof erc721MintDataZod>>>(true);
