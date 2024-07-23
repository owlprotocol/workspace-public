import { http } from "viem";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless/utils";

/**
 * Params for instantiating API URL for Paymaster Client
 */
export interface PaymasterUrlParams {
    chainId: number;
    baseUrl?: string;
}

/**
 * Get REST url for Paymaster Client
 * @param params
 * @returns `<base>/network/<chainId>/rpc`
 */
export function getPaymasterUrl(params: PaymasterUrlParams): string {
    const { chainId, baseUrl: owlApiRestBaseUrl = API_REST_BASE_URL } = params;
    return `${owlApiRestBaseUrl}/network/${chainId}/rpc`;
}

/**
 * Get an Owl Protocol Paymaster Client
 * @param params
 * @returns Paymaster Client
 */
export function createOwlPaymasterClient(params: PaymasterUrlParams) {
    return createPimlicoPaymasterClient<ENTRYPOINT_ADDRESS_V07_TYPE>({
        transport: http(getPaymasterUrl(params)),
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
}
