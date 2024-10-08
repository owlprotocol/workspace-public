import { NODE_ENV, isProductionOrStaging } from "@owlprotocol/envvars";
import { Network, NetworkDataInput, networkPrivateResource, networkResource } from "@owlprotocol/core-firebase/admin";

import { localhost, opBedrockL1, opBedrockL2 } from "@owlprotocol/chains";
import * as chains from "@owlprotocol/chains/chains";
import { getUtilityAccount, getRelayerAccount, getPaymasterSignerAccount } from "@owlprotocol/viem-utils";
import { Chain, createPublicClient, createWalletClient, http } from "viem";
import { setupChain } from "./setupChain.js";
import { extendWalletClient } from "./extendWalletClient.js";

/**
 * Upload chain configurations to firebase
 * @param networks networks array
 * @returns
 */
export async function uploadNetworks(networks: Network[]) {
    //Configure default rpc as the public rpc
    const networksPublic: Network[] = networks.map((chain) => {
        const rpcUrls: Network["rpcUrls"] = {
            default: chain.rpcUrls.public ?? chain.rpcUrls.default,
        };
        //Only include public rpc configs
        if (chain.rpcUrls.public) rpcUrls.public = chain.rpcUrls.public;
        if (chain.rpcUrls.ankrPublic) rpcUrls.ankrPublic = chain.rpcUrls.ankrPublic;
        if (chain.rpcUrls.drpcPublic) rpcUrls.drpcPublic = chain.rpcUrls.drpcPublic;

        //Override default rpc drpcPublic => ankrPublic => public
        if (rpcUrls.drpcPublic) rpcUrls.default = rpcUrls.drpcPublic;
        else if (rpcUrls.ankrPublic) rpcUrls.default = rpcUrls.ankrPublic;

        return {
            ...chain,
            //Use public rpc
            rpcDefault: rpcUrls.default.http[0],
            rpcUrls,
        };
    });

    //Do NOT filter by enabled as certain networks (eg. L2 parent chains)
    //might still be needed by API
    const networksPrivate: Network[] = networks.map((chain) => {
        //Include all rpc configs, set default as private rpc
        const rpcUrls: Network["rpcUrls"] = {
            ...chain.rpcUrls,
            default: chain.rpcUrls.private ?? chain.rpcUrls.default,
        };

        return {
            ...chain,
            //Use public rpc
            rpcDefault: rpcUrls.default.http[0],
            rpcUrls,
        };
    });

    await Promise.all([networkResource.setBatch(networksPublic), networkPrivateResource.setBatch(networksPrivate)]);

    return {
        networksPublic,
        networksPrivate,
    };
}

/**
 * Get production networks (enabled & non-local)
 */
export function getAllNetworks() {
    //Exclude local networks
    const localNetworkIds = localNetworks.map((c) => c.chainId);
    return Object.values(chains)
        .filter((chain) => chain.enabled)
        .filter((c) => !localNetworkIds.includes(c.chainId));
}

//TODO: Enable OPStack tests
export const localNetworks = [localhost, opBedrockL1, opBedrockL2];

/**
 * Upload & setup networks for current `NODE_ENV`
 * - development: localhost
 * - staging: All enabled networks with staging accounts
 * - production: All enabled networks with production accounts
 */
export async function setupNetworksForEnv() {
    // Delete All
    await Promise.all([networkResource.deleteAll(), networkPrivateResource.deleteAll()]);

    // Accounts
    //Load viem utility account
    const utilityAccount = getUtilityAccount();
    // Load viem bundler account
    const bundlerAccount = getRelayerAccount();
    //Load viem paymaster signer account
    const paymasterSignerAccount = getPaymasterSignerAccount();

    let data: NetworkDataInput[];

    if (!isProductionOrStaging()) {
        console.debug(`NODE_ENV (${NODE_ENV}) Uploading local development networks`);
        //Local dev networks
        //TODO: Enable OPStack tests
        data = [localhost];
    } else {
        console.debug(`NODE_ENV (${NODE_ENV}) Uploading all networks`);
        //Upload all networks
        data = getAllNetworks();
    }

    const { networksPrivate } = await uploadNetworks(data);
    for (const network of networksPrivate) {
        const chain = { id: network.chainId, ...network } as Chain;
        const publicClient = createPublicClient({
            transport: http(chain.rpcUrls.default.http[0]),
            chain,
        });
        const walletClient = extendWalletClient(
            createWalletClient({
                transport: http(chain.rpcUrls.default.http[0]),
                chain,
                account: utilityAccount,
            }),
        );

        // L1 (opstack)
        const networkL1 = chain.sourceId ? await networkPrivateResource.getOrNull({ chainId: chain.sourceId }) : null;
        const chainL1 = networkL1 ? ({ id: networkL1.chainId, ...networkL1 } as Chain) : undefined;
        const publicClientL1 = chainL1
            ? createPublicClient({
                  transport: http(chainL1.rpcUrls.default.http[0]),
                  chain: chainL1,
              })
            : undefined;
        const walletClientL1 = chainL1
            ? extendWalletClient(
                  createWalletClient({
                      transport: http(chainL1.rpcUrls.default.http[0]),
                      chain,
                      account: utilityAccount,
                  }),
              )
            : undefined;

        console.debug(`🛠️  Deploying ${network.name}`);

        const result = await setupChain({
            publicClient,
            walletClient,
            bundlerAddress: bundlerAccount.address,
            verifyingSignerAddress: paymasterSignerAccount.address,
            publicClientL1: publicClientL1 as any,
            walletClientL1: walletClientL1 as any,
            bundlerTargetBalance: network.targetRelayerBalance as bigint,
            bundlerMinBalance: network.minRelayerBalance as bigint,
            paymasterTargetBalance: network.targetPaymasterBalance as bigint,
            paymasterMinBalance: network.minPaymasterBalance as bigint,
            utilityTargetBalance: network.targetUtilityBalance as bigint,
            utilityMinBalance: network.minUtilityBalance as bigint,
        });

        console.debug({ bundlerTopup: result.bundlerTopup, paymasterTopup: result.paymasterTopup });
    }

    console.debug("✅ Deployed all networks");
}
