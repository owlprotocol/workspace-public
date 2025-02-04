import { describe, test, beforeEach, expect } from "vitest";
import {
    createPublicClient,
    http,
    PrivateKeyAccount,
    encodeFunctionData,
    Hex,
    padHex,
    Address,
    createWalletClient,
    encodeAbiParameters,
    concatHex,
    parseEther,
    LocalAccount,
    zeroAddress,
    toHex,
    Chain,
    nonceManager,
    Account,
    HttpTransport,
} from "viem";
import { localhost } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import {
    getUserOperationHash,
    entryPoint07Address,
    UserOperation,
    GetUserOperationParameters,
    GetUserOperationReceiptParameters,
    waitForUserOperationReceipt,
} from "viem/account-abstraction";
import { getDeployDeterministicFunctionData, getLocalAccount, getUtilityAccount } from "@owlprotocol/viem-utils";
import { NODE_ENV } from "@owlprotocol/envvars";
import { sepolia } from "@owlprotocol/chains";
import {
    estimateUserOperationGas,
    EstimateUserOperationGasParameters07,
    getPaymasterSlot,
} from "./estimateUserOperationGas.js";
import { sendUserOperation } from "./sendUserOperation.js";
import { getUserOperation } from "./getUserOperation.js";
import { getUserOperationReceipt } from "./getUserOperationReceipt.js";
import { port } from "../../test/constants.js";
import { getSimpleAccountAddress } from "../../SimpleAccount.js";
import { erc4337Contracts, setupVerifyingPaymaster } from "../../setupERC4337Contracts.js";

import { ERC1967Proxy } from "../../artifacts/ERC1967Proxy.js";
import { createAccount as createAccountAbi } from "../../artifacts/SimpleAccountFactory.js";
import { execute as executeAbi } from "../../artifacts/SimpleAccount.js";
import { MyContract } from "../../artifacts/MyContract.js";
import { deposit as depositAbi, getHash as getHashAbi } from "../../artifacts/VerifyingPaymaster.js";

import { dummySignature, encodeUserOp } from "../../models/UserOperation.js";
import { toPackedUserOperation } from "../../models/PackedUserOperation.js";
import { ENTRYPOINT_ADDRESS_V07 } from "../../constants.js";
import { getUserOperationTotalGas } from "../../utils/getUserOperationTotalGas.js";

/**
 * The tests below simulate submitting a UserOp using the viem actions:
 *   - Encode callData (simple transaction or MyContract deploy)
 *   - Estimate UserOp gas (gas price set to 0, optional paymaster gas values)
 *   - Construct UserOp with current gas price and gas estimations
 *   - Sign UserOp with paymaster
 *   - Sign UserOp with smart account owner
 *   - Prefund smart account OR paymaster
 *   - Submit to EntryPoint
 *
 * Important to note is the "prefund" step is done AFTER gas estimation, which highlights
 * how irregardless of current balance, `estimateUserOperationGas` will succeed. Checking
 * current smart account / paymaster balance is left as a responsibility to the user.
 **/
describe("actions/bundler/sendUserOperation.test.ts", function () {
    let chain: Chain;
    let account: Account;
    let transport: HttpTransport;

    if (NODE_ENV === "test") {
        chain = {
            ...localhost,
            rpcUrls: {
                default: {
                    http: [`http://127.0.0.1:${port}`],
                },
            },
        };
        account = getLocalAccount(0, { nonceManager });
        transport = http(chain.rpcUrls.default.http[0]);
    } else {
        chain = sepolia as unknown as Chain;
        account = getUtilityAccount({ nonceManager });
        transport = http(sepolia.rpcUrls.drpc!.http[0]);
    }

    const publicClient = createPublicClient({
        chain,
        transport,
    });
    const bundlerClient = publicClient.extend((client) => {
        return {
            getUserOperation: (parameters: GetUserOperationParameters) => getUserOperation(client, parameters),
            getUserOperationReceipt: (parameters: GetUserOperationReceiptParameters) =>
                getUserOperationReceipt(client, parameters),
        };
    });

    const walletClient = createWalletClient({
        account,
        chain,
        transport,
    });

    // const testClient = createTestClient({ mode: "anvil", chain, transport });

    // Contracts
    const entryPointSimulationsAddress = erc4337Contracts.pimlicoEntrypointSimulations;
    const factoryAddress = erc4337Contracts.simpleAccountFactory;

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
            abi: [createAccountAbi],
            functionName: "createAccount",
            args: [owner.address, 0n],
        });
    });

    describe("smart account prefund", () => {
        describe("simple transaction", () => {
            let callData: Hex;

            beforeEach(async () => {
                // Encode smart account tx, send to random address
                const to = privateKeyToAccount(generatePrivateKey()).address;
                const value = 0n;
                const data = "0x";

                callData = encodeFunctionData({
                    abi: [executeAbi],
                    args: [to, value, data],
                });
            });

            test("sendUserOperation", async () => {
                // Construct UserOp
                const gasPrice = await publicClient.estimateFeesPerGas();

                const userOpData: EstimateUserOperationGasParameters07 = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    callData,
                    factory: factoryAddress,
                    factoryData,
                    maxFeePerGas: gasPrice.maxFeePerGas,
                };

                // Estimate UserOp gas
                const {
                    preVerificationGas,
                    verificationGasLimit,
                    callGasLimit,
                    paymasterVerificationGasLimit,
                    paymasterPostOpGasLimit,
                } = await estimateUserOperationGas({ ...publicClient, entryPointSimulationsAddress }, userOpData);
                expect(preVerificationGas).toBeGreaterThan(0n);
                expect(verificationGasLimit).toBeGreaterThan(0n);
                expect(callGasLimit).toBeGreaterThan(0n);
                expect(paymasterVerificationGasLimit).toBeUndefined();
                expect(paymasterPostOpGasLimit).toBeUndefined();

                const userOp: UserOperation<"0.7"> = {
                    ...userOpData,
                    signature: dummySignature,
                    callGasLimit,
                    verificationGasLimit,
                    preVerificationGas,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                };
                console.log({ userOp });

                // Sign UserOp
                const userOpHash = getUserOperationHash({
                    userOperation: userOp,
                    entryPointAddress: entryPoint07Address,
                    entryPointVersion: "0.7",
                    chainId: chain.id,
                });
                console.log({ userOpHash });

                const signature = await owner.signMessage({
                    message: { raw: userOpHash },
                });
                userOp.signature = signature;

                //Pre-fund wallet
                const prefundHash = await walletClient.sendTransaction({
                    to: smartAccountAddress,
                    value: getUserOperationTotalGas(userOp),
                });
                console.log({ prefundHash });
                await publicClient.waitForTransactionReceipt({ hash: prefundHash });

                // Send UserOp
                const userOpHashSent = await sendUserOperation(walletClient, userOp);
                expect(userOpHashSent).toBe(userOpHash);

                console.log("waitingForUserOpReceipt");
                // Wait for UserOp confirmation
                // We use the extended "bundlerClient" that has `getUserOperationReceipt` action
                const userOpReceipt = await waitForUserOperationReceipt(bundlerClient, { hash: userOpHash });
                expect(userOpReceipt.userOpHash).toBe(userOpHash);
                expect(userOpReceipt.success).toBe(true);
                // Get UserOp
                const userOpSent = await bundlerClient.getUserOperation({ hash: userOpHash });
                expect(userOpSent.userOperation).toStrictEqual({
                    ...userOp,
                    callData: userOp.callData.toLowerCase(),
                    paymaster: zeroAddress,
                    paymasterData: "0x",
                    paymasterPostOpGasLimit: 0n,
                    paymasterVerificationGasLimit: 0n,
                });
            });
        });

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
                    abi: [executeAbi],
                    args: [contractDeployTransaction.to, 0n, contractDeployTransaction.data],
                });
            });

            test("sendUserOperation", async () => {
                const gasPrice = await publicClient.estimateFeesPerGas();

                const userOpData: EstimateUserOperationGasParameters07 = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    callData,
                    factory: factoryAddress,
                    factoryData,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                };

                // Estimate UserOp gas
                const {
                    preVerificationGas,
                    verificationGasLimit,
                    callGasLimit,
                    paymasterVerificationGasLimit,
                    paymasterPostOpGasLimit,
                } = await estimateUserOperationGas({ ...publicClient, entryPointSimulationsAddress }, userOpData);
                expect(preVerificationGas).toBeGreaterThan(0n);
                expect(verificationGasLimit).toBeGreaterThan(0n);
                expect(callGasLimit).toBeGreaterThan(0n);
                expect(paymasterVerificationGasLimit).toBeUndefined();
                expect(paymasterPostOpGasLimit).toBeUndefined();

                // Construct UserOp
                const userOp: UserOperation<"0.7"> = {
                    ...userOpData,
                    signature: dummySignature,
                    callGasLimit,
                    verificationGasLimit,
                    preVerificationGas,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                };

                // Sign UserOp
                const userOpHash = getUserOperationHash({
                    userOperation: userOp,
                    entryPointAddress: entryPoint07Address,
                    entryPointVersion: "0.7",
                    chainId: chain.id,
                });
                const signature = await owner.signMessage({
                    message: { raw: userOpHash },
                });
                userOp.signature = signature;

                //Pre-fund wallet
                const prefundHash = await walletClient.sendTransaction({
                    to: smartAccountAddress,
                    value: getUserOperationTotalGas(userOp),
                });
                await publicClient.waitForTransactionReceipt({ hash: prefundHash });

                // Send UserOp
                const userOpHashSent = await sendUserOperation(walletClient, userOp);
                expect(userOpHashSent).toBe(userOpHash);

                // Wait for UserOp confirmation
                // We use the extended "bundlerClient" that has `getUserOperationReceipt` action
                const userOpReceipt = await waitForUserOperationReceipt(bundlerClient, { hash: userOpHash });
                expect(userOpReceipt.userOpHash).toBe(userOpHash);
                expect(userOpReceipt.success).toBe(true);
                // Get UserOp
                const userOpSent = await bundlerClient.getUserOperation({ hash: userOpHash });
                expect(userOpSent.userOperation).toStrictEqual({
                    ...userOp,
                    callData: userOp.callData.toLowerCase(),
                    paymaster: zeroAddress,
                    paymasterData: "0x",
                    paymasterPostOpGasLimit: 0n,
                    paymasterVerificationGasLimit: 0n,
                });
            });
        });
    });

    describe("paymaster", () => {
        let paymasterSigner: LocalAccount;
        let paymasterAddress: Address;

        let validUntil: number;
        let validAfter: number;
        let paymasterDataUnsigned: Hex;
        let paymasterDataDummySignature: Hex;

        beforeEach(async () => {
            // Deploy a UNIQUE paymaster each time so it can have 0 stake at gas estimation time
            // Paymaster
            paymasterSigner = privateKeyToAccount(generatePrivateKey());
            paymasterAddress = (
                await setupVerifyingPaymaster(walletClient, {
                    verifyingSignerAddress: paymasterSigner.address,
                })
            ).address;

            // Paymaster stub data
            validUntil = Date.now() + 3600;
            validAfter = 0;
            paymasterDataUnsigned = encodeAbiParameters(
                [
                    { name: "validUntil", type: "uint48" },
                    { name: "validAfter", type: "uint48" },
                ],
                [validUntil, validAfter],
            );
            paymasterDataDummySignature = concatHex([paymasterDataUnsigned, dummySignature]);
        });

        test.skipIf(NODE_ENV != "test")("paymaster deposit", async () => {
            const paymasterSlot = getPaymasterSlot(paymasterAddress);

            const slotValueBefore = await publicClient.getStorageAt({
                address: ENTRYPOINT_ADDRESS_V07,
                slot: paymasterSlot,
            });

            expect(slotValueBefore).toEqual(toHex(0, { size: 32 }));

            const topupAmount = parseEther("0.0000001");

            const paymasterDeposit = await publicClient.simulateContract({
                account: walletClient.account,
                address: paymasterAddress,
                abi: [depositAbi],
                functionName: "deposit",
                value: topupAmount,
                args: [],
            });
            const paymasterDepositHash = await walletClient.writeContract(paymasterDeposit.request);
            await publicClient.waitForTransactionReceipt({ hash: paymasterDepositHash });

            const slotValueAfter = await publicClient.getStorageAt({
                address: ENTRYPOINT_ADDRESS_V07,
                slot: paymasterSlot,
            });

            expect(slotValueAfter).toEqual(toHex(topupAmount, { size: 32 }));
        });

        describe("simple transaction", () => {
            let callData: Hex;

            beforeEach(() => {
                // Encode smart account tx, send to random address
                const to = privateKeyToAccount(generatePrivateKey()).address;
                const value = 0n;
                const data = "0x";

                callData = encodeFunctionData({
                    abi: [executeAbi],
                    args: [to, value, data],
                });
            });

            test("sendUserOperation", async () => {
                const gasPrice = await publicClient.estimateFeesPerGas();

                const userOpData: EstimateUserOperationGasParameters07 = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    callData,
                    factory: factoryAddress,
                    factoryData,
                    paymaster: paymasterAddress,
                    paymasterData: paymasterDataDummySignature,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                };

                // Estimate UserOp gas
                const {
                    preVerificationGas,
                    verificationGasLimit,
                    callGasLimit,
                    paymasterVerificationGasLimit,
                    paymasterPostOpGasLimit,
                } = await estimateUserOperationGas({ ...publicClient, entryPointSimulationsAddress }, userOpData);
                expect(preVerificationGas).toBeGreaterThan(0n);
                expect(verificationGasLimit).toBeGreaterThan(0n);
                expect(callGasLimit).toBeGreaterThan(0n);
                expect(paymasterVerificationGasLimit).toBeGreaterThan(0n);
                expect(paymasterPostOpGasLimit).toBeGreaterThan(0n);

                // Construct UserOp
                const userOp: UserOperation<"0.7"> = {
                    ...userOpData,
                    signature: dummySignature,
                    callGasLimit,
                    verificationGasLimit,
                    preVerificationGas,
                    paymasterVerificationGasLimit,
                    paymasterPostOpGasLimit,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                };

                // Sign Paymaster Data
                const userOpPaymasterPacked = toPackedUserOperation(encodeUserOp(userOp));
                const userOpPaymasterHash = await publicClient.readContract({
                    address: paymasterAddress,
                    abi: [getHashAbi],
                    functionName: "getHash",
                    args: [userOpPaymasterPacked as any, validUntil, validAfter],
                });
                const paymasterSignature = await paymasterSigner.signMessage({
                    message: {
                        raw: userOpPaymasterHash,
                    },
                });
                const paymasterDataSigned = concatHex([paymasterDataUnsigned, paymasterSignature]);
                userOp.paymasterData = paymasterDataSigned;

                // Sign UserOp
                const userOpHash = getUserOperationHash({
                    userOperation: userOp,
                    entryPointAddress: entryPoint07Address,
                    entryPointVersion: "0.7",
                    chainId: chain.id,
                });
                const signature = await owner.signMessage({
                    message: { raw: userOpHash },
                });
                userOp.signature = signature;

                // Pre-fund paymaster
                const paymasterDeposit = await publicClient.simulateContract({
                    account: walletClient.account,
                    address: paymasterAddress,
                    abi: [depositAbi],
                    functionName: "deposit",
                    value: getUserOperationTotalGas(userOp),
                    args: [],
                });
                const paymasterDepositHash = await walletClient.writeContract(paymasterDeposit.request);
                await publicClient.waitForTransactionReceipt({ hash: paymasterDepositHash });

                // Send UserOp
                const userOpHashSent = await sendUserOperation(walletClient, userOp);
                expect(userOpHashSent).toBe(userOpHash);

                // Wait for UserOp confirmation
                // We use the extended "bundlerClient" that has `getUserOperationReceipt` action
                const userOpReceipt = await waitForUserOperationReceipt(bundlerClient, { hash: userOpHash });
                expect(userOpReceipt.userOpHash).toBe(userOpHash);
                expect(userOpReceipt.success).toBe(true);
                // Get UserOp
                const userOpSent = await bundlerClient.getUserOperation({ hash: userOpHash });
                expect(userOpSent.userOperation).toStrictEqual({
                    ...userOp,
                    callData: userOp.callData.toLowerCase(),
                });
            });
        });

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
                    abi: [executeAbi],
                    args: [contractDeployTransaction.to, 0n, contractDeployTransaction.data],
                });
            });

            test("sendUserOperation", async () => {
                const gasPrice = await publicClient.estimateFeesPerGas();

                const userOpData: EstimateUserOperationGasParameters07 = {
                    sender: smartAccountAddress,
                    nonce: 0n,
                    callData,
                    factory: factoryAddress,
                    factoryData,
                    paymaster: paymasterAddress,
                    paymasterData: paymasterDataDummySignature,
                    maxFeePerGas: gasPrice.maxFeePerGas,
                };

                // Estimate UserOp gas
                const {
                    preVerificationGas,
                    verificationGasLimit,
                    callGasLimit,
                    paymasterVerificationGasLimit,
                    paymasterPostOpGasLimit,
                } = await estimateUserOperationGas({ ...publicClient, entryPointSimulationsAddress }, userOpData);
                expect(preVerificationGas).toBeGreaterThan(0n);
                expect(verificationGasLimit).toBeGreaterThan(0n);
                expect(callGasLimit).toBeGreaterThan(0n);
                expect(paymasterVerificationGasLimit).toBeGreaterThan(0n);
                expect(paymasterPostOpGasLimit).toBeGreaterThan(0n);

                // Construct UserOp
                const userOp: UserOperation<"0.7"> = {
                    ...userOpData,
                    signature: dummySignature,
                    callGasLimit,
                    verificationGasLimit,
                    preVerificationGas,
                    paymasterVerificationGasLimit,
                    paymasterPostOpGasLimit,
                    maxFeePerGas: gasPrice.maxFeePerGas!,
                    maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                };

                // Sign Paymaster Data
                const userOpPaymasterPacked = toPackedUserOperation(encodeUserOp(userOp));
                const userOpPaymasterHash = await publicClient.readContract({
                    address: paymasterAddress,
                    abi: [getHashAbi],
                    functionName: "getHash",
                    args: [userOpPaymasterPacked as any, validUntil, validAfter],
                });
                const paymasterSignature = await paymasterSigner.signMessage({
                    message: {
                        raw: userOpPaymasterHash,
                    },
                });
                const paymasterDataSigned = concatHex([paymasterDataUnsigned, paymasterSignature]);
                userOp.paymasterData = paymasterDataSigned;

                // Sign UserOp
                const userOpHash = getUserOperationHash({
                    userOperation: userOp,
                    entryPointAddress: entryPoint07Address,
                    entryPointVersion: "0.7",
                    chainId: chain.id,
                });
                const signature = await owner.signMessage({
                    message: { raw: userOpHash },
                });
                userOp.signature = signature;

                // Pre-fund paymaster
                const paymasterDeposit = await publicClient.simulateContract({
                    account: walletClient.account,
                    address: paymasterAddress,
                    abi: [depositAbi],
                    functionName: "deposit",
                    value: getUserOperationTotalGas(userOp),
                    args: [],
                });
                const paymasterDepositHash = await walletClient.writeContract(paymasterDeposit.request);
                await publicClient.waitForTransactionReceipt({ hash: paymasterDepositHash });

                // Send UserOp
                const userOpHashSent = await sendUserOperation(walletClient, userOp);
                expect(userOpHashSent).toBe(userOpHash);

                // Wait for UserOp confirmation
                // We use the extended "bundlerClient" that has `getUserOperationReceipt` action
                const userOpReceipt = await waitForUserOperationReceipt(bundlerClient, { hash: userOpHash });
                expect(userOpReceipt.userOpHash).toBe(userOpHash);
                expect(userOpReceipt.success).toBe(true);
                // Get UserOp
                const userOpSent = await bundlerClient.getUserOperation({ hash: userOpHash });
                expect(userOpSent.userOperation).toStrictEqual({
                    ...userOp,
                    callData: userOp.callData.toLowerCase(),
                });
            });
        });
    });
});
