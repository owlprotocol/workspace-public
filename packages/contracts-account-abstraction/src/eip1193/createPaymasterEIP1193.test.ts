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
    EIP1193RequestFn,
    numberToHex,
} from "viem";
import { localhost } from "viem/chains";
import {
    entryPoint07Address,
    createPaymasterClient,
    SmartAccount,
    waitForUserOperationReceipt,
    PaymasterClient,
    createBundlerClient,
    BundlerClient,
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

import { createHttpEIP1193, createPublicEIP1193 } from "@owlprotocol/backend-public/eip1193";
import { createBackendBundlerEIP1193 } from "./createBundlerEIP1193.js";
import { createBackendPaymasterEIP1193 } from "./createPaymasterEIP1193.js";
import { createBackendBundler } from "../clients/createBackendBundler.js";
import { createBackendPaymaster } from "../clients/createBackendPaymaster.js";
import { port } from "../test/constants.js";
import { getSimpleAccountAddress } from "../SimpleAccount.js";

import { ERC1967Proxy } from "../artifacts/ERC1967Proxy.js";
import { MyContract } from "../artifacts/MyContract.js";
import { setupERC4337Contracts, setupVerifyingPaymaster, topupPaymaster } from "../setupERC4337Contracts.js";

describe("eip1993/createPaymasterEIP1193.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, HDAccount>;

    // Contracts
    let entryPointAddress: typeof entryPoint07Address;
    let entryPointSimulationsAddress: Address;
    let factoryAddress: Address;
    let paymasterAddress: Address;

    // AA clients
    let bundlerTransport: Transport;
    let bundlerClient: BundlerClient;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let paymasterRequest: EIP1193RequestFn;
    let paymasterTransport: Transport;
    let paymasterClient: PaymasterClient;

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

        // ERC4337 Contracts
        const contracts = await setupERC4337Contracts(walletClient);
        entryPointAddress = contracts.entrypoint.address;
        entryPointSimulationsAddress = contracts.pimlicoEntrypointSimulations.address;
        factoryAddress = contracts.simpleAccountFactory.address;

        // Paymaster
        paymasterAddress = (
            await setupVerifyingPaymaster(walletClient, {
                verifyingSignerAddress: walletClient.account.address,
            })
        ).address;

        const { hash: topupHash } = await topupPaymaster(walletClient, {
            paymaster: paymasterAddress,
            minBalance: parseEther("10"),
        });
        if (topupHash) {
            await publicClient.waitForTransactionReceipt({ hash: topupHash });
        }

        // AA Clients
        const requestOverride = createPublicEIP1193(createHttpEIP1193(`http://127.0.0.1:${port}`));

        const bundlerRequest = createBackendBundlerEIP1193(
            createBackendBundler({
                account: getLocalAccount(0) as LocalAccount,
                chain: localhost,
                transport,
                entryPointSimulationsAddress,
            }),
            //viem middleware bypass
            { requestOverride },
        );
        bundlerTransport = custom({
            request: bundlerRequest,
            config: { retryCount: 0 },
        });
        bundlerClient = createBundlerClient({ transport: bundlerTransport });

        paymasterRequest = createBackendPaymasterEIP1193(
            createBackendPaymaster({
                account: getLocalAccount(0) as LocalAccount,
                chain: localhost,
                transport,
                paymaster: paymasterAddress,
            }),
        );
        paymasterTransport = custom({
            request: paymasterRequest,
            config: { retryCount: 0 },
        });
        paymasterClient = createPaymasterClient({ transport: paymasterTransport });
    });

    describe("paymasterClient", () => {
        test("pm_getPaymasterStubData", async () => {
            const result = await paymasterClient.request({
                method: "pm_getPaymasterStubData",
                params: [{} as any, entryPoint07Address, numberToHex(localhost.id), {}],
            });
            expect(result).toBeDefined();
        });
    });

    describe("smartAccountClient", () => {
        // Generated account on each test
        let owner: PrivateKeyAccount;
        let smartAccount: SmartAccount<SimpleSmartAccountImplementation<"0.7">>;
        let smartAccountClient: SmartAccountClient<Transport, Chain, SmartAccount>;

        let contractAddressExpected: Address;
        let contractDeployTransaction: { to: Address; data: Hex };

        beforeEach(async () => {
            owner = privateKeyToAccount(generatePrivateKey());
            const smartAccountAddress = getSimpleAccountAddress(
                {
                    owner: owner.address,
                    salt: 0n,
                },
                {
                    factoryAddress,
                    proxyBytecode: ERC1967Proxy.bytecode,
                },
            );
            smartAccount = await toSimpleSmartAccount({
                address: smartAccountAddress,
                client: publicClient,
                owner: owner,
                factoryAddress,
                entryPoint: {
                    address: entryPointAddress,
                    version: "0.7",
                },
            });
            smartAccountClient = createSmartAccountClient({
                account: smartAccount,
                chain: publicClient.chain,
                paymaster: paymasterClient,
                bundlerTransport,
                userOperation: {
                    estimateFeesPerGas: async () => (await getUserOperationGasPrice(paymasterClient)).fast,
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

        test("smartAccountClient.sendTransaction", async () => {
            const hash = await smartAccountClient.sendTransaction(contractDeployTransaction);
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            expect(receipt).toBeDefined();

            const contractBytecode = await publicClient.getCode({ address: contractAddressExpected });
            expect(contractBytecode).toBeDefined();
        });

        test("smartAccountClient.prepareUserOperation", async () => {
            const userOperation = await smartAccountClient.prepareUserOperation({
                calls: [contractDeployTransaction],
            });
            userOperation.signature = await smartAccount.signUserOperation(userOperation as any);

            const userOpHash = await bundlerClient.sendUserOperation(userOperation as any);
            const userOpReceipt = await waitForUserOperationReceipt(bundlerClient, { hash: userOpHash });
            expect(userOpReceipt).toBeDefined();

            const contractBytecode = await publicClient.getCode({ address: contractAddressExpected });
            expect(contractBytecode).toBeDefined();
        });
    });
});
