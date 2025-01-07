import { describe, test, beforeEach, expect, beforeAll } from "vitest";
import {
    LocalAccount,
    Address,
    Hex,
    createPublicClient,
    createWalletClient,
    http,
    encodeAbiParameters,
    encodeFunctionData,
    parseEther,
    hexToBytes,
    concatHex,
    zeroAddress,
    Hash,
    nonceManager,
} from "viem";
import { localhost } from "viem/chains";
import { getLocalAccount } from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { entryPoint07Address, UserOperation, getUserOperationHash } from "viem/account-abstraction";

import { port } from "./test/constants.js";
import { VerifyingPaymaster } from "./artifacts/VerifyingPaymaster.js";
import { IEntryPoint } from "./artifacts/IEntryPoint.js";
import { getSimpleAccountAddress } from "./SimpleAccount.js";
import { ERC1967Proxy } from "./artifacts/ERC1967Proxy.js";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { dummySignature, encodeUserOp } from "./models/UserOperation.js";
import { erc4337Contracts, setupVerifyingPaymaster } from "./setupERC4337Contracts.js";
import { toPackedUserOperation } from "./models/PackedUserOperation.js";
import { getVerifyingPaymasterHash } from "./VerifyingPaymaster.js";
import {
    estimateUserOperationGas,
    EstimateUserOperationGasParameters07,
} from "./actions/bundler/estimateUserOperationGas.js";

describe("VerifyingPaymaster.test.ts", function () {
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
    const walletClient = createWalletClient({
        account: getLocalAccount(0, { nonceManager }),
        chain,
        transport,
    });

    let simpleAccountFactory: Address;
    let verifyingPaymaster: Address;

    beforeAll(async () => {
        // entryPoint = contracts.entrypoint.address;
        simpleAccountFactory = erc4337Contracts.simpleAccountFactory;
        verifyingPaymaster = (
            await setupVerifyingPaymaster(walletClient, {
                verifyingSignerAddress: walletClient.account.address,
            })
        ).address;
    });

    test("getVerifyingPaymasterHash", async () => {
        const validUntil = Date.now() + 3600;
        const validAfter = 0;
        const paymasterDataUnsigned = encodeAbiParameters(
            [
                { name: "validUntil", type: "uint48" },
                { name: "validAfter", type: "uint48" },
            ],
            [validUntil, validAfter],
        );

        const userOperation: UserOperation<"0.7"> = {
            sender: zeroAddress,
            nonce: 0n,
            factory: zeroAddress,
            factoryData: "0x",
            callData: "0x",
            preVerificationGas: 0n,
            verificationGasLimit: 0n,
            callGasLimit: 0n,
            maxFeePerGas: 0n,
            maxPriorityFeePerGas: 0n,
            signature: dummySignature,
            paymaster: verifyingPaymaster,
            paymasterVerificationGasLimit: 0n,
            paymasterPostOpGasLimit: 0n,
            paymasterData: paymasterDataUnsigned,
        };
        const userOperationPacked = toPackedUserOperation(encodeUserOp(userOperation));

        const hashExpected = (await publicClient.readContract({
            address: verifyingPaymaster,
            abi: VerifyingPaymaster.abi,
            functionName: "getHash",
            args: [userOperationPacked as any, validUntil, validAfter],
        })) as Hash;
        const hash = getVerifyingPaymasterHash({
            chainId: publicClient.chain.id,
            userOperation: userOperationPacked,
        });
        expect(hash).toBe(hashExpected);
    });

    /** Tests involving interacting with an existing paymaster */
    describe("Exec existing Simple Account", () => {
        let account: LocalAccount;
        let simpleAccount: {
            address: Address;
            factoryData: Hex;
            factoryAddress: Address;
        };

        beforeEach(async () => {
            //Get SimpleAccount address
            const privateKey = generatePrivateKey();
            account = privateKeyToAccount(privateKey);

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

            //Pre-fund wallet
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: simpleAccount.address,
                value: 1n,
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });
        });

        /**
         * Create a UserOp from start to end (using Paymaster)
         *   - Encode callData
         *   - Sign UserOp with account owner
         *   - Sign UserOp with paymaster
         *   - Prefund paymaster
         *   - Submit to EntryPoint
         * Also see similar test in SimpleAccount.test.ts without Paymaster.
         **/
        test("submitUserOp - manual", async () => {
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

            // Paymaster data
            const validUntil = Date.now() + 3600;
            const validAfter = 0;
            const paymasterDataUnsigned = encodeAbiParameters(
                [
                    { name: "validUntil", type: "uint48" },
                    { name: "validAfter", type: "uint48" },
                ],
                [validUntil, validAfter],
            );
            const paymasterDataDummySignature = concatHex([paymasterDataUnsigned, dummySignature]);

            // Estimate UserOp gas
            const userOpData: EstimateUserOperationGasParameters07 = {
                sender: simpleAccount.address,
                nonce: 0n,
                callData,
                paymaster: verifyingPaymaster,
                //Empty, will be replaced with signature
                paymasterData: paymasterDataDummySignature,
            };
            const {
                preVerificationGas,
                verificationGasLimit,
                callGasLimit,
                paymasterVerificationGasLimit,
                paymasterPostOpGasLimit,
            } = await estimateUserOperationGas(
                { ...publicClient, entryPointSimulationsAddress: erc4337Contracts.pimlicoEntrypointSimulations },
                userOpData,
            );

            // Construct final UserOp
            const gasPrice = await publicClient.estimateFeesPerGas();
            const userOp: UserOperation<"0.7"> = {
                sender: simpleAccount.address,
                nonce: 0n,
                signature:
                    "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
                callData,
                callGasLimit,
                verificationGasLimit,
                preVerificationGas,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                paymaster: verifyingPaymaster,
                //Empty, will be replaced with signature
                paymasterData: paymasterDataDummySignature,
                paymasterVerificationGasLimit,
                paymasterPostOpGasLimit,
            };
            const userOpPaymasterPacked = toPackedUserOperation(encodeUserOp(userOp));
            const userOpPaymasterHash = await publicClient.readContract({
                address: verifyingPaymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "getHash",
                args: [userOpPaymasterPacked as any, validUntil, validAfter],
            });
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

            const userOpHash = getUserOperationHash({
                userOperation: userOp,
                entryPointAddress: entryPoint07Address,
                entryPointVersion: "0.7",
                chainId: localhost.id,
            });
            const signature = await account.signMessage({
                message: { raw: userOpHash },
            });
            userOp.signature = signature;

            const userOpPacked = toPackedUserOperation(encodeUserOp(userOp));
            //types seem to be inferred as [never[], Address]
            const handleOpsArgs = [[userOpPacked] as any[], walletClient.account.address] as const;

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

            //Simulate handleOps
            const { request } = await publicClient.simulateContract({
                account: walletClient.account,
                address: entryPoint07Address,
                abi: IEntryPoint.abi,
                functionName: "handleOps",
                args: handleOpsArgs,
            });

            //Submit UserOp
            const handleOpsHash = await walletClient.writeContract(request as any);
            await publicClient.waitForTransactionReceipt({ hash: handleOpsHash });

            //Get balanceOf "to"
            const balance = await publicClient.getBalance({ address: to });
            expect(balance).toBe(value);
        });
    });
});
