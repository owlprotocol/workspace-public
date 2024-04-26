import { ChainRpcUrls } from "../defineChain.js";

/**
 * Get rpc endpoints for Flare
 * @param config network short name, api key (optional)
 * @returns rpcUrls `ChainRpcUrls` for network using this provider
 */
export function getFlareEndpoints({ network, key }: { network: string; key: string }): ChainRpcUrls {
    return {
        http: [`https://api.flare.network/${network}/bc/C/rpc?x-apikey=${key}`],
        webSocket: [`wss://api.flare.network/${network}/bc/C/ws?x-apikey=${key}`],
    };
}
