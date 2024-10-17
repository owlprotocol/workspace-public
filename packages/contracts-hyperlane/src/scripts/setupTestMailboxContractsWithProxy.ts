import { createPublicClient, createWalletClient, http } from "viem";

import { localhost } from "viem/chains";
import { getLocalAccount } from "@owlprotocol/viem-utils";
import { setupTestMailboxContracts } from "../test/mailboxTestHelpers.js";

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
    } catch (error) {
        console.error("Error setting up contracts:", error);
    }
}

main();
