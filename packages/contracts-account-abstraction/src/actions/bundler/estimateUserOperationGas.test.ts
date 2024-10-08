import { describe, test, beforeAll, beforeEach, expect } from "vitest";
import {
    Address,
    Chain,
    Transport,
    Hex,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    encodeFunctionData,
    parseEther,
    HDAccount,
    PrivateKeyAccount,
    hexToBytes,
    padHex,
} from "viem";
import { localhost } from "viem/chains";
import {
    UserOperation,
    entryPoint07Address,
    getUserOperationHash,
    waitForUserOperationReceipt,
} from "viem/account-abstraction";

import {
    getLocalAccount,
    getDeployDeterministicAddress,
    getDeployDeterministicFunctionData,
} from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { estimateUserOperationGas, UserOperationGasLimitFields } from "./estimateUserOperationGas.js";
import { sendUserOperation } from "./sendUserOperation.js";
import { getUserOperationReceipt } from "./getUserOperationReceipt.js";
import { getUserOperation } from "./getUserOperation.js";
import { port } from "../../test/constants.js";
import { getSimpleAccountAddress } from "../../SimpleAccount.js";
import { ERC1967Proxy } from "../../artifacts/ERC1967Proxy.js";
import { SimpleAccountFactory } from "../../artifacts/SimpleAccountFactory.js";
import { MyContract } from "../../artifacts/MyContract.js";
import { setupERC4337Contracts, setupVerifyingPaymaster, topupPaymaster } from "../../setupERC4337Contracts.js";
import { dummySignature } from "../../models/UserOperation.js";

import { getPaymasterData } from "../paymaster/getPaymasterData.js";
import { getPaymasterStubData } from "../paymaster/getPaymasterStubData.js";

describe("estimateUserOperationGas.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    // Fixed account with funding `getLocalAccount(0)`
    let walletClient: WalletClient<Transport, Chain, HDAccount>;
    // Generated account on each test
    let account: PrivateKeyAccount;

    let entryPointAddress: typeof entryPoint07Address;
    let entryPointSimulationsAddress: Address;
    let simpleAccountFactory: Address;
    let verifyingPaymaster: Address;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0) as unknown as HDAccount,
            chain: localhost,
            transport,
        });
        const contracts = await setupERC4337Contracts({
            publicClient,
            walletClient,
        });
        entryPointAddress = contracts.entrypoint.address;
        //TODO: we use the Pimlico simulator?
        entryPointSimulationsAddress = contracts.pimlicoEntrypointSimulations.address;
        simpleAccountFactory = contracts.simpleAccountFactory.address;

        //Deploy paymaster
        verifyingPaymaster = (
            await setupVerifyingPaymaster({
                publicClient,
                walletClient,
                verifyingSignerAddress: walletClient.account.address,
            })
        ).address;

        const { hash: topupHash } = await topupPaymaster({
            publicClient,
            walletClient,
            paymaster: verifyingPaymaster,
            minBalance: parseEther("10"),
        });
        if (topupHash) {
            await publicClient.waitForTransactionReceipt({ hash: topupHash });
        }
    });

    beforeEach(() => {
        account = privateKeyToAccount(generatePrivateKey());
    });

    /** Tests involving interacting with an existing paymaster */
    describe("Existing Simple Account", () => {
        let simpleAccount: {
            address: Address;
            factoryData: Hex;
            factoryAddress: Address;
        };

        beforeEach(async () => {
            //Get SimpleAccount address
            const simpleAccountAddress = getSimpleAccountAddress(
                {
                    owner: account.address,
                    salt: 0n,
                },
                {
                    factoryAddress: simpleAccountFactory,
                    proxyBytecode: ERC1967Proxy.bytecode,
                },
            );

            const simpleAccountFactoryData = encodeFunctionData({
                abi: SimpleAccountFactory.abi,
                functionName: "createAccount",
                args: [account.address, 0n],
            });

            simpleAccount = {
                address: simpleAccountAddress,
                factoryData: simpleAccountFactoryData,
                factoryAddress: simpleAccountFactory,
            };

            //Deploy SimpleAccount
            const { request: createAccountRequest } = await publicClient.simulateContract({
                account: walletClient.account,
                address: simpleAccountFactory,
                abi: SimpleAccountFactory.abi,
                functionName: "createAccount",
                args: [account.address, 0n],
            });
            const createAccountHash = await walletClient.writeContract(createAccountRequest);
            await publicClient.waitForTransactionReceipt({ hash: createAccountHash });

            //Pre-fund wallet just for transaction (1 wei)
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: simpleAccount.address,
                value: 1n,
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });
        });

        /**
         * Create a UserOp from start to end
         *   - Encode callData
         *   - Estimate UserOp gas
         *   - Sign UserOp with account owner
         *   - Submit to EntryPoint
         **/
        test("estimateUserOperationGas - No Paymaster", async () => {
            //Pre-fund wallet just to pay tx cost
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: simpleAccount.address,
                value: parseEther("5"),
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });

            //Create UserOp
            //Encode smart account tx, send to random address
            const to = privateKeyToAccount(generatePrivateKey()).address;
            const value = 1n;
            const data = "0x";
            const callData = encodeFunctionData({
                abi: [
                    {
                        inputs: [
                            { name: "dest", type: "address" },
                            { name: "value", type: "uint256" },
                            { name: "func", type: "bytes" },
                        ],
                        name: "execute",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                args: [to, value, data],
            });

            const gasPrice = await publicClient.estimateFeesPerGas();
            const userOpData: Omit<UserOperation<"0.7">, UserOperationGasLimitFields> = {
                sender: simpleAccount.address,
                nonce: 0n,
                signature:
                    "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
                callData,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
            };

            //Estimate UserOp gas
            const userOpGas = await estimateUserOperationGas(
                { ...publicClient, entryPointSimulationsAddress },
                userOpData,
            );

            expect(userOpGas).toBeDefined();
            //gas values > 0
            expect(userOpGas.preVerificationGas).toBeGreaterThan(0n);
            expect(userOpGas.callGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.verificationGasLimit).toBeGreaterThan(0n);
            //gas values < defaults
            expect(userOpGas.preVerificationGas).toBeLessThan(1_000_000n);
            expect(userOpGas.callGasLimit).toBeLessThan(10_000_000n);
            expect(userOpGas.verificationGasLimit).toBeLessThan(10_000_000n);
            //paymaster disabled
            expect(userOpGas.paymasterVerificationGasLimit).toBeUndefined();
            expect(userOpGas.paymasterPostOpGasLimit).toBeUndefined();

            const userOp = { ...userOpData, ...userOpGas };

            //Sign UserOp
            const userOpHashExpected = getUserOperationHash({
                userOperation: userOp,
                entryPointAddress: entryPointAddress,
                entryPointVersion: "0.7",
                chainId: localhost.id,
            });
            const signature = await account.signMessage({
                message: { raw: userOpHashExpected },
            });
            userOp.signature = signature;

            const userOpHash = await sendUserOperation(walletClient, userOp);
            expect(userOpHash).toBe(userOpHashExpected);

            const bundler = publicClient.extend((client) => {
                return {
                    getUserOperationReceipt: (args: any) => getUserOperationReceipt({ ...client }, args),
                };
            });
            const userOpReceipt = await waitForUserOperationReceipt(bundler, { hash: userOpHashExpected });
            expect(userOpReceipt.userOpHash).toBe(userOpHashExpected);
            const userOperation = await getUserOperation(publicClient, { hash: userOpHashExpected });
            expect(userOperation).toBeDefined();

            //Get balanceOf
            const balance = await publicClient.getBalance({ address: to });
            expect(balance).toBe(value);
        });

        /**
         * Create a UserOp from start to end with Paymaster
         *   - Encode callData
         *   - Estimate UserOp gas
         *   - Sign UserOp with paymaster signer
         *   - Sign UserOp with account owner
         *   - Submit to EntryPoint
         **/
        test("estimateUserOperationGas - Paymaster", async () => {
            //Encode smart account tx, send to random address
            const to = privateKeyToAccount(generatePrivateKey()).address;
            const value = 1n;
            const data = "0x";
            const callData = encodeFunctionData({
                abi: [
                    {
                        inputs: [
                            { name: "dest", type: "address" },
                            { name: "value", type: "uint256" },
                            { name: "func", type: "bytes" },
                        ],
                        name: "execute",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                args: [to, value, data],
            });

            //Create UserOp
            const gasPrice = await publicClient.estimateFeesPerGas();

            const paymasterStubData = await getPaymasterStubData(
                { paymaster: verifyingPaymaster },
                {
                    sender: simpleAccount.address,
                    nonce: 0n,
                    callData,
                    chainId: publicClient.chain.id,
                    entryPointAddress,
                },
            );

            const userOpData: Omit<UserOperation<"0.7">, UserOperationGasLimitFields> = {
                sender: simpleAccount.address,
                nonce: 0n,
                signature: dummySignature,
                callData,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                paymaster: paymasterStubData.paymaster,
                //Dummy signature
                paymasterData: paymasterStubData.paymasterData,
            };

            //Estimate UserOp gas
            const userOpGas = await estimateUserOperationGas(
                { ...publicClient, entryPointSimulationsAddress },
                userOpData,
            );

            expect(userOpGas).toBeDefined();
            //gas values > 0
            expect(userOpGas.preVerificationGas).toBeGreaterThan(0n);
            expect(userOpGas.callGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.verificationGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.paymasterVerificationGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.paymasterPostOpGasLimit).toBeGreaterThan(0n);
            //gas values < defaults
            expect(userOpGas.preVerificationGas).toBeLessThan(1_000_000n);
            expect(userOpGas.callGasLimit).toBeLessThan(10_000_000n);
            expect(userOpGas.verificationGasLimit).toBeLessThan(10_000_000n);
            expect(userOpGas.paymasterVerificationGasLimit).toBeLessThan(5_000_000n);
            expect(userOpGas.paymasterPostOpGasLimit).toBeLessThan(2_000_000n);

            //Merge UserOp data and UserOp gas. paymasterData should not have signature to compute the hash
            const userOp = {
                ...userOpData,
                ...userOpGas,
            };

            const paymasterData = await getPaymasterData(
                { ...(walletClient as any), paymaster: verifyingPaymaster },
                { ...userOp, chainId: publicClient.chain.id, entryPointAddress },
            );
            userOp.paymasterData = paymasterData.paymasterData;

            //Sign UserOp
            const userOpHashExpected = getUserOperationHash({
                userOperation: userOp,
                entryPointAddress: entryPointAddress,
                entryPointVersion: "0.7",
                chainId: localhost.id,
            });
            const signature = await account.signMessage({
                message: { raw: userOpHashExpected },
            });
            userOp.signature = signature;

            const userOpHash = await sendUserOperation(walletClient, userOp);
            expect(userOpHash).toBe(userOpHashExpected);

            const bundler = publicClient.extend((client) => {
                return {
                    getUserOperationReceipt: (args: any) => getUserOperationReceipt(client, args),
                };
            });
            const userOpReceipt = await waitForUserOperationReceipt(bundler, { hash: userOpHashExpected });
            expect(userOpReceipt.userOpHash).toBe(userOpHashExpected);
            const userOperation = await getUserOperation(publicClient, { hash: userOpHashExpected });
            expect(userOperation).toBeDefined();

            //Get balanceOf
            const balance = await publicClient.getBalance({ address: to });
            expect(balance).toBe(value);
        });

        test("estimateUserOperationGas - Paymaster Deploy Contract", async () => {
            //Encode smart account tx, deploy hello contract
            //Deploy hello world contract
            const deployParams = {
                //unique salt to avoid conflicts
                salt: padHex(account.address, { size: 32 }),
                bytecode: MyContract.bytecode,
            };
            const contractAddress = getDeployDeterministicAddress(deployParams);
            const value = 0n;
            const { to, data } = getDeployDeterministicFunctionData(deployParams);
            const callData = encodeFunctionData({
                abi: [
                    {
                        inputs: [
                            { name: "dest", type: "address" },
                            { name: "value", type: "uint256" },
                            { name: "func", type: "bytes" },
                        ],
                        name: "execute",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                args: [to, value, data],
            });

            //Create UserOp
            const gasPrice = await publicClient.estimateFeesPerGas();

            const paymasterStubData = await getPaymasterStubData(
                { paymaster: verifyingPaymaster },
                {
                    sender: simpleAccount.address,
                    nonce: 0n,
                    callData,
                    chainId: publicClient.chain.id,
                    entryPointAddress,
                },
            );

            const userOpData: Omit<UserOperation<"0.7">, UserOperationGasLimitFields> = {
                sender: simpleAccount.address,
                nonce: 0n,
                signature: dummySignature,
                callData,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                paymaster: paymasterStubData.paymaster,
                //Dummy signature
                paymasterData: paymasterStubData.paymasterData,
            };

            //Estimate UserOp gas
            const userOpGas = await estimateUserOperationGas(
                { ...publicClient, entryPointSimulationsAddress },
                userOpData,
            );

            expect(userOpGas).toBeDefined();
            //gas values > 0
            expect(userOpGas.preVerificationGas).toBeGreaterThan(0n);
            expect(userOpGas.callGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.verificationGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.paymasterVerificationGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.paymasterPostOpGasLimit).toBeGreaterThan(0n);
            //gas values < defaults
            expect(userOpGas.preVerificationGas).toBeLessThan(1_000_000n);
            expect(userOpGas.callGasLimit).toBeLessThan(10_000_000n);
            expect(userOpGas.verificationGasLimit).toBeLessThan(10_000_000n);
            expect(userOpGas.paymasterVerificationGasLimit).toBeLessThan(5_000_000n);
            expect(userOpGas.paymasterPostOpGasLimit).toBeLessThan(2_000_000n);

            //Merge UserOp data and UserOp gas. paymasterData should not have signature to compute the hash
            const userOp = {
                ...userOpData,
                ...userOpGas,
            };
            const paymasterData = await getPaymasterData(
                { ...(walletClient as any), paymaster: verifyingPaymaster },
                { ...userOp, chainId: publicClient.chain.id, entryPointAddress },
            );
            userOp.paymasterData = paymasterData.paymasterData;

            //Sign UserOp
            const userOpHashExpected = getUserOperationHash({
                userOperation: userOp,
                entryPointAddress: entryPointAddress,
                entryPointVersion: "0.7",
                chainId: localhost.id,
            });
            const signature = await account.signMessage({
                message: { raw: userOpHashExpected },
            });
            userOp.signature = signature;

            const userOpHash = await sendUserOperation(walletClient, userOp);
            expect(userOpHash).toBe(userOpHashExpected);

            const bundler = publicClient.extend((client) => {
                return {
                    getUserOperationReceipt: (args: any) => getUserOperationReceipt(client, args),
                };
            });
            const userOpReceipt = await waitForUserOperationReceipt(bundler, { hash: userOpHashExpected });
            expect(userOpReceipt.userOpHash).toBe(userOpHashExpected);
            const userOperation = await getUserOperation(publicClient, { hash: userOpHashExpected });
            expect(userOperation).toBeDefined();

            const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
            expect(contractBytecode).toBeDefined();
        });
    });

    /** Tests involving deploying the smart account */
    describe("Deploy Simple Account", () => {
        test("estimateUserOperationGas - No Paymaster Deploy Contract", async () => {
            //Encode smart account tx, deploy smart account & hello contract
            //Deploy smart account data
            //Get SimpleAccount address
            const simpleAccountAddress = getSimpleAccountAddress(
                {
                    owner: account.address,
                    salt: 0n,
                },
                {
                    factoryAddress: simpleAccountFactory,
                    proxyBytecode: ERC1967Proxy.bytecode,
                },
            );

            const simpleAccountFactoryData = encodeFunctionData({
                abi: SimpleAccountFactory.abi,
                functionName: "createAccount",
                args: [account.address, 0n],
            });

            const simpleAccount = {
                address: simpleAccountAddress,
                factoryData: simpleAccountFactoryData,
                factoryAddress: simpleAccountFactory,
            };

            //Pre-fund wallet just to pay tx cost
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: simpleAccount.address,
                value: parseEther("5"),
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });

            //Deploy hello world contract
            const deployParams = {
                salt: padHex(account.address, { size: 32 }),
                bytecode: MyContract.bytecode,
            };
            const contractAddress = getDeployDeterministicAddress(deployParams);
            const value = 0n;
            const { to, data } = getDeployDeterministicFunctionData(deployParams);
            const callData = encodeFunctionData({
                abi: [
                    {
                        inputs: [
                            { name: "dest", type: "address" },
                            { name: "value", type: "uint256" },
                            { name: "func", type: "bytes" },
                        ],
                        name: "execute",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                args: [to, value, data],
            });

            //Create UserOp
            const gasPrice = await publicClient.estimateFeesPerGas();
            const dummySignature =
                "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
            const dummySignatureBytes = hexToBytes(dummySignature);
            expect(dummySignatureBytes.length).toBeGreaterThanOrEqual(64);
            expect(dummySignatureBytes.length).toBeLessThanOrEqual(65);
            const userOpData: Omit<UserOperation<"0.7">, UserOperationGasLimitFields> = {
                sender: simpleAccount.address,
                factory: simpleAccount.factoryAddress,
                factoryData: simpleAccount.factoryData,
                nonce: 0n,
                signature: dummySignature,
                callData,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
            };

            //Estimate UserOp gas
            const userOpGas = await estimateUserOperationGas(
                { ...publicClient, entryPointSimulationsAddress },
                userOpData,
            );

            expect(userOpGas).toBeDefined();
            //gas values > 0
            expect(userOpGas.preVerificationGas).toBeGreaterThan(0n);
            expect(userOpGas.callGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.verificationGasLimit).toBeGreaterThan(0n);
            //gas values < defaults
            expect(userOpGas.preVerificationGas).toBeLessThan(1_000_000n);
            expect(userOpGas.callGasLimit).toBeLessThan(10_000_000n);
            expect(userOpGas.verificationGasLimit).toBeLessThan(10_000_000n);
            //paymaster disabled
            expect(userOpGas.paymasterVerificationGasLimit).toBeUndefined();
            expect(userOpGas.paymasterPostOpGasLimit).toBeUndefined();

            //Merge UserOp data and UserOp gas. paymasterData should not have signature to compute the hash
            const userOp = {
                ...userOpData,
                ...userOpGas,
            };

            //Sign UserOp
            const userOpHashExpected = getUserOperationHash({
                userOperation: userOp,
                entryPointAddress: entryPointAddress,
                entryPointVersion: "0.7",
                chainId: localhost.id,
            });
            const signature = await account.signMessage({
                message: { raw: userOpHashExpected },
            });
            userOp.signature = signature;

            const userOpHash = await sendUserOperation(walletClient, userOp);
            expect(userOpHash).toBe(userOpHashExpected);

            const bundler = publicClient.extend((client) => {
                return {
                    getUserOperationReceipt: (args: any) => getUserOperationReceipt(client, args),
                };
            });
            const userOpReceipt = await waitForUserOperationReceipt(bundler, { hash: userOpHashExpected });
            expect(userOpReceipt.userOpHash).toBe(userOpHashExpected);
            const userOperation = await getUserOperation(publicClient, { hash: userOpHashExpected });
            expect(userOperation).toBeDefined();

            const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
            expect(contractBytecode).toBeDefined();
        });

        test("estimateUserOperationGas - Paymaster Deploy Contract", async () => {
            //Encode smart account tx, deploy smart account & hello contract
            //Deploy smart account data
            //Get SimpleAccount address
            const simpleAccountAddress = getSimpleAccountAddress(
                {
                    owner: account.address,
                    salt: 0n,
                },
                {
                    factoryAddress: simpleAccountFactory,
                    proxyBytecode: ERC1967Proxy.bytecode,
                },
            );

            const simpleAccountFactoryData = encodeFunctionData({
                abi: SimpleAccountFactory.abi,
                functionName: "createAccount",
                args: [account.address, 0n],
            });

            const simpleAccount = {
                address: simpleAccountAddress,
                factoryData: simpleAccountFactoryData,
                factoryAddress: simpleAccountFactory,
            };
            //Deploy hello world contract
            const deployParams = {
                salt: padHex(account.address, { size: 32 }),
                bytecode: MyContract.bytecode,
            };
            const contractAddress = getDeployDeterministicAddress(deployParams);
            const value = 0n;
            const { to, data } = getDeployDeterministicFunctionData(deployParams);
            const callData = encodeFunctionData({
                abi: [
                    {
                        inputs: [
                            { name: "dest", type: "address" },
                            { name: "value", type: "uint256" },
                            { name: "func", type: "bytes" },
                        ],
                        name: "execute",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                args: [to, value, data],
            });

            //Create UserOp
            const gasPrice = await publicClient.estimateFeesPerGas();

            const paymasterStubData = await getPaymasterStubData(
                { paymaster: verifyingPaymaster },
                {
                    sender: simpleAccount.address,
                    nonce: 0n,
                    callData,
                    chainId: publicClient.chain.id,
                    entryPointAddress,
                },
            );

            const userOpData: Omit<UserOperation<"0.7">, UserOperationGasLimitFields> = {
                sender: simpleAccount.address,
                factory: simpleAccount.factoryAddress,
                factoryData: simpleAccount.factoryData,
                nonce: 0n,
                signature: dummySignature,
                callData,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                paymaster: verifyingPaymaster,
                //Dummy signature
                paymasterData: paymasterStubData.paymasterData,
            };

            //Estimate UserOp gas
            const userOpGas = await estimateUserOperationGas(
                { ...publicClient, entryPointSimulationsAddress },
                userOpData,
            );

            expect(userOpGas).toBeDefined();
            //gas values > 0
            expect(userOpGas.preVerificationGas).toBeGreaterThan(0n);
            expect(userOpGas.callGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.verificationGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.paymasterVerificationGasLimit).toBeGreaterThan(0n);
            expect(userOpGas.paymasterPostOpGasLimit).toBeGreaterThan(0n);
            //gas values < defaults
            expect(userOpGas.preVerificationGas).toBeLessThan(1_000_000n);
            expect(userOpGas.callGasLimit).toBeLessThan(10_000_000n);
            expect(userOpGas.verificationGasLimit).toBeLessThan(10_000_000n);
            expect(userOpGas.paymasterVerificationGasLimit).toBeLessThan(5_000_000n);
            expect(userOpGas.paymasterPostOpGasLimit).toBeLessThan(2_000_000n);

            //Merge UserOp data and UserOp gas. paymasterData should not have signature to compute the hash
            const userOp = {
                ...userOpData,
                ...userOpGas,
            };

            const paymasterData = await getPaymasterData(
                { ...(walletClient as any), paymaster: verifyingPaymaster },
                { ...userOp, chainId: publicClient.chain.id, entryPointAddress },
            );
            userOp.paymasterData = paymasterData.paymasterData;

            //Sign UserOp
            const userOpHashExpected = getUserOperationHash({
                userOperation: userOp,
                entryPointAddress: entryPointAddress,
                entryPointVersion: "0.7",
                chainId: localhost.id,
            });
            const signature = await account.signMessage({
                message: { raw: userOpHashExpected },
            });
            userOp.signature = signature;

            const userOpHash = await sendUserOperation(walletClient, userOp);
            expect(userOpHash).toBe(userOpHashExpected);

            const bundler = publicClient.extend((client) => {
                return {
                    getUserOperationReceipt: (args: any) => getUserOperationReceipt(client, args),
                };
            });
            const userOpReceipt = await waitForUserOperationReceipt(bundler, { hash: userOpHashExpected });
            expect(userOpReceipt.userOpHash).toBe(userOpHashExpected);
            const userOperation = await getUserOperation(publicClient, { hash: userOpHashExpected });
            expect(userOperation).toBeDefined();

            const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
            expect(contractBytecode).toBeDefined();
        });
    });
});
