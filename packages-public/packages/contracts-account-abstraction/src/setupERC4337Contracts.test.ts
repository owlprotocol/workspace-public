import { expect, describe, test, beforeEach } from "vitest";
import ganache from "ganache";
import {
    Account,
    Chain,
    CustomTransport,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
} from "viem";
import { localhost } from "viem/chains";
import { ANVIL_MNEMONIC, getLocalAccount } from "@owlprotocol/viem-utils";
import { setupERC4337Contracts, setupVerifyingPaymaster } from "./setupERC4337Contracts.js";

describe("setupERC4337Contracts.test.ts", function () {
    let publicClient: PublicClient<CustomTransport, Chain>;
    let walletClient: WalletClient<CustomTransport, Chain, Account>;

    beforeEach(async () => {
        const provider = ganache.provider({ wallet: { mnemonic: ANVIL_MNEMONIC }, logging: { quiet: true } });
        const transport = custom(provider);
        //const transport = http(localhost.rpcUrls.default.http[0]);
        publicClient = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClient = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });
    });

    test("setupERC4337Contracts", async () => {
        const result = await setupERC4337Contracts({ publicClient, walletClient });

        expect(await publicClient.getBytecode({ address: result.deterministicDeployer.address })).toBeDefined();
        expect(await publicClient.getBytecode({ address: result.entrypoint.address })).toBeDefined();
        expect(await publicClient.getBytecode({ address: result.simpleAccountFactory.address })).toBeDefined();

        const verifyingPaymaster = await setupVerifyingPaymaster({ publicClient, walletClient });
        expect(await publicClient.getBytecode({ address: verifyingPaymaster.address })).toBeDefined();
    });
});
