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
