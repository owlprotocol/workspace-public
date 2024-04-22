import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { FirebaseQueryResource, FirebaseResource, FirestoreSDK } from "@owlprotocol/crud-firebase";
import { NetworkId } from "@owlprotocol/eth-firebase/models";
import type { ChainWithData } from "./Chain.js";

export {
    type NetworkId,
    chainIdZod,
    chainIdZodObject,
    chainIdEncodeZod,
    encodeNetworkId,
    decodeNetworkId,
} from "@owlprotocol/eth-firebase/models";

/**
 * Network config for public backend (we don't use our api keys to templatize)
 */
export interface Network extends ChainWithData {
    /** Network enabled or not */
    readonly enabled?: boolean;
    /** Network rank sorting in terms of relevance, lower = higher priority in search result */
    readonly rank?: number;
    /** Default network (rank 0) */
    readonly default?: boolean;
    /** Does network support Pimlico or use mock bundler */
    readonly pimlicoEnabled?: boolean;
}

//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type NetworkResource = FirebaseResource<FirestoreSDK, Network, NetworkId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type NetworkQueryResource = FirebaseQueryResource<FirestoreSDK, Network, NetworkId>;

/**
 * Network config for private backend (we use our api keys to templatize so no need for envvars)
 */
export type NetworkPrivate = Network;

export const iconZod = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
    format: z.string(),
});

export const chainZod = z
    .object({
        name: z.string(),
        title: z.string().optional(),
        chain: z.string(),
        icon: iconZod.optional(),
        rpc: z.array(z.string()),
        features: z.array(z.object({ name: z.string() })).optional(),
        faucets: z.array(z.string()).optional(),
        nativeCurrency: z.object({
            name: z.string(),
            symbol: z.string(),
            decimals: z.number(),
        }),
        infoURL: z.string().optional(),
        shortName: z.string(),
        chainId: z.number(),
        networkId: z.number().optional(),
        ens: z
            .object({
                registry: z.string(),
            })
            .optional(),
        explorers: z
            .array(
                z.object({
                    name: z.string(),
                    url: z.string(),
                    icon: iconZod.optional(),
                    standard: z.string(),
                }),
            )
            .optional(),
        testnet: z.boolean(),
        slug: z.string(),
        slip44: z.number().optional(),
        status: z.string().optional(),
        redFlags: z.array(z.string()).optional(),
        parent: z
            .object({
                chain: z.string(),
                type: z.string(),
                bridges: z.array(z.object({ url: z.string() })),
            })
            .optional(),
    })
    .describe("chain");

export const chainWithDataZod = chainZod
    .extend({
        rpcThirdWeb: z.string().optional(),
        rpcAlchemy: z.string().optional(),
        rpcInfura: z.string().optional(),
        rpcAnkr: z.string().optional(),
        rpcPublic: z.string().optional(),
        rpcDefault: z.string().optional(),

        wsThirdWeb: z.string().optional(),
        wsAlchemy: z.string().optional(),
        wsInfura: z.string().optional(),
        wsAnkr: z.string().optional(),
        wsPublic: z.string().optional(),
        wsDefault: z.string().optional(),

        explorerEtherscan: z.string().optional(),
        explorerBlockscout: z.string().optional(),
        explorer: z.string().optional(),
        explorerApi: z.string().optional(),
        explorerApiKey: z.string().optional(),
    })
    .describe("chainWithData");

export const networkZodInternal = chainWithDataZod.extend({
    enabled: z.boolean().optional(),
    rank: z.number().optional(),
    default: z.boolean().optional(),
});
export const encodeNetwork: (data: Network) => Network = networkZodInternal.parse;
export const encodeNetworkPartial: (data: Partial<Network>) => Partial<Network> = networkZodInternal.partial().parse;

export const networkPrivateZod = chainWithDataZod.extend({
    enabled: z.boolean().optional(),
    rank: z.number().optional(),
});
export const encodeNetworkPrivate: (data: NetworkPrivate) => NetworkPrivate = networkPrivateZod.parse;
export const encodeNetworkPrivatePartial: (data: Partial<NetworkPrivate>) => Partial<NetworkPrivate> =
    networkPrivateZod.partial().parse;

//Fix Zod vs TS types
export const networkZod = networkZodInternal as Omit<typeof networkZodInternal, "_output" | "_input"> & {
    _input: Network;
    _output: Network;
};

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
expectType<TypeEqual<Network, z.input<typeof networkZod>>>(true);
expectType<TypeEqual<Network, z.output<typeof networkZod>>>(true);

expectType<
    TypeEqual<
        Pick<NetworkPrivate, "enabled" | "rank">,
        Readonly<Pick<z.input<typeof networkPrivateZod>, "enabled" | "rank">>
    >
>(true);
expectType<
    TypeEqual<
        Pick<NetworkPrivate, "enabled" | "rank">,
        Readonly<Pick<z.output<typeof networkPrivateZod>, "enabled" | "rank">>
    >
>(true);
