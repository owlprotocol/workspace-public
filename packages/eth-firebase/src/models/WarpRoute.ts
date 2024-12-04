import {
    FieldOverridesSchema,
    FirebaseQueryResource,
    FirebaseResource,
    FirestoreSDK,
    Query,
} from "@owlprotocol/crud-firebase";
import { addressZod } from "@owlprotocol/zod-sol";
import { expectType, TypeOf } from "ts-expect";
import { Address } from "viem";
import { z } from "zod";
import { NetworkId } from "./Network.js";

export interface WarpRouteId {
    readonly address: Address;
}

export const warpRouteIdRegex = /^(?<address>0x[a-fA-F0-9]{40})$/;

export const warpRouteIdZod = z
    .union([addressZod, z.object({ address: addressZod })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.address));
export const encodeWarpRouteId: (id: string | WarpRouteId) => string = warpRouteIdZod.parse;
export const decodeWarpRouteId: (id: string) => WarpRouteId = (id) =>
    warpRouteIdRegex.exec(id)!.groups! as unknown as WarpRouteId;

export interface WarpRouteData {
    readonly address: Address;
    readonly name: string;
    readonly symbol: string;
    readonly decimals: number;
}

export const warpRouteDataZod = z.object({
    address: addressZod,
    name: z.string(),
    symbol: z.string(),
    decimals: z.number(),
});

export const encodeWarpRouteData: (data: WarpRouteData) => WarpRouteData = warpRouteDataZod.parse;

export const encodeWarpRouteDataPartial: (data: Partial<WarpRouteData>) => Partial<WarpRouteData> =
    warpRouteDataZod.partial().parse;

export const decodeWarpRouteData: (data: any) => WarpRouteData = warpRouteDataZod.parse;

export type WarpRoute = WarpRouteId & WarpRouteData;

//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type WarpRouteResource = FirebaseResource<FirestoreSDK, WarpRouteData, WarpRouteId>;

//Generic interfaces for read resource, and group read resource (for subcollections)
export type WarpRouteQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    WarpRouteData,
    WarpRouteId,
    NetworkId,
    WarpRouteData,
    WarpRouteData
>;

export type WarpRouteGroupsQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    WarpRouteData,
    WarpRouteId,
    NetworkId,
    WarpRouteData,
    WarpRouteData,
    Query<FirestoreSDK, WarpRouteData>
>;

expectType<TypeOf<WarpRouteData, z.input<typeof warpRouteDataZod>>>(true);
expectType<TypeOf<WarpRouteData, z.output<typeof warpRouteDataZod>>>(true);

export const WarpRouteFieldOverrides: FieldOverridesSchema<keyof WarpRouteData> = {
    address: "COLLECTION_GROUP",
    name: "IGNORE",
    symbol: "IGNORE",
    decimals: "IGNORE",
};
