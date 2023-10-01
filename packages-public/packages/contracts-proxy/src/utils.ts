import type { Provider } from "@ethersproject/providers";
import type { Signer } from "ethers";
import log from "loglevel";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

export interface RunTimeEnvironment {
    readonly provider: Provider;
    readonly network: {
        readonly name: string;
        readonly config: { readonly chainId: number; readonly eip1559?: boolean };
    };
    readonly signer: Signer;
}

export interface HRE {
    readonly ethers: HardhatRuntimeEnvironment["ethers"];
    readonly network: {
        readonly name: string;
        readonly config: { readonly chainId: number; readonly eip1559: boolean };
    };
    readonly deployments: HardhatRuntimeEnvironment["deployments"];
}

export function logDeployment(
    networkName: string,
    contractName: string,
    address: string,
    deploymentType: "nicks" | "deterministic" | "implementation" | "proxy" | "beacon" | "beacon-proxy" | "example",
    status: "exists" | "deployed" | "failed" | "deploying",
) {
    const msg = `${networkName.padEnd(20)}\t${contractName.padEnd(30)}\t${deploymentType.padEnd(20)}\t${status.padEnd(
        10,
    )}\t${address}`;
    console.debug(msg);
    if (process.env.LOG_LEVEL != "info") {
        log.log(msg);
    }
}

interface Props {
    chainId: number;
    name: string;
    tokenId?: number;
}
export const getContractURIs = ({ chainId, name, tokenId }: Props) => ({
    contractUri: `http://localhost:3020/${chainId}/${name}/metadata`,
    tokenUri: `http://localhost:3020/${chainId}/${name}/metadata/${tokenId}`,
});
