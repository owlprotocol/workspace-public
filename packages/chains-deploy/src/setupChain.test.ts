import { expect } from "vitest";

import { getPaymasterSignerAccount, getRelayerAccount, getUtilityAccount } from "@owlprotocol/viem-utils";
import { createClient, http } from "viem";
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
        //Load viem utility account
        const utilityAccount = getUtilityAccount();
        // Load viem bundler account
        const bundlerAccount = getRelayerAccount();
        //Load viem paymaster signer account
        const paymasterSignerAccount = getPaymasterSignerAccount();

        //Utility wallet client
        const utilityClient = createClient({
            transport: http(chain.rpcUrls.default.http[0]),
            chain,
            account: utilityAccount,
        });

        const result = await setupChain(utilityClient, {
            bundlerAddress: bundlerAccount.address,
            verifyingSignerAddress: paymasterSignerAccount.address,
        });
        expect(result).toBeDefined();
    });
});
