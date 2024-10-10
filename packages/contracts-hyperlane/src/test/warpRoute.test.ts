import { describe, test, beforeAll } from "vitest";
import { createPublicClient, createWalletClient, http, Address } from "viem";
import { getLocalAccount, Clients } from "@owlprotocol/viem-utils";
import { localhost } from "viem/chains";
import { port, port2, localhostRemote } from "./constants.js";
import { setupTestMailboxContractsWithProxy } from "./mailboxTestHelpers.js";
import { getOrDeployHypERC20Proxy } from "../token/getOrDeployHypERC20Proxy.js";
import { getOrDeployHypERC20Impl } from "../token/getOrDeployHypERC20Impl.js";

describe("warpRoute.test.ts", function () {
    let clientsOrigin: Clients;
    let clientsRemote: Clients;

    let testIsmAddressOrigin: Address;
    let testHookAddressOrigin: Address;

    let testIsmAddressRemote: Address;
    let testHookAddressRemote: Address;

    let mailboxAddressOrigin: Address;
    let mailboxAddressRemote: Address;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        const transportRemote = http(`http://127.0.0.1:${port2}`);

        clientsOrigin = {
            publicClient: createPublicClient({ chain: localhost, transport }),
            walletClient: createWalletClient({ account: getLocalAccount(0), chain: localhost, transport }),
        };
        clientsRemote = {
            publicClient: createPublicClient({ chain: localhostRemote, transport: transportRemote }),
            walletClient: createWalletClient({
                account: getLocalAccount(0),
                chain: localhostRemote,
                transport: transportRemote,
            }),
        };

        const mailboxContractsOrigin = await setupTestMailboxContractsWithProxy(clientsOrigin);
        testIsmAddressOrigin = mailboxContractsOrigin.testIsm.address;
        testHookAddressOrigin = mailboxContractsOrigin.testHook.address;
        mailboxAddressOrigin = mailboxContractsOrigin.mailbox.address;

        const mailboxContractsRemote = await setupTestMailboxContractsWithProxy(clientsRemote);
        testIsmAddressRemote = mailboxContractsRemote.testIsm.address;
        testHookAddressRemote = mailboxContractsRemote.testHook.address;
        mailboxAddressRemote = mailboxContractsRemote.mailbox.address;
    });

    test("Deploy HypERC20 token", async () => {
        const hypERC20ImplOrigin = await getOrDeployHypERC20Impl({
            ...clientsOrigin,
            mailboxAddress: mailboxAddressOrigin,
        });
        if (hypERC20ImplOrigin.hash) {
            clientsOrigin.publicClient.waitForTransactionReceipt({ hash: hypERC20ImplOrigin.hash });
        }

        const hypERC20Origin = await getOrDeployHypERC20Proxy({
            ...clientsOrigin,
            hypERC20ImplAddress: hypERC20ImplOrigin.address,
            hookAddress: testHookAddressOrigin,
            ismAddress: testIsmAddressOrigin,
            totalSupply: 1_000_000n,
            name: "Test Token",
            symbol: "TT",
            owner: clientsOrigin.walletClient.account.address,
        });
        if (hypERC20Origin.hash) {
            clientsOrigin.publicClient.waitForTransactionReceipt({ hash: hypERC20Origin.hash });
        }
    });
});
