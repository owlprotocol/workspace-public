import { describe, beforeEach, test, expect } from "vitest";
import ganache from "ganache";
import {
    Account,
    Chain,
    CustomTransport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
} from "viem";

import { localhost } from "viem/chains";
import { getLocalAccount } from "./accounts.js";
import { numberToAddress } from "./utils.js";
import { DEFAULT_GANACHE_CONFIG } from "./utils.js";

describe("index.test.ts", function () {
    let transport: CustomTransport;
    let publicClient: PublicClient<CustomTransport, Chain>;
    let walletClient: WalletClient<CustomTransport, Chain, Account>;

    beforeEach(async () => {
        const provider = ganache.provider(DEFAULT_GANACHE_CONFIG);
        transport = custom(provider);
        //const transport = http(localhost.rpcUrls.default.http[0]);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });
    });
    //TODO: Consider using walletClient.extend(transactionQueue()) from @latticexyz/common
    //This library seems powerful but there are a few concerns:
    //1. Does this work with any RPC or does it require access to mempool?
    //2. `getNonceManager()` in the library uses an unbound map which could cause memory issues
    //3. How does the library handle failed transactions? Any risk of nonce gaps, especially at scale?
    test("walletClient concurrent transactions", async () => {
        const nonce0 = await publicClient.getTransactionCount({ address: walletClient.account.address });
        expect(nonce0).toBe(0);

        const hash1 = await walletClient.sendTransaction({
            to: numberToAddress(1),
            value: 1n,
        });
        const nonce1 = await publicClient.getTransactionCount({ address: walletClient.account.address });
        //Using instamine, transaction not confirmed yet
        expect(nonce1).toBe(0);

        const hash2 = await walletClient.sendTransaction({
            to: numberToAddress(2),
            value: 1n,
            //Required: otherwise times out and errors
            nonce: 1,
        });
        //Using instamine, previous transaction gets confirmed
        //this is weird behaviour, one would expect both transactions to still be in flight until calling getTransactionReceipt
        //however, its possible this behaviour is necessary because the VM needs to execute the previous tx to compute the current state (and see if transaction2 would succeed)
        const nonce2 = await publicClient.getTransactionCount({ address: walletClient.account.address });
        expect(nonce2).toBe(1);

        expect(hash1).not.toBe(hash2);

        const receipt1 = await publicClient.waitForTransactionReceipt({ hash: hash1 });
        expect(receipt1).toBeDefined();

        const receipt2 = await publicClient.waitForTransactionReceipt({ hash: hash1 });
        expect(receipt2).toBeDefined();
    });
});
