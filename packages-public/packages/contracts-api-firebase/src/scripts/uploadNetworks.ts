import { allChains, getChainByChainId, getChainWithData } from "@owlprotocol/chains";
import { getChainWithDataByChainId, isDevelopment } from "@owlprotocol/envvars";
import { Create2FactoryTx } from "@owlprotocol/contracts-proxy";
import {
    networkCreate2FactoryTransactionsCRUD,
    networksPrivateCRUD,
    networksReadOnlyCRUD,
} from "../admin/crudWrappers.js";
import { NetworkCreate2FactoryTransaction, NetworkPrivate, NetworkReadOnly } from "../models/index.js";

export const enabledNetworksDefault = [137, 80001, 59140, 168587773];
export const ranksByNetworkDefault: Record<number, number> = {
    137: 1,
    80001: 2,
    59140: 3,
    168587773: 4,
};

if (isDevelopment()) {
    enabledNetworksDefault.push(1337);
    ranksByNetworkDefault[1337] = 0;
}

export function uploadCreate2FactoryTransactions(chains = allChains.map((c) => c.chainId)) {
    const create2FactoryTransactions: NetworkCreate2FactoryTransaction[] = chains.map((chainId) => {
        const create2FactoryDeployTx = Create2FactoryTx[`tx${chainId}` as keyof typeof Create2FactoryTx];
        return { id: `${chainId}`, tx: create2FactoryDeployTx };
    });

    return networkCreate2FactoryTransactionsCRUD._setBatch(create2FactoryTransactions);
}

/**
 * Upload localhost Create2Factory transaction
 * @returns
 */
export function uploadLocalCreate2FactoryTransaction() {
    return uploadCreate2FactoryTransactions([1337]);
}

/**
 * Upload chain configurations to firebase
 * @param chains
 * @param enabledNetworks
 * @param ranksByNetwork
 * @returns
 */
export function uploadNetworks(
    chains = allChains,
    enabledNetworks = enabledNetworksDefault,
    ranksByNetwork = ranksByNetworkDefault,
) {
    const networksReadOnly: NetworkReadOnly[] = chains.map((c) => {
        const chainId = c.chainId;

        return {
            ...getChainWithData(c),
            enabled: enabledNetworks.includes(chainId),
            rank: ranksByNetwork[chainId] ?? 9999,
            id: `${chainId}`,
            default: false,
        };
    });

    const networksPrivate: NetworkPrivate[] = chains.map((c) => {
        const chainId = c.chainId;
        return {
            ...getChainWithDataByChainId(chainId),
            enabled: enabledNetworks.includes(chainId),
            rank: ranksByNetwork[chainId] ?? 9999,
            id: `${chainId}`,
        };
    });

    return Promise.all([
        networksReadOnlyCRUD._setBatch(networksReadOnly),
        networksPrivateCRUD._setBatch(networksPrivate),
    ]);
}

/**
 * Upload localhost chain config to firebase
 * @returns
 */
export function uploadLocalNetwork() {
    return uploadNetworks([getChainByChainId(1337)]);
}
