import { http } from "viem";
import { createBundlerClient, BundlerClient } from "viem/account-abstraction";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";

/**
 * Params for instantiating API URL for Bundler Client
 */
export interface BundlerUrlParams {
    chainId: number;
    baseUrl?: string;
}

/**
 * Get REST url for Bundler Client
 * @param params
 * @returns `<base>/network/<chainId>/rpc`
 */
export function getBundlerUrl(params: BundlerUrlParams): string {
    const { chainId, baseUrl: owlApiRestBaseUrl = API_REST_BASE_URL } = params;
    return `${owlApiRestBaseUrl}/network/${chainId}/rpc`;
}

/**
 * Get an Owl Protocol Bundler Client
 * @param params
 * @returns Bundler Client
 */
export function createOwlBundlerClient(params: BundlerUrlParams): BundlerClient {
    return createBundlerClient({
        transport: http(getBundlerUrl(params)),
    });
}
