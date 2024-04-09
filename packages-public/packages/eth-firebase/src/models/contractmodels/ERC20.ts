import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { Address } from "viem";
import { NetworkId } from "../Network.js";

/** @interface ERC20 id components */
export interface ERC20Id {
    readonly address: Address;
}
export const erc20IdZod = z
    .union([addressZod, z.object({ address: addressZod })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.address));
export const encodeERC20Id: (id: string | ERC20Id) => string = erc20IdZod.parse;
export const decodeERC20Id: (id: string) => ERC20Id = (id) => {
    return { address: id as Address };
};

export interface ERC20Data {
    readonly name?: string;
    readonly symbol?: string;
    readonly decimals?: number;
    readonly totalSupply?: string;
    readonly logoURI?: string;
    readonly listedIn?: Record<string, boolean>;
}
export const erc20DataZod = z
    .object({
        name: z.string().optional(),
        symbol: z.string().optional(),
        decimals: z.number().optional(),
        totalSupply: z.string().optional(),
        logoURI: z.string().optional(),
        listedIn: z.record(z.boolean()).optional(),
    })
    .describe("erc20");
export const encodeERC20Data: (data: ERC20Data) => ERC20Data = erc20DataZod.parse;
export const encodeERC20DataPartial: (data: Partial<ERC20Data>) => Partial<ERC20Data> = erc20DataZod.partial().parse;

export type ERC20 = ERC20Id & ERC20Data;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ERC20Resource = FirebaseResource<FirestoreSDK, ERC20Data, ERC20Id>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ERC20QueryResource = FirebaseQueryResource<FirestoreSDK, ERC20Data, ERC20Id>;
export type ERC20GroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ERC20Data,
    ERC20Id,
    NetworkId,
    ERC20Data,
    ERC20Data,
    Query<FirestoreSDK, ERC20Data>
>;

//Check zod validator matches interface
expectType<TypeOf<ERC20Data, z.input<typeof erc20DataZod>>>(true);
expectType<TypeOf<ERC20Data, z.output<typeof erc20DataZod>>>(true);
