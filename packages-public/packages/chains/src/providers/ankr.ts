import { ChainRpcUrls } from "../defineChain.js";

/**
 * Get rpc endpoints for Ankr
 * @param config network short name, api key (optional)
 * @returns rpcUrls `ChainRpcUrls` for network using this provider
 */
export function getAnkrEndpoints({ network, key }: { network: string; key?: string }): ChainRpcUrls {
    if (key) {
        return {
            http: [`https://rpc.ankr.com/${network}/${key}`],
            webSocket: [`wss://rpc.ankr.com/${network}/ws/${key}`],
        };
    }

    return {
        http: [`https://rpc.ankr.com/${network}`],
    };
}
