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
import { ENTRYPOINT_ADDRESS_V07_TYPE, UserOperation } from "permissionless/types";
import { signUserOperationHashWithECDSA } from "permissionless/utils";
import { getSenderAddress } from "permissionless";
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

// TODO: FIXME: connection to anvil in GitHub
describe.skip("SimpleAccount.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    // Fixed account with funding `getLocalAccount(0)`
    let walletClient: WalletClient<Transport, Chain, HDAccount>;
    // Generated account on each test
    let account: PrivateKeyAccount;

    let entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    let simpleAccountFactory: Address;
    // let verifyingPaymaster: Address;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0),
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
            //2. Use permissionless getSenderAddress (patched) to call Entrypoint (throw error & catch)
            const factoryData = encodeFunctionData({
                abi: [
                    {
                        inputs: [
                            { name: "owner", type: "address" },
                            { name: "salt", type: "uint256" },
                        ],
                        name: "createAccount",
                        outputs: [{ name: "ret", type: "address" }],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                args: [account.address, 0n],
            });
            const simpleAccountAddressFromGetSender = await getSenderAddress(publicClient, {
                factory: simpleAccountFactory,
                factoryData,
                entryPoint,
            });
            expect(simpleAccountAddressFromGetSender).toBe(simpleAccountAddressFromFactory);

            //3. Compute off-chain with no calls
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
            const userOp: UserOperation<"v0.7"> = {
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
