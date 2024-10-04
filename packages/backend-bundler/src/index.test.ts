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
} from "@owlprotocol/contracts-account-abstraction";
import { createBundlerBackend } from "./createBundlerBackend.js";
import { createPaymasterBackend } from "./createPaymasterBackend.js";
import { port } from "./test/constants.js";

describe("userOp.test.ts", function () {
    //Clients
    let transport: Transport;
    let publicClient: PublicClient<Transport, Chain>;
    // Standard utility wallet client (pkey 0x0...2)
    let utilityWalletClient: WalletClient<Transport, Chain, LocalAccount>;
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
    let verifyingPaymaster: Address;

    // Smart Account
    let simpleAccount: SimpleSmartAccount<typeof ENTRYPOINT_ADDRESS_V07, Transport, Chain>;
    let smartAccountClient: SmartAccountClient<
        typeof ENTRYPOINT_ADDRESS_V07,
        Transport,
        Chain,
        SimpleSmartAccount<typeof ENTRYPOINT_ADDRESS_V07, Transport, Chain>
    >;

    beforeAll(async () => {
        transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        utilityWalletClient = createWalletClient({
            account: getUtilityAccount(),
            chain: localhost,
            transport,
        }) as any;
        bundlerWalletClient = createWalletClient({
            account: getRelayerAccount(),
            chain: localhost,
            transport,
        }) as any;

        // Topup utility wallet
        const localWalletClient = createWalletClient({
            //Account 1 is fully funded with ~ 10,000 ETH
            account: getLocalAccount(1),
            chain: localhost,
            transport,
        });
        const localTopupHash = await localWalletClient.sendTransaction({
            to: utilityWalletClient.account.address,
            value: parseEther("1000"),
        });
        await publicClient.waitForTransactionReceipt({
            hash: localTopupHash,
        });

        //Deploy contracts
        const contracts = await setupERC4337Contracts({ publicClient, walletClient: utilityWalletClient });
        entryPoint = contracts.entrypoint.address;
        entryPointSimulations = contracts.pimlicoEntrypointSimulations.address;

        //Bundler
        await topupAddress({
            publicClient,
            walletClient: utilityWalletClient,
            address: bundlerWalletClient.account.address,
            minBalance: parseEther("1"),
        });

        bundlerClient = createBundlerBackend({
            chain: localhost,
            transport,
            walletClient: bundlerWalletClient,
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
        await topupPaymaster({
            publicClient,
            walletClient: utilityWalletClient,
            paymaster: verifyingPaymaster,
            minBalance: parseEther("1"),
        });

        paymasterClient = createPaymasterBackend({
            chain: localhost,
            transport,
            paymasterSigner: getPaymasterSignerAccount(),
            paymaster: verifyingPaymaster,
            entryPoint,
            entryPointSimulations,
        });

        //Smart Account (get address)
        simpleAccountFactory = contracts.simpleAccountFactory.address;
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

        //Fund smart account
        const smartAccountDepositHash = await utilityWalletClient.sendTransaction({
            account: utilityWalletClient.account,
            to: simpleAccount.address,
            value: 1n,
        });
        await publicClient.waitForTransactionReceipt({ hash: smartAccountDepositHash });
    });
    /**
     * Create a UserOp with local bundler
     **/
    test("local bundler/paymaster - bundlerClient.sendUserOperation", async () => {
        //Encode smart account tx, send to random address
        const to = privateKeyToAccount(generatePrivateKey()).address;
        const value = 1n;
        const data = "0x";
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

        //Get balanceOf
        const balance = await publicClient.getBalance({ address: to });
        expect(balance).toBe(value);
    });

    test("local bundler/paymaster - smartAccountClient.sendTransaction", async () => {
        //Encode smart account tx, send to random address
        const to = privateKeyToAccount(generatePrivateKey()).address;
        const value = 1n;
        const data = "0x";
        // All previous steps bundled into 1 sendTransaction call
        const hash = await smartAccountClient.sendTransaction({ to, value, data });
        // Receipt for full transaction
        const receipt = await publicClient.waitForTransactionReceipt({
            hash,
        });
        expect(receipt).toBeDefined();

        //Get smart account deployed
        expect(await publicClient.getBytecode({ address: simpleAccount.address })).toBeDefined();

        //Get balanceOf
        const balance = await publicClient.getBalance({ address: to });
        expect(balance).toBe(value);
    });
});
