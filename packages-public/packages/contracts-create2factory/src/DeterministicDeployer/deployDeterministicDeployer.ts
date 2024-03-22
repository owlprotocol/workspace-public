import { Address, Hash, formatEther } from "viem";
import { DETERMINISTIC_DEPLOYER_ADDRESS, deployEthCost, deploySignerAddress, deployTransaction } from "./constants.js";
import { Clients } from "../clients.js";

/**
 * Get or deploy DeterministicDeployer
 * @param clients publicClient, walletClient to fund deployer if needed
 * @returns
 */
export async function getOrDeployDeterministicDeployer(clients: Clients): Promise<{
    address: Address;
    hash: Hash | undefined;
    existed: boolean;
}> {
    const { publicClient, walletClient } = clients;
    //Check if Create2Factory exists
    const existingByteCode = await publicClient.getBytecode({ address: DETERMINISTIC_DEPLOYER_ADDRESS });
    if (existingByteCode != undefined) {
        return {
            address: DETERMINISTIC_DEPLOYER_ADDRESS,
            hash: undefined,
            existed: true,
        };
    }

    //Check balance of signer
    const balance = await publicClient.getBalance({ address: deploySignerAddress });
    if (balance < deployEthCost) {
        const deficit = deployEthCost - balance;
        console.debug(
            `DeterministicDeployer signer (${deploySignerAddress}) has deficit of ${formatEther(deficit)} ETH`,
        );
        console.debug(`Funding deployer ${deploySignerAddress}...`);
        await walletClient.sendTransaction({
            to: deploySignerAddress,
            value: deficit,
        });
    }

    //Send raw pre-signed transaction
    const hash = await publicClient.sendRawTransaction({
        serializedTransaction: deployTransaction,
    });

    return {
        address: DETERMINISTIC_DEPLOYER_ADDRESS,
        hash,
        existed: false,
    };
}
