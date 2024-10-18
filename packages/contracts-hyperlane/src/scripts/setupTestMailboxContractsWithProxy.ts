import { createPublicClient, createWalletClient, encodeDeployData, http, zeroHash } from "viem";

import { localhost } from "viem/chains";
import { getLocalAccount, getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { setupTestMailboxContracts } from "../test/mailboxTestHelpers.js";
import { ERC20Test } from "../artifacts/ERC20Test.js";

// TODO: must run two chains locally to test this script
// run: anvil -p 8546 --chain-id 1338

const localMainChain = localhost;
const localRemoteChain = {
    ...localhost,
    id: 1338,
    rpcUrls: { default: { http: ["http://127.0.0.1:8546"] } },
};

const clientsOrigin = {
    publicClient: createPublicClient({
        chain: localMainChain,
        transport: http(localMainChain.rpcUrls.default.http[0]),
    }),
    walletClient: createWalletClient({
        account: getLocalAccount(0),
        chain: localMainChain,
        transport: http(localMainChain.rpcUrls.default.http[0]),
    }),
};

const clientsRemote = {
    publicClient: createPublicClient({
        chain: localRemoteChain,
        transport: http(localRemoteChain.rpcUrls.default.http[0]),
    }),
    walletClient: createWalletClient({
        account: getLocalAccount(0),
        chain: localRemoteChain,
        transport: http(localRemoteChain.rpcUrls.default.http[0]),
    }),
};

async function main() {
    try {
        console.log("Setting up contracts on Origin chain...");
        const contractsOrigin = await setupTestMailboxContracts(clientsOrigin.walletClient);
        console.log("Contracts deployed on Origin:", contractsOrigin);

        console.log("Setting up contracts on Remote chain...");
        const contractsRemote = await setupTestMailboxContracts(clientsRemote.walletClient);
        console.log("Contracts deployed on Remote:", contractsRemote);

        const testToken = { name: "Test Token", totalSupply: 0n, symbol: "TT", decimals: 18 };
        const tokenContract = await getOrDeployDeterministicContract(clientsOrigin.walletClient, {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: ERC20Test.abi,
                bytecode: ERC20Test.bytecode,
                args: [testToken.name, testToken.symbol, testToken.totalSupply, testToken.decimals],
            }),
        });

        if (tokenContract.hash) {
            await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: tokenContract.hash });
        }

        console.log("Test Token on Origin: ", tokenContract.address);
    } catch (error) {
        console.error("Error setting up contracts:", error);
    }
}

main().then(() => console.log("Done"));
