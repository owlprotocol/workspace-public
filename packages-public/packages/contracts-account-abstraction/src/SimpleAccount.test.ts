import { describe, test, beforeEach, expect } from "vitest";
import ganache from "ganache";
import {
    Account,
    Address,
    Chain,
    CustomTransport,
    Hex,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
    encodeDeployData,
    encodeFunctionData,
    parseEther,
    zeroHash,
} from "viem";
import { localhost } from "viem/chains";
import {
    ANVIL_MNEMONIC,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
    getUtilityAccount,
} from "@owlprotocol/contracts-create2factory";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { UserOperation } from "permissionless/types";
import { signUserOperationHashWithECDSA } from "permissionless/utils";
// import { createSmartAccountClient } from "permissionless";
// import { signerToSimpleSmartAccount } from "permissionless/accounts";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { getSimpleAccountAddress } from "./SimpleAccount.js";
import { ENTRYPOINT_ADDRESS_V07, ENTRYPOINT_SALT_V07, SIMPLE_ACCOUNT_IMPLEMENTATION_ADDRESS } from "./constants.js";
import { ERC1967Proxy } from "./artifacts/ERC1967Proxy.js";
import { SimpleAccount } from "./artifacts/SimpleAccount.js";
import { EntryPoint } from "./artifacts/EntryPoint.js";
import { packUserOp, encodeUserOp } from "./userOp.js";
import { IEntryPoint } from "./artifacts/IEntryPoint.js";
//import { createLocalBundlerClient } from "./createLocalBundler.js";
// import { handleViemError } from "./isViemError.js";

describe("SimpleAccount.test.ts", function () {
    let transport: CustomTransport;
    let publicClient: PublicClient<CustomTransport, Chain>;
    let walletClient: WalletClient<CustomTransport, Chain, Account>;
    let simpleAccountFactory: Address;

    beforeEach(async () => {
        const provider = ganache.provider({ wallet: { mnemonic: ANVIL_MNEMONIC } });
        transport = custom(provider);
        //const transport = http(localhost.rpcUrls.default.http[0]);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getUtilityAccount(),
            chain: localhost,
            transport,
        });
        //Deploy Deterministic Deployer first
        const { hash: hash0 } = await getOrDeployDeterministicDeployer({
            publicClient,
            walletClient,
        });
        await publicClient.waitForTransactionReceipt({ hash: hash0! });

        //Deploy EntryPoint
        const deployParams = {
            salt: ENTRYPOINT_SALT_V07,
            bytecode: EntryPoint.bytecode,
        };
        const entryPointResult = await getOrDeployDeterministicContract({ publicClient, walletClient }, deployParams);
        await publicClient.waitForTransactionReceipt({ hash: entryPointResult.hash! });

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
    });

    /** Tests involving deploying an account */
    describe("Deploy Simple Account", () => {
        test("getSimpleAccountAddress", async () => {
            //Check SimpleAccount implementation address matches expected
            const simpleAccountImplementation = await publicClient.readContract({
                address: simpleAccountFactory,
                abi: SimpleAccountFactory.abi,
                functionName: "accountImplementation",
            });
            expect(simpleAccountImplementation).toBe(SIMPLE_ACCOUNT_IMPLEMENTATION_ADDRESS);

            //Get SimpleAccount address
            const privateKey = generatePrivateKey();
            const account = privateKeyToAccount(privateKey);
            const simpleAccountAddressExpected = await publicClient.readContract({
                address: simpleAccountFactory,
                abi: SimpleAccountFactory.abi,
                functionName: "getAddress",
                args: [account.address, 0n],
            });

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
            expect(simpleAccountAddress).toBe(simpleAccountAddressExpected);

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

            const accountBytecode = await publicClient.getBytecode({ address: simpleAccountAddress });
            expect(accountBytecode).toBeDefined();
            const accountOwner = await publicClient.readContract({
                address: simpleAccountAddress,
                abi: SimpleAccount.abi,
                functionName: "owner",
            });
            expect(accountOwner).toBe(account.address);
        });
    });

    /** Tests involving interacting with an existing account */
    describe("Exec existing Simple Account", () => {
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
        });

        /**
         * Create a UserOp from start to end
         *   - Encode callData
         *   - Sign UserOp with account owner
         *   - Prefund smart account
         *   - Submit to EntryPoint
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
            };
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

            //Pre-fund wallet
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: simpleAccount.address,
                value: parseEther("1"),
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });

            //Simulate handleOps
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
        });

        /**
         * Create a UserOp from start to end
         *   - Encode callData
         *   - Sign UserOp with account owner
         *   - Prefund smart account
         *   - Submit to EntryPoint
         **/
        test.skip("submitUserOp - local bundler", async () => {
            /*
            const bundlerClient = createLocalBundlerClient({
                chain: localhost,
                transport,
                account: walletClient.account,
                entryPoint: ENTRYPOINT_ADDRESS_V07,
            });

            const smartAccountSigner = walletClientToSmartAccountSigner(walletClient);
            const smartAccount = await signerToSimpleSmartAccount(publicClient, {
                signer: smartAccountSigner,
                factoryAddress: simpleAccountFactory,
                entryPoint: ENTRYPOINT_ADDRESS_V07,
                address: simpleAccount.address,
            });

            const smartAccountClient = createSmartAccountClient({
                account: smartAccount,
                entryPoint: ENTRYPOINT_ADDRESS_V07,
                chain: localhost,
                bundlerTransport: custom(bundlerClient),
                middleware: {
                    gasPrice: async () => {
                        return (await bundlerClient.getUserOperationGasPrice()).fast;
                    },
                },
            });

            //Pre-fund smart account
            try {
                const fundSimpleAccountHash = await walletClient.sendTransaction({
                    to: simpleAccount.address,
                    value: parseEther("1"),
                });
                await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });

                const to = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // vitalik
                const value = 1n;
                const data = "0x";
                const userOpTxHash = await smartAccountClient.sendTransaction({
                    to,
                    value,
                    data,
                });
                await publicClient.waitForTransactionReceipt({ hash: userOpTxHash });

                //Get balanceOf vitalik
                const balance = await publicClient.getBalance({ address: to });
                expect(balance).toBe(value);
            } catch (error: any) {
                handleViemError(error);
            }
            */
        });
    });
});
