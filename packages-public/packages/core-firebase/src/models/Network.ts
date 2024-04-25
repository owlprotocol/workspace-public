import { z } from "zod";
import { FirebaseQueryResource, FirebaseResource, FirestoreSDK } from "@owlprotocol/crud-firebase";
import { NetworkId } from "@owlprotocol/eth-firebase/models";
import { Chain } from "viem";
import { quantityEncodeZod } from "@owlprotocol/zod-sol";
import { chainZod } from "./Chain.js";

export {
    type NetworkId,
    chainIdZod,
    chainIdZodObject,
    chainIdEncodeZod,
    encodeNetworkId,
    decodeNetworkId,
} from "@owlprotocol/eth-firebase/models";

/**
 * Network Data shared across all collections
 * - Network
 * - NetworkPrivate
 * - TeamNetwork
 */
export interface NetworkData extends NetworkId, Omit<Chain, "id"> {
    /** Network enabled or not */
    enabled?: boolean;
    /** Network RPC Default */
    rpcDefault?: string;
    /** Network rank sorting in terms of relevance, lower = higher priority in search result */
    rank?: number;
    /** Does network support Pimlico or use mock bundler */
    pimlicoEnabled?: boolean;
    /***** Balance management *****/
    /**
     * Minimum utility balance, used for deploying contracts and topups.
     * Can be funded by an L1 topup (if possible) or triggers error if under-funded.
     */
    minUtilityBalance?: string;
    /**
     * Target utility balance (for L1 topup).
     * L1 should have sufficient balance at same address.
     * See this viem guide for more info https://viem.sh/op-stack/guides/deposits
     */
    targetUtilityBalance?: string;
    /**
     * Minimum paymaster balance, triggers a topup from utility account if below.
     * Determines total sponsorable ERC4337 gas
     */
    minPaymasterBalance?: string;
    /** Target paymaster balance, topup from utility account will fill up to this amount (target - currentBalance) */
    targetPaymasterBalance?: string;
    /**
     * Minimum relayer balance (aka bundler), triggers a topup if below
     * Determines total in-flight ERC4337 gas sent by bundler (~ bandwith)
     * Account does not get drained as UserOps refund their own gas
     */
    minRelayerBalance?: string;
    /**
     * Target relayer balance (aka bundler), topup will fill up to this amount (target - currentBalance)
     */
    targetRelayerBalance?: string;
}

//TODO: Add encode/decode zod to make balance configs auto-decode to bigint
/** Zod for Owl Protocol NetworkData interface, extends viem chain interface */
const networkDataZodInternal = chainZod.extend({
    chainId: z.number(),
    enabled: z.boolean().optional(),
    rpcDefault: z.string().optional(),
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
export const networkDataZod = networkDataZodInternal as unknown as Omit<
    typeof networkDataZodInternal,
    "_output" | "_input"
> & {
    _input: NetworkData;
    _output: NetworkData;
};

export const encodeNetworkData: (data: NetworkData) => NetworkData = networkDataZod.parse as any;
export const encodeNetworkDataPartial: (data: Partial<NetworkData>) => Partial<NetworkData> = networkDataZod.partial()
    .parse as any;

/**
 * Network config for public backend (we don't use our api keys to templatize)
 * Extends the viem `Chain` interface (except `id` is `chainId` for backwards compatibility)
 */
export type Network = NetworkData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type NetworkResource = FirebaseResource<FirestoreSDK, NetworkData, NetworkId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type NetworkQueryResource = FirebaseQueryResource<FirestoreSDK, NetworkData, NetworkId>;

/**
 * Network config for private backend (we use our api keys to templatize so no need for envvars)
 */
export type NetworkPrivate = NetworkData;
