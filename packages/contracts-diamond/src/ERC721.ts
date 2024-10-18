import { Address } from "viem";
import { getAbiFunctionSelectors, getDiamondDeployData } from "./Diamond.js";

import {
    AccessControlRecursiveFacet,
    ContractURIFacet,
    DiamondCutFacet,
    DiamondInit,
    DiamondLoupeFacet,
    ERC165Facet,
    ERC2981Facet,
    ERC721BaseURIFacet,
    ERC721Facet,
    ERC721MintableAutoIdBaseURIFacetInit,
    ERC721MintableAutoIdFacet,
} from "./artifacts/index.js";
import { diamondFacets } from "./prepareDiamondFacets.js";
import { erc721Facets } from "./prepareERC721Facets.js";
import { coreContractFacets } from "./prepareCoreContractFacets.js";

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
            facetAddress: coreContractFacets.erc165,
            functionSelectors: getAbiFunctionSelectors(ERC165Facet.abi),
        },
        {
            facetAddress: coreContractFacets.accessControlRecursive,
            functionSelectors: getAbiFunctionSelectors(AccessControlRecursiveFacet.abi),
        },
        {
            facetAddress: coreContractFacets.contractUri,
            functionSelectors: getAbiFunctionSelectors(ContractURIFacet.abi),
        },
        {
            facetAddress: coreContractFacets.erc2981,
            functionSelectors: getAbiFunctionSelectors(ERC2981Facet.abi),
        },
        {
            facetAddress: erc721Facets.erc721,
            functionSelectors: getAbiFunctionSelectors(ERC721Facet.abi),
        },
        {
            facetAddress: erc721Facets.erc721MintableAutoId,
            functionSelectors: getAbiFunctionSelectors(ERC721MintableAutoIdFacet.abi),
        },
        {
            facetAddress: erc721Facets.erc721BaseUri,
            functionSelectors: getAbiFunctionSelectors(ERC721BaseURIFacet.abi),
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
