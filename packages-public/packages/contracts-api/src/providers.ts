import { providers } from "ethers";
import { ANVIL_RPC } from "@owlprotocol/envvars";

let providersMap = new Map<string, providers.JsonRpcProvider>();
let networksSet = new Set<string>();

const testProvider = new providers.JsonRpcProvider(ANVIL_RPC);

export async function setupProviders() {
    // Check if networksSet has already been generated
    if (networksSet.size > 0) return;

    networksSet.add("1");
    providersMap.set("1", testProvider);
}

export function getProvider(networkId: string): providers.JsonRpcProvider {
    // TODO: pick from providersMap
    let provider = providersMap.get(networkId);

    // TODO: replace when done
    provider = testProvider;
    return provider;
}
