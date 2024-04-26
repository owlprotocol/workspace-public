import { ChainRpcUrls } from "../defineChain.js";

/**
 * Get rpc endpoints for Alchemy
 * @param config network short name, api key (required)
 * @returns rpcUrls `ChainRpcUrls` for network using this provider
 */
export function getAlchemyEndpoints({ network, key }: { network: string; key: string }): ChainRpcUrls {
    return {
        http: [`https://${network}.g.alchemy.com/v2/${key}`],
        webSocket: [`wss://${network}.g.alchemy.com/v2/${key}`],
    };
}
