import { http } from "viem";
import { createPimlicoBundlerClient } from "permissionless/clients/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless/utils";

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
export function createOwlBundlerClient(params: BundlerUrlParams) {
    return createPimlicoBundlerClient<ENTRYPOINT_ADDRESS_V07_TYPE>({
        transport: http(getBundlerUrl(params)),
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
}
