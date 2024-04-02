import { describe, test, expect, beforeAll } from "vitest";
import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import {
    deploySafe,
    predictSafeAddress,
    createProxyWithNonceTransaction,
    parseProxyCreationEvent,
} from "./SafeUtils.js";
import { getGanacheProvider, contractsSetup, testSigner, testNetwork } from "./blockchainSetup.js";
import { defaultSafeCoreContractAddresses } from "./types/SafeCoreContracts.js";
import { SafeAccountConfig } from "./types/Safe.js";

//For this test to work, anvil MUST run in background as Gnosis contracts must be deployed
describe("safe.test.ts", async () => {
    let provider: Provider;
    let signer: Signer;
    let signerAddress: string;

    const safeProxyFactoryAddress = defaultSafeCoreContractAddresses.safeProxyFactoryAddress;
    const safeMasterCopyAddress = defaultSafeCoreContractAddresses.safeMasterCopyAddress;
    const fallbackHandlerAddress = defaultSafeCoreContractAddresses.fallbackHandlerAddress;
    let saltNonce = 1;

    beforeAll(async () => {
        provider = await getGanacheProvider();
        signer = testSigner.connect(provider);
        signerAddress = await testSigner.getAddress();
        await contractsSetup(signer, testNetwork);
    });

    test("predictSafeAddress", async () => {
        const safeAccountConfig: SafeAccountConfig = { owners: [signerAddress], threshold: 1 };
        const salt = `0x${saltNonce++}`;
        const safeAddress = predictSafeAddress(safeAccountConfig, salt, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });
        expect(safeAddress, "safeAddress").toBeDefined();
    });

    test("deploySafe", async () => {
        const safeAccountConfig: SafeAccountConfig = { owners: [signerAddress], threshold: 1 };
        const salt = `0x${saltNonce++}`;
        const safeAddressExpected = await predictSafeAddress(safeAccountConfig, salt, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });

        const txResponse = await deploySafe(signer, safeAccountConfig, salt, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });
        expect(txResponse, "txResponse").toBeDefined();

        const txReceipt = await txResponse.wait(0);
        const safeDeployEvent = txReceipt.logs.map(parseProxyCreationEvent).find((p) => p != undefined);
        const safeAddress = safeDeployEvent?.proxy;

        expect(safeAddress, "safeAddress").toBeDefined();
        expect(safeAddress, "safeAddress != safeAddressExpected").toBe(safeAddressExpected);
    });

    test("createProxyWithNonceTransaction", async () => {
        const safeAccountConfig: SafeAccountConfig = { owners: [signerAddress], threshold: 1 };
        const salt = `0x${saltNonce++}`;
        const safeAddressExpected = await predictSafeAddress(safeAccountConfig, salt, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });

        const tx = createProxyWithNonceTransaction(safeAccountConfig, salt, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });
        expect(tx, "tx").toBeDefined();

        const txResponse = await signer.sendTransaction(tx);
        expect(txResponse, "txResponse").toBeDefined();

        const txReceipt = await txResponse.wait(0);
        const safeDeployEvent = txReceipt.logs.map(parseProxyCreationEvent).find((p) => p != undefined);
        const safeAddress = safeDeployEvent?.proxy;

        expect(safeAddress, "safeAddress").toBeDefined();
        expect(safeAddress, "safeAddress != safeAddressExpected").toBe(safeAddressExpected);
    });
});
