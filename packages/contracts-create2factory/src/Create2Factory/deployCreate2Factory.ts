import { Account, Chain, Client, Hash, Transport, zeroHash } from "viem";
import { getDeployDeterministicFunctionData, DETERMINISTIC_DEPLOYER_ADDRESS } from "@owlprotocol/viem-utils";
import { getAction } from "viem/utils";
import { getCode, sendTransaction } from "viem/actions";
import { CREATE2_FACTORY_ADDRESS } from "./constants.js";
import { Create2Factory } from "../artifacts/Create2Factory.js";

//Check if already deployed

/**
 * Deploy Create2Factory with DeterministicDeployer
 * Create2Factory can be deployed in 2 ways:
 *   - CREATE2 DeterministicDeployer at 0x4e59b44847b379578588920cA78FbF26c0B4956C (recommended)
 * @param client Client with chain & account to fund deploy transaction (deterministic)
 * @returns
 */
export async function deployCreate2FactoryWithTx(client: Client<Transport, Chain, Account>): Promise<Hash> {
    const { to, data } = getDeployDeterministicFunctionData({ salt: zeroHash, bytecode: Create2Factory.bytecode });
    return getAction(
        client,
        sendTransaction,
        "sendTransaction",
    )({
        to,
        data,
        account: client.account,
        chain: client.chain,
    });
}

/**
 * Higher-level wrapper around `deployCreate2FactoryWithTx`, common use case in hardhat with viem
 * @param client Client with chain & account
 * @returns
 */
export async function getOrDeployCreate2Factory(client: Client<Transport, Chain, Account>) {
    //Check if Create2Factory exists
    const existingByteCode = await getAction(client, getCode, "getCode")({ address: CREATE2_FACTORY_ADDRESS });
    if (existingByteCode != undefined) {
        return {
            address: CREATE2_FACTORY_ADDRESS,
            hash: undefined,
            existed: true,
        };
    }

    //Make sure DeterministicDeployer exists
    if ((await getAction(client, getCode, "getCode")({ address: DETERMINISTIC_DEPLOYER_ADDRESS })) === undefined) {
        throw new Error(
            `DeterministicDeployer not deployed at ${DETERMINISTIC_DEPLOYER_ADDRESS}! Please deploy DeterministicDeployer first or use pre-signed deployment.`,
        );
    }

    const hash = await deployCreate2FactoryWithTx(client);
    return {
        address: CREATE2_FACTORY_ADDRESS,
        hash,
        existed: false,
    };
}
