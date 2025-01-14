import { expect, describe, test, beforeAll } from "vitest";
import { createPublicClient, createWalletClient, http, nonceManager } from "viem";
import { localhost } from "viem/chains";
import { getOrDeployDeterministicDeployer, getLocalAccount } from "@owlprotocol/viem-utils";
import { port } from "./test/constants.js";
import { setupERC4337Contracts, setupVerifyingPaymaster } from "./setupERC4337Contracts.js";

describe("setupERC4337Contracts.test.ts", function () {
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

    beforeAll(async () => {
        //Deploy Deterministic Deployer first
        const { hash } = await getOrDeployDeterministicDeployer(walletClient);
        if (hash) {
            await publicClient.waitForTransactionReceipt({ hash });
        }
    });

    test("setupERC4337Contracts", async () => {
        const result = await setupERC4337Contracts(walletClient);

        expect(await publicClient.getCode({ address: result.entrypoint.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.simpleAccountFactory.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.entrypointSimulations.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.pimlicoEntrypointSimulations.address })).toBeDefined();

        const verifyingPaymaster = await setupVerifyingPaymaster(walletClient, {
            verifyingSignerAddress: walletClient.account.address,
        });
        expect(await publicClient.getCode({ address: verifyingPaymaster.address })).toBeDefined();
    });
});
