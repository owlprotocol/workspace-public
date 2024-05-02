import { z } from "zod";
import { Chain } from "viem";
import { quantityDecodeZod, quantityEncodeZod } from "@owlprotocol/zod-sol";
import type { FirebaseQueryResource, FirebaseResource, FirestoreSDK } from "@owlprotocol/crud-firebase";
import { ChainBridge, ChainFaucet, ChainRpcUrls, chainBridgeZod, chainFaucetZod, chainZod } from "./Chain.js";

export interface NetworkId {
    readonly chainId: number;
}
export const chainIdZod = z.number().describe("Network chain id");
export const chainIdZodObject = z.object({ chainId: chainIdZod });

export const chainIdEncodeZod = z
    .union([z.string().regex(/^\d+$/), z.object({ chainId: z.number() })])
    .transform((arg) => (typeof arg === "string" ? arg : `${arg.chainId}`));

export const encodeNetworkId: (id: string | NetworkId) => string = chainIdEncodeZod.parse;
export const decodeNetworkId: (id: string) => NetworkId = (id) => {
    return { chainId: parseInt(id) };
};

/**
 * Network Data shared across all collections
 * - Network
 * - NetworkPrivate
 * - TeamNetwork
 */
export type NetworkData<TQuantity> = NetworkId &
    Omit<Chain, "id" | "rpcUrls"> & {
        //TODO: Add provider specific slugs
        /** Network slug / short name */
        slug?: string;
        slugAlchemy?: string;
        slugAnkr?: string;
        slugDrpc?: string;
        slugFlare?: string;
        slugInfura?: string;
        /** Network enabled or not */
        enabled?: boolean;
        /** Network RPC Default */
        rpcDefault?: string;
        /** Collection of RPC endpoints */
        rpcUrls: {
            [key: string]: ChainRpcUrls | undefined;
            default: ChainRpcUrls;
            public?: ChainRpcUrls;
            private?: ChainRpcUrls;
            ankr?: ChainRpcUrls;
            ankrPublic?: ChainRpcUrls;
            drpc?: ChainRpcUrls;
            drpcPublic?: ChainRpcUrls;
            flare?: ChainRpcUrls;
            infura?: ChainRpcUrls;
            thirdweb?: ChainRpcUrls;
        };
        /** Collection of bridges */
        bridges?:
            | {
                  [key: string]: ChainBridge;
                  default: ChainBridge;
              }
            | undefined;
        /** Collection of faucets */
        faucets?:
            | {
                  [key: string]: ChainFaucet;
                  default: ChainFaucet;
              }
            | undefined;
        /** Network rank sorting in terms of relevance, lower = higher priority in search result */
        rank?: number;
        /** Does network support Pimlico or use local bundler */
        pimlicoEnabled?: boolean;
        /***** Balance management *****/
        /**
         * Minimum utility balance, used for deploying contracts and topups.
         * Can be funded by an L1 topup (if possible) or triggers error if under-funded.
         */
        minUtilityBalance?: TQuantity;
        /**
         * Target utility balance (for L1 topup).
         * L1 should have sufficient balance at same address.
         * See this viem guide for more info https://viem.sh/op-stack/guides/deposits
         */
        targetUtilityBalance?: TQuantity;
        /**
         * Minimum paymaster balance, triggers a topup from utility account if below.
         * Determines total sponsorable ERC4337 gas
         */
        minPaymasterBalance?: TQuantity;
        /** Target paymaster balance, topup from utility account will fill up to this amount (target - currentBalance) */
        targetPaymasterBalance?: TQuantity;
        /**
         * Minimum relayer balance (aka bundler), triggers a topup if below
         * Determines total in-flight ERC4337 gas sent by bundler (~ bandwith)
         * Account does not get drained as UserOps refund their own gas
         */
        minRelayerBalance?: TQuantity;
        /**
         * Target relayer balance (aka bundler), topup will fill up to this amount (target - currentBalance)
         */
        targetRelayerBalance?: TQuantity;
    };

/**
 * Network with mixed quantity types (hex/number/bigint)
 */
export type NetworkDataInput = NetworkData<`0x${string}` | bigint>;

/**
 * Network with hex quantity types to support Firebase
 */
export type NetworkDataEncoded = NetworkData<`0x${string}`>;

/**
 * Network with bigint quantity types
 */
export type NetworkDataDecoded = NetworkData<bigint>;

/**
 * Zod validator encoding NetworkDataInput => NetworkDataEncoded
 */
const networkDataEncodeZodInternal = chainZod.extend({
    chainId: z.number(),
    slug: z.string().optional(),
    enabled: z.boolean().optional(),
    rpcDefault: z.string().optional(),
    bridges: z.record(z.string(), chainBridgeZod).optional().describe("Collection of bridges"),
    faucets: z.record(z.string(), chainFaucetZod).optional().describe("Collection of faucets"),
    rank: z.number().optional(),
    pimlicoEnabled: z.boolean().optional(),
    minUtilityBalance: quantityEncodeZod.optional(),
    targetUtilityBalance: quantityEncodeZod.optional(),
    minPaymasterBalance: quantityEncodeZod.optional(),
    targetPaymasterBalance: quantityEncodeZod.optional(),
    minRelayerBalance: quantityEncodeZod.optional(),
    targetRelayerBalance: quantityEncodeZod.optional(),
});
//Fix Zod vs TS types
export const networkDataEncodeZod = networkDataEncodeZodInternal as unknown as Omit<
    typeof networkDataEncodeZodInternal,
    "_output" | "_input"
> & {
    _input: NetworkDataInput;
    _output: NetworkDataEncoded;
};

/**
 * Zod validator encoding NetworkDataEncoded => NetworkDataDecoded
 */
const networkDataDecodeZodInternal = chainZod.extend({
    chainId: z.number(),
    slug: z.string().optional(),
    enabled: z.boolean().optional(),
    rpcDefault: z.string().optional(),
    bridges: z.record(z.string(), chainBridgeZod).optional().describe("Collection of bridges"),
    faucets: z.record(z.string(), chainFaucetZod).optional().describe("Collection of faucets"),
    rank: z.number().optional(),
    pimlicoEnabled: z.boolean().optional(),
    minUtilityBalance: quantityDecodeZod.optional(),
    targetUtilityBalance: quantityDecodeZod.optional(),
    minPaymasterBalance: quantityDecodeZod.optional(),
    targetPaymasterBalance: quantityDecodeZod.optional(),
    minRelayerBalance: quantityDecodeZod.optional(),
    targetRelayerBalance: quantityDecodeZod.optional(),
});
//Fix Zod vs TS types
export const networkDataDecodeZod = networkDataDecodeZodInternal as unknown as Omit<
    typeof networkDataEncodeZodInternal,
    "_output" | "_input"
> & {
    _input: NetworkDataInput;
    _output: NetworkDataDecoded;
};

export const encodeNetworkData: (data: NetworkDataInput) => NetworkDataEncoded = networkDataEncodeZod.parse as any;
export const encodeNetworkDataPartial: (data: Partial<NetworkDataInput>) => Partial<NetworkDataEncoded> =
    networkDataEncodeZod.partial().parse as any;
export const decodeNetworkData: (data: NetworkDataEncoded) => NetworkDataDecoded = networkDataDecodeZod.parse as any;

//Alias for public network config
export type Network = NetworkDataInput;

//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type NetworkResource = FirebaseResource<
    FirestoreSDK,
    NetworkDataDecoded,
    NetworkId,
    Record<string, never>,
    NetworkDataInput,
    NetworkDataEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type NetworkQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    NetworkDataDecoded,
    NetworkId,
    Record<string, never>,
    NetworkDataInput,
    NetworkDataEncoded
>;

//Alias for private network config
export type NetworkPrivate = NetworkDataInput;
