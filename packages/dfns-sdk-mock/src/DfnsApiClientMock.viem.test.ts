import { beforeEach, describe, expect, test } from "vitest";
import { Account, AccountSource, Hex, LocalAccount, hexToSignature, parseGwei, zeroAddress, zeroHash } from "viem";
import { generatePrivateKey, mnemonicToAccount, sign, toAccount } from "viem/accounts";
import { DfnsWallet } from "@dfns/lib-viem";
import { DfnsApiClient } from "@dfns/sdk";
import {
    DFNS_API_URL,
    DFNS_APP_ID,
    DFNS_APP_ORIGIN,
    DFNS_CRED_ID,
    DFNS_PRIVATE_KEY,
    DFNS_AUTH_TOKEN,
} from "@owlprotocol/envvars";
import { AsymmetricKeySigner } from "@dfns/sdk-keysigner";
import { DfnsApiClientInterface, DfnsApiClientMock } from "./DfnsApiClientMock.js";
import { WalletsClientMock } from "./WalletsClientMock.js";

describe("DfnsApiClientMock.viem.test.ts", () => {
    //Local accounts
    const mnemonic = "test test test test test test test test test test test junk";
    //Mock DFNS
    const mockClient: DfnsApiClientInterface = new DfnsApiClientMock(mnemonic);

    let walletId = 0;

    let accountViem: LocalAccount;
    let accountDfnsMock: LocalAccount;

    describe("network: Ethereum", () => {
        const network = "Ethereum";

        beforeEach(async () => {
            accountViem = mnemonicToAccount(mnemonic, { accountIndex: walletId++ }) as unknown as LocalAccount;

            const walletCreate = await mockClient.wallets.createWallet({
                body: {
                    network,
                },
            });
            const wallet = await DfnsWallet.init({
                walletId: walletCreate.id,
                dfnsClient: mockClient as DfnsApiClient,
                maxRetries: 10,
            });

            accountDfnsMock = toAccount(wallet as AccountSource) as Account as LocalAccount;
        });

        test.skip("getAddress", async () => {
            expect(accountDfnsMock.address, "accountDfns.address != accountViem.address").toBe(accountViem.address);
        });

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
            const txSignedDfns = await accountDfnsMock.signTransaction(txUnsigned);
            expect(txSignedDfns, "accountDfns.signTransaction() != accountViem.signTransaction()").toBe(txSignedEthers);
        });

        test.skip("signMessage - utf8", async () => {
            const message = "hello world";
            const msgSignedViem = await accountViem.signMessage({ message });
            const msgSignedDfns = await accountDfnsMock.signMessage({ message });
            expect(msgSignedDfns, "accountDfns.signMessage() != accountViem.signMessage()").toBe(msgSignedViem);
        });

        test.skip("signMessage - raw", async () => {
            const message = { raw: "0xFF" as Hex };
            const msgSignedViem = await accountViem.signMessage({ message });
            const msgSignedDfns = await accountDfnsMock.signMessage({ message });
            expect(msgSignedDfns, "accountDfns.signMessage() != accountViem.signMessage()").toBe(msgSignedViem);
        });
    });

    describe("network: KeyECDSA", () => {
        const network = "KeyECDSA";

        beforeEach(async () => {
            accountViem = mnemonicToAccount(mnemonic, { accountIndex: walletId++ }) as unknown as LocalAccount;

            const walletCreate = await mockClient.wallets.createWallet({
                body: {
                    network,
                },
            });
            const wallet = await DfnsWallet.init({
                walletId: walletCreate.id,
                dfnsClient: mockClient as DfnsApiClient,
                maxRetries: 10,
            });

            accountDfnsMock = toAccount(wallet as AccountSource) as Account as LocalAccount;
        });

        test("getAddress", async () => {
            expect(accountDfnsMock.address, "accountDfns.address != accountViem.address").toBe(accountViem.address);
        });

        test.skip("signTransaction", async () => {
            const txUnsigned = {
                chainId: 1,
                nonce: 65535,
                maxFeePerGas: parseGwei("52428"),
                maxPriorityFeePerGas: parseGwei("48059"),
                gas: 43690n,
                to: zeroAddress,
            } as const;
            //TODO: Breaks since viem 2.21 upgrade `hexToSignature` Invalid yParityOrV (or was it always invalid?)
            const txSignedViem = await accountViem.signTransaction(txUnsigned);
            const txSignedViemComponents = hexToSignature(txSignedViem);
            const txSignedDfns = await accountDfnsMock.signTransaction(txUnsigned);
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
            const msgSignedDfns = await accountDfnsMock.signMessage({ message });
            expect(msgSignedDfns, "accountDfns.signMessage() != accountViem.signMessage()").toBe(msgSignedViem);
        });

        test("signMessage - raw", async () => {
            const message = { raw: "0xFF" as Hex };
            const msgSignedViem = await accountViem.signMessage({ message });
            const msgSignedDfns = await accountDfnsMock.signMessage({ message });
            expect(msgSignedDfns, "accountDfns.signMessage() != accountViem.signMessage()").toBe(msgSignedViem);
        });

        test("signHash", async () => {
            const privateKey = generatePrivateKey();
            const signatureViem = await sign({ privateKey, hash: zeroHash });

            const wallet = (mockClient.wallets as WalletsClientMock).addWallet(
                {
                    id: "test-hash",
                    network: "KeyECDSA",
                },
                privateKey,
            );
            const responseDfns = await mockClient.wallets.generateSignature({
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

    describe("dfns boundToEvmNetwork", () => {
        beforeEach(async () => {
            accountViem = mnemonicToAccount(mnemonic, { accountIndex: walletId++ }) as unknown as LocalAccount;

            const walletCreate = await mockClient.wallets.createWallet({
                body: {
                    network: "KeyECDSA",
                },
            });
            const wallet = await DfnsWallet.init({
                walletId: walletCreate.id,
                dfnsClient: mockClient as DfnsApiClient,
                maxRetries: 10,
            });

            accountDfnsMock = toAccount(wallet as AccountSource) as Account as LocalAccount;
        });

        test.skip("dfns KeyECDSA", async () => {
            //Real DFNS
            if (!DFNS_PRIVATE_KEY) throw new Error(`DFNS_PRIVATE_KEY ${DFNS_PRIVATE_KEY}`);
            if (!DFNS_CRED_ID) throw new Error(`DFNS_CRED_ID ${DFNS_CRED_ID}`);
            if (!DFNS_APP_ORIGIN) throw new Error(`DFNS_APP_ORIGIN ${DFNS_APP_ORIGIN}`);
            if (!DFNS_APP_ID) throw new Error(`DFNS_APP_ID ${DFNS_APP_ID}`);

            const dfnsSigner = new AsymmetricKeySigner({
                privateKey: DFNS_PRIVATE_KEY,
                credId: DFNS_CRED_ID,
                appOrigin: DFNS_APP_ORIGIN,
            });

            const dfnsClient = new DfnsApiClient({
                appId: DFNS_APP_ID,
                authToken: DFNS_AUTH_TOKEN,
                baseUrl: DFNS_API_URL,
                signer: dfnsSigner,
            });

            const walletId = "wa-5mmp7-aduh0-984b86ntorl4fegr";
            const account = await DfnsWallet.init({
                walletId,
                dfnsClient: dfnsClient as DfnsApiClient,
                maxRetries: 10,
            });

            const message = { raw: "0xFF" as Hex };
            const msgSignedViem = await accountViem.signMessage({ message });
            const msgSignedDfns = await accountDfnsMock.signMessage({ message });
            const msgSignedAccount = await account.signMessage({ message });
            expect(msgSignedDfns, "accountDfns.signMessage() != accountViem.signMessage()").toBe(msgSignedViem);
            console.debug(msgSignedViem);
            console.debug(msgSignedAccount);
            //@ts-expect-error
            console.debug(account.metadata.boundToEvmNetwork);
        });
    });
});
