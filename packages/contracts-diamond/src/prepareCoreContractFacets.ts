import { getDeployDeterministicAddress, getOrPrepareDeterministicContract } from "@owlprotocol/viem-utils";
import { Chain, Transport, Account, zeroHash, Client, TransactionRequest } from "viem";
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
    const requests: TransactionRequest[] = [];

    const [erc165, accessControlRecursive, contractUri, erc2981] = await Promise.all([
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: ERC165Facet.bytecode,
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: AccessControlRecursiveFacet.bytecode,
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: ContractURIFacet.bytecode,
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: ERC2981Facet.bytecode,
        }),
    ]);
    if (erc165.request) requests.push(erc165.request);
    if (accessControlRecursive.request) requests.push(accessControlRecursive.request);
    if (contractUri.request) requests.push(contractUri.request);
    if (erc2981.request) requests.push(erc2981.request);

    return {
        requests,
        erc165,
        accessControlRecursive,
        contractUri,
        erc2981,
    };
}
