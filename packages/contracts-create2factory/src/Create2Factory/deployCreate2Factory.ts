import { Hash, zeroHash } from "viem";
import { getDeployDeterministicFunctionData, DETERMINISTIC_DEPLOYER_ADDRESS } from "@owlprotocol/viem-utils";
import { CREATE2_FACTORY_ADDRESS } from "./constants.js";
import { Create2Factory } from "../artifacts/Create2Factory.js";
import { Clients } from "../clients.js";

//Check if already deployed

/**
 * Deploy Create2Factory with DeterministicDeployer
 * Create2Factory can be deployed in 2 ways:
 *   - CREATE2 DeterministicDeployer at 0x4e59b44847b379578588920cA78FbF26c0B4956C (recommended)
 * @param clients publicClient, walletClient to fund deploy transaction (deterministic)
 * @returns
 */
export async function deployCreate2FactoryWithTx(clients: Omit<Clients, "publicClient">): Promise<Hash> {
    const { walletClient } = clients;
    const { to, data } = getDeployDeterministicFunctionData({ salt: zeroHash, bytecode: Create2Factory.bytecode });
    return walletClient.sendTransaction({
        to,
        data,
    });
}

/**
 * Higher-level wrapper around `deployCreate2FactoryWithTx`, common use case in hardhat with viem
 * @param clients publicClient, walletClient
 * @returns
 */
export async function getOrDeployCreate2Factory(clients: Clients) {
    const { publicClient } = clients;
    //Check if Create2Factory exists
    const existingByteCode = await publicClient.getBytecode({ address: CREATE2_FACTORY_ADDRESS });
    if (existingByteCode != undefined) {
        return {
            address: CREATE2_FACTORY_ADDRESS,
            hash: undefined,
            existed: true,
        };
    }

    //Make sure DeterministicDeployer exists
    if ((await publicClient.getBytecode({ address: DETERMINISTIC_DEPLOYER_ADDRESS })) === undefined) {
        throw new Error(
            `DeterministicDeployer not deployed at ${DETERMINISTIC_DEPLOYER_ADDRESS}! Please deploy DeterministicDeployer first or use pre-signed deployment.`,
        );
    }

    const hash = await deployCreate2FactoryWithTx(clients);
    return {
        address: CREATE2_FACTORY_ADDRESS,
        hash,
        existed: false,
    };
}
