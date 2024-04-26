import { ChainRpcUrls } from "../defineChain.js";

/**
 * Get rpc endpoints for dRPC
 * @param config network short name, api key (optional)
 * @returns rpcUrls `ChainRpcUrls` for network using this provider
 */
export function getDrpcEndpoints({ network, key }: { network: string; key?: string }): ChainRpcUrls {
    if (key) {
        return {
            http: [`https://lb.drpc.org/ogrpc?network=${network}&dkey=${key}`],
            webSocket: [`wss://lb.drpc.org/ogws?network=${network}&dkey=${key}`],
        };
    }

    return {
        http: [`https://${network}.drpc.org`],
        webSocket: [`wss://${network}.drpc.org`],
    };
}
