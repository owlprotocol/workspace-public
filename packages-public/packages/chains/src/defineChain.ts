import type { Network } from "@owlprotocol/eth-firebase";
import { ANKR_API_KEY, DRPC_API_KEY } from "@owlprotocol/envvars";
import { getAnkrEndpoints } from "./providers/ankr.js";
import { getDrpcEndpoints } from "./providers/drpc.js";

export type ChainRpcUrls = {
    http: readonly string[];
    webSocket?: readonly string[] | undefined;
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

    const network: Network = {
        ...chain,
        chainId,
        rpcUrls,
        enabled: chain.enabled ?? false,
    };

    return network;
}
