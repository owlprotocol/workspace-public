import { describe, test, beforeEach } from "vitest";
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
        const provider = ganache.provider({ wallet: { mnemonic: ANVIL_MNEMONIC } });
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
        console.debug(result);
    });
});
