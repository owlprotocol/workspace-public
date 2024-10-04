import { Clients, getDeployContractsParams, getDeployFunctionData } from "@owlprotocol/contracts-create2factory";
import { Address, Hex, zeroAddress, zeroHash } from "viem";
import { getAbiFunctionSelectors, getDiamondDeployData } from "./Diamond.js";

import {
    DiamondCutFacet,
    DiamondInit,
    DiamondInitMulti,
    DiamondLoupeFacet,
    ERC721MintableAutoIdBaseURIFacet,
    ERC721MintableAutoIdBaseURIFacetInit,
} from "./artifacts/index.js";

export const ERC721PresetDiamondSpec = {
    facets: {
        DiamondCutFacet,
        DiamondLoupeFacet,
        ERC721MintableAutoIdBaseURIFacet,
    },
    initializers: {
        DiamondInit,
        DiamondInitMulti,
        ERC721MintableAutoIdBaseURIFacetInit,
    },
} as const;

export interface DiamondInitParams {
    admin: Address;
}

export interface ERC721DiamondInitParams {
    contractUri: string;
    name: string;
    symbol: string;
    baseUri: string;
    royaltyReceiver: Address;
    feeNumerator: bigint;
}
export function getERC721DiamondDeployData(initParams: ERC721DiamondInitParams & DiamondInitParams) {
    const { admin, contractUri, name, symbol, baseUri, royaltyReceiver, feeNumerator } = initParams;
    const facets = Object.values(ERC721PresetDiamondSpec.facets).map((f) => {
        return {
            facetAddress: f.implementation,
            functionSelectors: getAbiFunctionSelectors(f.abi),
        };
    });
    const initializers = [
        {
            abi: DiamondInit.abi,
            address: DiamondInit.implementation,
            functionName: "initialize",
            args: [],
        },
        {
            abi: ERC721MintableAutoIdBaseURIFacetInit.abi,
            address: ERC721MintableAutoIdBaseURIFacetInit.implementation,
            functionName: "initialize",
            args: [contractUri, name, symbol, baseUri, royaltyReceiver, feeNumerator],
        },
    ];
    const { deployData, diamondCutUpgrades, diamondInitData } = getDiamondDeployData(admin, { facets, initializers });
    return {
        facets,
        initializers,
        diamondCutUpgrades,
        diamondInitData,
        deployData,
    };
}

export async function getERC721ImplementationDeployParams(clients: Pick<Clients, "publicClient">) {
    const artifacts = [
        ...Object.values(ERC721PresetDiamondSpec.facets),
        ...Object.values(ERC721PresetDiamondSpec.initializers),
    ];
    //If implementation not deployed, we add it to  `Create2Factory.deployDeterministic` call
    // - Diamond (core)
    // - Diamond facets (selector-specific implementations)
    // - Diamond inits (delegate call post-cut)
    // `getDeployContractsParams` returns only contracts required for deployment
    const deployParams = await getDeployContractsParams(
        clients,
        zeroAddress,
        Object.values(artifacts).map((a) => {
            return { salt: zeroHash, bytecode: a.bytecode, initData: "0x" };
        }),
    );

    // If deployed addressesNew.length > 0, we compute the call data, otherwise undefined
    let deployTransaction: { to: Address; data: Hex } | undefined;
    if (deployParams.addressesNew.length > 0) {
        deployTransaction = getDeployFunctionData(zeroAddress, deployParams.contractsNew);
    }

    return {
        deployParams: deployParams.contractsNew,
        deployTransaction,
        addresses: deployParams.addressesAll,
        addressesNew: deployParams.addressesNew,
    };
}
