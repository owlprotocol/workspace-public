import { Signer, ethers } from "ethers";
import { Deploy as DeployProxy } from "@owlprotocol/contracts-proxy";
import { BaseProvider } from "@ethersproject/providers";
import { PRIVATE_KEY_0_LOCAL } from "@owlprotocol/envvars";
import { ImplementationsDeploy } from "./deploy/common/Implementations.js";

export const testChainId = 31337;
export const testSigner = new ethers.Wallet(PRIVATE_KEY_0_LOCAL);
export const testNetwork = {
    name: "localhost",
    config: { chainId: testChainId, accounts: [testSigner._signingKey().privateKey] },
};

export async function getGanacheProvider(chainId: number = testChainId) {
    const ganache = await import("ganache");
    const ganacheProvider = ganache.provider({
        logging: {
            quiet: true,
        },
        chain: {
            chainId,
        },
        wallet: {
            mnemonic: "test test test test test test test test test test test junk",
        },
    }) as any;
    const provider = new ethers.providers.Web3Provider(ganacheProvider);

    return provider;
}

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

    //Fund address
    await DeployProxy.BalancesDeploy({ provider, network });
    //Deploy Proxy Factory
    await DeployProxy.ProxyFactoryDeploy({ provider, network });
    await ImplementationsDeploy({ provider, signer, network });
}
