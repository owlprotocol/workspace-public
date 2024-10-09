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
    encodeFunctionData,
    parseEther,
    HDAccount,
    PrivateKeyAccount,
    hexToBytes,
    padHex,
    LocalAccount,
} from "viem";
import { localhost } from "viem/chains";
import {
    UserOperation,
    entryPoint07Address,
    getUserOperationHash,
    waitForUserOperationReceipt,
} from "viem/account-abstraction";

import {
    getLocalAccount,
    getDeployDeterministicAddress,
    getDeployDeterministicFunctionData,
} from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import {
    setupERC4337Contracts,
    setupVerifyingPaymaster,
    topupPaymaster,
    getSimpleAccountAddress,
} from "@owlprotocol/contracts-account-abstraction";
import { UserOperationGasLimitFields } from "@owlprotocol/contracts-account-abstraction/actions";
import { ERC1967Proxy, SimpleAccountFactory, MyContract } from "@owlprotocol/contracts-account-abstraction/artifacts";
import { BackendBundler } from "@owlprotocol/contracts-account-abstraction/clients";
import { ethUserOpResource } from "@owlprotocol/eth-firebase/admin";
import { createBackendBundlerWithFirebase as createBackendBundler } from "./createBackendBundler.js";

import { port } from "../test/constants.js";

describe("clients/createBackendBundler.test.ts", function () {
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, HDAccount>;
    let bundlerClient: BackendBundler;

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

        bundlerClient = createBackendBundler({
            account: getLocalAccount(0) as LocalAccount,
            chain: localhost,
            transport,
            entryPointSimulationsAddress,
        });
    });

    beforeEach(() => {
        account = privateKeyToAccount(generatePrivateKey());
    });
    /** Tests involving deploying the smart account */
    test("No Paymaster Deploy Contract", async () => {
        //Encode smart account tx, deploy smart account & hello contract
        //Deploy smart account data
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

        const simpleAccount = {
            address: simpleAccountAddress,
            factoryData: simpleAccountFactoryData,
            factoryAddress: simpleAccountFactory,
        };

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
        const contractAddress = getDeployDeterministicAddress(deployParams);
        const value = 0n;
        const { to, data } = getDeployDeterministicFunctionData(deployParams);
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

        //Create UserOp
        const gasPrice = await publicClient.estimateFeesPerGas();
        const dummySignature =
            "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
        const dummySignatureBytes = hexToBytes(dummySignature);
        expect(dummySignatureBytes.length).toBeGreaterThanOrEqual(64);
        expect(dummySignatureBytes.length).toBeLessThanOrEqual(65);
        const userOpData: Omit<UserOperation<"0.7">, UserOperationGasLimitFields> = {
            sender: simpleAccount.address,
            factory: simpleAccount.factoryAddress,
            factoryData: simpleAccount.factoryData,
            nonce: 0n,
            signature: dummySignature,
            callData,
            maxFeePerGas: gasPrice.maxFeePerGas!,
            maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas!,
        };

        //Estimate UserOp gas
        const userOpGas = await bundlerClient.estimateUserOperationGas(userOpData);
        //Merge UserOp data and UserOp gas. paymasterData should not have signature to compute the hash
        const userOp = {
            ...userOpData,
            ...userOpGas,
        };

        //Sign UserOp
        const userOpHashExpected = getUserOperationHash({
            userOperation: userOp,
            entryPointAddress: entryPointAddress,
            entryPointVersion: "0.7",
            chainId: localhost.id,
        });
        const signature = await account.signMessage({
            message: { raw: userOpHashExpected },
        });
        userOp.signature = signature;

        const userOpHash = await bundlerClient.sendUserOperation(userOp);
        expect(userOpHash).toBe(userOpHashExpected);

        const userOpReceipt = await waitForUserOperationReceipt(bundlerClient, { hash: userOpHashExpected });
        expect(userOpReceipt.userOpHash).toBe(userOpHashExpected);
        const userOperation = await bundlerClient.getUserOperation({ hash: userOpHashExpected });
        expect(userOperation).toBeDefined();

        const contractBytecode = await publicClient.getBytecode({ address: contractAddress });
        expect(contractBytecode).toBeDefined();

        // Check Firebase indexing
        const userOperationFromFirebase = await ethUserOpResource.getOrNull({ chainId: localhost.id, userOpHash });
        expect(userOperationFromFirebase).toBeDefined();
    });
});
