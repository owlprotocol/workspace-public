import { Signer } from "ethers";
import { Deploy as DeployProxy } from "@owlprotocol/contracts-proxy";
export { testNetworkId, testSigner, testNetwork } from "@owlprotocol/utils-ethers";
import { testSigner, testNetwork } from "@owlprotocol/utils-ethers";
import { ImplementationsDeploy } from "./deploy/Implementations.js";

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

    //Deploy Proxy Factory
    await DeployProxy.Create2FactoryDeploy({ signer, network });
    await ImplementationsDeploy({ signer, network });
}
