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
    ERC721MintableAutoIdBaseURIFacet,
    ERC721MintableAutoIdBaseURIFacetInit,
    ERC721MintableAutoIdFacet,
} from "./artifacts/index.js";

export const erc721Facets = getERC721Facets();

/**
 * Get ERC721 contracts
 * @returns
 */
export function getERC721Facets() {
    const erc721MintableAutoId = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC721MintableAutoIdFacet.bytecode,
    });
    const erc721BaseUri = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC721BaseURIFacet.bytecode,
    });

    const erc721Preset = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC721MintableAutoIdBaseURIFacet.bytecode,
    });

    const erc721PresetInit = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC721MintableAutoIdBaseURIFacetInit.bytecode,
    });

    return {
        erc721MintableAutoId,
        erc721BaseUri,
        erc721Preset,
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

    //TODO: Add same contracts

    const erc721Preset = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ERC721MintableAutoIdBaseURIFacet.bytecode,
    });
    if (erc721Preset.hash) {
        transactions.push(erc721Preset.hash);
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
        erc721Preset,
        erc721PresetInit,
    };
}
