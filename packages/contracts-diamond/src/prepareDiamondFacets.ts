import { getDeployDeterministicAddress, getOrPrepareDeterministicContract } from "@owlprotocol/viem-utils";
import { Chain, Transport, Account, zeroHash, Client, TransactionRequest } from "viem";
import { DiamondCutFacet, DiamondLoupeFacet, DiamondInit, DiamondInitMulti } from "./artifacts/index.js";

export const diamondFacets = getDiamondFacets();
/**
 * Get diamond facet addresses
 * @returns addresses
 */
export function getDiamondFacets() {
    const diamondCut = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: DiamondCutFacet.bytecode,
    });

    const diamondLoupe = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: DiamondLoupeFacet.bytecode,
    });

    const diamondInit = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: DiamondInit.bytecode,
    });

    const diamondInitMulti = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: DiamondInitMulti.bytecode,
    });

    return {
        diamondCut,
        diamondLoupe,
        diamondInit,
        diamondInitMulti,
    };
}

/**
 * Prepare diamond deployment transactions. Useful to do gas estimations before sending transaction
 * @param client with account
 */
export async function prepareDiamondFacets(client: Client<Transport, Chain, Account>) {
    const requests: TransactionRequest[] = [];

    const [diamondCut, diamondLoupe, diamondInit, diamondInitMulti] = await Promise.all([
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: DiamondCutFacet.bytecode,
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: DiamondLoupeFacet.bytecode,
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: DiamondInit.bytecode,
        }),
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: DiamondInitMulti.bytecode,
        }),
    ]);
    if (diamondCut.request) requests.push(diamondCut.request);
    if (diamondLoupe.request) requests.push(diamondLoupe.request);
    if (diamondInit.request) requests.push(diamondInit.request);
    if (diamondInitMulti.request) requests.push(diamondInitMulti.request);

    return {
        requests,
        diamondCut,
        diamondLoupe,
        diamondInit,
        diamondInitMulti,
    };
}
