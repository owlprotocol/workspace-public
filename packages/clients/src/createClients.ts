import { PublicClient } from "viem";
import { BundlerClient } from "viem/account-abstraction";

//TODO: Should we just use viem interface?
import { PimlicoClient } from "permissionless/clients/pimlico";

import { createOwlBundlerClient } from "./createBundlerClient.js";
import { createOwlPaymasterClient } from "./createPaymasterClient.js";
import { createOwlPublicClient } from "./createPublicClient.js";

/**
 * Params for instantiating clients
 */
export interface ClientsUrlParams {
    chainId: number;
    baseUrl?: string;
}

/**
 * Get Owl Protocol Clients
 * - Public Client
 * - Bundler Client
 * - Paymaster Client
 * @param params
 * @returns Clients
 */
export function createOwlClients(params: ClientsUrlParams): {
    publicClient: PublicClient;
    bundlerClient: BundlerClient;
    paymasterClient: PimlicoClient;
} {
    const publicClient = createOwlPublicClient(params);
    const bundlerClient = createOwlBundlerClient(params);
    const paymasterClient = createOwlPaymasterClient(params);

    return {
        publicClient,
        bundlerClient,
        paymasterClient,
    };
}
