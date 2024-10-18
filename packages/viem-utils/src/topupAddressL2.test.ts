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
import { topupAddressL2 } from "./topupAddressL2.js";

//TODO: Figure out way to get Optimism working. None of these work!
// Optimism `make devnet-up` breaks
// https://docs.optimism.io/chain/testing/dev-node
// https://github.com/ethereum-optimism/optimism/issues/11428

// Kurtosis breaks with `git clone` issue (event when logged in)
// https://github.com/ethpandaops/optimism-package
// https://github.com/kurtosis-tech/kurtosis/issues/2150

describe.skip("topupAddressL2.test.ts", function () {
    const chainL1 = {
        ...localhost,
        rpcUrls: {
            default: {
                http: [`http://127.0.0.1:${port}`],
            },
        },
    };
    const chainL2 = {
        ...localhost,
        rpcUrls: {
            default: {
                http: [`http://127.0.0.1:${port}`],
            },
        },
    };

    const transportL1 = http(chainL1.rpcUrls.default.http[0]);
    const transportL2 = http(chainL2.rpcUrls.default.http[0]);

    const publicClientL1 = createPublicClient({
        chain: chainL1,
        transport: transportL1,
    });

    const publicClientL2 = createPublicClient({
        chain: chainL2,
        transport: transportL2,
    });

    const walletClientL1 = createWalletClient({
        account: getLocalAccount(0, { nonceManager }),
        chain: chainL1,
        transport: transportL1,
    }) as unknown as WalletClient<Transport, Chain, Account>;

    const walletClientL2 = createWalletClient({
        account: getLocalAccount(0, { nonceManager }),
        chain: chainL2,
        transport: transportL2,
    }) as unknown as WalletClient<Transport, Chain, Account>;

    let account: Account;

    beforeEach(() => {
        account = privateKeyToAccount(generatePrivateKey());
    });

    test("topupAddress - balance < minBalance", async () => {
        const hash = await walletClientL2.sendTransaction({
            to: account.address,
            value: 50n,
        });
        await publicClientL2.waitForTransactionReceipt({ hash });

        const topup = await topupAddressL2({
            clientL1: walletClientL1,
            clientL2: publicClientL2,
            address: account.address,
            minBalance: 100n,
            targetBalance: 200n,
        });

        expect(topup.balance).toBe(50n);
        expect(topup.l1DepositHash).toBeDefined();
        expect(topup.l2DepositHash).toBeDefined();

        await publicClientL1.waitForTransactionReceipt({ hash: topup.l1DepositHash! });
        await publicClientL2.waitForTransactionReceipt({ hash: topup.l2DepositHash! });

        expect(await publicClientL2.getBalance({ address: account.address })).toBe(200n);
    });

    test("topupAddress - balance > minBalance", async () => {
        const hash = await walletClientL2.sendTransaction({
            to: account.address,
            value: 150n,
        });
        await publicClientL2.waitForTransactionReceipt({ hash });

        const topup = await topupAddressL2({
            clientL1: walletClientL1,
            clientL2: publicClientL2,
            address: account.address,
            minBalance: 100n,
            targetBalance: 200n,
        });

        expect(topup.balance).toBe(150n);
        expect(topup.l1DepositHash).toBeUndefined();
        expect(topup.l2DepositHash).toBeUndefined();
        expect(await publicClientL2.getBalance({ address: account.address })).toBe(150n);
    });
});
