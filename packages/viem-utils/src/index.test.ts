import { describe, beforeEach, test, expect } from "vitest";
import {
    Chain,
    Transport,
    Account,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    parseEther,
    http,
    custom,
} from "viem";
import { localhost } from "viem/chains";
import { transactionQueue } from "@latticexyz/common/actions";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { port } from "./test/constants.js";
import { getLocalAccount } from "./accounts.js";
import { numberToAddress } from "./utils.js";

describe("index.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    let localWalletClient: WalletClient<Transport, Chain, Account>;

    beforeEach(async () => {
        //Does NOT work with ganache
        const httpTransport = http(`http://127.0.0.1:${port}/1`);
        const provider = httpTransport({ chain: localhost, retryCount: 0 });

        //We override the transport to always return nonce = 0
        const txCountBypassRequest = async ({ method, params }: any) => {
            if (method === "eth_getTransactionCount") {
                console.log({ method, params });
                return "0x0";
            }

            return provider.request({ method, params });
        };
        transport = custom({ request: txCountBypassRequest, retryCount: 0, retryDelay: 0 });
        // transport = http("http://127.0.0.1:8545");

        publicClient = createPublicClient({
            chain: localhost,
            transport,
        }) as unknown as PublicClient<Transport, Chain>;

        localWalletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport: httpTransport,
        }) as unknown as WalletClient<Transport, Chain, Account>;
    });

    test.skip("walletClient concurrent transactions - Default Viem", async () => {
        //We use a non-local account for our tests to avoid the node from overriding nonce/signature
        //Initial funding transaction
        const walletClient = createWalletClient({
            account: privateKeyToAccount(generatePrivateKey()),
            chain: localhost,
            transport,
        });
        const fundingHash = await localWalletClient.sendTransaction({
            to: walletClient.account.address,
            value: parseEther("1"),
        });
        await publicClient.waitForTransactionReceipt({ hash: fundingHash });

        //Transaction 1
        const hash1 = await walletClient.sendTransaction({
            to: numberToAddress(1),
            value: 1n,
        });
        //succeeds
        expect(hash1).toBeDefined();

        //Transaction 2
        const hash2Promise = walletClient.sendTransaction({
            to: numberToAddress(2),
            value: 1n,
        });
        //errors with "nonce too low", this is because the transport returns 0 for `getTransactionCount`
        await expect(hash2Promise).rejects.toThrowError("nonce too low");
    });

    test.skip("walletClient concurrent transactions - NonceManager", async () => {
        //We use a non-local account for our tests to avoid the node from overriding nonce/signature
        //Initial funding transaction
        const walletClient = createWalletClient({
            account: privateKeyToAccount(generatePrivateKey()),
            chain: localhost,
            transport,
        }).extend(transactionQueue());
        const fundingHash = await localWalletClient.sendTransaction({
            to: walletClient.account.address,
            value: parseEther("1"),
        });
        await publicClient.waitForTransactionReceipt({ hash: fundingHash });

        //Send Transaction 1
        const hash1 = await walletClient.sendTransaction({
            to: numberToAddress(1),
            value: 1n,
        });
        //succeeds
        expect(hash1).toBeDefined();

        const hash2 = await walletClient.sendTransaction({
            to: numberToAddress(2),
            value: 1n,
        });
        //succeeds, this is because the NonceManager returns the in-memory cached nonce without calling `getTransactionCount`
        expect(hash2).toBeDefined();
    });
});
