import { addressZod } from "@owlprotocol/zod-sol";
import { Address } from "viem";
import { z } from "zod";
import {
    FieldOverridesSchema,
    FirebaseQueryResource,
    FirebaseResource,
    FirestoreSDK,
    Query,
} from "@owlprotocol/crud-firebase";
import { expectType, TypeOf } from "ts-expect";
import { chainIdZod, NetworkId } from "./Network.js";

export interface HyperlaneWarpRouteId {
    readonly chainId: number;
    readonly address: Address;
}

export const hyperlaneWarpRouteIdRegex = /^(?<chainId>\d+)-(?<address>0x[a-fA-F0-9]{40})$/;

export const hyperlaneWarpRouteIdZod = z
    .object({
        chainId: chainIdZod,
        address: addressZod,
    })
    .transform(({ chainId, address }) => `${chainId}-${address}`);

export const encodeHyperlaneWarpRouteId: (id: string | HyperlaneWarpRouteId) => string = hyperlaneWarpRouteIdZod.parse;
export const decodeHyperlaneWarpRouteId: (id: string) => HyperlaneWarpRouteId = (id) =>
    hyperlaneWarpRouteIdRegex.exec(id)!.groups! as unknown as HyperlaneWarpRouteId;

export interface HyperlaneWarpRouteData {
    readonly chainId: number;
    readonly address: Address;
    readonly type: string;
}

export const hyperlaneWarpRouteDataZod = z.object({
    chainId: chainIdZod,
    address: addressZod,
    type: z.string(),
});

export const encodeHyperlaneWarpRouteData: (data: HyperlaneWarpRouteData) => HyperlaneWarpRouteData =
    hyperlaneWarpRouteDataZod.parse;

export const encodeHyperlaneWarpRouteDataPartial: (
    data: Partial<HyperlaneWarpRouteData>,
) => Partial<HyperlaneWarpRouteData> = hyperlaneWarpRouteDataZod.partial().parse;

export const decodeHyperlaneWarpRouteData: (data: HyperlaneWarpRouteData) => HyperlaneWarpRouteData =
    hyperlaneWarpRouteDataZod.parse;

export type HyperlaneWarpRoute = HyperlaneWarpRouteId & HyperlaneWarpRouteData;

export type HyperlaneWarpRouteResource = FirebaseResource<FirestoreSDK, HyperlaneWarpRouteData, HyperlaneWarpRouteId>;

export type HyperlaneWarpRouteQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    HyperlaneWarpRouteData,
    HyperlaneWarpRouteId,
    NetworkId,
    HyperlaneWarpRouteData,
    HyperlaneWarpRouteData
>;

export type HyperlaneWarpRouteGroupeQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    HyperlaneWarpRouteData,
    HyperlaneWarpRouteId,
    NetworkId,
    HyperlaneWarpRouteData,
    HyperlaneWarpRouteData,
    Query<FirestoreSDK, HyperlaneWarpRouteData>
>;

expectType<TypeOf<HyperlaneWarpRouteData, z.input<typeof hyperlaneWarpRouteDataZod>>>(true);
expectType<TypeOf<HyperlaneWarpRouteData, z.output<typeof hyperlaneWarpRouteDataZod>>>(true);

export const HyperlaneWarpRouteFieldOverrides: FieldOverridesSchema<keyof HyperlaneWarpRouteData> = {
    chainId: "COLLECTION_GROUP",
    address: "COLLECTION_GROUP",
    type: "IGNORE",
};
