import { Network } from "../models/index.js";
import { networkPrivateResource, networkResource } from "../admin/resources.js";
import {
    localhost,
    berachainTestnet,
    flareCoston,
    gelatoBlackberry,
    gelatoBlueberry,
    gelatoRaspberry,
    hedwig,
} from "../data/networks.js";

/**
 * Upload chain configurations to firebase
 * @param chains
 * @param enabledNetworks
 * @param ranksByNetwork
 * @returns
 */
export function uploadNetworks(networks: Network[]) {
    const networksPublic: Network[] = networks.map((n) => {
        return {
            ...n,
            //Use public rpc
            rpcDefault: n.rpcUrls.public?.http[0] ?? n.rpcUrls.default.http[0],
            rpcUrls: { default: n.rpcUrls.public ?? n.rpcUrls.default },
        };
    });

    return Promise.all([networkResource.setBatch(networksPublic), networkPrivateResource.setBatch(networks)]);
}

/**
 * Upload localhost chain config to firebase
 * @returns
 */
export function uploadLocalNetwork() {
    return uploadNetworks([localhost]);
}

export async function main() {
    await uploadNetworks([hedwig, gelatoRaspberry, gelatoBlueberry, gelatoBlackberry, flareCoston, berachainTestnet]);
}

// main();
