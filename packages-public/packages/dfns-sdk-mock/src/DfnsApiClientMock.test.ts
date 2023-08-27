import { beforeEach, describe, expect, test } from "vitest";
import type { BlockchainNetwork } from "@dfns/sdk/codegen/datamodel/Wallets/types.js";
import { Signer, ethers } from "ethers";
import { DfnsWallet } from "@dfns/lib-ethersjs5";
import type { DfnsApiClient } from "@dfns/sdk";
import { DfnsApiClientInterface, DfnsApiClientMock } from "./DfnsApiClientMock.js";

describe("DfnsApiClientMock.test.ts", () => {
    const mnemonic = "test test test test test test test test test test test junk";
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const client: DfnsApiClientInterface = new DfnsApiClientMock(mnemonic);
    let walletId = 0;

    let signerEthers: Signer;
    let signerDfns: Signer;

    describe("network: Ethereum", () => {
        const network = "Ethereum" as BlockchainNetwork.Ethereum;

        beforeEach(async () => {
            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            signerEthers = new ethers.Wallet(pkey);

            const walletCreate = await client.wallets.createWallet({
                body: {
                    network,
                },
            });
            signerDfns = new DfnsWallet({
                walletId: walletCreate.id,
                dfnsClient: client as DfnsApiClient,
                maxRetries: 10,
            });
        });

        test("getAddress", async () => {
            expect(await signerDfns.getAddress(), "signerDfns.address != signerEthers.address").toBe(
                await signerEthers.getAddress(),
            );
        });

        test("signTransaction", async () => {
            const txUnsigned = {
                to: ethers.constants.AddressZero,
                data: "0x",
                value: "0x0",
            };
            const txSignedEthers = await signerEthers.signTransaction(txUnsigned);
            const txSignedDfns = await signerDfns.signTransaction(txUnsigned);
            expect(txSignedDfns, "signerDfns.signTransaction() != signerEthers.signTransaction()").toBe(txSignedEthers);
        });
    });

    describe("network: KeyECDSA", () => {
        const network = "KeyECDSA" as BlockchainNetwork.KeyECDSA;

        beforeEach(async () => {
            const pkey = hdNode.derivePath(`m/44'/60'/0'/0/${walletId++}`).privateKey;
            signerEthers = new ethers.Wallet(pkey);

            const walletCreate = await client.wallets.createWallet({
                body: {
                    network,
                },
            });
            signerDfns = new DfnsWallet({
                walletId: walletCreate.id,
                dfnsClient: client as DfnsApiClient,
                maxRetries: 10,
            });
        });

        test("getAddress", async () => {
            expect(await signerDfns.getAddress(), "signerDfns.address != signerEthers.address").toBe(
                await signerEthers.getAddress(),
            );
        });

        test("signTransaction", async () => {
            const txUnsigned = {
                to: ethers.constants.AddressZero,
                data: "0x",
                value: "0x0",
            };
            const txSignedEthers = await signerEthers.signTransaction(txUnsigned);
            const txSignedDfns = await signerDfns.signTransaction(txUnsigned);
            expect(txSignedDfns, "signerDfns.signTransaction() != signerEthers.signTransaction()").toBe(txSignedEthers);
        });
    });
});
