import {
    getOrDeployDeterministicDeployer,
    getOrDeployCreate2Factory,
    getOrDeployDeterministicContract,
} from "@owlprotocol/contracts-create2factory";
import { Account, Chain, PublicClient, Transport, WalletClient, encodeDeployData, zeroHash } from "viem";
import { ENTRYPOINT_ADDRESS_V07, ENTRYPOINT_SALT_V07 } from "./EntryPoint.js";
import { EntryPoint } from "./artifacts/EntryPoint.js";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";

export interface SetupNetworkClients {
    publicClient: PublicClient<Transport, Chain>;
    walletClient: WalletClient<Transport, Chain, Account>;
}
/**
 * Setup network by deploying core contracts required by our infra. We try to only deployed contracts
 * that are required, and prefer to lazy-deploy any other implementations.
 *   - DeterministicDeployer (0x4e59b44847b379578588920cA78FbF26c0B4956C)
 *   - Create2Factory (0x3e81e1efD6E62E0A243CaEC342EBAfbD9257E6fD)
 *   - EntryPointV07  (0x0000000071727De22E5E9d8BAf0edAc6f37da032)
 *   - SimpleAccountFactory (0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985)
 *   - VerifyingPaymaster () //TODO: TBD after research if we should deploy AA stack.
 */
export async function setupNetwork(clients: SetupNetworkClients) {
    const { publicClient, walletClient } = clients;
    //If no DeterminsticDeployer, wait for deploy (mostly used for local testing)
    const deterministicDeployer = await getOrDeployDeterministicDeployer({
        publicClient,
        walletClient,
    });
    if (deterministicDeployer.hash) {
        await publicClient.waitForTransactionReceipt({ hash: deterministicDeployer.hash });
    }

    //If no Create2Factory, wait for deploy (mostly used for local testing)
    const create2Factory = await getOrDeployCreate2Factory({
        publicClient,
        walletClient,
    });
    if (create2Factory.hash) {
        await publicClient.waitForTransactionReceipt({ hash: create2Factory.hash });
    }

    //If no SimpleAccountFactory, wait for deploy (mostly used for local testing)
    const simpleAccountFactory = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: SimpleAccountFactory.abi,
                bytecode: SimpleAccountFactory.bytecode,
                args: [ENTRYPOINT_ADDRESS_V07],
            }),
        },
    );
    if (simpleAccountFactory.hash) {
        await publicClient.waitForTransactionReceipt({ hash: simpleAccountFactory.hash });
    }

    //If no EntryPoint v0.7, wait for deploy (mostly used for local testing)
    const entrypoint = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        //Extracted salt (first 32 bytes) from original tx
        //https://etherscan.io/tx/0x5c81ea86f6c54481d3e21c78675b4f1d985c1fa62b678dcdfdf7934ddd6e127e
        {
            salt: ENTRYPOINT_SALT_V07,
            bytecode: EntryPoint.bytecode,
        },
    );
    if (entrypoint.address != ENTRYPOINT_ADDRESS_V07) {
        throw new Error(
            `Entrypoint v0.7 deployed address ${ENTRYPOINT_ADDRESS_V07} (expected) != ${entrypoint.address} (actual)`,
        );
    }
    if (entrypoint.hash) {
        await publicClient.waitForTransactionReceipt({ hash: entrypoint.hash });
    }
    // console.debug({
    // deterministicDeployer,
    // create2Factory,
    // simpleAccountFactory,
    // entrypoint,
    // });

    return { deterministicDeployer, create2Factory, simpleAccountFactory, entrypoint };
}
