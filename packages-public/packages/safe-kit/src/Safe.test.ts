import { describe, test, expect, beforeAll } from "vitest";
import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { getGanacheProvider, contractsSetup, testSigner, testNetwork } from "./blockchainSetup.js";
import { Safe } from "./Safe.js";
import { SafeAccountConfig } from "./types/Safe.js";
import { parseProxyCreationEvent } from "./utils/safe.js";
import { SENTINEL_ADDRESS } from "./utils/constants.js";
import { SafeTransactionDataPartial } from "./types/SafeTransaction.js";

//For this test to work, anvil MUST run in background as Gnosis contracts must be deployed
describe("safe.test.ts", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let provider: Provider;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let signer: Signer;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let signerAddress: string;
    let saltNonce = 1;

    beforeAll(async () => {
        provider = await getGanacheProvider();
        signer = testSigner.connect(provider);
        signerAddress = await testSigner.getAddress();
        await contractsSetup(signer, testNetwork);
    });

    describe("deploy", () => {
        test("predictSafeAddress", async () => {
            const safeAccountConfig: SafeAccountConfig = { owners: [signerAddress], threshold: 1 };
            const salt = `0x${saltNonce++}`;
            const safeAddress = Safe.predictSafeAddress(safeAccountConfig, salt);
            expect(safeAddress, "safeAddress").toBeDefined();
        });

        test("deploySafe", async () => {
            const safeAccountConfig: SafeAccountConfig = { owners: [signerAddress], threshold: 1 };
            const salt = `0x${saltNonce++}`;
            const safeAddressExpected = Safe.predictSafeAddress(safeAccountConfig, salt);

            const { safe, txResponse } = await Safe.deploy(signer, safeAccountConfig, salt);
            expect(txResponse, "txResponse").toBeDefined();

            const txReceipt = await txResponse.wait(0);
            const safeDeployEvent = txReceipt.logs.map(parseProxyCreationEvent).find((p) => p != undefined);
            const safeAddress = safeDeployEvent?.proxy;

            expect(safeAddress, "safeAddress").toBeDefined();
            expect(safeAddress, "safeAddress != safeAddressExpected").toBe(safeAddressExpected);
            expect(safe.getAddress(), "safe.getAddress() != safeAddressExepcted").toBe(safeAddressExpected);
        });
    });

    describe("transaction", () => {
        let safe: Safe;
        //Salt used for transactions
        let safeNonce = 0;

        beforeAll(async () => {
            const safeAccountConfig: SafeAccountConfig = { owners: [signerAddress], threshold: 1 };
            const deploySalt = `0x1`;

            const result = await Safe.deploy(signer, safeAccountConfig, deploySalt);
            await result.txResponse.wait(1);

            safe = result.safe;
        });

        test("createTransaction", async () => {
            //Do not increment since not submitting
            const nonce = safeNonce;
            const safeTransactionData: SafeTransactionDataPartial = {
                to: SENTINEL_ADDRESS,
                value: "1",
                data: "0x",
            };
            const safeTransaction = await safe.createTransaction(safeTransactionData, nonce);
            expect(safeTransaction, "safeTransaction").toBeDefined();
            expect(Object.keys(safeTransaction.signatures).length, "signatures.length = 0").toBe(0);
        });

        test("populateExecuteTransaction", async () => {
            const provider = signer.provider!;
            const balancePre = await provider.getBalance(SENTINEL_ADDRESS);
            const safeAddress = safe.getAddress();

            //increment since submitting
            const nonce = safeNonce++;
            const safeTransactionData: SafeTransactionDataPartial = {
                to: SENTINEL_ADDRESS,
                value: "1",
                data: "0x",
            };
            const safeTransaction = await safe.createTransaction(safeTransactionData, nonce);
            expect(safeTransaction, "safeTransaction").toBeDefined();
            expect(Object.keys(safeTransaction.signatures).length, "signatures.length = 0").toBe(0);

            const safeTransactionSigned = await safe.signTransaction(safeTransaction);
            expect(Object.keys(safeTransactionSigned.signatures).length, "signatures.length = 1").toBe(1);

            const tx = await safe.populateExecuteTransaction(safeTransactionSigned);

            //Send balance to Safe for test transactiosn
            await signer.sendTransaction({
                to: safeAddress,
                value: "1",
            });

            const txResponse = await signer.sendTransaction(tx);
            expect(txResponse, "txResponse").toBeDefined();

            const txReceipt = await txResponse.wait(1);
            expect(txReceipt).toBeDefined();

            const balancePost = await provider.getBalance(SENTINEL_ADDRESS);
            const balanceChange = balancePost.sub(balancePre).toNumber();

            //Sent 1, check balance change
            expect(balanceChange, "balanceChange").toBe(1);

            //Safe balance 0
            const balanceSafe = (await provider.getBalance(safeAddress)).toNumber();
            expect(balanceSafe, "balanceSafe").toBe(0);
        });
    });
});
