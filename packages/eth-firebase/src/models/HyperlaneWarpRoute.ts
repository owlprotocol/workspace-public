import { z } from "zod";
import {
    FieldOverridesSchema,
    FirebaseQueryResource,
    FirebaseResource,
    FirestoreSDK,
    Query,
} from "@owlprotocol/crud-firebase";
import { expectType, TypeOf } from "ts-expect";
import { addressZod, bytes32Zod } from "@owlprotocol/zod-sol";
import { Address, Hex } from "viem";
import { chainIdZod, NetworkId } from "./Network.js";

/**
 * Store edges of warp routes between tokens
 * This could be used to generate a graph like https://hyperchains.vercel.app/routes
 */
export interface HyperlaneWarpRouteId {
    readonly chainA: number;
    readonly tokenA: Hex;
    readonly chainB: number;
    readonly tokenB: Hex;
}

export const hyperlaneWarpRouteIdRegex =
    /^(?<chainA>\d+)-(?<tokenA>0x[a-fA-F0-9]{64})-(?<chainB>\d+)-(?<tokenB>0x[a-fA-F0-9]{64})$/;

export const hyperlaneWarpRouteIdZod = z
    .object({
        chainA: chainIdZod,
        tokenA: bytes32Zod,
        chainB: chainIdZod,
        tokenB: bytes32Zod,
    })
    .transform(({ chainA, tokenA, chainB, tokenB }) => `${chainA}-${tokenA}-${chainB}-${tokenB}`);

export const encodeHyperlaneWarpRouteId: (id: string | HyperlaneWarpRouteId) => string = hyperlaneWarpRouteIdZod.parse;
export const decodeHyperlaneWarpRouteId: (id: string) => HyperlaneWarpRouteId = (id) =>
    hyperlaneWarpRouteIdRegex.exec(id)!.groups! as unknown as HyperlaneWarpRouteId;

export interface HyperlaneWarpRouteData {
    readonly wrappedTokenAddress?: Address;
    readonly chainA: number;
    readonly tokenA: Hex;
    readonly chainB: number;
    readonly tokenB: Hex;
}

export const hyperlaneWarpRouteDataZod = z.object({
    wrappedTokenAddress: addressZod.optional(),
    chainA: chainIdZod,
    tokenA: bytes32Zod,
    chainB: chainIdZod,
    tokenB: bytes32Zod,
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
    chainA: "COLLECTION",
    chainB: "COLLECTION",
    tokenA: "COLLECTION",
    tokenB: "COLLECTION",
    wrappedTokenAddress: "IGNORE",
};
