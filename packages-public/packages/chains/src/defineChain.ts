import type { Network, NetworkBalanceConfig } from "@owlprotocol/eth-firebase";
import { ANKR_API_KEY, DRPC_API_KEY } from "@owlprotocol/envvars";
import { parseEther } from "viem/utils";
import { getAnkrEndpoints } from "./providers/ankr.js";
import { getDrpcEndpoints } from "./providers/drpc.js";

/** Default balance config for networks */
export const DEFAULT_BALANCE_CONFIG: {
    testnet: NetworkBalanceConfig<bigint>;
    mainnet: NetworkBalanceConfig<bigint>;
} = {
    testnet: {
        minUtilityBalance: parseEther("0.3"),
        targetUtilityBalance: parseEther("1"),
        minPaymasterBalance: parseEther("0.05"),
        targetPaymasterBalance: parseEther("0.1"),
        minRelayerBalance: parseEther("0.05"),
        targetRelayerBalance: parseEther("0.1"),
    },
    mainnet: {
        //x0.1 of testnet values, ~180 USD / chain
        minUtilityBalance: parseEther("0.01"),
        //TODO: Topup code what if utility < target?
        targetUtilityBalance: parseEther("0.05"),
        minPaymasterBalance: parseEther("0.005"),
        targetPaymasterBalance: parseEther("0.01"),
        minRelayerBalance: parseEther("0.005"),
        targetRelayerBalance: parseEther("0.01"),
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

    const networkBalanceConfigDefault = chain.testnet ? DEFAULT_BALANCE_CONFIG.testnet : DEFAULT_BALANCE_CONFIG.mainnet;
    const networkBalanceConfig: NetworkBalanceConfig<`0x${string}` | bigint> = {
        minUtilityBalance: chain.minUtilityBalance ?? networkBalanceConfigDefault.minUtilityBalance,
        targetUtilityBalance: chain.targetUtilityBalance ?? networkBalanceConfigDefault.targetUtilityBalance,
        minPaymasterBalance: chain.minPaymasterBalance ?? networkBalanceConfigDefault.minPaymasterBalance,
        targetPaymasterBalance: chain.targetPaymasterBalance ?? networkBalanceConfigDefault.targetPaymasterBalance,
        minRelayerBalance: chain.minRelayerBalance ?? networkBalanceConfigDefault.minRelayerBalance,
        targetRelayerBalance: chain.targetRelayerBalance ?? networkBalanceConfigDefault.targetRelayerBalance,
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
