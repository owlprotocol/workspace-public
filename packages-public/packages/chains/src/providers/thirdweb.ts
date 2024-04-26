import { ChainRpcUrls } from "../defineChain.js";

/**
 * Get rpc endpoints for Thirdweb
 * @param config chainId, api key (optional)
 * @returns rpcUrls `ChainRpcUrls` for network using this provider
 */
export function getThirdwebEndpoints({ chainId, key }: { chainId: number; key?: string }): ChainRpcUrls {
    if (key) {
        return {
            http: [`https://${chainId}.rpc.thirdweb.com/${key}`],
            //TODO: Add websocket
        };
    }

    return {
        //TODO: Add websocket
        http: [`https://${chainId}.rpc.thirdweb.com`],
    };
}
