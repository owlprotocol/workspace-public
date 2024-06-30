import { describe, test, beforeEach, expect } from "vitest";
import {
    Account,
    Address,
    Chain,
    Transport,
    Hex,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    encodeAbiParameters,
    encodeFunctionData,
    parseEther,
    HDAccount,
    hexToBytes,
    concatHex,
    zeroHash,
} from "viem";
import { localhost } from "viem/chains";
import {
    getLocalAccount,
    getDeployDeterministicAddress,
    getDeployDeterministicFunctionData,
} from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { ENTRYPOINT_ADDRESS_V07_TYPE, UserOperation } from "permissionless/types";
import { signUserOperationHashWithECDSA } from "permissionless/utils";
import { UserOperationGasFields, estimateUserOperationGas } from "./estimateUserOperationGas.js";
import { VerifyingPaymaster } from "../artifacts/VerifyingPaymaster.js";
import { getSimpleAccountAddress } from "../SimpleAccount.js";
import { ERC1967Proxy } from "../artifacts/ERC1967Proxy.js";
import { SimpleAccountFactory } from "../artifacts/SimpleAccountFactory.js";
import { IEntryPoint } from "../artifacts/IEntryPoint.js";
import { MyContract } from "../artifacts/MyContract.js";
import { setupERC4337Contracts, setupVerifyingPaymaster } from "../setupERC4337Contracts.js";
import { toPackedUserOperation } from "../models/PackedUserOperation.js";
import { encodeUserOp, dummySignature } from "../models/UserOperation.js";

describe("estimateUserOperationGas.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, HDAccount>;

    let entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    let entryPointSimulationsAddress: Address;
    let simpleAccountFactory: Address;

    beforeEach(async () => {
        const transport = http("http://localhost:8545/1");
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });
        const contracts = await setupERC4337Contracts({ publicClient, walletClient });
        entryPoint = contracts.entrypoint.address;
        //TODO: we use the Pimlico simulator?
        entryPointSimulationsAddress = contracts.pimlicoEntrypointSimulations.address;
        simpleAccountFactory = contracts.simpleAccountFactory.address;
    });

    /** Tests involving interacting with an existing paymaster */
    describe("Existing Simple Account", () => {
        let account: Account;
        let simpleAccount: {
            address: Address;
            factoryData: Hex;
            factoryAddress: Address;
        };

        beforeEach(async () => {
            //Get SimpleAccount address
            const privateKey = generatePrivateKey();
            account = privateKeyToAccount(privateKey);
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
        test.only("estimateUserOperationGas - No Paymaster", async () => {
            //Pre-fund wallet just to pay tx cost
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: simpleAccount.address,
                value: parseEther("5"),
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });

            //Create UserOp
            //Encode smart account tx, send mock to vitalik
            const to = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // vitalik
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
            const userOpData: Omit<UserOperation<"v0.7">, UserOperationGasFields> = {
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
                userOpData,
                entryPoint,
                publicClient,
                entryPointSimulationsAddress,
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
            console.debug(userOpGas);

            const userOp = { ...userOpData, ...userOpGas };

            //Sign UserOp
            const signature = await signUserOperationHashWithECDSA({
                account,
                userOperation: userOp,
                chainId: localhost.id,
                entryPoint,
            });
            userOp.signature = signature;

            const userOpPacked = toPackedUserOperation(encodeUserOp(userOp));
            //types seem to be inferred as [never[], Address]
            const handleOpsArgs = [[userOpPacked] as any[], walletClient.account.address] as const;

            //Simulate handleOps
            const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: entryPoint,
                abi: IEntryPoint.abi,
                functionName: "handleOps",
                args: handleOpsArgs,
            });

            //Submit UserOp
            const handleOpsHash = await walletClient.writeContract(request as any);
            await publicClient.waitForTransactionReceipt({ hash: handleOpsHash });

            //Get balanceOf vitalik
            const balance = await publicClient.getBalance({ address: to });
            expect(balance).toBeGreaterThanOrEqual(value);
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
            //Deploy paymaster
            const verifyingPaymaster = (
                await setupVerifyingPaymaster({
                    publicClient,
                    walletClient,
                    verifyingSignerAddress: walletClient.account.address,
                })
            ).address;
            //Pre-fund paymaster
            const paymasterDeposit = await publicClient.simulateContract({
                account: walletClient.account,
                address: verifyingPaymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "deposit",
                value: parseEther("10"),
                args: [],
            });
            const paymasterDepositHash = await walletClient.writeContract(paymasterDeposit.request);
            await publicClient.waitForTransactionReceipt({ hash: paymasterDepositHash });

            //Encode smart account tx, send mock to vitalik
            const to = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // vitalik
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
            const validUntil = Date.now() + 3600;
            const validAfter = 0;
            const paymasterDataUnsigned = encodeAbiParameters(
                [
                    { name: "validUntil", type: "uint48" },
                    { name: "validAfter", type: "uint48" },
                ],
                [validUntil, validAfter],
            );
            const dummySignatureBytes = hexToBytes(dummySignature);
            expect(dummySignatureBytes.length).toBeGreaterThanOrEqual(64);
            expect(dummySignatureBytes.length).toBeLessThanOrEqual(65);
            const userOpData: Omit<UserOperation<"v0.7">, UserOperationGasFields> = {
                sender: simpleAccount.address,
                nonce: 0n,
                signature: dummySignature,
                callData,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                paymaster: verifyingPaymaster,
                //Empty, will be replaced with signature
                paymasterData: concatHex([paymasterDataUnsigned, dummySignature]),
            };

            //Estimate UserOp gas
            const userOpGas = await estimateUserOperationGas(
                userOpData,
                entryPoint,
                publicClient,
                entryPointSimulationsAddress,
            );
            console.debug(userOpGas);

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
                paymasterData: paymasterDataUnsigned,
            };
            //Compute UserOp hash
            const userOpPaymasterPacked = toPackedUserOperation(encodeUserOp(userOp));
            //TODO: Is this needed? Can be computed off-chain
            const userOpPaymasterHash = await publicClient.readContract({
                address: verifyingPaymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "getHash",
                args: [userOpPaymasterPacked as any, validUntil, validAfter],
            });
            //Sign paymaster data
            const paymasterSignature = await walletClient.account.signMessage({
                message: {
                    raw: userOpPaymasterHash,
                },
            });
            const paymasterSignatureBytes = hexToBytes(paymasterSignature);
            expect(paymasterSignatureBytes.length).toBeGreaterThanOrEqual(64);
            expect(paymasterSignatureBytes.length).toBeLessThanOrEqual(65);
            const paymasterDataSigned = concatHex([paymasterDataUnsigned, paymasterSignature]);
            userOp.paymasterData = paymasterDataSigned;

            //Sign UserOp
            const signature = await signUserOperationHashWithECDSA({
                account,
                userOperation: userOp,
                chainId: localhost.id,
                entryPoint,
            });
            userOp.signature = signature;

            const userOpPacked = toPackedUserOperation(encodeUserOp(userOp));
            //types seem to be inferred as [never[], Address]
            const handleOpsArgs = [[userOpPacked] as any[], walletClient.account.address] as const;

            //Simulate handleOps
            const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: entryPoint,
                abi: IEntryPoint.abi,
                functionName: "handleOps",
                args: handleOpsArgs,
            });

            //Submit UserOp
            const handleOpsHash = await walletClient.writeContract(request as any);
            await publicClient.waitForTransactionReceipt({ hash: handleOpsHash });

            //Get balanceOf vitalik
            const balance = await publicClient.getBalance({ address: to });
            expect(balance).toBe(value);
        });

        test("estimateUserOperationGas - Paymaster Deploy Contract", async () => {
            //Deploy paymaster
            const verifyingPaymaster = (
                await setupVerifyingPaymaster({
                    publicClient,
                    walletClient,
                    verifyingSignerAddress: walletClient.account.address,
                })
            ).address;
            //Pre-fund paymaster
            const paymasterDeposit = await publicClient.simulateContract({
                account: walletClient.account,
                address: verifyingPaymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "deposit",
                value: parseEther("10"),
                args: [],
            });
            const paymasterDepositHash = await walletClient.writeContract(paymasterDeposit.request);
            await publicClient.waitForTransactionReceipt({ hash: paymasterDepositHash });

            //Encode smart account tx, deploy hello contract
            //Deploy hello world contract
            const deployParams = {
                salt: zeroHash,
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
            const validUntil = Date.now() + 3600;
            const validAfter = 0;
            const paymasterDataUnsigned = encodeAbiParameters(
                [
                    { name: "validUntil", type: "uint48" },
                    { name: "validAfter", type: "uint48" },
                ],
                [validUntil, validAfter],
            );
            const dummySignature =
                "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
            const dummySignatureBytes = hexToBytes(dummySignature);
            expect(dummySignatureBytes.length).toBeGreaterThanOrEqual(64);
            expect(dummySignatureBytes.length).toBeLessThanOrEqual(65);
            const userOpData: Omit<UserOperation<"v0.7">, UserOperationGasFields> = {
                sender: simpleAccount.address,
                nonce: 0n,
                signature: dummySignature,
                callData,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                paymaster: verifyingPaymaster,
                //Empty, will be replaced with signature
                paymasterData: concatHex([paymasterDataUnsigned, dummySignature]),
            };

            //Estimate UserOp gas
            const userOpGas = await estimateUserOperationGas(
                userOpData,
                entryPoint,
                publicClient,
                entryPointSimulationsAddress,
            );
            console.debug(userOpGas);

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
                paymasterData: paymasterDataUnsigned,
            };
            //Compute UserOp hash
            const userOpPaymasterPacked = toPackedUserOperation(encodeUserOp(userOp));
            //TODO: Is this needed? Can be computed off-chain
            const userOpPaymasterHash = await publicClient.readContract({
                address: verifyingPaymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "getHash",
                args: [userOpPaymasterPacked as any, validUntil, validAfter],
            });
            //Sign paymaster data
            const paymasterSignature = await walletClient.account.signMessage({
                message: {
                    raw: userOpPaymasterHash,
                },
            });
            const paymasterSignatureBytes = hexToBytes(paymasterSignature);
            expect(paymasterSignatureBytes.length).toBeGreaterThanOrEqual(64);
            expect(paymasterSignatureBytes.length).toBeLessThanOrEqual(65);
            const paymasterDataSigned = concatHex([paymasterDataUnsigned, paymasterSignature]);
            userOp.paymasterData = paymasterDataSigned;

            //Sign UserOp
            const signature = await signUserOperationHashWithECDSA({
                account,
                userOperation: userOp,
                chainId: localhost.id,
                entryPoint,
            });
            userOp.signature = signature;

            const userOpPacked = toPackedUserOperation(encodeUserOp(userOp));
            //types seem to be inferred as [never[], Address]
            const handleOpsArgs = [[userOpPacked] as any[], walletClient.account.address] as const;

            //Simulate handleOps
            const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: entryPoint,
                abi: IEntryPoint.abi,
                functionName: "handleOps",
                args: handleOpsArgs,
            });

            //Submit UserOp
            const handleOpsHash = await walletClient.writeContract(request as any);
            await publicClient.waitForTransactionReceipt({ hash: handleOpsHash });

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
            const privateKey = generatePrivateKey();
            const account = privateKeyToAccount(privateKey);
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
                salt: zeroHash,
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
            const userOpData: Omit<UserOperation<"v0.7">, UserOperationGasFields> = {
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
                userOpData,
                entryPoint,
                publicClient,
                entryPointSimulationsAddress,
            );
            console.debug(userOpGas);

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
            const signature = await signUserOperationHashWithECDSA({
                account,
                userOperation: userOp,
                chainId: localhost.id,
                entryPoint,
            });
            userOp.signature = signature;

            const userOpPacked = toPackedUserOperation(encodeUserOp(userOp));
            //types seem to be inferred as [never[], Address]
            const handleOpsArgs = [[userOpPacked] as any[], walletClient.account.address] as const;

            //Simulate handleOps
            const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: entryPoint,
                abi: IEntryPoint.abi,
                functionName: "handleOps",
                args: handleOpsArgs,
            });

            //Submit UserOp
            const handleOpsHash = await walletClient.writeContract(request as any);
            await publicClient.waitForTransactionReceipt({ hash: handleOpsHash });

            const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
            expect(contractBytecode).toBeDefined();
        });

        test("estimateUserOperationGas - Paymaster Deploy Contract", async () => {
            //Deploy paymaster
            const verifyingPaymaster = (
                await setupVerifyingPaymaster({
                    publicClient,
                    walletClient,
                    verifyingSignerAddress: walletClient.account.address,
                })
            ).address;
            //Pre-fund paymaster
            const paymasterDeposit = await publicClient.simulateContract({
                account: walletClient.account,
                address: verifyingPaymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "deposit",
                value: parseEther("10"),
                args: [],
            });
            const paymasterDepositHash = await walletClient.writeContract(paymasterDeposit.request);
            await publicClient.waitForTransactionReceipt({ hash: paymasterDepositHash });

            //Encode smart account tx, deploy smart account & hello contract
            //Deploy smart account data
            //Get SimpleAccount address
            const privateKey = generatePrivateKey();
            const account = privateKeyToAccount(privateKey);
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
                salt: zeroHash,
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
            const validUntil = Date.now() + 3600;
            const validAfter = 0;
            const paymasterDataUnsigned = encodeAbiParameters(
                [
                    { name: "validUntil", type: "uint48" },
                    { name: "validAfter", type: "uint48" },
                ],
                [validUntil, validAfter],
            );
            const dummySignature =
                "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
            const dummySignatureBytes = hexToBytes(dummySignature);
            expect(dummySignatureBytes.length).toBeGreaterThanOrEqual(64);
            expect(dummySignatureBytes.length).toBeLessThanOrEqual(65);
            const userOpData: Omit<UserOperation<"v0.7">, UserOperationGasFields> = {
                sender: simpleAccount.address,
                factory: simpleAccount.factoryAddress,
                factoryData: simpleAccount.factoryData,
                nonce: 0n,
                signature: dummySignature,
                callData,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                paymaster: verifyingPaymaster,
                //Empty, will be replaced with signature
                paymasterData: concatHex([paymasterDataUnsigned, dummySignature]),
            };

            //Estimate UserOp gas
            const userOpGas = await estimateUserOperationGas(
                userOpData,
                entryPoint,
                publicClient,
                entryPointSimulationsAddress,
            );
            console.debug(userOpGas);

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
                paymasterData: paymasterDataUnsigned,
            };
            //Compute UserOp hash
            const userOpPaymasterPacked = toPackedUserOperation(encodeUserOp(userOp));
            //TODO: Is this needed? Can be computed off-chain
            const userOpPaymasterHash = await publicClient.readContract({
                address: verifyingPaymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "getHash",
                args: [userOpPaymasterPacked as any, validUntil, validAfter],
            });
            //Sign paymaster data
            const paymasterSignature = await walletClient.account.signMessage({
                message: {
                    raw: userOpPaymasterHash,
                },
            });
            const paymasterSignatureBytes = hexToBytes(paymasterSignature);
            expect(paymasterSignatureBytes.length).toBeGreaterThanOrEqual(64);
            expect(paymasterSignatureBytes.length).toBeLessThanOrEqual(65);
            const paymasterDataSigned = concatHex([paymasterDataUnsigned, paymasterSignature]);
            userOp.paymasterData = paymasterDataSigned;

            //Sign UserOp
            const signature = await signUserOperationHashWithECDSA({
                account,
                userOperation: userOp,
                chainId: localhost.id,
                entryPoint,
            });
            userOp.signature = signature;

            const userOpPacked = toPackedUserOperation(encodeUserOp(userOp));
            //types seem to be inferred as [never[], Address]
            const handleOpsArgs = [[userOpPacked] as any[], walletClient.account.address] as const;

            //Simulate handleOps
            const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: entryPoint,
                abi: IEntryPoint.abi,
                functionName: "handleOps",
                args: handleOpsArgs,
            });

            //Submit UserOp
            const handleOpsHash = await walletClient.writeContract(request as any);
            await publicClient.waitForTransactionReceipt({ hash: handleOpsHash });

            const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
            expect(contractBytecode).toBeDefined();
        });
    });
});
