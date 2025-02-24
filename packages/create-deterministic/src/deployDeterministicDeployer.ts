import { Account, Address, Chain, Client, Hash, Transport, formatEther } from "viem";
import { getAction } from "viem/utils";
import { getBalance, getCode, sendRawTransaction, sendTransaction, waitForTransactionReceipt } from "viem/actions";
import { DETERMINISTIC_DEPLOYER_ADDRESS, deployEthCost, deploySignerAddress, deployTransaction } from "./constants.js";

/**
 * Get or deploy DeterministicDeployer
 * @param client Client with chain & account to fund deployer if needed
 * @returns
 */
export async function getOrDeployDeterministicDeployer(client: Client<Transport, Chain, Account>): Promise<{
    address: Address;
    hash: Hash | undefined;
    existed: boolean;
}> {
    //Check if Create2Factory exists
    const existingByteCode = await getAction(client, getCode, "getCode")({ address: DETERMINISTIC_DEPLOYER_ADDRESS });
    if (existingByteCode != undefined) {
        return {
            address: DETERMINISTIC_DEPLOYER_ADDRESS,
            hash: undefined,
            existed: true,
        };
    }

    //Check balance of signer
    const balance = await getAction(client, getBalance, "getBalance")({ address: deploySignerAddress });
    if (balance < deployEthCost) {
        const deficit = deployEthCost - balance;
        console.debug(
            `DeterministicDeployer signer (${deploySignerAddress}) has deficit of ${formatEther(deficit)} ETH`,
        );
        console.debug(`Funding deployer ${deploySignerAddress}...`);
        const hash = await getAction(
            client,
            sendTransaction,
            "sendTransaction",
        )({
            to: deploySignerAddress,
            value: deficit,
            account: client.account,
            chain: client.chain,
        });
        await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash });
    }

    //Send raw pre-signed transaction
    const hash = await getAction(
        client,
        sendRawTransaction,
        "sendRawTransaction",
    )({
        serializedTransaction: deployTransaction,
    });

    return {
        address: DETERMINISTIC_DEPLOYER_ADDRESS,
        hash,
        existed: false,
    };
}
