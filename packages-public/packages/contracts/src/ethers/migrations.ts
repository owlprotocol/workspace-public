import { Signer } from "ethers";
import { deployImplementationsAndBeacons, deployCreate2Factory } from "@owlprotocol/contracts-proxy";
import * as Create2Factories from "../factories/index.js";
import { pick, flatten } from "../lodash.js";

/**
 * Migrations define a batch of contracts that are deployed.
 * We MUST split this into chunks to avoid hitting the block gas limit as it can get quite large if deploying
 * many contracts and beacons.
 */

//Split into 3 migrations due to gas limit
export const migration0 = pick(
    Create2Factories,
    "ERC20Mintable__factory__create2",
    "ERC721Mintable__factory__create2",
    "ERC721MintableAutoId__factory__create2",
);
export const migration1 = pick(
    Create2Factories,
    "ERC1820Registry__factory__create2",
    "ERC1155Mintable__factory__create2",
    "ERC2981Setter__factory__create2",
);
export const migration2 = pick(Create2Factories, "ChainlinkAnyApiClient__factory__create2");

export const migration3 = pick(
    Create2Factories,
    "TokenDna__factory__create2",
    "TokenURI__factory__create2",
    "TokenURIBaseURI__factory__create2",
    "TokenURIDna__factory__create2",
);
export const migration4 = pick(
    Create2Factories,
    "SafeL2__factory__create2",
    "SafeProxyFactory__factory__create2",
    "MultiSend__factory__create2",
    "MultiSendCallOnly__factory__create2",
    "CompatibilityFallbackHandler__factory__create2",
    "SignMessageLib__factory__create2",
    "CreateCall__factory__create2",
);

export async function deployContractsMigrations(signer: Signer, networkName: string) {
    const provider = signer.provider;
    if (!provider) throw new Error("signer.provider undefined");

    const response0 = await deployImplementationsAndBeacons(signer, networkName, migration0 as any);
    const response1 = await deployImplementationsAndBeacons(signer, networkName, migration1 as any);
    const response2 = await deployImplementationsAndBeacons(signer, networkName, migration2 as any);
    const response3 = await deployImplementationsAndBeacons(signer, networkName, migration3 as any);
    const response4 = await deployImplementationsAndBeacons(signer, networkName, migration4 as any);
    const responses = [response0, response1, response2, response3, response4];

    return {
        contracts: flatten(responses.map((r) => r.contracts)),
        tx: responses.map((r) => r.tx),
        txResponse: responses.map((r) => r.txResponse),
    };
}

export async function deployContractsAll(signer: Signer, networkName: string, networkChainId: number) {
    const create2Factory = await deployCreate2Factory(signer, networkName, networkChainId);
    const migrations = await deployContractsMigrations(signer, networkName);

    return {
        create2Factory,
        migrations,
    };
}
