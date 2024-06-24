import { PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import { Address, Hash, Hex, formatEther, zeroHash } from "viem";
import { getDeployDeterministicFunctionData, DETERMINISTIC_DEPLOYER_ADDRESS } from "@owlprotocol/viem-utils";
import {
    CREATE2_FACTORY_PRESIGN_ETH_COST,
    CREATE2_FACTORY_ADDRESS_PRESIGN,
    CREATE2_FACTORY_ADDRESS,
} from "./constants.js";
import { Create2Factory } from "../artifacts/Create2Factory.js";
import { Clients } from "../clients.js";

//Check if already deployed

/**
 * Deploy Create2Factory with DeterministicDeployer or pre-signed transaction
 * Create2Factory can be deployed in 2 ways:
 *   - CREATE2 DeterministicDeployer at 0x4e59b44847b379578588920cA78FbF26c0B4956C (recommended)
 *   - A pre-signed transction from a deployer with nonce 0. This is used as a fallback if network enforces EIP155
 *     at a protocol level. Shoud be avoided when possible. It's important to note that often some blockchain nodes
 *     enforce EIP155 at rpc level but this can be disabled with a flag (as protocol itself does not enforce this).
 * @param deterministicOrPresignTx determinsitic deploy or pre-signed transaction
 * @param clients publicClient, walletClient to fund deploy transaction (deterministic) or the `CREATE2FACTORY_DEPLOYER` (presign)
 * @returns
 */
export async function deployCreate2FactoryWithTx(
    clients: Clients,
    deterministicOrPresignTx: "deterministic" | Hex,
): Promise<Hash> {
    const { walletClient, publicClient } = clients;
    if (deterministicOrPresignTx === "deterministic") {
        const { to, data } = getDeployDeterministicFunctionData({ salt: zeroHash, bytecode: Create2Factory.bytecode });
        return walletClient.sendTransaction({
            to,
            data,
        });
    } else {
        const create2FactoryDeployerAddress = PUBLIC_ADDRESS_CREATE2FACTORY_DEPLOYER as Address;
        const nonce = await publicClient.getTransactionCount({
            address: create2FactoryDeployerAddress,
        });
        if (nonce != 0) {
            throw new Error(
                `Create2Factory not deployed at ${CREATE2_FACTORY_ADDRESS_PRESIGN} and signerAddress ${create2FactoryDeployerAddress}.nonce = ${nonce} > 0`,
            );
        }

        const balance = await publicClient.getBalance({ address: create2FactoryDeployerAddress });
        if (balance < CREATE2_FACTORY_PRESIGN_ETH_COST) {
            //fund address
            const deficit = CREATE2_FACTORY_PRESIGN_ETH_COST - balance;
            console.debug(
                `Create2Factory deployer (${create2FactoryDeployerAddress}) has deficit of ${formatEther(deficit)} ETH`,
            );
            if (!walletClient) {
                throw new Error(`walletClient undefined! Need a wallet to fund deployer`);
            } else {
                console.debug(`Funding deployer ${create2FactoryDeployerAddress}...`);
            }

            const hash = await walletClient.sendTransaction({
                to: create2FactoryDeployerAddress,
                value: deficit,
            });
            await publicClient.waitForTransactionReceipt({
                hash,
            });
        }

        //Stored deployment tx
        const hash = await publicClient.sendRawTransaction({
            serializedTransaction: deterministicOrPresignTx as `0x${string}`,
        });

        return hash;
    }
}

/**
 * Higher-level wrapper around `deployCreate2FactoryWithTx`, common use case in hardhat with viem
 * @param publicClient viem public client
 * @param clients publicClient, walletClient
 * @returns
 */
export async function getOrDeployCreate2Factory(clients: Clients, deterministic = true) {
    const { publicClient } = clients;
    if (deterministic) {
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

        const hash = await deployCreate2FactoryWithTx(clients, "deterministic");
        return {
            address: CREATE2_FACTORY_ADDRESS,
            hash,
            existed: false,
        };
    } else {
        //TODO: Support this if needed?
        // Majority of networks seem to support deployment of DeterministicDeploer
        throw new Error("Deprecated. Deploy with Deterministic Deployer.");
        //Check if Create2Factory exists
        // const existingByteCode = await publicClient.getBytecode({ address: CREATE2_FACTORY_ADDRESS_PRESIGN });
        // if (existingByteCode != undefined) {
        // return {
        // address: CREATE2_FACTORY_ADDRESS_PRESIGN,
        // hash: undefined,
        // existed: true,
        // };
        // }
        //
        // const chainId = await walletClient.getChainId();
        // const chainIdTx: Hex | undefined = Create2FactoryTx[`tx${chainId}` as keyof typeof Create2FactoryTx];
        // if (!chainIdTx) {
        // throw new Error(`Create2Factory deploy transaction not found for chainId ${chainId}`);
        // }
        //
        // const hash = await deployCreate2FactoryWithTx(clients, chainIdTx);
        // return {
        // address: CREATE2_FACTORY_ADDRESS_PRESIGN,
        // hash,
        // existed: false,
        // };
    }
}
