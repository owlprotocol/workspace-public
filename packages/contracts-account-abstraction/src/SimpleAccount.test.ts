import { describe, test, beforeEach, expect } from "vitest";
import {
    Address,
    PrivateKeyAccount,
    Hex,
    createPublicClient,
    createWalletClient,
    http,
    encodeFunctionData,
    parseEther,
    nonceManager,
} from "viem";
import { localhost } from "viem/chains";
import { getLocalAccount } from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { UserOperation, getUserOperationHash } from "viem/account-abstraction";

import { port } from "./test/constants.js";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { getSimpleAccountAddress } from "./SimpleAccount.js";
import { SIMPLE_ACCOUNT_IMPLEMENTATION_ADDRESS } from "./constants.js";
import { ERC1967Proxy } from "./artifacts/ERC1967Proxy.js";
import { SimpleAccount } from "./artifacts/SimpleAccount.js";
import { encodeUserOp } from "./models/UserOperation.js";
import { IEntryPoint } from "./artifacts/IEntryPoint.js";
import { erc4337Contracts } from "./setupERC4337Contracts.js";
import { toPackedUserOperation } from "./models/PackedUserOperation.js";
import {
    estimateUserOperationGas,
    EstimateUserOperationGasParameters07,
} from "./actions/bundler/estimateUserOperationGas.js";

describe("SimpleAccount.test.ts", function () {
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

    // Generated account on each test
    let account: PrivateKeyAccount;
    const entryPoint = erc4337Contracts.entrypoint;
    const simpleAccountFactory = erc4337Contracts.simpleAccountFactory;

    beforeEach(async () => {
        account = privateKeyToAccount(generatePrivateKey());
    });

    /** Tests involving deploying an account */
    describe("Deploy Simple Account", () => {
        /**
         * Get simple account address using different methods
         */
        test("getSimpleAccountAddress", async () => {
            //Check SimpleAccount implementation address matches expected
            const simpleAccountImplementation = await publicClient.readContract({
                address: simpleAccountFactory,
                abi: SimpleAccountFactory.abi,
                functionName: "accountImplementation",
            });
            expect(simpleAccountImplementation).toBe(SIMPLE_ACCOUNT_IMPLEMENTATION_ADDRESS);

            //1. Call SimpleAccountFActory directly
            const simpleAccountAddressFromFactory = await publicClient.readContract({
                address: simpleAccountFactory,
                abi: SimpleAccountFactory.abi,
                functionName: "getAddress",
                args: [account.address, 0n],
            });
            //2. Compute off-chain with no calls
            const simpleAccountAddressOffchain = getSimpleAccountAddress(
                {
                    owner: account.address,
                    salt: 0n,
                },
                {
                    factoryAddress: simpleAccountFactory,
                    proxyBytecode: ERC1967Proxy.bytecode,
                },
            );
            expect(simpleAccountAddressOffchain).toBe(simpleAccountAddressFromFactory);

            //Counterfactual address no code
            const accountExistingBytecode = await publicClient.getCode({ address: simpleAccountAddressOffchain });
            expect(
                accountExistingBytecode,
                "Generated smart account counterfactual address should have 0x code",
            ).toBeUndefined();

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

            const accountBytecode = await publicClient.getCode({ address: simpleAccountAddressOffchain });
            expect(accountBytecode).toBeDefined();
            const accountOwner = await publicClient.readContract({
                address: simpleAccountAddressOffchain,
                abi: SimpleAccount.abi,
                functionName: "owner",
            });
            expect(accountOwner).toBe(account.address);
        });
    });

    /** Tests involving interacting with an existing account */
    describe("Exec existing Simple Account", () => {
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
            //Encode smart account tx, send to random address
            const to = privateKeyToAccount(generatePrivateKey()).address;
            const value = 0n;
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

            // Estimate UserOp gas
            const userOpData: EstimateUserOperationGasParameters07 = {
                sender: simpleAccount.address,
                nonce: 0n,
                callData,
            };
            const { preVerificationGas, verificationGasLimit, callGasLimit } = await estimateUserOperationGas(
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
            };
            const userOpHash = getUserOperationHash({
                userOperation: userOp,
                entryPointAddress: entryPoint,
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

            //Pre-fund wallet
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: simpleAccount.address,
                value: parseEther("1"),
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });

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
        });
    });
});
