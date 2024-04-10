import { addressZod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Address } from "viem";
import { NetworkId } from "../Network.js";

/** ERC1155 id components */
export interface ERC1155Id {
    readonly address: Address;
    readonly id: string;
}
const tokenIdZod = z.string().regex(/^\d+$/).describe("tokenId");
export const erc1155IdRegex = /^(?<address>0x[a-fA-F0-9]{40})-(?<id>\d+$)/;
export const erc1155IdZod = z
    .union([z.string().regex(erc1155IdRegex), z.object({ address: addressZod, id: tokenIdZod })])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.address}-${arg.id}`;
        }
    });
export const encodeERC1155Id: (id: string | ERC1155Id) => string = erc1155IdZod.parse;
export const decodeERC1155Id: (id: string) => ERC1155Id = (id) =>
    erc1155IdRegex.exec(id)!.groups! as unknown as ERC1155Id;

export interface ERC1155Metadata {
    name?: string;
    image?: string;
    [k: string]: any;
}

export interface ERC1155Data {
    readonly address: Address;
    readonly id: string;
    uri?: string;
    metadata?: ERC1155Metadata;
}
export const erc1155DataZod = z.object({
    address: addressZod,
    id: tokenIdZod,
    uri: z.string().url().optional(),
    metadata: z.any().optional(),
});
export const encodeERC1155Data: (data: ERC1155Data) => ERC1155Data = erc1155DataZod.parse;
export const encodeERC1155DataPartial: (data: Partial<ERC1155Data>) => Partial<ERC1155Data> =
    erc1155DataZod.partial().parse;

export type ERC1155 = ERC1155Id & ERC1155Data;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC1155Resource = FirebaseResource<FirestoreSDK, ERC1155Data, ERC1155Id>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC1155QueryResource = FirebaseQueryResource<FirestoreSDK, ERC1155Data, ERC1155Id>;
export type ERC1155GroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC1155Data,
    ERC1155Id,
    NetworkId,
    ERC1155Data,
    ERC1155Data,
    Query<FirestoreSDK, ERC1155Data>
>;

//Check zod validator matches interface
expectType<TypeOf<ERC1155Data, z.input<typeof erc1155DataZod>>>(true);
expectType<TypeOf<ERC1155Data, z.output<typeof erc1155DataZod>>>(true);
