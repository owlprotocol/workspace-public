import { getChainWithData, GetChainWithDataOptions, getChainByChainId } from "@owlprotocol/chains";
import * as envvars from "./envvars.js";

export function getChainWithDataByChainId(chainId: number) {
    const RPC = `NETWORK_${chainId}_RPC`;
    const WS = `NETWORK_${chainId}_WS`;
    const EXPLORER = `NETWORK_${chainId}_EXPLORER`;
    const EXPLORER_API = `NETWORK_${chainId}_EXPLORER_API`;
    const EXPLORER_API_KEY = `NETWORK_${chainId}_EXPLORER_API_KEY`;

    //1. read from envvars first (to include defaults)
    //2. read directly from process.env (as networkId might not have been included in package)
    const options: GetChainWithDataOptions = {
        THIRDWEB_API_KEY: envvars.THIRDWEB_API_KEY,
        INFURA_API_KEY: envvars.INFURA_API_KEY,
        ANKR_API_KEY: envvars.ANKR_API_KEY,
        rpc: envvars[RPC as keyof typeof envvars] ?? process.env[RPC],
        ws: envvars[WS as keyof typeof envvars] ?? process.env[WS],
        explorer: envvars[EXPLORER as keyof typeof envvars] ?? process.env[EXPLORER],
        explorerApi: envvars[EXPLORER_API as keyof typeof envvars] ?? process.env[EXPLORER_API],
        explorerApiKey: envvars[EXPLORER_API_KEY as keyof typeof envvars] ?? process.env[EXPLORER_API_KEY],
    };
    return getChainWithData(getChainByChainId(chainId), options);
}
