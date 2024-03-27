import { beforeEach, describe, expect, test } from "vitest";
import { Account, AccountSource, Hex, LocalAccount, hexToSignature, parseGwei, zeroAddress, zeroHash } from "viem";
import { generatePrivateKey, mnemonicToAccount, sign, toAccount } from "viem/accounts";
import { DfnsWallet } from "@dfns/lib-viem";
import type { DfnsApiClient } from "@dfns/sdk";
import { DfnsApiClientInterface, DfnsApiClientMock } from "./DfnsApiClientMock.js";
import { WalletsClientMock } from "./WalletsClientMock.js";

describe("DfnsApiClientMock.viem.test.ts", () => {
    const mnemonic = "test test test test test test test test test test test junk";
    const client: DfnsApiClientInterface = new DfnsApiClientMock(mnemonic);
    let walletId = 0;

    let accountViem: LocalAccount;
    let accountDfns: LocalAccount;

    describe("network: Ethereum", () => {
        const network = "Ethereum";

        beforeEach(async () => {
            accountViem = mnemonicToAccount(mnemonic, { accountIndex: walletId++ }) as unknown as LocalAccount;

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

        test("signMessage - utf8", async () => {
            const message = "hello world";
            const msgSignedViem = await accountViem.signMessage({ message });
            const msgSignedDfns = await accountDfns.signMessage({ message });
            expect(msgSignedDfns, "accountDfns.signMessage() != accountViem.signMessage()").toBe(msgSignedViem);
        });

        test("signMessage - raw", async () => {
            const message = { raw: "0xFF" as Hex };
            const msgSignedViem = await accountViem.signMessage({ message });
            const msgSignedDfns = await accountDfns.signMessage({ message });
            expect(msgSignedDfns, "accountDfns.signMessage() != accountViem.signMessage()").toBe(msgSignedViem);
        });
    });

    describe("network: KeyECDSA", () => {
        const network = "KeyECDSA";

        beforeEach(async () => {
            accountViem = mnemonicToAccount(mnemonic, { accountIndex: walletId++ }) as unknown as LocalAccount;

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
                nonce: 65535,
                maxFeePerGas: parseGwei("52428"),
                maxPriorityFeePerGas: parseGwei("48059"),
                gas: 43690n,
                to: zeroAddress,
            } as const;
            const txSignedViem = await accountViem.signTransaction(txUnsigned);
            const txSignedViemComponents = hexToSignature(txSignedViem);
            const txSignedDfns = await accountDfns.signTransaction(txUnsigned);
            const txSignedDfnsComponents = hexToSignature(txSignedDfns);

            expect(txSignedDfnsComponents.r).toBe(txSignedViemComponents.r);
            expect(txSignedDfnsComponents.s).toBe(txSignedViemComponents.s);
            expect(txSignedDfnsComponents.yParity).toBe(txSignedViemComponents.yParity);
            expect(txSignedDfnsComponents.v).toBe(txSignedViemComponents.v);
            expect(txSignedDfns, "accountDfns.signTransaction() != accountViem.signTransaction()").toBe(txSignedViem);
        });

        test("signMessage - utf8", async () => {
            const message = "hello world";
            const msgSignedViem = await accountViem.signMessage({ message });
            const msgSignedDfns = await accountDfns.signMessage({ message });
            expect(msgSignedDfns, "accountDfns.signMessage() != accountViem.signMessage()").toBe(msgSignedViem);
        });

        test("signMessage - raw", async () => {
            const message = { raw: "0xFF" as Hex };
            const msgSignedViem = await accountViem.signMessage({ message });
            const msgSignedDfns = await accountDfns.signMessage({ message });
            expect(msgSignedDfns, "accountDfns.signMessage() != accountViem.signMessage()").toBe(msgSignedViem);
        });

        test("signHash", async () => {
            const privateKey = generatePrivateKey();
            const signatureViem = await sign({ privateKey, hash: zeroHash });

            const wallet = (client.wallets as WalletsClientMock).addWallet(
                {
                    id: "test-hash",
                    network: "KeyECDSA",
                },
                privateKey,
            );
            const responseDfns = await client.wallets.generateSignature({
                walletId: wallet.id,
                body: {
                    kind: "Hash",
                    hash: zeroHash,
                },
            });
            const signatureDfns = responseDfns.signature!;
            expect(signatureDfns.r).toBe(signatureViem?.r);
            expect(signatureDfns.s).toBe(signatureViem?.s);
            expect(signatureDfns?.recid ? 28n : 27n).toBe(signatureViem?.v);
        });
    });
});
