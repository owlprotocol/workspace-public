import { describe, test, beforeEach, expect } from "vitest";
import {
    LocalAccount,
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
    hexToBytes,
    concatHex,
    decodeErrorResult,
    HDAccount,
    zeroAddress,
    Hash,
} from "viem";
import { localhost } from "viem/chains";
import { getLocalAccount } from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { entryPoint07Address, UserOperation, getUserOperationHash } from "viem/account-abstraction";

import { port } from "./test/constants.js";
import { VerifyingPaymaster } from "./artifacts/VerifyingPaymaster.js";
import { IEntryPoint } from "./artifacts/IEntryPoint.js";
import { abi as EntryPointAbi } from "./artifacts/EntryPoint.js";
import { getSimpleAccountAddress } from "./SimpleAccount.js";
import { ERC1967Proxy } from "./artifacts/ERC1967Proxy.js";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { dummySignature, encodeUserOp } from "./models/UserOperation.js";
import { decodeViemError } from "./isViemError.js";
import { setupERC4337Contracts, setupVerifyingPaymaster } from "./setupERC4337Contracts.js";
import { toPackedUserOperation } from "./models/PackedUserOperation.js";
import { getVerifyingPaymasterHash } from "./VerifyingPaymaster.js";

describe("VerifyingPaymaster.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, HDAccount>;

    // let entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    let simpleAccountFactory: Address;
    let verifyingPaymaster: Address;

    beforeEach(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            //TODO: viem type mismatch
            account: getLocalAccount(0) as unknown as HDAccount,
            chain: localhost,
            transport,
        });
        const contracts = await setupERC4337Contracts({ publicClient, walletClient });
        // entryPoint = contracts.entrypoint.address;
        simpleAccountFactory = contracts.simpleAccountFactory.address;
        verifyingPaymaster = (
            await setupVerifyingPaymaster({
                publicClient,
                walletClient,
                verifyingSignerAddress: walletClient.account.address,
            })
        ).address;
    });

    test.only("getVerifyingPaymasterHash", async () => {
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

            if (!(await publicClient.getBytecode({ address: simpleAccountAddress }))) {
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
            }
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
            const validUntil = Date.now() + 3600;
            const validAfter = 0;
            const paymasterDataUnsigned = encodeAbiParameters(
                [
                    { name: "validUntil", type: "uint48" },
                    { name: "validAfter", type: "uint48" },
                ],
                [validUntil, validAfter],
            );
            const userOp: UserOperation<"0.7"> = {
                sender: simpleAccount.address,
                nonce: 0n,
                signature:
                    "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c",
                callData,
                callGasLimit: 10_000_000n,
                verificationGasLimit: 10_000_000n,
                preVerificationGas: 1_000_000n,
                maxFeePerGas: gasPrice.maxFeePerGas!,
                maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
                paymaster: verifyingPaymaster,
                //Empty, will be replaced with signature
                paymasterData: paymasterDataUnsigned,
                paymasterVerificationGasLimit: 10_000_000n,
                paymasterPostOpGasLimit: 10_000_000n,
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

            //Pre-fund wallet just for transaction (1 wei)
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: simpleAccount.address,
                value: 1n,
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });

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
            try {
                const { request } = await publicClient.simulateContract({
                    account: walletClient.account,
                    address: entryPoint07Address,
                    abi: IEntryPoint.abi,
                    functionName: "handleOps",
                    args: handleOpsArgs,
                });

                //Sumbit UserOp
                const handleOpsHash = await walletClient.writeContract(request as any);
                await publicClient.waitForTransactionReceipt({ hash: handleOpsHash });

                //Get balanceOf vitalik
                const balance = await publicClient.getBalance({ address: to });
                expect(balance).toBeGreaterThanOrEqual(value);
            } catch (err: any) {
                const errorEntryPoint = decodeViemError(err, EntryPointAbi);
                if (errorEntryPoint) {
                    console.error(errorEntryPoint);
                    if (errorEntryPoint.errorName === "FailedOpWithRevert") {
                        const errorPaymaster = decodeErrorResult({
                            abi: VerifyingPaymaster.abi,
                            data: errorEntryPoint.args[2],
                        });
                        console.error(errorPaymaster);
                    }
                }
                throw err;
            }
        });
    });
});
