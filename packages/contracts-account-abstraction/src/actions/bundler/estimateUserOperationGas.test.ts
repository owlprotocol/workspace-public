import { describe, test, beforeEach, expect, beforeAll } from "vitest";
import {
    createPublicClient,
    http,
    PrivateKeyAccount,
    encodeFunctionData,
    Hex,
    padHex,
    Address,
    createWalletClient,
    nonceManager,
    encodeAbiParameters,
    concatHex,
} from "viem";
import { localhost } from "viem/chains";
import { UserOperation } from "viem/account-abstraction";

import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { getDeployDeterministicFunctionData, getLocalAccount } from "@owlprotocol/viem-utils";
import { estimateUserOperationGas } from "./estimateUserOperationGas.js";
import { port } from "../../test/constants.js";
import { getSimpleAccountAddress } from "../../SimpleAccount.js";
import { erc4337Contracts, setupVerifyingPaymaster } from "../../setupERC4337Contracts.js";

import { ERC1967Proxy } from "../../artifacts/ERC1967Proxy.js";
import { SimpleAccountFactory } from "../../artifacts/SimpleAccountFactory.js";
import { MyContract } from "../../artifacts/MyContract.js";

describe("actions/bundler/estimateUserOperationGas.test.ts", function () {
    const chain = {
        ...localhost,
        rpcUrls: {
            default: {
                http: [`http://127.0.0.1:${port}`],
            },
        },
    };
    const transport = http(chain.rpcUrls.default.http[0]);
    const publicClient = createPublicClient({
        chain,
        transport,
    });

    // Contracts
    const entryPointSimulationsAddress = erc4337Contracts.pimlicoEntrypointSimulations;
    const factoryAddress = erc4337Contracts.simpleAccountFactory;

    // Dummy signature for gas estimation
    const dummySignature =
        "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";

    // Generated account on each test
    let owner: PrivateKeyAccount;
    let smartAccountAddress: Address;
    let factoryData: Hex;

    beforeEach(async () => {
        owner = privateKeyToAccount(generatePrivateKey());
        smartAccountAddress = getSimpleAccountAddress(
            {
                owner: owner.address,
                salt: 0n,
            },
            {
                factoryAddress,
                proxyBytecode: ERC1967Proxy.bytecode,
            },
        );

        factoryData = encodeFunctionData({
            abi: SimpleAccountFactory.abi,
            functionName: "createAccount",
            args: [owner.address, 0n],
        });
    });

    describe("smart account prefund", () => {
        describe("simple transaction", () => {
            let callData: Hex;

            beforeEach(() => {
                // Encode smart account tx, send to random address
                const to = privateKeyToAccount(generatePrivateKey()).address;
                const value = 0n;
                const data = "0x";

                callData = encodeFunctionData({
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
            });

            test("gas price zero", async () => {
                // Estimate gas with 0 balance on smart account and no paymaster, gas price set to 0
                const gasPrice = { maxFeePerGas: 0n, maxPriorityFeePerGas: 0n };
                // Create UserOperation
                const userOp: Omit<
                    UserOperation<"0.7">,
                    "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
                > = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    signature: dummySignature,
                    callData,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                    factory: factoryAddress,
                    factoryData,
                };

                const result = await estimateUserOperationGas(
                    { ...publicClient, entryPointSimulationsAddress },
                    userOp,
                );
                expect(result.preVerificationGas).toBeGreaterThan(0n);
                expect(result.verificationGasLimit).toBeGreaterThan(0n);
                expect(result.callGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterVerificationGasLimit).toBeUndefined();
                expect(result.paymasterPostOpGasLimit).toBeUndefined();
            });

            test("gas price current", async () => {
                // Estimate gas with 0 balance on smart account and no paymaster, gas price set to current
                const gasPrice = await publicClient.estimateFeesPerGas();
                const userOp: Omit<
                    UserOperation<"0.7">,
                    "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
                > = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    signature: dummySignature,
                    callData,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                    factory: factoryAddress,
                    factoryData,
                };

                const result = await estimateUserOperationGas(
                    { ...publicClient, entryPointSimulationsAddress },
                    userOp,
                );
                expect(result.preVerificationGas).toBeGreaterThan(0n);
                expect(result.verificationGasLimit).toBeGreaterThan(0n);
                expect(result.callGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterVerificationGasLimit).toBeUndefined();
                expect(result.paymasterPostOpGasLimit).toBeUndefined();
            });
        });

        //TODO: Test with larger UserOp that deploys a contract
        describe("contract deploy", () => {
            let callData: Hex;

            beforeEach(() => {
                //Deploy hello world contract
                const deployParams = {
                    // "random" salt
                    salt: padHex(owner.address, { size: 32 }),
                    bytecode: MyContract.bytecode,
                };
                const contractDeployTransaction = getDeployDeterministicFunctionData(deployParams);

                callData = encodeFunctionData({
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
                    args: [contractDeployTransaction.to, 0n, contractDeployTransaction.data],
                });
            });

            test("gas price zero", async () => {
                // Estimate gas with 0 balance on smart account and no paymaster, gas price set to 0
                const gasPrice = { maxFeePerGas: 0n, maxPriorityFeePerGas: 0n };
                // Create UserOperation
                const userOp: Omit<
                    UserOperation<"0.7">,
                    "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
                > = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    signature: dummySignature,
                    callData,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                    factory: factoryAddress,
                    factoryData,
                };

                const result = await estimateUserOperationGas(
                    { ...publicClient, entryPointSimulationsAddress },
                    userOp,
                );
                expect(result.preVerificationGas).toBeGreaterThan(0n);
                expect(result.verificationGasLimit).toBeGreaterThan(0n);
                expect(result.callGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterVerificationGasLimit).toBeUndefined();
                expect(result.paymasterPostOpGasLimit).toBeUndefined();
            });

            test("gas price current", async () => {
                // Estimate gas with 0 balance on smart account and no paymaster, gas price set to current
                const gasPrice = await publicClient.estimateFeesPerGas();
                const userOp: Omit<
                    UserOperation<"0.7">,
                    "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
                > = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    signature: dummySignature,
                    callData,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                    factory: factoryAddress,
                    factoryData,
                };

                const result = await estimateUserOperationGas(
                    { ...publicClient, entryPointSimulationsAddress },
                    userOp,
                );
                expect(result.preVerificationGas).toBeGreaterThan(0n);
                expect(result.verificationGasLimit).toBeGreaterThan(0n);
                expect(result.callGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterVerificationGasLimit).toBeUndefined();
                expect(result.paymasterPostOpGasLimit).toBeUndefined();
            });
        });
    });

    describe("paymaster", () => {
        let paymasterAddress: Address;
        let paymasterData: Hex;

        beforeAll(async () => {
            const walletClient = createWalletClient({
                account: getLocalAccount(0, { nonceManager }),
                chain,
                transport,
            });
            // Paymaster
            paymasterAddress = (
                await setupVerifyingPaymaster(walletClient, {
                    verifyingSignerAddress: walletClient.account.address,
                })
            ).address;

            // Paymaster stub data
            const validUntil = Date.now() + 3600;
            const validAfter = 0;
            const paymasterDataUnsigned = encodeAbiParameters(
                [
                    { name: "validUntil", type: "uint48" },
                    { name: "validAfter", type: "uint48" },
                ],
                [validUntil, validAfter],
            );

            paymasterData = concatHex([paymasterDataUnsigned, dummySignature]);
        });

        describe("simple transaction", () => {
            let callData: Hex;

            beforeEach(() => {
                // Encode smart account tx, send to random address
                const to = privateKeyToAccount(generatePrivateKey()).address;
                const value = 0n;
                const data = "0x";

                callData = encodeFunctionData({
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
            });

            test("gas price zero", async () => {
                // Estimate gas with 0 balance on smart account and no paymaster, gas price set to 0
                const gasPrice = { maxFeePerGas: 0n, maxPriorityFeePerGas: 0n };
                // Create UserOperation
                const userOp: Omit<
                    UserOperation<"0.7">,
                    "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
                > = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    signature: dummySignature,
                    callData,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                    factory: factoryAddress,
                    factoryData,
                    paymaster: paymasterAddress,
                    paymasterData,
                };

                const result = await estimateUserOperationGas(
                    { ...publicClient, entryPointSimulationsAddress },
                    userOp,
                );
                expect(result.preVerificationGas).toBeGreaterThan(0n);
                expect(result.verificationGasLimit).toBeGreaterThan(0n);
                expect(result.callGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterVerificationGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterPostOpGasLimit).toBeGreaterThan(0n);
            });

            test("gas price current", async () => {
                // Estimate gas with 0 balance on smart account and no paymaster, gas price set to current
                const gasPrice = await publicClient.estimateFeesPerGas();
                const userOp: Omit<
                    UserOperation<"0.7">,
                    "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
                > = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    signature: dummySignature,
                    callData,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                    factory: factoryAddress,
                    factoryData,
                    paymaster: paymasterAddress,
                    paymasterData,
                };

                const result = await estimateUserOperationGas(
                    { ...publicClient, entryPointSimulationsAddress },
                    userOp,
                );
                expect(result.preVerificationGas).toBeGreaterThan(0n);
                expect(result.verificationGasLimit).toBeGreaterThan(0n);
                expect(result.callGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterVerificationGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterPostOpGasLimit).toBeGreaterThan(0n);
            });
        });

        //TODO: Test with larger UserOp that deploys a contract
        describe("contract deploy", () => {
            let callData: Hex;

            beforeEach(() => {
                //Deploy hello world contract
                const deployParams = {
                    // "random" salt
                    salt: padHex(owner.address, { size: 32 }),
                    bytecode: MyContract.bytecode,
                };
                const contractDeployTransaction = getDeployDeterministicFunctionData(deployParams);

                callData = encodeFunctionData({
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
                    args: [contractDeployTransaction.to, 0n, contractDeployTransaction.data],
                });
            });

            test("gas price zero", async () => {
                // Estimate gas with 0 balance on smart account and no paymaster, gas price set to 0
                const gasPrice = { maxFeePerGas: 0n, maxPriorityFeePerGas: 0n };
                // Create UserOperation
                const userOp: Omit<
                    UserOperation<"0.7">,
                    "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
                > = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    signature: dummySignature,
                    callData,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                    factory: factoryAddress,
                    factoryData,
                    paymaster: paymasterAddress,
                    paymasterData,
                };

                const result = await estimateUserOperationGas(
                    { ...publicClient, entryPointSimulationsAddress },
                    userOp,
                );
                expect(result.preVerificationGas).toBeGreaterThan(0n);
                expect(result.verificationGasLimit).toBeGreaterThan(0n);
                expect(result.callGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterVerificationGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterPostOpGasLimit).toBeGreaterThan(0n);
            });

            test("gas price current", async () => {
                // Estimate gas with 0 balance on smart account and no paymaster, gas price set to current
                const gasPrice = await publicClient.estimateFeesPerGas();
                const userOp: Omit<
                    UserOperation<"0.7">,
                    "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
                > = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    signature: dummySignature,
                    callData,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                    factory: factoryAddress,
                    factoryData,
                    paymaster: paymasterAddress,
                    paymasterData,
                };

                const result = await estimateUserOperationGas(
                    { ...publicClient, entryPointSimulationsAddress },
                    userOp,
                );
                expect(result.preVerificationGas).toBeGreaterThan(0n);
                expect(result.verificationGasLimit).toBeGreaterThan(0n);
                expect(result.callGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterVerificationGasLimit).toBeGreaterThan(0n);
                expect(result.paymasterPostOpGasLimit).toBeGreaterThan(0n);
            });
        });
    });
});
