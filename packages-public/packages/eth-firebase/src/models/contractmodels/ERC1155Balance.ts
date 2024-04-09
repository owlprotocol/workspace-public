import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod, uint256Zod } from "@owlprotocol/zod-sol";
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
export const erc1155BalanceIdRegex = /^(?<address>0x[a-fA-F0-9]{40})-(?<account>0x[a-fA-F0-9]{40})-(?<id>\d+$)/;
export const erc1155BalanceIdZod = z
    .union([
        z.string().regex(erc1155BalanceIdRegex),
        z.object({ address: addressZod, account: addressZod, id: tokenIdZod }),
    ])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.address}-${arg.account}-${arg.id}`;
        }
    });
export const encodeERC1155BalanceId: (id: string | ERC1155BalanceId) => string = erc1155BalanceIdZod.parse;
export const decodeERC1155BalanceId: (id: string) => ERC1155BalanceId = (id) =>
    erc1155BalanceIdRegex.exec(id)!.groups! as unknown as ERC1155BalanceId;

export interface ERC1155BalanceData {
    readonly address: Address;
    readonly account: Address;
    readonly id: string;
    readonly balance: string;
}
export const erc1155BalanceDataZod = z.object({
    address: addressZod,
    account: addressZod,
    id: tokenIdZod,
    balance: uint256Zod,
});
export const encodeERC1155BalanceData: (data: ERC1155BalanceData) => ERC1155BalanceData = erc1155BalanceDataZod.parse;
export const encodeERC1155BalanceDataPartial: (data: Partial<ERC1155BalanceData>) => Partial<ERC1155BalanceData> =
    erc1155BalanceDataZod.partial().parse;

export type ERC1155Balance = ERC1155BalanceId & ERC1155BalanceData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC1155BalanceResource = FirebaseResource<FirestoreSDK, ERC1155BalanceData, ERC1155BalanceId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC1155BalanceQueryResource = FirebaseQueryResource<FirestoreSDK, ERC1155BalanceData, ERC1155BalanceId>;
export type ERC1155BalanceGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC1155BalanceData,
    ERC1155BalanceId,
    NetworkId,
    ERC1155BalanceData,
    ERC1155BalanceData,
    Query<FirestoreSDK, ERC1155BalanceData>
>;

//Check zod validator matches interface
expectType<TypeOf<ERC1155BalanceData, z.input<typeof erc1155BalanceDataZod>>>(true);
expectType<TypeOf<ERC1155BalanceData, z.output<typeof erc1155BalanceDataZod>>>(true);
