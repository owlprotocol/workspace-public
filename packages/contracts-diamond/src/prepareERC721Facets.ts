import { getDeployDeterministicAddress, getOrPrepareDeterministicContract } from "@owlprotocol/viem-utils";
import { Chain, Transport, Account, zeroHash, Client, TransactionRequest } from "viem";
import {
    ERC721BaseURIFacet,
    ERC721Facet,
    ERC721MintableAutoIdBaseURIFacetInit,
    ERC721MintableAutoIdFacet,
} from "./artifacts/index.js";

export const erc721Facets = getERC721Facets();

/**
 * Get erc721 facet addresses
 * @returns addresses
 */
export function getERC721Facets() {
    const erc721 = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC721Facet.bytecode,
    });

    const erc721MintableAutoId = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC721MintableAutoIdFacet.bytecode,
    });

    const erc721BaseUri = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC721BaseURIFacet.bytecode,
    });

    const erc721PresetInit = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC721MintableAutoIdBaseURIFacetInit.bytecode,
    });

    return {
        erc721,
        erc721MintableAutoId,
        erc721BaseUri,
        erc721PresetInit,
    };
}

/**
 * Prepare erc721 facet deployment transactions. Useful to do gas estimations before sending transaction
 * @param client with account
 */
export async function prepareERC721Facets(client: Client<Transport, Chain, Account>) {
    const requests: TransactionRequest[] = [];

    const [erc721, erc721MintableAutoId, erc721BaseUri, erc721PresetInit] = await Promise.all([
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: ERC721Facet.bytecode,
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: ERC721MintableAutoIdFacet.bytecode,
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: ERC721BaseURIFacet.bytecode,
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: ERC721MintableAutoIdBaseURIFacetInit.bytecode,
        }),
    ]);

    if (erc721.request) requests.push(erc721.request);
    if (erc721MintableAutoId.request) requests.push(erc721MintableAutoId.request);
    if (erc721BaseUri.request) requests.push(erc721BaseUri.request);
    if (erc721PresetInit.request) requests.push(erc721PresetInit.request);

    return {
        requests,
        erc721,
        erc721MintableAutoId,
        erc721BaseUri,
        erc721PresetInit,
    };
}
