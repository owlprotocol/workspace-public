import { ethers, providers, Signer } from "ethers";
import { ANVIL_RPC, PRIVATE_KEY_0 } from "@owlprotocol/envvars";
import { getChainByChainId, getChainWithData } from "@owlprotocol/chains";

const testProvider = new providers.JsonRpcProvider(ANVIL_RPC);

export function getProvider(networkId: string): providers.JsonRpcProvider {
    if (networkId == "1337") {
        return testProvider;
    }

    const chain = getChainWithData(getChainByChainId(parseInt(networkId)));
    const provider = new providers.JsonRpcProvider(chain.wsDefault ?? chain.rpcDefault);
    return provider;
}

export function getSigner(networkId: string): Signer {
    if (networkId == "1337") {
        return testProvider.getSigner();
    }

    const provider = getProvider(networkId);
    if (!PRIVATE_KEY_0) {
        throw new Error("missing PRIVATE_KEY_0");
    }
    const signer = new ethers.Wallet(PRIVATE_KEY_0, provider);
    return signer;
}
