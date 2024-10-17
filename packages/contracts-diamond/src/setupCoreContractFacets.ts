import {
    DETERMINISTIC_DEPLOYER_ADDRESS,
    getDeployDeterministicAddress,
    getOrDeployDeterministicContract,
} from "@owlprotocol/viem-utils";
import { Chain, Transport, Account, zeroHash, Client, Hash } from "viem";
import { getCode } from "viem/actions";
import { getAction } from "viem/utils";
import { ERC165Facet } from "./artifacts/ERC165Facet.js";
import { AccessControlRecursiveFacet } from "./artifacts/AccessControlRecursiveFacet.js";
import { ContractURIFacet } from "./artifacts/ContractURIFacet.js";
import { ERC2981Facet } from "./artifacts/ERC2981Facet.js";

export const coreContractFacets = getCoreContractFacets();

/**
 * Get core contract facets
 * @returns
 */
export function getCoreContractFacets() {
    const erc165 = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC165Facet.bytecode,
    });

    const accessControlRecursive = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: AccessControlRecursiveFacet.bytecode,
    });

    const contractUri = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ContractURIFacet.bytecode,
    });

    const erc2981 = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: ERC2981Facet.bytecode,
    });

    return {
        erc165,
        accessControlRecursive,
        contractUri,
        erc2981,
    };
}

/**
 * Deploy ERC721 Facets
 * - ERC165
 * - ERC721PresetInit
 * @param client
 */
export async function setupCoreContractFacets(client: Client<Transport, Chain, Account>) {
    //DeterminsticDeployer MUST exists
    if (!(await getAction(client, getCode, "getCode")({ address: DETERMINISTIC_DEPLOYER_ADDRESS }))) {
        throw new Error(`DeterministicDeployer MUST be deployed at ${DETERMINISTIC_DEPLOYER_ADDRESS}`);
    }

    const transactions: Hash[] = [];

    const erc165 = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ERC165Facet.bytecode,
    });
    if (erc165.hash) {
        transactions.push(erc165.hash);
    }

    const accessControlRecursive = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: AccessControlRecursiveFacet.bytecode,
    });
    if (accessControlRecursive.hash) {
        transactions.push(accessControlRecursive.hash);
    }

    const contractUri = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ContractURIFacet.bytecode,
    });
    if (contractUri.hash) {
        transactions.push(contractUri.hash);
    }

    const erc2981 = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ERC2981Facet.bytecode,
    });
    if (erc2981.hash) {
        transactions.push(erc2981.hash);
    }

    return {
        transactions,
        erc165,
        accessControlRecursive,
        contractUri,
        erc2981,
    };
}
