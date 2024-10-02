import { http, createPublicClient } from "viem";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";

/**
 * Params for instantiating API URL for Public Client
 */
export interface PublicUrlParams {
    chainId: number;
    baseUrl?: string;
}

/**
 * Get REST url for Public Client
 * @param params
 * @returns `<base>/network/<chainId>/rpc`
 */
export function getPublicUrl(params: PublicUrlParams): string {
    const { chainId, baseUrl: owlApiRestBaseUrl = API_REST_BASE_URL } = params;
    return `${owlApiRestBaseUrl}/network/${chainId}/rpc`;
}

/**
 * Get an Owl Protocol Public Client
 * @param params
 * @returns Public Client
 */
export function createOwlPublicClient(params: PublicUrlParams) {
    return createPublicClient({
        transport: http(getPublicUrl(params)),
    });
}
