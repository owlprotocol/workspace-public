import { expect, describe, test, beforeAll } from "vitest";
import {
    Account,
    Chain,
    Transport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    http,
} from "viem";
import { localhost } from "viem/chains";
import { getOrDeployDeterministicDeployer, getLocalAccount } from "@owlprotocol/viem-utils";
import { port } from "./test/constants.js";
import { setupERC4337Contracts, setupVerifyingPaymaster } from "./setupERC4337Contracts.js";

describe("setupERC4337Contracts.test.ts", function () {
    let publicClient: PublicClient<Transport, Chain>;
    let walletClient: WalletClient<Transport, Chain, Account>;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });

        //Deploy Deterministic Deployer first
        const { hash } = await getOrDeployDeterministicDeployer(walletClient);
        if (hash) {
            await publicClient.waitForTransactionReceipt({ hash });
        }
    });

    test("setupERC4337Contracts", async () => {
        const result = await setupERC4337Contracts(walletClient);

        expect(await publicClient.getCode({ address: result.deterministicDeployer.address })).toBeDefined();
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
