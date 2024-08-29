import type { Network, NetworkBalanceConfig } from "@owlprotocol/eth-firebase/models";
import { ANKR_API_KEY, DRPC_API_KEY } from "@owlprotocol/envvars";
import { parseEther } from "viem/utils";
import { getAnkrEndpoints } from "./providers/ankr.js";
import { getDrpcEndpoints } from "./providers/drpc.js";

/**
 * Default balance config for networks depending on
 * - Gas Token (eg. ETH)
 * - Stack (eg. default, opstack)
 */
export const DEFAULT_BALANCE_CONFIG: Record<
    string,
    Record<string, NetworkBalanceConfig<bigint> | undefined> | undefined
> = {
    BERA: {
        default: {
            //~??? USD / chain
            // Utility balance NOT needed as no L2 bridging mechanism
            minPaymasterBalance: parseEther("0.05"),
            targetPaymasterBalance: parseEther("0.2"),
            minRelayerBalance: parseEther("0.05"),
            targetRelayerBalance: parseEther("0.2"),
        },
    },
    ETH: {
        default: {
            //~500 USD / chain
            minPaymasterBalance: parseEther("0.05"),
            targetPaymasterBalance: parseEther("0.1"),
            minRelayerBalance: parseEther("0.05"),
            targetRelayerBalance: parseEther("0.1"),
        },
        "opstack-bedrock": {
            //~50 USD / chain
            minUtilityBalance: parseEther("0.01"),
            targetUtilityBalance: parseEther("0.05"),
            minPaymasterBalance: parseEther("0.005"),
            targetPaymasterBalance: parseEther("0.01"),
            minRelayerBalance: parseEther("0.005"),
            targetRelayerBalance: parseEther("0.01"),
        },
    },
    MATIC: {
        default: {
            //~10 USD / chain
            // Utility balance NOT needed as no L2 bridging mechanism
            minPaymasterBalance: parseEther("1"),
            targetPaymasterBalance: parseEther("20"),
            minRelayerBalance: parseEther("1"),
            targetRelayerBalance: parseEther("20"),
        },
    },
    NERO: {
        default: {
            //TODO: Re-evaluate for mainnet, for now using ETH values
            //~??? USD / chain
            // Utility balance NOT needed as no L2 bridging mechanism
            minPaymasterBalance: parseEther("0.005"),
            targetPaymasterBalance: parseEther("0.01"),
            minRelayerBalance: parseEther("0.005"),
            targetRelayerBalance: parseEther("0.01"),
        },
    },
    BTC: {
        default: {
            //~??? USD / chain
            // Utility balance NOT needed as no L2 bridging mechanism
            minPaymasterBalance: parseEther("0.001"),
            targetPaymasterBalance: parseEther("0.004"),
            minRelayerBalance: parseEther("0.001"),
            targetRelayerBalance: parseEther("0.002"),
        },
    },
};

/**
 * Define network config from viem chain config
 * @param chain
 * @returns
 */
export function defineNetwork(chain: Omit<Network, "chainId"> & ({ chainId: number } | { id: number })): Network {
    const chainId = (chain as { chainId: number }).chainId ?? (chain as { id: number }).id;
    const rpcUrls = {
        ...chain.rpcUrls,
        //public rpc defaults to `rpcUrls.default`
        public: chain.rpcUrls.public ?? chain.rpcUrls.default,
    } as Network["rpcUrls"];

    //Ankr
    if (chain.slugAnkr) {
        rpcUrls.ankr = rpcUrls.ankr ?? getAnkrEndpoints({ network: chain.slugAnkr, key: ANKR_API_KEY });
        rpcUrls.ankrPublic = rpcUrls.ankrPublic ?? getAnkrEndpoints({ network: chain.slugAnkr });
    }
    //Drpc
    if (chain.slugDrpc) {
        rpcUrls.drpc = rpcUrls.drpc ?? getDrpcEndpoints({ network: chain.slugDrpc, key: DRPC_API_KEY });
        rpcUrls.drpcPublic = rpcUrls.drpcPublic ?? getDrpcEndpoints({ network: chain.slugDrpc });
    }

    if (chain.slug) {
        //Slug should be ALWAYS defined
        //TODO: Add keys
        // rpcUrls.alchemy = getAlchemyEndpoints({ network: chain.slug });
        // rpcUrls.flare = getFlareEndpoints({ network: chain.slug });
        // rpcUrls.infura = getInfuraEndpoints({ network: chain.slug });
        // rpcUrls.thirdweb = getThirdwebEndpoints({ network: chain.slug });
    }

    //Override private rpc drpc => ankr
    if (ANKR_API_KEY && rpcUrls.drpc) rpcUrls.private = rpcUrls.drpc;
    else if (DRPC_API_KEY && rpcUrls.ankr) rpcUrls.private = rpcUrls.ankr;

    // Default config network balance config
    const defaultBalanceConfigForCurrency = DEFAULT_BALANCE_CONFIG[chain.nativeCurrency.symbol];
    const stack = chain.stack ?? "default";
    const defaultBalanceConfig = defaultBalanceConfigForCurrency
        ? defaultBalanceConfigForCurrency[stack] ?? defaultBalanceConfigForCurrency["default"]
        : undefined;

    const networkBalanceConfig: NetworkBalanceConfig<`0x${string}` | bigint> = {
        minUtilityBalance: chain.minUtilityBalance ?? defaultBalanceConfig?.minUtilityBalance,
        targetUtilityBalance: chain.targetUtilityBalance ?? defaultBalanceConfig?.targetUtilityBalance,
        minPaymasterBalance: chain.minPaymasterBalance ?? defaultBalanceConfig?.minPaymasterBalance,
        targetPaymasterBalance: chain.targetPaymasterBalance ?? defaultBalanceConfig?.targetPaymasterBalance,
        minRelayerBalance: chain.minRelayerBalance ?? defaultBalanceConfig?.minRelayerBalance,
        targetRelayerBalance: chain.targetRelayerBalance ?? defaultBalanceConfig?.targetRelayerBalance,
    };

    const network: Network = {
        ...chain,
        chainId,
        rpcUrls,
        enabled: chain.enabled ?? false,
        ...networkBalanceConfig,
    };

    return network;
}
