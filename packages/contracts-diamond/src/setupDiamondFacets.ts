import {
    DETERMINISTIC_DEPLOYER_ADDRESS,
    getDeployDeterministicAddress,
    getOrDeployDeterministicContract,
} from "@owlprotocol/viem-utils";
import { Chain, Transport, Account, zeroHash, Client, Hash } from "viem";
import { getCode } from "viem/actions";
import { getAction } from "viem/utils";
import { DiamondCutFacet, DiamondLoupeFacet, DiamondInit, DiamondInitMulti } from "./artifacts/index.js";

export const diamondFacets = getDiamondFacets();
/**
 * Get Diamond facets
 * - DiamondCutFacet
 * - DiamondLoupeFacet
 * - DiamondInit
 * - DiamondInitMulti
 * @returns
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
 * Deploy Diamond contract facets
 * - DiamondCutFacet
 * - DiamondLoupeFacet
 * - DiamondInit
 * - DiamondInitMulti
 * @param client
 */
export async function setupDiamondFacets(client: Client<Transport, Chain, Account>) {
    //DeterminsticDeployer MUST exists
    if (!(await getAction(client, getCode, "getCode")({ address: DETERMINISTIC_DEPLOYER_ADDRESS }))) {
        throw new Error(`DeterministicDeployer MUST be deployed at ${DETERMINISTIC_DEPLOYER_ADDRESS}`);
    }

    const transactions: Hash[] = [];

    const diamondCut = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: DiamondCutFacet.bytecode,
    });
    if (diamondCut.hash) {
        transactions.push(diamondCut.hash);
    }

    const diamondLoupe = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: DiamondLoupeFacet.bytecode,
    });
    if (diamondLoupe.hash) {
        transactions.push(diamondLoupe.hash);
    }

    const diamondInit = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: DiamondInit.bytecode,
    });
    if (diamondInit.hash) {
        transactions.push(diamondInit.hash);
    }

    const diamondInitMulti = await getOrDeployDeterministicContract(client, {
        salt: zeroHash,
        bytecode: DiamondInitMulti.bytecode,
    });
    if (diamondInitMulti.hash) {
        transactions.push(diamondInitMulti.hash);
    }

    return {
        transactions,
        diamondCut,
        diamondLoupe,
        diamondInit,
        diamondInitMulti,
    };
}
