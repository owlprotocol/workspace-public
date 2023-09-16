import { describe, test, expect, beforeAll } from "vitest";
import { Signer, TypedDataSigner } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import { SafeL2__factory } from "@owlprotocol/contracts/typechain/ethers";
import { deploySafe, predictSafeAddress } from "./safe.js";
import { createSafeTransaction, signSafeTransaction, populateExecuteTransaction } from "./safeTransaction.js";
import { SENTINEL_ADDRESS } from "./constants.js";
import { getGanacheProvider, contractsSetup, testSigner, testNetwork, testChainId } from "../blockchainSetup.js";
import { defaultSafeCoreContractAddresses } from "../types/SafeCoreContracts.js";
import { SafeAccountConfig } from "../types/Safe.js";
import { SafeTransactionDataPartial, MetaTransactionData } from "../types/SafeTransaction.js";

//For this test to work, anvil MUST run in background as Gnosis contracts must be deployed
describe("safe.test.ts", async () => {
    let provider: Provider;
    let signer: Signer & TypedDataSigner;
    let signerAddress: string;

    const safeProxyFactoryAddress = defaultSafeCoreContractAddresses.safeProxyFactoryAddress;
    const safeMasterCopyAddress = defaultSafeCoreContractAddresses.safeMasterCopyAddress;
    const fallbackHandlerAddress = defaultSafeCoreContractAddresses.fallbackHandlerAddress;
    const multiSendAddress = defaultSafeCoreContractAddresses.multiSendAddress;

    const chainId = testChainId;

    let safeAddress: string;
    //Salt used for transactions
    let safeNonce = 0;

    beforeAll(async () => {
        provider = await getGanacheProvider();
        signer = testSigner.connect(provider);
        signerAddress = await testSigner.getAddress();
        await contractsSetup(signer, testNetwork);

        const safeAccountConfig: SafeAccountConfig = { owners: [signerAddress], threshold: 1 };
        const deploySalt = `0x1`;
        const safeAddressExpected = await predictSafeAddress(safeAccountConfig, deploySalt, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });

        await deploySafe(signer, safeAccountConfig, deploySalt, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });

        safeAddress = safeAddressExpected;
    });

    test("createSafeTransaction - regular", async () => {
        //Do not increment since not submitting
        const nonce = safeNonce;
        console.debug(signer);
        const provider = signer.provider!;
        const safeContract = SafeL2__factory.connect(safeAddress, provider);
        const safeTransactionData: SafeTransactionDataPartial = {
            to: SENTINEL_ADDRESS,
            value: "1",
            data: "0x",
        };
        const safeTransaction = await createSafeTransaction(
            provider,
            safeContract,
            safeTransactionData,
            { multiSendAddress },
            { nonce },
        );
        expect(safeTransaction, "safeTransaction").toBeDefined();
        expect(Object.keys(safeTransaction.signatures).length, "signatures.length = 0").toBe(0);
    });

    test("createSafeTransaction - batch", async () => {
        //Do not increment since not submitting
        const nonce = safeNonce;
        const provider = signer.provider!;
        const safeContract = SafeL2__factory.connect(safeAddress, provider);
        const safeTransactionData: MetaTransactionData[] = [
            {
                to: SENTINEL_ADDRESS,
                value: "1",
                data: "0x",
            },
            {
                to: SENTINEL_ADDRESS,
                value: "1",
                data: "0x",
            },
        ];
        const safeTransaction = await createSafeTransaction(
            provider,
            safeContract,
            safeTransactionData,
            { multiSendAddress },
            { nonce },
        );
        expect(safeTransaction, "safeTransaction").toBeDefined();
        expect(Object.keys(safeTransaction.signatures).length, "signatures.length = 0").toBe(0);
    });

    test("signSafeTransaction", async () => {
        //Do not increment since not submitting
        const nonce = safeNonce;
        const provider = signer.provider!;
        const safeContract = SafeL2__factory.connect(safeAddress, provider);
        const safeTransactionData: SafeTransactionDataPartial = {
            to: SENTINEL_ADDRESS,
            value: "1",
            data: "0x",
        };
        const safeTransaction = await createSafeTransaction(
            provider,
            safeContract,
            safeTransactionData,
            {
                multiSendAddress,
            },
            { nonce },
        );
        expect(safeTransaction, "safeTransaction").toBeDefined();
        expect(Object.keys(safeTransaction.signatures).length, "signatures.length = 0").toBe(0);

        const safeTransactionSigned = await signSafeTransaction(chainId, safeAddress, safeTransaction, signer);
        expect(Object.keys(safeTransactionSigned.signatures).length, "signatures.length = 1").toBe(1);
    });

    test("populateExecuteTransaction - regular", async () => {
        const provider = signer.provider!;
        const balancePre = await provider.getBalance(SENTINEL_ADDRESS);

        //increment since submitting
        const nonce = safeNonce++;
        const safeContract = SafeL2__factory.connect(safeAddress, provider);
        const safeTransactionData: SafeTransactionDataPartial = {
            to: SENTINEL_ADDRESS,
            value: "1",
            data: "0x",
        };
        const safeTransaction = await createSafeTransaction(
            provider,
            safeContract,
            safeTransactionData,
            {
                multiSendAddress,
            },
            { nonce },
        );
        expect(safeTransaction, "safeTransaction").toBeDefined();
        expect(Object.keys(safeTransaction.signatures).length, "signatures.length = 0").toBe(0);

        const safeTransactionSigned = await signSafeTransaction(chainId, safeAddress, safeTransaction, signer);
        expect(Object.keys(safeTransactionSigned.signatures).length, "signatures.length = 1").toBe(1);

        const tx = await populateExecuteTransaction(safeContract, safeTransactionSigned);

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

    test("populateExecuteTransaction - batch", async () => {
        const provider = signer.provider!;
        const balancePre = await provider.getBalance(SENTINEL_ADDRESS);

        //increment since submitting
        const nonce = safeNonce++;
        const safeContract = SafeL2__factory.connect(safeAddress, provider);
        const safeTransactionData: MetaTransactionData[] = [
            {
                to: SENTINEL_ADDRESS,
                value: "1",
                data: "0x",
            },
            {
                to: SENTINEL_ADDRESS,
                value: "1",
                data: "0x",
            },
        ];
        const safeTransaction = await createSafeTransaction(
            provider,
            safeContract,
            safeTransactionData,
            {
                multiSendAddress,
            },
            { nonce },
        );
        expect(safeTransaction, "safeTransaction").toBeDefined();
        expect(Object.keys(safeTransaction.signatures).length, "signatures.length = 0").toBe(0);

        const safeTransactionSigned = await signSafeTransaction(chainId, safeAddress, safeTransaction, signer);
        expect(Object.keys(safeTransactionSigned.signatures).length, "signatures.length = 1").toBe(1);

        const tx = await populateExecuteTransaction(safeContract, safeTransactionSigned);

        //Send balance to Safe for test transactiosn
        await signer.sendTransaction({
            to: safeAddress,
            value: "2",
        });

        const txResponse = await signer.sendTransaction(tx);
        expect(txResponse, "txResponse").toBeDefined();

        const txReceipt = await txResponse.wait(1);
        expect(txReceipt).toBeDefined();

        const balancePost = await provider.getBalance(SENTINEL_ADDRESS);
        const balanceChange = balancePost.sub(balancePre).toNumber();

        //Sent 1, check balance change
        expect(balanceChange, "balanceChange").toBe(2);

        //Safe balance 0
        const balanceSafe = (await provider.getBalance(safeAddress)).toNumber();
        expect(balanceSafe, "balanceSafe").toBe(0);
    });
});
