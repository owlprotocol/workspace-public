import { describe, test, beforeAll, beforeEach, expect } from "vitest";
import {
    Address,
    Chain,
    Transport,
    createPublicClient,
    createWalletClient,
    http,
    parseEther,
    PrivateKeyAccount,
    padHex,
    LocalAccount,
    custom,
    Hex,
    EIP1193RequestFn,
    zeroHash,
    nonceManager,
} from "viem";
import { localhost } from "viem/chains";
import {
    entryPoint07Address,
    SmartAccount,
    waitForUserOperationReceipt,
    createBundlerClient,
    BundlerClient,
} from "viem/account-abstraction";

import {
    getLocalAccount,
    getDeployDeterministicAddress,
    getDeployDeterministicFunctionData,
    getOrDeployDeterministicDeployer,
} from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { SimpleSmartAccountImplementation, toSimpleSmartAccount } from "permissionless/accounts";
import { createSmartAccountClient, SmartAccountClient } from "permissionless/clients";
import { createHttpEIP1193, createPublicEIP1193 } from "@owlprotocol/backend-public/eip1193";

import {
    createBackendBundlerEIP1193,
    getSimpleAccountAddress,
    setupERC4337Contracts,
} from "@owlprotocol/contracts-account-abstraction";

import { ERC1967Proxy } from "@owlprotocol/contracts-account-abstraction/artifacts/ERC1967Proxy";
import { MyContract } from "@owlprotocol/contracts-account-abstraction/artifacts/MyContract";
import { ethUserOpReceiptResource, ethUserOpResource } from "@owlprotocol/eth-firebase/admin";
import { createRequestGetUserOperationByHashWithFirebase } from "./bundler/requestGetUserOperationByHash.js";
import { createRequestGetUserOperationReceiptWithFirebase } from "./bundler/requestGetUserOperationReceipt.js";
import { port } from "../test/constants.js";
import { createBackendBundlerWithFirebase } from "../clients/createBackendBundler.js";

describe("eip1993/creatBundlerEIP1193.test.ts", function () {
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

    // Contracts
    let entryPointAddress: typeof entryPoint07Address;
    let entryPointSimulationsAddress: Address;
    let factoryAddress: Address;

    // AA clients
    let bundlerRequest: EIP1193RequestFn;
    let bundlerTransport: Transport;
    let bundlerClient: BundlerClient;

    beforeAll(async () => {
        //Deploy Deterministic Deployer first
        const { hash } = await getOrDeployDeterministicDeployer(walletClient);
        if (hash) {
            await publicClient.waitForTransactionReceipt({ hash });
        }
        // ERC4337 Contracts
        const contracts = await setupERC4337Contracts(walletClient);
        entryPointAddress = contracts.entrypoint.address;
        entryPointSimulationsAddress = contracts.pimlicoEntrypointSimulations.address;
        factoryAddress = contracts.simpleAccountFactory.address;

        // AA Clients
        const requestOverride = createPublicEIP1193(createHttpEIP1193(`http://127.0.0.1:${port}`));

        bundlerRequest = createBackendBundlerEIP1193(
            createBackendBundlerWithFirebase({
                account: getLocalAccount(0) as LocalAccount,
                chain: localhost,
                transport,
                entryPointSimulationsAddress,
            }),
            //viem middleware bypass
            {
                requestOverride,
                createRequestGetUserOperationByHash: createRequestGetUserOperationByHashWithFirebase,
                createRequestGetUserOperationReceipt: createRequestGetUserOperationReceiptWithFirebase,
            },
        );
        bundlerTransport = custom({
            request: bundlerRequest,
            config: { retryCount: 0 },
        });
        bundlerClient = createBundlerClient({ transport: bundlerTransport });
    });

    describe("bundlerClient", () => {
        test("eth_getUserOperationByHash", async () => {
            const result = await bundlerClient.request({ method: "eth_getUserOperationByHash", params: [zeroHash] });
            expect(result).toBeNull();
        });

        test("eth_getUserOperationReceipt", async () => {
            const result = await bundlerClient.request({ method: "eth_getUserOperationReceipt", params: [zeroHash] });
            expect(result).toBeNull();
        });
    });

    describe("smartAccountClient", () => {
        // Generated account on each test
        let owner: PrivateKeyAccount;
        let smartAccount: SmartAccount<SimpleSmartAccountImplementation<"0.7">>;
        let smartAccountClient: SmartAccountClient<Transport, Chain, SmartAccount<SimpleSmartAccountImplementation>>;

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
                bundlerTransport,
            });

            //Deploy hello world contract
            const deployParams = {
                // "random" salt
                salt: padHex(owner.address, { size: 32 }),
                bytecode: MyContract.bytecode,
            };
            contractDeployTransaction = getDeployDeterministicFunctionData(deployParams);
            contractAddressExpected = getDeployDeterministicAddress(deployParams);

            //Pre-fund wallet just to pay tx cost
            const fundSimpleAccountHash = await walletClient.sendTransaction({
                to: smartAccount.address,
                value: parseEther("5"),
            });
            await publicClient.waitForTransactionReceipt({ hash: fundSimpleAccountHash });
        });

        test("smartAccountClient.sendTransaction", async () => {
            const hash = await smartAccountClient.sendTransaction(contractDeployTransaction);
            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            expect(receipt).toBeDefined();

            const contractBytecode = await publicClient.getCode({ address: contractAddressExpected });
            expect(contractBytecode).toBeDefined();

            // Check Firebase indexing
            const userOperationReceiptFromFirebase = await ethUserOpReceiptResource.getWhereFirst({
                chainId: localhost.id,
                transactionHash: hash,
            });
            expect(userOperationReceiptFromFirebase).toBeDefined();
        });

        test("smartAccountClient.prepareUserOperation", async () => {
            const userOperation = await smartAccountClient.prepareUserOperation({
                calls: [contractDeployTransaction],
            });
            userOperation.signature = await smartAccount.signUserOperation(userOperation as any);
            const userOpHash = await bundlerClient.sendUserOperation(userOperation);
            const userOpReceipt = await waitForUserOperationReceipt(bundlerClient, { hash: userOpHash });
            expect(userOpReceipt).toBeDefined();

            const contractBytecode = await publicClient.getCode({ address: contractAddressExpected });
            expect(contractBytecode).toBeDefined();

            // Check Firebase indexing
            const userOperationReceiptFromFirebase = await ethUserOpReceiptResource.getWhereFirst({
                chainId: localhost.id,
                transactionHash: userOpReceipt.receipt.transactionHash,
            });
            expect(userOperationReceiptFromFirebase).toBeDefined();
            // Check Firebase indexing
            const userOperationFromFirebase = await ethUserOpResource.getOrNull({ chainId: localhost.id, userOpHash });
            expect(userOperationFromFirebase).toBeDefined();
        });
    });
});
