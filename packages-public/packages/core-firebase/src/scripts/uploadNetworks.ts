import { localhost, hedwigTestnet, opBedrockL1, opBedrockL2 } from "@owlprotocol/chains/chains";
import * as chains from "@owlprotocol/chains/chains";

import { NODE_ENV, isProductionOrStaging } from "@owlprotocol/envvars";
import { Network } from "../models/index.js";
import { networkPrivateResource, networkResource } from "../admin/resources.js";

/**
 * Upload chain configurations to firebase
 * @param networks networks array
 * @returns
 */
export function uploadNetworks(networks: Network[]) {
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
            rpcDefault: chain.rpcUrls.default.http[0],
            rpcUrls,
        };
    });

    const networksPrivate: Network[] = networks.map((chain) => {
        //Include all rpc configs, set default as private rpc
        const rpcUrls: Network["rpcUrls"] = {
            ...chain.rpcUrls,
            default: chain.rpcUrls.private ?? chain.rpcUrls.default,
        };

        return {
            ...chain,
            //Use public rpc
            rpcDefault: chain.rpcUrls.default.http[0],
            rpcUrls,
        };
    });

    return Promise.all([networkResource.setBatch(networksPublic), networkPrivateResource.setBatch(networksPrivate)]);
}

/**
 * Upload all chain configurations to firebase
 * @returns
 */
export function uploadAllNetworks() {
    return uploadNetworks(Object.values(chains));
}

/**
 * Upload local development chain configurations to firebase
 * @returns
 */
export function uploadLocalNetworks() {
    return uploadNetworks([localhost, opBedrockL1, opBedrockL2, hedwigTestnet]);
}

export async function main() {
    if (!isProductionOrStaging()) {
        console.debug(`NODE_ENV (${NODE_ENV}) Uploading local development networks`);
        //Upload local dev networks
        await uploadLocalNetworks();
    } else {
        console.debug(`NODE_ENV (${NODE_ENV}) Uploading all networks`);
        //Upload all networks
        await uploadAllNetworks();
    }
}

uploadAllNetworks();
