import { GetChainWithDataOptions, allChains, getChainByChainId, getChainWithData } from "@owlprotocol/chains";
import * as envvars from "@owlprotocol/envvars";
import { Create2FactoryTx } from "@owlprotocol/contracts-proxy";
import {
    networkCreate2FactoryTransactionsCRUD,
    networksPrivateCRUD,
    networksReadOnlyCRUD,
} from "../admin/crudWrappers.js";
import { NetworkCreate2FactoryTransaction, NetworkPrivate, NetworkReadOnly } from "../models/index.js";

export const enabledNetworksDefault = [1337, 80001, 59140] as number[];
export const ranksByNetworkDefault = {
    1337: 0,
    80001: 1,
    59140: 2,
} as Record<number, number>;

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
        const options: GetChainWithDataOptions = {
            THIRDWEB_API_KEY: envvars.THIRDWEB_API_KEY,
            INFURA_API_KEY: envvars.INFURA_API_KEY,
            ANKR_API_KEY: envvars.ANKR_API_KEY,
            rpc: envvars[`NETWORK_${chainId}_RPC` as keyof typeof envvars] as string | undefined,
            ws: envvars[`NETWORK_${chainId}_WS` as keyof typeof envvars] as string | undefined,
            explorer: envvars[`NETWORK_${chainId}_EXPLORER` as keyof typeof envvars] as string | undefined,
            explorerApi: envvars[`NETWORK_${chainId}_EXPLORER_API` as keyof typeof envvars] as string | undefined,
            explorerApiKey: envvars[`NETWORK_${chainId}_EXPLORER_API_KEY` as keyof typeof envvars] as
                | string
                | undefined,
        };

        return {
            ...getChainWithData(c, options),
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
