import { beforeAll, expect } from "vitest";

import {
    DETERMINISTIC_DEPLOYER_ADDRESS,
    getLocalAccount,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
    getPaymasterSignerAccount,
    getRelayerAccount,
    getUtilityAccount,
} from "@owlprotocol/viem-utils";
import {
    Address,
    createClient,
    createPublicClient,
    createWalletClient,
    encodeDeployData,
    http,
    nonceManager,
    zeroHash,
} from "viem";
import { localhost } from "viem/chains";
import { describe, test } from "vitest";
import { Mailbox } from "@owlprotocol/contracts-hyperlane/artifacts/Mailbox";
import { setupChain } from "./setupChain.js";
import { port } from "./test/constants.js";

describe("setupChain.test.ts", function () {
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
        transport,
        chain,
    });

    let mailboxAddress: Address;

    beforeAll(async () => {
        const walletClient = createWalletClient({
            account: getLocalAccount(0, { nonceManager }),
            chain,
            transport,
        });
        // Deploy DeterministicDeployer (for dummy Mailbox)
        const deployer = await getOrDeployDeterministicDeployer(walletClient);
        if (deployer.hash) {
            await publicClient.waitForTransactionReceipt({ hash: deployer.hash });
        }

        // Deploy dummy Mailbox contract deployments dont't fail
        // Warning: This mailbox is NOT initialized and cannot be used directly
        const mailbox = await getOrDeployDeterministicContract(walletClient, {
            salt: zeroHash,
            bytecode: encodeDeployData({
                abi: Mailbox.abi,
                bytecode: Mailbox.bytecode,
                args: [walletClient.chain.id],
            }),
        });
        if (mailbox.hash) {
            await publicClient.waitForTransactionReceipt({ hash: mailbox.hash });
        }

        mailboxAddress = mailbox.address;
    });

    test("setupChain", async () => {
        //Load viem utility account
        const utilityAccount = getUtilityAccount({ nonceManager });
        // Load viem bundler account
        const bundlerAccount = getRelayerAccount();
        //Load viem paymaster signer account
        const paymasterSignerAccount = getPaymasterSignerAccount();

        //Utility wallet client
        const utilityClient = createClient({
            transport,
            chain,
            account: utilityAccount,
        });

        const result = await setupChain(utilityClient, {
            bundlerAddress: bundlerAccount.address,
            verifyingSignerAddress: paymasterSignerAccount.address,
            mailboxAddress,
        });
        expect(result).toBeDefined();

        // Determininistic Deployer
        expect(await publicClient.getCode({ address: DETERMINISTIC_DEPLOYER_ADDRESS })).toBeDefined();

        // ERC4337
        expect(await publicClient.getCode({ address: result.entrypoint.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.entrypointSimulations.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.pimlicoEntrypointSimulations.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.simpleAccountFactory.address })).toBeDefined();

        // Diamond
        expect(await publicClient.getCode({ address: result.diamondCut.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.diamondLoupe.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.diamondInit.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.diamondInitMulti.address })).toBeDefined();

        expect(await publicClient.getCode({ address: result.erc165.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.accessControlRecursive.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.contractUri.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.erc2981.address })).toBeDefined();

        expect(await publicClient.getCode({ address: result.erc721.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.erc721BaseUri.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.erc721MintableAutoId.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.erc721PresetInit.address })).toBeDefined();

        // Create2Factory
        expect(await publicClient.getCode({ address: result.create2Factory.address })).toBeDefined();

        // Hyperlane
        expect(await publicClient.getCode({ address: result.hypErc20!.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.hypErc20Fast!.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.hypNative!.address })).toBeDefined();

        // Verifying Payaster
        expect(await publicClient.getCode({ address: result.verifyingPaymaster.address })).toBeDefined();
    });
});
