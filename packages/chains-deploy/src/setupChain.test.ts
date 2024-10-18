import { expect } from "vitest";

import {
    DETERMINISTIC_DEPLOYER_ADDRESS,
    getPaymasterSignerAccount,
    getRelayerAccount,
    getUtilityAccount,
} from "@owlprotocol/viem-utils";
import { createClient, createPublicClient, http, nonceManager } from "viem";
import { localhost } from "viem/chains";
import { describe, test } from "vitest";
import { setupChain } from "./setupChain.js";
import { port } from "./test/constants.js";

describe("setupChain.test.ts", function () {
    test("setupChain", async () => {
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

        expect(await publicClient.getCode({ address: DETERMINISTIC_DEPLOYER_ADDRESS })).toBeDefined();

        const result = await setupChain(utilityClient, {
            bundlerAddress: bundlerAccount.address,
            verifyingSignerAddress: paymasterSignerAccount.address,
        });
        expect(result).toBeDefined();

        // Determininistic Deployer
        expect(await publicClient.getCode({ address: result.erc165.address })).toBeDefined();

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

        // Verifying Payaster
        expect(await publicClient.getCode({ address: result.verifyingPaymaster.address })).toBeDefined();
    });
});
