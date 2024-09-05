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

/** ERC721PendingMint id components */
export interface ERC721PendingMintId {
    readonly address: Address;
    readonly userOpHash: Hash;
    readonly tokenIdOffset: string;
}

export const erc721PendingMintIdZod = z
    .object({
        address: addressZod,
        userOpHash: bytes32Zod.describe("userOp hash"),
        tokenIdOffset: z.string().describe("token id offset"),
    })
    .transform(({ address, userOpHash, tokenIdOffset }) => `${address}-${userOpHash}-${tokenIdOffset}`);
export const encodeERC721PendingMintId: (id: ERC721PendingMintId) => string = erc721PendingMintIdZod.parse;

export const erc721PendingMintIdRegex =
    /^(?<address>0x[a-fA-F0-9]{40})-(?<userOpHash>0x[a-fA-F0-9]{64})-(?<tokenIdOffset>\d+$)/;

export const decodeERC721PendingMintId: (id: string) => ERC721PendingMintId = (id) =>
    erc721PendingMintIdRegex.exec(id)!.groups! as unknown as ERC721PendingMintId;

export interface ERC721PendingMintData {
    metadata?: ERC721Metadata;
    tokenId?: string;
}

export const erc721PendingMintDataZod = z
    .object({
        tokenId: tokenIdZod.optional(),
        metadata: z.any().optional(),
    })
    .describe("erc721 pending mint");
export const encodeERC721PendingMintData: (data: ERC721PendingMintData) => ERC721PendingMintData =
    erc721PendingMintDataZod.parse;
export const encodeERC721PendingMintDataPartial: (
    data: Partial<ERC721PendingMintData>,
) => Partial<ERC721PendingMintData> = erc721PendingMintDataZod.partial().parse;

export type ERC721PendingMint = ERC721PendingMintId & ERC721PendingMintData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC721PendingMintResource = FirebaseResource<FirestoreSDK, ERC721PendingMintData, ERC721PendingMintId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC721PendingMintQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC721PendingMintData,
    ERC721PendingMintId
>;
export type ERC721PendingMintGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC721PendingMintData,
    ERC721PendingMintId,
    NetworkId,
    ERC721PendingMintData,
    ERC721PendingMintData,
    Query<FirestoreSDK, ERC721PendingMintData>
>;

//Check zod validator matches interface
expectType<TypeOf<ERC721PendingMintData, z.input<typeof erc721PendingMintDataZod>>>(true);
expectType<TypeOf<ERC721PendingMintData, z.output<typeof erc721PendingMintDataZod>>>(true);
