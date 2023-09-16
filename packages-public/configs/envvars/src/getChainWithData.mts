import { getChainWithData, GetChainWithDataOptions, getChainByChainId } from "@owlprotocol/chains";
import * as envvars from "./envvars.mjs";

export function getChainWithDataByChainId(chainId: number) {
    const options: GetChainWithDataOptions = {
        THIRDWEB_API_KEY: envvars.THIRDWEB_API_KEY,
        INFURA_API_KEY: envvars.INFURA_API_KEY,
        ANKR_API_KEY: envvars.ANKR_API_KEY,
        rpc: envvars[`NETWORK_${chainId}_RPC` as keyof typeof envvars],
        ws: envvars[`NETWORK_${chainId}_WS` as keyof typeof envvars],
        explorer: envvars[`NETWORK_${chainId}_EXPLORER` as keyof typeof envvars],
        explorerApi: envvars[`NETWORK_${chainId}_EXPLORER_API` as keyof typeof envvars],
        explorerApiKey: envvars[`NETWORK_${chainId}_EXPLORER_API_KEY` as keyof typeof envvars],
    };
    return getChainWithData(getChainByChainId(chainId), options);
}
