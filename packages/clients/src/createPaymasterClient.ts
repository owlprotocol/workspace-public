import { http } from "viem";
import { entryPoint07Address } from "viem/account-abstraction";

//TODO: Should we just use viem interface?
import { createPimlicoClient, PimlicoClient } from "permissionless/clients/pimlico";

import { API_REST_BASE_URL } from "@owlprotocol/envvars";

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
export function createOwlPaymasterClient(params: PaymasterUrlParams): PimlicoClient {
    return createPimlicoClient({
        transport: http(getPaymasterUrl(params)),
        entryPoint: { address: entryPoint07Address, version: "0.7" },
    });
}
