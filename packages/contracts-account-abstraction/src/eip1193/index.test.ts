import { describe, test, beforeAll, beforeEach, expect } from "vitest";
import {
    Address,
    Chain,
    Transport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
    parseEther,
    HDAccount,
    PrivateKeyAccount,
    padHex,
    LocalAccount,
    custom,
    Hex,
} from "viem";
import { localhost } from "viem/chains";
import {
    entryPoint07Address,
    createPaymasterClient,
    SmartAccount,
    waitForUserOperationReceipt,
} from "viem/account-abstraction";

import {
    getLocalAccount,
    getDeployDeterministicAddress,
    getDeployDeterministicFunctionData,
} from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { SimpleSmartAccountImplementation, toSimpleSmartAccount } from "permissionless/accounts";
import { createSmartAccountClient, SmartAccountClient } from "permissionless/clients";
import { getUserOperationGasPrice } from "permissionless/actions/pimlico";

import { createBackendBundlerEIP1193 } from "./createBundlerEIP1193.js";
import { createBackendPaymasterEIP1193 } from "./createPaymasterEIP1193.js";
import { BackendBundler, createBackendBundler } from "../clients/createBackendBundler.js";
import { createBackendPaymaster } from "../clients/createBackendPaymaster.js";
import { port } from "../test/constants.js";
import { getSimpleAccountAddress } from "../SimpleAccount.js";
import { ERC1967Proxy } from "../artifacts/ERC1967Proxy.js";
import { MyContract } from "../artifacts/MyContract.js";
import { setupERC4337Contracts, setupVerifyingPaymaster, topupPaymaster } from "../setupERC4337Contracts.js";

describe("eip1993/index.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, HDAccount>;

    let bundlerTransport: Transport;
    let paymasterTransport: Transport;
    let bundlerClient: BackendBundler;

    let entryPointAddress: typeof entryPoint07Address;
    let entryPointSimulationsAddress: Address;
    let simpleAccountFactory: Address;
    let verifyingPaymaster: Address;

    // Generated account on each test
    let owner: PrivateKeyAccount;
    let smartAccount: SmartAccount<SimpleSmartAccountImplementation>;

    let contractAddressExpected: Address;
    let contractDeployTransaction: { to: Address; data: Hex };

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0) as unknown as HDAccount,
            chain: localhost,
            transport,
        });

        const contracts = await setupERC4337Contracts({
            publicClient,
            walletClient,
        });
        entryPointAddress = contracts.entrypoint.address;
        //TODO: we use the Pimlico simulator?
        entryPointSimulationsAddress = contracts.pimlicoEntrypointSimulations.address;
        simpleAccountFactory = contracts.simpleAccountFactory.address;

        //Deploy paymaster
        verifyingPaymaster = (
            await setupVerifyingPaymaster({
                publicClient,
                walletClient,
                verifyingSignerAddress: walletClient.account.address,
            })
        ).address;

        const { hash: topupHash } = await topupPaymaster({
            publicClient,
            walletClient,
            paymaster: verifyingPaymaster,
            minBalance: parseEther("10"),
        });
        if (topupHash) {
            await publicClient.waitForTransactionReceipt({ hash: topupHash });
        }

        bundlerClient = createBackendBundler({
            account: getLocalAccount(0) as LocalAccount,
            chain: localhost,
            transport,
            entryPointSimulationsAddress,
        });
        bundlerTransport = custom({
            request: createBackendBundlerEIP1193(bundlerClient),
        });
        paymasterTransport = custom({
            request: createBackendPaymasterEIP1193(
                createBackendPaymaster({
                    account: getLocalAccount(0) as LocalAccount,
                    chain: localhost,
                    transport,
                    paymaster: verifyingPaymaster,
                }),
            ),
        });
    });

    beforeEach(async () => {
        owner = privateKeyToAccount(generatePrivateKey());
        const smartAccountAddress = getSimpleAccountAddress(
            {
                owner: owner.address,
                salt: 0n,
            },
            {
                factoryAddress: simpleAccountFactory,
                proxyBytecode: ERC1967Proxy.bytecode,
            },
        );

        smartAccount = await toSimpleSmartAccount({
            address: smartAccountAddress,
            client: publicClient,
            owner: owner,
            factoryAddress: simpleAccountFactory,
            entryPoint: {
                address: entryPointAddress,
                version: "0.7",
            },
        });

        //Deploy hello world contract
        const deployParams = {
            // "random" salt
            salt: padHex(owner.address, { size: 32 }),
            bytecode: MyContract.bytecode,
        };
        contractDeployTransaction = getDeployDeterministicFunctionData(deployParams);
        contractAddressExpected = getDeployDeterministicAddress(deployParams);
    });
    /** Tests involving deploying the smart account */
    //TODO: Not working
    describe.skip("No Paymaster", () => {
        let smartAccountClient: SmartAccountClient<Transport, Chain, SmartAccount<SimpleSmartAccountImplementation>>;

        beforeEach(async () => {
            smartAccountClient = createSmartAccountClient({
                account: smartAccount,
                chain: publicClient.chain,
                bundlerTransport,
            });

            //Pre-fund wallet just to pay tx cost
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: smartAccount.address,
                value: parseEther("5"),
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });
        });

        test("smartAccountClient.sendTransaction", async () => {
            //Deploy hello world contract
            const deployParams = {
                salt: padHex(owner.address, { size: 32 }),
                bytecode: MyContract.bytecode,
            };
            const { to, data } = getDeployDeterministicFunctionData(deployParams);
            const contractAddress = getDeployDeterministicAddress(deployParams);

            const hash = await smartAccountClient.sendTransaction({ to, data });
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            expect(receipt).toBeDefined();

            const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
            expect(contractBytecode).toBeDefined();
        });

        test("smartAccountClient.prepareUserOperation", async () => {
            //Deploy hello world contract
            const deployParams = {
                salt: padHex(owner.address, { size: 32 }),
                bytecode: MyContract.bytecode,
            };
            const { to, data } = getDeployDeterministicFunctionData(deployParams);
            const contractAddress = getDeployDeterministicAddress(deployParams);

            const userOperation = await smartAccountClient.prepareUserOperation({
                calls: [{ to, data }],
            });
            const userOpHash = await bundlerClient.sendUserOperation(userOperation);
            const userOpReceipt = await waitForUserOperationReceipt(bundlerClient, { hash: userOpHash });
            expect(userOpReceipt).toBeDefined();

            const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
            expect(contractBytecode).toBeDefined();
        });
    });

    describe("Paymaster", () => {
        let smartAccountClient: SmartAccountClient<Transport, Chain, SmartAccount>;

        beforeEach(() => {
            const paymaster = createPaymasterClient({ transport: paymasterTransport });
            smartAccountClient = createSmartAccountClient({
                account: smartAccount,
                chain: publicClient.chain,
                paymaster,
                bundlerTransport,
                userOperation: {
                    estimateFeesPerGas: async () => (await getUserOperationGasPrice(paymaster)).fast,
                },
            });
        });

        test("smartAccountClient.sendTransaction", async () => {
            const hash = await smartAccountClient.sendTransaction(contractDeployTransaction);
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            expect(receipt).toBeDefined();

            const contractBytecode = await publicClient.getBytecode({ address: contractAddressExpected });
            expect(contractBytecode).toBeDefined();
        });

        test("smartAccountClient.prepareUserOperation", async () => {
            const userOperation = await smartAccountClient.prepareUserOperation({
                calls: [contractDeployTransaction],
            });
            userOperation.signature = await smartAccount.signUserOperation(userOperation as any);

            const userOpHash = await bundlerClient.sendUserOperation(userOperation);
            const userOpReceipt = await waitForUserOperationReceipt(bundlerClient, { hash: userOpHash });
            expect(userOpReceipt).toBeDefined();

            const contractBytecode = await publicClient.getBytecode({ address: contractAddressExpected });
            expect(contractBytecode).toBeDefined();
        });
    });
});
