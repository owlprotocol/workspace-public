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
} from "viem";
import { localhost } from "viem/chains";
import { entryPoint07Address, createPaymasterClient } from "viem/account-abstraction";

import {
    getLocalAccount,
    getDeployDeterministicAddress,
    getDeployDeterministicFunctionData,
} from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { toSimpleSmartAccount } from "permissionless/accounts";
import { createSmartAccountClient } from "permissionless/clients";
import { getUserOperationGasPrice } from "permissionless/actions/pimlico";

import { createBackendBundlerEIP1193 } from "./createBundlerEIP1193.js";
import { createBackendPaymasterEIP1193 } from "./createPaymasterEIP1193.js";
import { createBackendBundler } from "../clients/createBackendBundler.js";
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

    // Generated account on each test
    let account: PrivateKeyAccount;

    let entryPointAddress: typeof entryPoint07Address;
    let entryPointSimulationsAddress: Address;
    let simpleAccountFactory: Address;
    let verifyingPaymaster: Address;

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

        bundlerTransport = custom({
            request: createBackendBundlerEIP1193(
                createBackendBundler({
                    account: getLocalAccount(0) as LocalAccount,
                    chain: localhost,
                    transport,
                    entryPointSimulationsAddress,
                }),
            ),
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

    beforeEach(() => {
        account = privateKeyToAccount(generatePrivateKey());
    });
    /** Tests involving deploying the smart account */
    test("No Paymaster Deploy Contract", async () => {
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

        const simpleAccount = await toSimpleSmartAccount({
            address: simpleAccountAddress,
            client: publicClient,
            owner: account,
            factoryAddress: simpleAccountFactory,
            entryPoint: {
                address: entryPointAddress,
                version: "0.7",
            },
        });

        //Pre-fund wallet just to pay tx cost
        const fundSimpleAccountHash = await walletClient.sendTransaction({
            to: simpleAccount.address,
            value: parseEther("5"),
        });
        await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });

        //Deploy hello world contract
        const deployParams = {
            salt: padHex(account.address, { size: 32 }),
            bytecode: MyContract.bytecode,
        };
        const { to, data } = getDeployDeterministicFunctionData(deployParams);
        const contractAddress = getDeployDeterministicAddress(deployParams);
        const smartAccountClient = createSmartAccountClient({
            account: simpleAccount,
            chain: publicClient.chain,
            bundlerTransport,
        });
        const hash = await smartAccountClient.sendTransaction({ to, data });
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        expect(receipt).toBeDefined();

        const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
        expect(contractBytecode).toBeDefined();
    });

    test.only("Paymaster Deploy Contract", async () => {
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

        const simpleAccount = await toSimpleSmartAccount({
            address: simpleAccountAddress,
            client: publicClient,
            owner: account,
            factoryAddress: simpleAccountFactory,
            entryPoint: {
                address: entryPointAddress,
                version: "0.7",
            },
        });

        //Deploy hello world contract
        const deployParams = {
            salt: padHex(account.address, { size: 32 }),
            bytecode: MyContract.bytecode,
        };
        const { to, data } = getDeployDeterministicFunctionData(deployParams);
        const contractAddress = getDeployDeterministicAddress(deployParams);
        const paymaster = createPaymasterClient({ transport: paymasterTransport });

        const smartAccountClient = createSmartAccountClient({
            account: simpleAccount,
            chain: publicClient.chain,
            paymaster,
            bundlerTransport,
            userOperation: {
                estimateFeesPerGas: async () => (await getUserOperationGasPrice(paymaster)).fast,
            },
        });
        const hash = await smartAccountClient.sendTransaction({ to, data });
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        expect(receipt).toBeDefined();

        const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
        expect(contractBytecode).toBeDefined();
    });
});
