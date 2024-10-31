import { getUtilityAccount, getPaymasterSignerAccount } from "@owlprotocol/viem-utils";
import { createWalletClient, http, Chain, nonceManager } from "viem";
import { sepolia } from "@owlprotocol/chains";
import { setupChainContracts } from "../setupChainContracts.js";

export async function main() {
    // needs nonceManager or else it will throw an error
    const utilityAccount = getUtilityAccount({ nonceManager });

    const paymasterSignerAccount = getPaymasterSignerAccount();

    const network = sepolia;

    // API URL and key for verification
    const apiUrl = network.blockExplorers?.default?.apiUrl;
    if (!apiUrl) throw new Error("Missing block explorer API URL");
    const apiKey = "xxx";

    const chain = { id: network.chainId, ...network } as Chain;

    const walletClient = createWalletClient({
        transport: http(chain.rpcUrls.default.http[0]),
        chain,
        account: utilityAccount,
    });

    console.debug(`🛠️ Running setup and verification for ${network.name}`);

    await setupChainContracts(
        walletClient,
        {
            verifyingSignerAddress: paymasterSignerAccount.address,
        },
        apiUrl,
        apiKey,
    );
}

main().catch((error) => {
    console.error("Error in setupChainContracts:", error);
});
