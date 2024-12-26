import { expect, describe, test } from "vitest";
import { createPublicClient, createWalletClient, http, nonceManager } from "viem";
import { localhost } from "viem/chains";
import { entryPoint07Address } from "viem/account-abstraction";
import { getLocalAccount } from "@owlprotocol/viem-utils";

import { port } from "./test/constants.js";
import { setupERC4337Contracts, setupVerifyingPaymaster } from "./setupERC4337Contracts.js";
import { SIMPLE_ACCOUNT_FACTORY_ADDRESS } from "./constants.js";

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

    test("setupERC4337Contracts", async () => {
        // Note: Contracts are actually deployed in vitest.setup.ts (shared across all tests)
        const result = await setupERC4337Contracts(walletClient);

        expect(await publicClient.getCode({ address: result.entrypoint.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.simpleAccountFactory.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.entrypointSimulations.address })).toBeDefined();
        expect(await publicClient.getCode({ address: result.pimlicoEntrypointSimulations.address })).toBeDefined();

        expect(result.entrypoint.address).toBe(entryPoint07Address);
        expect(result.simpleAccountFactory.address).toBe(SIMPLE_ACCOUNT_FACTORY_ADDRESS);

        const verifyingPaymaster = await setupVerifyingPaymaster(walletClient, {
            verifyingSignerAddress: walletClient.account.address,
        });
        expect(await publicClient.getCode({ address: verifyingPaymaster.address })).toBeDefined();
    });
});
