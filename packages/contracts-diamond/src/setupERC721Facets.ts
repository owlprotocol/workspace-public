import {
    DETERMINISTIC_DEPLOYER_ADDRESS,
    getDeployDeterministicAddress,
    getOrDeployDeterministicContract,
} from "@owlprotocol/viem-utils";
import { Chain, Transport, Account, zeroHash, Client, Hash } from "viem";
import { getCode } from "viem/actions";
import { getAction } from "viem/utils";
import {
    ERC721BaseURIFacet,
    ERC721Facet,
    ERC721MintableAutoIdBaseURIFacetInit,
    ERC721MintableAutoIdFacet,
} from "./artifacts/index.js";

export const erc721Facets = getERC721Facets();

/**
 * Get ERC721 contracts
 * @returns
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
 * Deploy ERC721 Facets
 * - ERC721Preset
 * - ERC721PresetInit
 * @param client
 */
export async function setupERC721Facets(client: Client<Transport, Chain, Account>) {
    //DeterminsticDeployer MUST exists
    if (!(await getAction(client, getCode, "getCode")({ address: DETERMINISTIC_DEPLOYER_ADDRESS }))) {
        throw new Error(`DeterministicDeployer MUST be deployed at ${DETERMINISTIC_DEPLOYER_ADDRESS}`);
    }

    const transactions: Hash[] = [];

    const erc721 = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ERC721Facet.bytecode,
    });
    if (erc721.hash) {
        transactions.push(erc721.hash);
    }

    const erc721MintableAutoId = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ERC721MintableAutoIdFacet.bytecode,
    });
    if (erc721MintableAutoId.hash) {
        transactions.push(erc721MintableAutoId.hash);
    }

    const erc721BaseUri = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ERC721BaseURIFacet.bytecode,
    });
    if (erc721BaseUri.hash) {
        transactions.push(erc721BaseUri.hash);
    }

    const erc721PresetInit = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ERC721MintableAutoIdBaseURIFacetInit.bytecode,
    });
    if (erc721PresetInit.hash) {
        transactions.push(erc721PresetInit.hash);
    }

    return {
        transactions,
        erc721,
        erc721MintableAutoId,
        erc721BaseUri,
        erc721PresetInit,
    };
}
