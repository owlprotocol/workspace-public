import {
    DETERMINISTIC_DEPLOYER_ADDRESS,
    getDeployDeterministicAddress,
    getOrPrepareDeterministicContract,
} from "@owlprotocol/viem-utils";
import { Chain, Transport, Account, zeroHash, Client, TransactionRequest } from "viem";
import { getCode } from "viem/actions";
import { getAction } from "viem/utils";
import { ERC165Facet } from "./artifacts/ERC165Facet.js";
import { AccessControlRecursiveFacet } from "./artifacts/AccessControlRecursiveFacet.js";
import { ContractURIFacet } from "./artifacts/ContractURIFacet.js";
import { ERC2981Facet } from "./artifacts/ERC2981Facet.js";

export const coreContractFacets = getCoreContractFacets();

/**
 * Get core contract facet addresses
 * @returns addresses
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
 * Prepare core contract deployment transactions. Useful to do gas estimations before sending transaction
 * @param client with account
 */
export async function prepareCoreContractFacets(client: Client<Transport, Chain, Account>) {
    //DeterminsticDeployer MUST exists
    if (!(await getAction(client, getCode, "getCode")({ address: DETERMINISTIC_DEPLOYER_ADDRESS }))) {
        throw new Error(`DeterministicDeployer MUST be deployed at ${DETERMINISTIC_DEPLOYER_ADDRESS}`);
    }

    const requests: TransactionRequest[] = [];

    const erc165 = await getOrPrepareDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ERC165Facet.bytecode,
    });
    if (erc165.request) {
        requests.push(erc165.request);
    }

    const accessControlRecursive = await getOrPrepareDeterministicContract(client, {
        salt: zeroHash,
        bytecode: AccessControlRecursiveFacet.bytecode,
    });
    if (accessControlRecursive.request) {
        requests.push(accessControlRecursive.request);
    }

    const contractUri = await getOrPrepareDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ContractURIFacet.bytecode,
    });
    if (contractUri.request) {
        requests.push(contractUri.request);
    }

    const erc2981 = await getOrPrepareDeterministicContract(client, {
        salt: zeroHash,
        bytecode: ERC2981Facet.bytecode,
    });
    if (erc2981.request) {
        requests.push(erc2981.request);
    }

    return {
        requests,
        erc165,
        accessControlRecursive,
        contractUri,
        erc2981,
    };
}
