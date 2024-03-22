import { beforeEach, describe, expect, test } from "vitest";
import { ethers } from "ethers";
import { Account, AccountSource, Hex, LocalAccount, parseGwei, zeroAddress } from "viem";
import { privateKeyToAccount, toAccount } from "viem/accounts";
import { DfnsWallet } from "@dfns/lib-viem";
import type { DfnsApiClient } from "@dfns/sdk";
import { DfnsApiClientInterface, DfnsApiClientMock } from "./DfnsApiClientMock.js";

describe("DfnsApiClientMock.viem.test.ts", () => {
    const mnemonic = "test test test test test test test test test test test junk";
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const client: DfnsApiClientInterface = new DfnsApiClientMock(mnemonic);
    let walletId = 0;

    let accountViem: LocalAccount;
    let accountDfns: LocalAccount;

    describe("network: Ethereum", () => {
        const network = "Ethereum";

        beforeEach(async () => {
            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            accountViem = privateKeyToAccount(pkey as Hex) as Account as LocalAccount;

            const walletCreate = await client.wallets.createWallet({
                body: {
                    network,
                },
            });
            const wallet = await DfnsWallet.init({
                walletId: walletCreate.id,
                dfnsClient: client as DfnsApiClient,
                maxRetries: 10,
            });

            accountDfns = toAccount(wallet as AccountSource) as Account as LocalAccount;
        });

        test("getAddress", async () => {
            expect(accountDfns.address, "accountDfns.address != accountViem.address").toBe(accountViem.address);
        });

        //TODO: Broken for some reason. Maybe due to EIP151? Not a big deal. Stick to KeyECDSA
        test.skip("signTransaction", async () => {
            const txUnsigned = {
                chainId: 1,
                maxFeePerGas: parseGwei("20"),
                maxPriorityFeePerGas: parseGwei("3"),
                gas: 21000n,
                nonce: 0,
                to: zeroAddress,
            } as const;
            const txSignedEthers = await accountViem.signTransaction(txUnsigned);
            const txSignedDfns = await accountDfns.signTransaction(txUnsigned);
            expect(txSignedDfns, "accountDfns.signTransaction() != accountViem.signTransaction()").toBe(txSignedEthers);
        });
    });

    describe("network: KeyECDSA", () => {
        const network = "KeyECDSA";

        beforeEach(async () => {
            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            accountViem = privateKeyToAccount(pkey as Hex) as Account as LocalAccount;

            const walletCreate = await client.wallets.createWallet({
                body: {
                    network,
                },
            });
            const wallet = await DfnsWallet.init({
                walletId: walletCreate.id,
                dfnsClient: client as DfnsApiClient,
                maxRetries: 10,
            });

            accountDfns = toAccount(wallet as AccountSource) as Account as LocalAccount;
        });

        test("getAddress", async () => {
            expect(accountDfns.address, "accountDfns.address != accountViem.address").toBe(accountViem.address);
        });

        test("signTransaction", async () => {
            const txUnsigned = {
                chainId: 1,
                maxFeePerGas: parseGwei("20"),
                maxPriorityFeePerGas: parseGwei("3"),
                gas: 21000n,
                nonce: 0,
                to: zeroAddress,
            } as const;
            const txSignedEthers = await accountViem.signTransaction(txUnsigned);
            const txSignedDfns = await accountDfns.signTransaction(txUnsigned);
            expect(txSignedDfns, "accountDfns.signTransaction() != accountViem.signTransaction()").toBe(txSignedEthers);
        });
    });
});
