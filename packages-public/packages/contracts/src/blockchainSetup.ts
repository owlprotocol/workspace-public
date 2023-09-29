import { Signer } from "ethers";
import { Deploy as DeployProxy } from "@owlprotocol/contracts-proxy";
import { BaseProvider } from "@ethersproject/providers";
import { ImplementationsDeploy } from "./deploy/common/Implementations.js";
export { testNetworkId, testSigner, testNetwork } from "@owlprotocol/utils-ethers";
import { testSigner, testNetwork } from "@owlprotocol/utils-ethers";

export interface DeployNetwork {
    name: string;
    config: {
        chainId: number;
        accounts: string[];
    };
}
/**
 * Runs before each test
 */
export async function contractsSetup(signer: Signer = testSigner, network: DeployNetwork = testNetwork) {
    if (!signer.provider) throw new Error("signer.provider === undefined");
    const provider = signer.provider as BaseProvider;

    //Deploy Proxy Factory
    await DeployProxy.ProxyFactoryDeploy({ provider, network });
    await ImplementationsDeploy({ provider, signer, network });
}
