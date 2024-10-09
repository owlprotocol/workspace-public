import { describe, test, beforeAll, beforeEach, expect } from "vitest";
import {
    Address,
    Chain,
    Transport,
    HDAccount,
    PrivateKeyAccount,
    Hex,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    encodeFunctionData,
    parseEther,
} from "viem";
import { localhost } from "viem/chains";
import { getLocalAccount } from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { entryPoint07Address, UserOperation, getUserOperationHash } from "viem/account-abstraction";

import { port } from "./test/constants.js";
import { SimpleAccountFactory } from "./artifacts/SimpleAccountFactory.js";
import { getSimpleAccountAddress } from "./SimpleAccount.js";
import { SIMPLE_ACCOUNT_IMPLEMENTATION_ADDRESS } from "./constants.js";
import { ERC1967Proxy } from "./artifacts/ERC1967Proxy.js";
import { SimpleAccount } from "./artifacts/SimpleAccount.js";
import { encodeUserOp } from "./models/UserOperation.js";
import { IEntryPoint } from "./artifacts/IEntryPoint.js";
import { setupERC4337Contracts } from "./setupERC4337Contracts.js";
import { toPackedUserOperation } from "./models/PackedUserOperation.js";

describe("SimpleAccount.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    // Fixed account with funding `getLocalAccount(0)`
    let walletClient: WalletClient<Transport, Chain, HDAccount>;
    // Generated account on each test
    let account: PrivateKeyAccount;

    let entryPoint: typeof entryPoint07Address;
    let simpleAccountFactory: Address;
    // let verifyingPaymaster: Address;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
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
        const contracts = await setupERC4337Contracts({ publicClient, walletClient: walletClient });
        entryPoint = contracts.entrypoint.address;
        simpleAccountFactory = contracts.simpleAccountFactory.address;
    });

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
            const accountExistingBytecode = await publicClient.getBytecode({ address: simpleAccountAddressOffchain });
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

            const accountBytecode = await publicClient.getBytecode({ address: simpleAccountAddressOffchain });
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
            const userOp: UserOperation<"0.7"> = {
                sender: simpleAccount.address,
                //TODO: Update nonce
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

            //Sumbit UserOp
            const handleOpsHash = await walletClient.writeContract(request as any);
            await publicClient.waitForTransactionReceipt({ hash: handleOpsHash });

            //Get balanceOf
            const balance = await publicClient.getBalance({ address: to });
            expect(balance).toBe(value);
        });
    });
});
