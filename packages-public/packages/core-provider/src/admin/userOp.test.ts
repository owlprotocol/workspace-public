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
    decodeErrorResult,
    encodeFunctionData,
    parseEther,
} from "viem";
import { localhost } from "viem/chains";
import {
    DEFAULT_GANACHE_CONFIG,
    getLocalAccount,
    getRelayerAccount,
    getPaymasterSignerAccount,
} from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { walletClientToSmartAccountSigner } from "permissionless/utils";
import { signerToSimpleSmartAccount } from "permissionless/accounts";
import { createSmartAccountClient } from "permissionless";
import { signUserOperationHashWithECDSA } from "permissionless";
import { PimlicoBundlerClient, PimlicoPaymasterClient } from "permissionless/clients/pimlico";
import {
    getSimpleAccountAddress,
    createUserOp,
    executeBatchUserOp,
    setupERC4337Contracts,
    decodeViemError,
    setupVerifyingPaymaster,
} from "@owlprotocol/contracts-account-abstraction";
import { SimpleAccount, VerifyingPaymaster, EntryPoint } from "@owlprotocol/contracts-account-abstraction/artifacts";
import { createLocalBundlerClient } from "./createLocalBundler.js";
import { createLocalPaymasterClient } from "./createLocalPaymaster.js";

describe("userOp.test.ts", function () {
    //Clients
    let transport: CustomTransport;
    let publicClient: PublicClient<CustomTransport, Chain>;
    let utilityWalletClient: WalletClient<CustomTransport, Chain, LocalAccount>;
    let relayerWalletClient: WalletClient<CustomTransport, Chain, LocalAccount>;
    let bundlerClient: PimlicoBundlerClient<ENTRYPOINT_ADDRESS_V07_TYPE>;
    let paymasterClient: PimlicoPaymasterClient<ENTRYPOINT_ADDRESS_V07_TYPE>;

    //Core contracts
    let entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    let entryPointSimulations: Address;
    let simpleAccountFactory: Address;
    let verifyingPaymaster: Address;

    //User smart account
    let accountClient: WalletClient<CustomTransport, Chain, Account>;
    let smartAccountInfo: {
        address: Address;
        factoryAddress: Address;
        factoryData: Hex;
    };

    beforeEach(async () => {
        const provider = ganache.provider(DEFAULT_GANACHE_CONFIG);
        transport = custom(provider);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });

        utilityWalletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        }) as any;
        relayerWalletClient = createWalletClient({
            account: getRelayerAccount(),
            chain: localhost,
            transport,
        }) as any;

        //Deploy contracts
        const contracts = await setupERC4337Contracts({ publicClient, walletClient: utilityWalletClient });
        entryPoint = contracts.entrypoint.address;
        entryPointSimulations = contracts.pimlicoEntrypointSimulations.address;

        //Bundler
        const minRelayerBalance = parseEther("0.1");
        const targetRelayerBalance = parseEther("1");
        bundlerClient = createLocalBundlerClient({
            chain: localhost,
            transport,
            walletClient: relayerWalletClient,
            topupWalletClient: utilityWalletClient,
            minBalance: minRelayerBalance,
            targetBalance: targetRelayerBalance,
            entryPoint,
            entryPointSimulations,
        });

        //Paymaster
        const verifyingPaymasterInfo = await setupVerifyingPaymaster({
            publicClient,
            walletClient: utilityWalletClient,
            verifyingSignerAddress: getPaymasterSignerAccount().address,
        });
        verifyingPaymaster = verifyingPaymasterInfo.address;
        //Fund paymaster
        paymasterClient = createLocalPaymasterClient({
            chain: localhost,
            transport,
            paymasterSigner: getPaymasterSignerAccount(),
            paymaster: verifyingPaymaster,
            entryPoint,
            entryPointSimulations,
            topupWalletClient: utilityWalletClient,
            minBalance: 1n,
            targetBalance: parseEther("1"),
        });

        //Smart Account (get address)
        simpleAccountFactory = contracts.simpleAccountFactory.address;
        const privateKey = generatePrivateKey();
        const account = privateKeyToAccount(privateKey);
        accountClient = createWalletClient({
            account,
            chain: localhost,
            transport,
        });
        const smartAccountAddress = getSimpleAccountAddress({
            owner: account.address,
            salt: 0n,
        });
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
        smartAccountInfo = {
            address: smartAccountAddress,
            factoryAddress: simpleAccountFactory,
            factoryData,
        };
        //Fund smart account
        const smartAccountDepositHash = await utilityWalletClient.sendTransaction({
            account: utilityWalletClient.account,
            to: smartAccountInfo.address,
            value: 1n,
        });
        await publicClient.waitForTransactionReceipt({ hash: smartAccountDepositHash });
    });
    /**
     * Create a UserOp with local bundler
     **/
    test.skip("local bundler/paymaster - bundlerClient.sendUserOperation", async () => {
        //TODO: EntryPoint.handleOps does not revert if exec call invalid
        //Encode callData
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
        //Create UserOp, estimate gas + sponsor
        const userOp = await createUserOp({ publicClient, bundlerClient, paymasterClient }, smartAccountInfo, callData);
        expect(userOp).toBeDefined();

        //Sign UserOp
        const signature = await signUserOperationHashWithECDSA({
            account: accountClient.account,
            userOperation: userOp,
            chainId: localhost.id,
            entryPoint,
        });
        userOp.signature = signature;

        //Submit userOp
        const userOpHash = await bundlerClient.sendUserOperation({
            userOperation: userOp,
        });
        console.debug(userOpHash);
        expect(userOpHash).toBeDefined();

        //Get userOp receipt
        const userOpReceipt = await bundlerClient.waitForUserOperationReceipt({
            hash: userOpHash,
        });
        console.debug(userOpReceipt);
        expect(userOpReceipt).toBeDefined();

        //Get smart account deployed
        expect(await publicClient.getBytecode({ address: smartAccountInfo.address })).toBeDefined();

        //Get balanceOf vitalik
        const balance = await publicClient.getBalance({ address: to });
        expect(balance).toBe(value);
    });

    /**
     * Create a UserOp with local bundler
     **/
    test("local bundler/paymaster - executeBatchUserOp", async () => {
        //TODO: EntryPoint.handleOps does not revert if exec call invalid
        //Encode callData
        const to = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // vitalik
        const value = 1n;
        const data = "0x";
        const { userOp, userOpHash, userOpReceiptPromise } = await executeBatchUserOp(
            {
                publicClient,
                bundlerClient,
                paymasterClient,
                account: accountClient.account,
            },
            smartAccountInfo,
            [{ address: to, value, bytes: data }],
        );

        expect(userOp).toBeDefined();
        expect(userOpHash).toBeDefined();

        //Get userOp receipt
        const userOpReceipt = await userOpReceiptPromise;
        expect(userOpReceipt).toBeDefined();

        //Get smart account deployed
        expect(await publicClient.getBytecode({ address: smartAccountInfo.address })).toBeDefined();

        //Get balanceOf vitalik
        const balance = await publicClient.getBalance({ address: to });
        expect(balance).toBe(value);
    });

    test.skip("local bundler/paymaster - smartAccountClient", async () => {
        const smartAccountSigner = walletClientToSmartAccountSigner(accountClient);
        const smartAccount = await signerToSimpleSmartAccount(publicClient, {
            signer: smartAccountSigner,
            factoryAddress: simpleAccountFactory,
            entryPoint,
            address: smartAccountInfo.address,
        });

        const smartAccountClient = createSmartAccountClient({
            account: smartAccount,
            entryPoint,
            chain: localhost,
            bundlerTransport: custom(bundlerClient),
            middleware: {
                gasPrice: async () => {
                    return (await bundlerClient.getUserOperationGasPrice()).fast;
                },
                sponsorUserOperation: paymasterClient.sponsorUserOperation,
            },
        });

        const to = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // vitalik
        const value = 1n;
        const data = "0x";

        //Send UserOp
        try {
            const userOpTxHash = await smartAccountClient.sendTransaction({
                to,
                value,
                data,
            });

            const userOpTxReceipt = await publicClient.waitForTransactionReceipt({ hash: userOpTxHash });
            expect(userOpTxReceipt).toBeDefined();

            //Get smart account deployed
            expect(await publicClient.getBytecode({ address: smartAccountInfo.address })).toBeDefined();

            //Get balanceOf vitalik
            const balance = await publicClient.getBalance({ address: to });
            expect(balance).toBe(value);
        } catch (err: any) {
            const errorEntryPoint = decodeViemError(err, EntryPoint.abi);
            if (errorEntryPoint) {
                console.error(errorEntryPoint);
                if (errorEntryPoint.errorName === "FailedOpWithRevert") {
                    try {
                        const errorPaymasterOrAccount = decodeErrorResult({
                            abi: [...VerifyingPaymaster.abi, ...SimpleAccount.abi],
                            data: errorEntryPoint.args[2],
                        });
                        console.error(errorPaymasterOrAccount);
                        // eslint-disable-next-line no-empty
                    } catch {}
                }
            }
            // throw err;
        }
    });
});
