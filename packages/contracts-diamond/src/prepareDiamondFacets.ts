import {
    DETERMINISTIC_DEPLOYER_ADDRESS,
    getDeployDeterministicAddress,
    getOrPrepareDeterministicContract,
} from "@owlprotocol/viem-utils";
import { Chain, Transport, Account, zeroHash, Client, TransactionRequest } from "viem";
import { getCode } from "viem/actions";
import { getAction } from "viem/utils";
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
 * @param client with account and nonceManager
 */
export async function prepareDiamondFacets(client: Client<Transport, Chain, Account>) {
    //DeterminsticDeployer MUST exists
    if (!(await getAction(client, getCode, "getCode")({ address: DETERMINISTIC_DEPLOYER_ADDRESS }))) {
        throw new Error(`DeterministicDeployer MUST be deployed at ${DETERMINISTIC_DEPLOYER_ADDRESS}`);
    }

    const requests: TransactionRequest[] = [];

    const diamondCut = await getOrPrepareDeterministicContract(client, {
        salt: zeroHash,
        bytecode: DiamondCutFacet.bytecode,
    });
    if (diamondCut.request) {
        requests.push(diamondCut.request);
    }

    const diamondLoupe = await getOrPrepareDeterministicContract(client, {
        salt: zeroHash,
        bytecode: DiamondLoupeFacet.bytecode,
    });
    if (diamondLoupe.request) {
        requests.push(diamondLoupe.request);
    }

    const diamondInit = await getOrPrepareDeterministicContract(client, {
        salt: zeroHash,
        bytecode: DiamondInit.bytecode,
    });
    if (diamondInit.request) {
        requests.push(diamondInit.request);
    }

    const diamondInitMulti = await getOrPrepareDeterministicContract(client, {
        salt: zeroHash,
        bytecode: DiamondInitMulti.bytecode,
    });
    if (diamondInitMulti.request) {
        requests.push(diamondInitMulti.request);
    }

    return {
        requests,
        diamondCut,
        diamondLoupe,
        diamondInit,
        diamondInitMulti,
    };
}
