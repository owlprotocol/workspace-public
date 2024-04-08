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
import { ANVIL_MNEMONIC, getUtilityAccount } from "@owlprotocol/contracts-create2factory";
import { setupNetwork } from "./setupNetwork.js";

describe("setupNetwork.test.ts", function () {
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
            account: getUtilityAccount(),
            chain: localhost,
            transport,
        });
    });

    test("setupNetwork", async () => {
        const result = await setupNetwork({ publicClient, walletClient });

        expect(await publicClient.getBytecode({ address: result.deterministicDeployer.address })).toBeDefined();
        expect(await publicClient.getBytecode({ address: result.create2Factory.address })).toBeDefined();
        expect(await publicClient.getBytecode({ address: result.entrypoint.address })).toBeDefined();
        expect(await publicClient.getBytecode({ address: result.simpleAccountFactory.address })).toBeDefined();
        expect(await publicClient.getBytecode({ address: result.verifyingPaymaster.address })).toBeDefined();
    });
});
