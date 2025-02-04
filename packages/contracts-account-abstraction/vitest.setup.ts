//polyfill Promise.withResolvers
import "core-js/actual/promise";
import { Instance } from "prool";
import { anvil } from "prool/instances";
import { createClient, http, nonceManager } from "viem";
import { localhost } from "viem/chains";
import { waitForTransactionReceipt } from "viem/actions";
import { getOrDeployDeterministicDeployer, getLocalAccount } from "@owlprotocol/viem-utils";

import { port } from "./src/test/constants.js";
import { setupERC4337Contracts } from "./src/setupERC4337Contracts.js";

let instance: Instance | undefined;

/**
 * Run once on `vitest` command. NOT on test re-runs
 */
export async function setup() {
    if (process.env.NODE_ENV !== "test") return;

    instance = anvil({
        host: "127.0.0.1",
        port,
        chainId: 1337,
    });
    await instance.start();

    const chain = {
        ...localhost,
        rpcUrls: {
            default: {
                http: [`http://127.0.0.1:${port}`],
            },
        },
    };
    const transport = http(chain.rpcUrls.default.http[0]);
    const client = createClient({
        account: getLocalAccount(0, { nonceManager }),
        chain,
        transport,
    });

    //Deploy Deterministic Deployer first
    const { hash } = await getOrDeployDeterministicDeployer(client);
    if (hash) {
        await waitForTransactionReceipt(client, { hash });
    }

    // Deploy core ERC4337 contracts (no paymaster)
    await setupERC4337Contracts(client);
}

/**
 * Run once `vitest` process has exited. NOT on test re-runs
 */
export async function teardown() {
    await instance?.stop();
}
