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
} from "viem";
import { localhost } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { port } from "./test/constants.js";
import { getLocalAccount } from "./accounts.js";
import { topupAddress } from "./topupAddress.js";

describe("topupAddress.test.ts", function () {
    const chain = {
        ...localhost,
        rpcUrls: {
            default: {
                http: [`http://127.0.0.1:${port}`],
            },
        },
    };
    const transport = http(chain.rpcUrls.default.http[0]);
    const publicClient = createPublicClient({
        chain,
        transport,
    });

    const walletClient = createWalletClient({
        account: getLocalAccount(0, { nonceManager }),
        chain,
        transport,
    }) as unknown as WalletClient<Transport, Chain, Account>;

    let account: Account;

    beforeEach(() => {
        account = privateKeyToAccount(generatePrivateKey());
    });

    test("topupAddress - balance < minBalance", async () => {
        const hash = await walletClient.sendTransaction({
            to: account.address,
            value: 50n,
        });
        await publicClient.waitForTransactionReceipt({ hash });

        const topup = await topupAddress(walletClient, {
            address: account.address,
            minBalance: 100n,
            targetBalance: 200n,
        });

        expect(topup.balance).toBe(50n);
        expect(topup.hash).toBeDefined();

        await publicClient.waitForTransactionReceipt({ hash: topup.hash! });

        expect(await publicClient.getBalance({ address: account.address })).toBe(200n);
    });

    test("topupAddress - balance > minBalance", async () => {
        const hash = await walletClient.sendTransaction({
            to: account.address,
            value: 150n,
        });
        await publicClient.waitForTransactionReceipt({ hash });

        const topup = await topupAddress(walletClient, {
            address: account.address,
            minBalance: 100n,
            targetBalance: 200n,
        });

        expect(topup.balance).toBe(150n);
        expect(topup.hash).toBeUndefined();
        expect(await publicClient.getBalance({ address: account.address })).toBe(150n);
    });

    // Optional params
    test("topupAddress - targetBalance", async () => {
        const topup = await topupAddress(walletClient, { address: account.address, targetBalance: 1n });

        expect(topup.balance).toBe(0n);
        expect(topup.hash).toBeDefined();

        await publicClient.waitForTransactionReceipt({ hash: topup.hash! });

        expect(await publicClient.getBalance({ address: account.address })).toBe(1n);
    });

    test("topupAddress - minBalance", async () => {
        const topup = await topupAddress(walletClient, { address: account.address, minBalance: 1n });

        expect(topup.balance).toBe(0n);
        expect(topup.hash).toBeDefined();

        await publicClient.waitForTransactionReceipt({ hash: topup.hash! });

        expect(await publicClient.getBalance({ address: account.address })).toBe(1n);
    });
});
