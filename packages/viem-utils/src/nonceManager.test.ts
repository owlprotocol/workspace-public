import { describe, test, expect, beforeAll } from "vitest";
import {
    Account,
    Chain,
    Transport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    nonceManager,
    zeroAddress,
} from "viem";
import { localhost } from "viem/chains";
import { port } from "./test/constants.js";
import { getLocalAccount } from "./accounts.js";

describe("nonceManager.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        }) as unknown as PublicClient<Transport, Chain>;

        walletClient = createWalletClient({
            account: getLocalAccount(0, { nonceManager }),
            chain: localhost,
            transport,
        }) as unknown as WalletClient<Transport, Chain, Account>;
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
