import { describe, test, beforeAll, beforeEach, expect } from "vitest";
import {
    Address,
    Chain,
    Transport,
    LocalAccount,
    PublicClient,
    WalletClient,
    PrivateKeyAccount,
    createPublicClient,
    createWalletClient,
    http,
    parseEther,
    custom,
} from "viem";
import { localhost } from "viem/chains";
import {
    getLocalAccount,
    getUtilityAccount,
    getRelayerAccount,
    getPaymasterSignerAccount,
    topupAddress,
} from "@owlprotocol/viem-utils";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { signerToSimpleSmartAccount, SimpleSmartAccount } from "permissionless/accounts";
import { createSmartAccountClient, SmartAccountClient } from "permissionless";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless/utils";
import { PimlicoBundlerClient, PimlicoPaymasterClient } from "permissionless/clients/pimlico";
import {
    getSimpleAccountAddress,
    setupERC4337Contracts,
    setupVerifyingPaymaster,
    getERC4337Nonce,
    topupPaymaster,
    getVerifyingPaymaster,
    getERC4337Contracts,
} from "@owlprotocol/contracts-account-abstraction";
// import { UserOperationEvent } from "@owlprotocol/contracts-account-abstraction/artifacts/IEntryPoint";
import { createBundlerBackend } from "./createBundlerBackend.js";
import { createPaymasterBackend } from "./createPaymasterBackend.js";
import { port } from "./test/constants.js";

describe("userOp.test.ts", function () {
    //Clients
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    // Standard bundler wallet client (pkey 0x0...1)
    let bundlerWalletClient: WalletClient<Transport, Chain, LocalAccount>;
    // Bundler client
    let bundlerClient: PimlicoBundlerClient<ENTRYPOINT_ADDRESS_V07_TYPE>;
    // Paymaster client
    let paymasterClient: PimlicoPaymasterClient<ENTRYPOINT_ADDRESS_V07_TYPE>;
    // Generated account on each test
    let account: PrivateKeyAccount;

    //Core contracts
    let entryPoint: ENTRYPOINT_ADDRESS_V07_TYPE;
    let entryPointSimulations: Address;
    let simpleAccountFactory: Address;
    let paymaster: Address;

    // Smart Account
    let simpleAccount: SimpleSmartAccount<typeof ENTRYPOINT_ADDRESS_V07, Transport, Chain>;
    let smartAccountClient: SmartAccountClient<
        typeof ENTRYPOINT_ADDRESS_V07,
        Transport,
        Chain,
        SimpleSmartAccount<typeof ENTRYPOINT_ADDRESS_V07, Transport, Chain>
    >;

    beforeAll(async () => {
        const chain: Chain<undefined, { eip1559?: boolean }> = localhost;
        transport = http(`http://127.0.0.1:${port}`);

        // Test Custom Chain (with NODE_ENV=staging)
        /*
        const chain: Chain<undefined, { eip1559?: boolean }> = {
            id: 1001,
            name: "Kaia Kairos Testnet",
            nativeCurrency: { name: "Kaia", symbol: "KLAY", decimals: 18 },
            rpcUrls: {
                default: {
                    http: ["https://public-en-kairos.node.kaia.io"],
                },
            },
            custom: {
                eip1559: false,
            },
        };
        transport = http(chain.rpcUrls.default.http[0]);
        */

        publicClient = createPublicClient({
            chain,
            transport,
        });

        // Topup utility wallet
        const utilityWalletClient = createWalletClient({
            account: getUtilityAccount(),
            chain,
            transport,
        }) as any;
        if (chain.id === 1337) {
            const localWalletClient = createWalletClient({
                //Account 1 is fully funded with ~ 10,000 ETH
                account: getLocalAccount(1),
                chain,
                transport,
            });
            const localTopupHash = await localWalletClient.sendTransaction({
                to: utilityWalletClient.account.address,
                value: parseEther("1000"),
            });
            await publicClient.waitForTransactionReceipt({
                hash: localTopupHash,
            });
        }

        //Deploy contracts
        if (chain.id === 1337) {
            const contracts = await setupERC4337Contracts({ publicClient, walletClient: utilityWalletClient });
            entryPoint = contracts.entrypoint.address;
            entryPointSimulations = contracts.pimlicoEntrypointSimulations.address;
            simpleAccountFactory = contracts.simpleAccountFactory.address;
        } else {
            const contracts = await getERC4337Contracts();
            entryPoint = contracts.entrypoint;
            entryPointSimulations = contracts.pimlicoEntrypointSimulations;
            simpleAccountFactory = contracts.simpleAccountFactory;
        }

        //Bundler
        bundlerWalletClient = createWalletClient({
            account: getRelayerAccount(),
            chain,
            transport,
        }) as any;

        if (chain.id === 1337) {
            await topupAddress({
                publicClient,
                walletClient: utilityWalletClient,
                address: bundlerWalletClient.account.address,
                minBalance: parseEther("1"),
            });
        }

        bundlerClient = createBundlerBackend({
            chain,
            transport,
            walletClient: bundlerWalletClient,
            entryPoint,
            entryPointSimulations,
            eip1559: chain.custom?.eip1559,
        });

        //Paymaster
        const paymasterSigner = getPaymasterSignerAccount();
        if (chain.id === 1337) {
            const verifyingPaymasterInfo = await setupVerifyingPaymaster({
                publicClient,
                walletClient: utilityWalletClient,
                verifyingSignerAddress: paymasterSigner.address,
            });
            paymaster = verifyingPaymasterInfo.address;

            //Fund paymaster
            await topupPaymaster({
                publicClient,
                walletClient: utilityWalletClient,
                paymaster: paymaster,
                minBalance: parseEther("1"),
            });
        } else {
            paymaster = getVerifyingPaymaster({
                verifyingSignerAddress: paymasterSigner.address,
            });
        }

        paymasterClient = createPaymasterBackend({
            chain,
            transport,
            paymasterSigner,
            paymaster,
            entryPoint,
            entryPointSimulations,
        });
    });

    beforeEach(async () => {
        account = privateKeyToAccount(generatePrivateKey());

        // Smart Account Address
        const smartAccountAddress = getSimpleAccountAddress({
            owner: account.address,
            salt: 0n,
        });

        simpleAccount = await signerToSimpleSmartAccount(publicClient, {
            entryPoint: ENTRYPOINT_ADDRESS_V07,
            factoryAddress: simpleAccountFactory,
            signer: account,
            address: smartAccountAddress,
        });

        smartAccountClient = createSmartAccountClient({
            account: simpleAccount,
            entryPoint: ENTRYPOINT_ADDRESS_V07,
            chain: publicClient.chain,
            bundlerTransport: custom({ request: bundlerClient.request }),
            middleware: {
                gasPrice: async () => {
                    return (await bundlerClient.getUserOperationGasPrice()).fast;
                },
                sponsorUserOperation: paymasterClient.sponsorUserOperation,
            },
        });
    });

    test.skip("Get user op", async () => {
        //Note: user op
        const smartAccountAddress = "0x49688d7b50ABfb224f137E2e83821518Dc50fd3A";
        //Get smart account deployed
        expect(await publicClient.getBytecode({ address: smartAccountAddress })).toBeDefined();

        const userOpHash = "0x81f3b51ca3c884016c817fde91c77cdc08a79fec239b6545401809cf4495fa65";

        /*
        const logs = await publicClient.getLogs({
            address: entryPoint,
            event: UserOperationEvent,
            fromBlock: 0n,
            args: {
                userOpHash,
            },
            strict: true,
        });
        console.debug(logs);

        const receipt = await bundlerClient.getUserOperationReceipt({ hash: userOpHash });
        console.debug(receipt);
        */

        const userOp = await bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
        console.debug(userOp);
    });

    /**
     * Create a UserOp with local bundler
     **/
    test("local bundler/paymaster - bundlerClient.sendUserOperation", async () => {
        //Encode smart account tx, send to random address
        const to = privateKeyToAccount(generatePrivateKey()).address;
        const value = 0;
        const data = "0x1234";
        // Encode Call Data for User Operation
        const callData = await simpleAccount.encodeCallData({
            to,
            value,
            data,
        });
        // Prepare User Operation (factoryData, nonce, gas, paymaster)
        const userOperation = await smartAccountClient.prepareUserOperationRequest({
            userOperation: {
                callData,
                // Random nonce
                nonce: getERC4337Nonce(),
            },
        });
        // Sign User Operation
        userOperation.signature = await simpleAccount.signUserOperation(userOperation);
        // Submit User Operation
        const userOpHash = await bundlerClient.sendUserOperation({ userOperation });
        // Receipt for User Operation
        const userOpReceipt = await bundlerClient.waitForUserOperationReceipt({
            hash: userOpHash,
        });
        expect(userOpReceipt).toBeDefined();

        //Get smart account deployed
        expect(await publicClient.getBytecode({ address: simpleAccount.address })).toBeDefined();
    });

    test("local bundler/paymaster - smartAccountClient.sendTransaction", async () => {
        //Encode smart account tx, send to random address
        const to = privateKeyToAccount(generatePrivateKey()).address;
        const value = 0n;
        const data = "0x1234";
        // All previous steps bundled into 1 sendTransaction call
        const hash = await smartAccountClient.sendTransaction({ to, value, data });
        // Receipt for full transaction
        const receipt = await publicClient.waitForTransactionReceipt({
            hash,
        });
        expect(receipt).toBeDefined();

        //Get smart account deployed
        expect(await publicClient.getBytecode({ address: simpleAccount.address })).toBeDefined();
    });
});
