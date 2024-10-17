import { Address } from "viem";
import { getAbiFunctionSelectors, getDiamondDeployData } from "./Diamond.js";

import {
    DiamondCutFacet,
    DiamondInit,
    DiamondLoupeFacet,
    ERC721MintableAutoIdBaseURIFacet,
    ERC721MintableAutoIdBaseURIFacetInit,
} from "./artifacts/index.js";
import { diamondFacets } from "./setupDiamondFacets.js";
import { erc721Facets } from "./setupERC721Facets.js";

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
    const facets = [
        {
            facetAddress: diamondFacets.diamondCut,
            functionSelectors: getAbiFunctionSelectors(DiamondCutFacet.abi),
        },
        {
            facetAddress: diamondFacets.diamondLoupe,
            functionSelectors: getAbiFunctionSelectors(DiamondLoupeFacet.abi),
        },
        {
            facetAddress: erc721Facets.erc721Preset,
            functionSelectors: getAbiFunctionSelectors(ERC721MintableAutoIdBaseURIFacet.abi),
        },
    ];
    const initializers = [
        {
            abi: DiamondInit.abi,
            address: diamondFacets.diamondInit,
            functionName: "initialize",
            args: [],
        },
        {
            abi: ERC721MintableAutoIdBaseURIFacetInit.abi,
            address: erc721Facets.erc721PresetInit,
            functionName: "initialize",
            args: [contractUri, name, symbol, baseUri, royaltyReceiver, feeNumerator],
        },
    ];
    const { deployData, diamondCutUpgrades, diamondInitTransaction } = getDiamondDeployData(admin, {
        facets,
        initializers,
    });
    return {
        facets,
        initializers,
        diamondCutUpgrades,
        diamondInitTransaction,
        deployData,
    };
}
