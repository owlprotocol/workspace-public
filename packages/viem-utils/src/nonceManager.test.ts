import { describe, test, expect, beforeEach } from "vitest";
import {
    Account,
    Chain,
    Transport,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    nonceManager,
    zeroAddress,
    parseEther,
} from "viem";
import { localhost } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { port } from "./test/constants.js";
import { getLocalAccount } from "./accounts.js";

describe("nonceManager.test.ts", function () {
    const transport = http(`http://127.0.0.1:${port}`);
    const chain = localhost;
    const publicClient = createPublicClient({
        chain,
        transport,
    });

    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeEach(async () => {
        const account = privateKeyToAccount(generatePrivateKey(), { nonceManager });
        walletClient = createWalletClient({
            account,
            chain,
            transport,
        });

        const localWalletClient = createWalletClient({
            account: getLocalAccount(0),
            chain,
            transport,
        }) as unknown as WalletClient<Transport, Chain, Account>;

        const hash = await localWalletClient.sendTransaction({ to: account.address, value: parseEther("10") });
        await publicClient.waitForTransactionReceipt({ hash });
    });

    //https://viem.sh/docs/accounts/local/createNonceManager#integration-with-local-accounts
    // Fails because `eth_estimateGas` rejected for invalid nonce
    test("sendTransaction", async () => {
        /*
        const transactions = await Promise.all([
            walletClient.sendTransaction({
                to: zeroAddress,
                data: "0x1234",
            }),
            walletClient.sendTransaction({
                to: zeroAddress,
                data: "0x5678",
            }),
        ]);
        const receipts = await Promise.all(
            transactions.map((hash) => publicClient.waitForTransactionReceipt({ hash })),
        );
        expect(receipts.length).toBe(2);
        */
    });

    test("prepareTransaction - skip nonce", async () => {
        // Prepare transaction should skip nonce
        const requests = await Promise.all([
            walletClient.prepareTransactionRequest({
                to: zeroAddress,
                data: "0x1234",
                account: walletClient.account,
                parameters: ["blobVersionedHashes", "chainId", "fees", "gas", "type"],
            }),
            walletClient.prepareTransactionRequest({
                to: zeroAddress,
                data: "0x5678",
                account: walletClient.account,
                parameters: ["blobVersionedHashes", "chainId", "fees", "gas", "type"],
            }),
        ]);
        expect(requests[0].nonce).toBe(undefined);
        expect(requests[1].nonce).toBe(undefined);
        expect(requests[0].gas).toBeDefined();
        expect(requests[1].gas).toBeDefined();

        const transactions = await Promise.all(requests.map((request) => walletClient.sendTransaction(request)));
        const receipts = await Promise.all(
            transactions.map((hash) => publicClient.waitForTransactionReceipt({ hash })),
        );
        expect(receipts.length).toBe(2);
    });
});
