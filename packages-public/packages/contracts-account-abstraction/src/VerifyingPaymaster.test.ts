import { describe, test, beforeEach, expect } from "vitest";
import ganache from "ganache";
import {
    Account,
    Address,
    Chain,
    CustomTransport,
    Hex,
    LocalAccount,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
    encodeAbiParameters,
    encodeDeployData,
    encodeFunctionData,
    parseEther,
    zeroHash,
    hexToBytes,
    concatHex,
} from "viem";
import { localhost } from "viem/chains";
import {
    ANVIL_MNEMONIC,
    getDeployDeterministicAddress,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
    getUtilityAccount,
} from "@owlprotocol/contracts-create2factory";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { signUserOperationHashWithECDSA } from "permissionless/utils";
import { UserOperation } from "permissionless/types";
import { VerifyingPaymaster } from "./artifacts/VerifyingPaymaster.js";
import { ENTRYPOINT_ADDRESS_V07, ENTRYPOINT_SALT_V07 } from "./constants.js";
import { EntryPoint } from "./artifacts/EntryPoint.js";
import { IEntryPoint } from "./artifacts/IEntryPoint.js";
import { getSimpleAccountAddress } from "./SimpleAccount.js";
import { ERC1967Proxy } from "./artifacts/ERC1967Proxy.js";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { encodeUserOp, packUserOp } from "./userOp.js";
import { handleViemError } from "./isViemError.js";

describe("VerifyingPaymaster.test.ts", function () {
    let publicClient: PublicClient<CustomTransport, Chain>;
    let walletClient: WalletClient<CustomTransport, Chain, LocalAccount>;
    let transport: CustomTransport;

    beforeEach(async () => {
        const provider = ganache.provider({
            chain: { vmErrorsOnRPCResponse: true },
            wallet: { mnemonic: ANVIL_MNEMONIC },
        });
        transport = custom(provider);
        //const transport = http(localhost.rpcUrls.default.http[0]);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        //@ts-expect-error
        walletClient = createWalletClient({
            account: getUtilityAccount(),
            chain: localhost,
            transport,
        });
        //Deploy Deterministic Deployer first
        const { hash } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
        await publicClient.waitForTransactionReceipt({ hash: hash! });

        //Deploy EntryPoint
        const deployParams = {
            salt: ENTRYPOINT_SALT_V07,
            bytecode: EntryPoint.bytecode,
        };
        const entryPointResult = await getOrDeployDeterministicContract({ publicClient, walletClient }, deployParams);
        await publicClient.waitForTransactionReceipt({ hash: entryPointResult.hash! });
    });

    /** Tests involving deploying a paymaster */
    describe("Deploy Verifying Paymater", () => {
        test.skip("deploy", async () => {
            const deployParams = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: VerifyingPaymaster.abi,
                    bytecode: VerifyingPaymaster.bytecode,
                    args: [ENTRYPOINT_ADDRESS_V07, walletClient.account.address],
                }),
            };
            //Check address defined
            const address = getDeployDeterministicAddress(deployParams);
            expect(address).toBeDefined();

            //Deploy new
            const resultDeploy = await getOrDeployDeterministicContract({ publicClient, walletClient }, deployParams);
            expect(resultDeploy.existed).toBe(false);
            expect(resultDeploy.hash).toBeDefined();
            expect(resultDeploy.address).toBe(address);

            //Wait for receipt
            const receipt = await publicClient.waitForTransactionReceipt({ hash: resultDeploy.hash! });
            //receipt.contractAddress null since using factory
            expect(receipt.contractAddress).toBe(null);

            //Get existing
            const resultGet = await getOrDeployDeterministicContract({ publicClient, walletClient }, deployParams);
            expect(resultGet.existed).toBe(true);
            expect(resultGet.hash).toBeUndefined();
            expect(resultGet.address).toBe(address);
        });
    });

    /** Tests involving interacting with an existing paymaster */
    describe("Exec existing Simple Account", () => {
        let account: Account;
        let simpleAccountFactory: Address;
        let simpleAccount: {
            address: Address;
            factoryData: Hex;
            factoryAddress: Address;
        };
        let paymaster: Address;

        beforeEach(async () => {
            //Deploy VerifyingPaymaster
            const paymasterDeployParams = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: VerifyingPaymaster.abi,
                    bytecode: VerifyingPaymaster.bytecode,
                    args: [ENTRYPOINT_ADDRESS_V07, walletClient.account.address],
                }),
            };
            const paymasterResult = await getOrDeployDeterministicContract(
                { publicClient, walletClient },
                paymasterDeployParams,
            );
            await publicClient.waitForTransactionReceipt({ hash: paymasterResult.hash! });
            paymaster = paymasterResult.address;
            //Deploy SimpleAccountFactory
            const simpleAccountFactoryDeployParams = {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: SimpleAccountFactory.abi,
                    bytecode: SimpleAccountFactory.bytecode,
                    args: [ENTRYPOINT_ADDRESS_V07],
                }),
            };
            const simpleAccountFactoryResult = await getOrDeployDeterministicContract(
                { publicClient, walletClient },
                simpleAccountFactoryDeployParams,
            );
            await publicClient.waitForTransactionReceipt({ hash: simpleAccountFactoryResult.hash! });
            simpleAccountFactory = simpleAccountFactoryResult.address;

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
            const userOp: UserOperation<"v0.7"> = {
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
                paymaster,
                //Empty, will be replaced with signature
                paymasterData: paymasterDataUnsigned,
                paymasterVerificationGasLimit: 10_000_000n,
                paymasterPostOpGasLimit: 10_000_000n,
            };
            const userOpPaymasterPacked = packUserOp(encodeUserOp(userOp));

            const userOpPaymasterHash = await publicClient.readContract({
                address: paymaster,
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
            console.debug(paymasterSignatureBytes.length);

            expect(paymasterSignatureBytes.length).toBeGreaterThanOrEqual(64);
            expect(paymasterSignatureBytes.length).toBeLessThanOrEqual(65);

            const paymasterDataSigned = concatHex([paymasterDataUnsigned, paymasterSignature]);
            userOp.paymasterData = paymasterDataSigned;

            const signature = await signUserOperationHashWithECDSA({
                account,
                userOperation: userOp,
                chainId: localhost.id,
                entryPoint: ENTRYPOINT_ADDRESS_V07,
            });
            userOp.signature = signature;

            const userOpPacked = packUserOp(encodeUserOp(userOp));
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
                address: paymaster,
                abi: VerifyingPaymaster.abi,
                functionName: "deposit",
                value: parseEther("10"),
                args: [],
            });
            const depositHash = await walletClient.writeContract(paymasterDeposit.request);
            await publicClient.waitForTransactionReceipt({ hash: depositHash });

            //Simulate handleOps
            try {
                const { request } = await publicClient.simulateContract({
                    account: walletClient.account,
                    address: ENTRYPOINT_ADDRESS_V07,
                    abi: IEntryPoint.abi,
                    functionName: "handleOps",
                    args: handleOpsArgs,
                });

                //Sumbit UserOp
                const handleOpsHash = await walletClient.writeContract(request as any);
                await publicClient.waitForTransactionReceipt({ hash: handleOpsHash });

                //Get balanceOf vitalik
                const balance = await publicClient.getBalance({ address: to });
                expect(balance).toBe(value);
            } catch (error: any) {
                handleViemError(error);
            }
        });
    });
});
