import { ChainRpcUrls } from "../defineChain.js";

/**
 * Get rpc endpoints for Infura
 * @param config network short name, api key (required)
 * @returns rpcUrls `ChainRpcUrls` for network using this provider
 */
export function getInfuraEndpoints({ network, key }: { network: string; key: string }): ChainRpcUrls {
    return {
        http: [`https://${network}.infura.io/v3/${key}`],
        webSocket: [`wss://${network}.infura.io/ws/v3/${key}`],
    };
}
