import { addressZod } from "@owlprotocol/zod-sol";
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
export const erc721IdRegex = /^(?<address>0x[a-fA-F0-9]{40})-(?<tokenId>\d+$)/;
export const erc721IdZod = z
    .union([z.string().regex(erc721IdRegex), z.object({ address: addressZod, tokenId: tokenIdZod })])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.address}-${arg.tokenId}`;
        }
    });
export const encodeERC721Id: (id: string | ERC721Id) => string = erc721IdZod.parse;
export const decodeERC721Id: (id: string) => ERC721Id = (id) => erc721IdRegex.exec(id)!.groups! as unknown as ERC721Id;

export interface ERC721Metadata {
    readonly name?: string;
    readonly image?: string;
    [k: string]: any;
}
export interface ERC721Data {
    readonly address: Address;
    readonly tokenId: string;
    readonly owner?: string;
    readonly approved?: string;
    readonly tokenURI?: string;
    readonly metadata?: ERC721Metadata;
    //Client-side computed
    readonly dna?: string;
    readonly dnaMetadata?: ERC721Metadata;
}
export const erc721DataZod = z.object({
    address: addressZod,
    tokenId: tokenIdZod,
    owner: addressZod.optional(),
    approved: addressZod.optional(),
    tokenURI: z.string().url().optional(),
    metadata: z.any().optional(),
    dna: z.string().optional(),
    dnaMetadata: z.any().optional(),
});
export const encodeERC721Data: (data: ERC721Data) => ERC721Data = erc721DataZod.parse;
export const encodeERC721DataPartial: (data: Partial<ERC721Data>) => Partial<ERC721Data> =
    erc721DataZod.partial().parse;

export type ERC721 = ERC721Id & ERC721Data;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC721Resource = FirebaseResource<FirestoreSDK, ERC721Data, ERC721Id>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC721QueryResource = FirebaseQueryResource<FirestoreSDK, ERC721Data, ERC721Id>;
export type ERC721GroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC721Data,
    ERC721Id,
    NetworkId,
    ERC721Data,
    ERC721Data,
    Query<FirestoreSDK, ERC721Data>
>;

//Check zod validator matches interface
expectType<TypeOf<ERC721Data, z.input<typeof erc721DataZod>>>(true);
expectType<TypeOf<ERC721Data, z.output<typeof erc721DataZod>>>(true);
