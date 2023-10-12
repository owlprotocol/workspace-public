import { GetChainWithDataOptions, allChains, getChainWithData } from "@owlprotocol/chains";
import * as envvars from "@owlprotocol/envvars";
import { networksPrivateCRUD, networksReadOnlyCRUD } from "../admin/crud.js";
import { NetworkReadOnly } from "../models/index.js";

export const enabledNetworksDefault = [1337, 80001, 59140] as number[];
export const ranksByNetworkDefault = {
    1337: 0,
    80001: 1,
    59140: 2,
} as Record<number, number>;

export function uploadNetworks(enabledNetworks = enabledNetworksDefault, ranksByNetwork = ranksByNetworkDefault) {
    const networksReadOnly: NetworkReadOnly[] = allChains.map((c) => {
        const chainId = c.chainId;
        return {
            ...getChainWithData(c),
            enabled: enabledNetworks.includes(chainId),
            rank: ranksByNetwork[chainId] ?? 9999,
            id: `${chainId}`,
        };
    });

    const networksPrivate: NetworkReadOnly[] = allChains.map((c) => {
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
