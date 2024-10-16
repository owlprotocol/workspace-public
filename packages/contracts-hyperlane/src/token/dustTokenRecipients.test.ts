import { describe, beforeAll, test, expect } from "vitest";
import {
    Account,
    Chain,
    Transport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    zeroHash,
    Address,
    padHex,
} from "viem";
import { localhost } from "viem/chains";
import {
    getLocalAccount,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
} from "@owlprotocol/viem-utils";
import { dustTokenRecipientsForChain } from "./dustTokenRecipients.js";
import {
    bytecode as MockTokenRouterEventsBytecode,
    receivedTransferRemote,
} from "../artifacts/MockTokenRouterEvents.js";
import { port } from "../test/constants.js";

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("dustTokenRecipients.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, Account>;
    let tokenRouterAddress: Address;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });

        //Deploy DeterministicDeployer
        const { hash: hashDeployer } = await getOrDeployDeterministicDeployer(walletClient);
        if (hashDeployer) {
            await publicClient.waitForTransactionReceipt({ hash: hashDeployer });
        }

        //Deploy Mock Token Router
        const tokenRouter = await getOrDeployDeterministicContract(walletClient, {
            salt: zeroHash,
            bytecode: MockTokenRouterEventsBytecode,
        });
        tokenRouterAddress = tokenRouter.address;
        if (tokenRouter.hash) {
            await publicClient.waitForTransactionReceipt({ hash: tokenRouter.hash });
        }
    });

    test("dust tokens", async () => {
        // Hacky test but works
        const receiverAddress = padHex("0x100", { size: 20 });
        const receiverBytes32 = padHex(receiverAddress, { size: 32 });

        // Watch Remote Transfers
        const stopWatching = dustTokenRecipientsForChain(walletClient, {
            tokens: [{ address: tokenRouterAddress }],
            amount: 1n,
            onTransaction: async ({ hash, to }) => {
                console.debug(`onTransaction ${to} ${hash}`);
                await publicClient.waitForTransactionReceipt({ hash });
                const balance = await publicClient.getBalance({ address: to });
                expect(balance).toBe(1n);
            },
        });

        // Mock receive transfer
        const hash = await walletClient.writeContract({
            address: tokenRouterAddress,
            abi: [receivedTransferRemote],
            functionName: "receivedTransferRemote",
            args: [1, receiverBytes32, 1n],
        });

        await publicClient.waitForTransactionReceipt({ hash });

        //Wait for dust tx confirmation
        await sleep(5000);
        stopWatching();
    });
});
