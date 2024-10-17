//polyfill Promise.withResolvers
import "core-js/actual/promise";
import { Instance } from "prool";
import { anvil } from "prool/instances";
import { port } from "./src/test/constants.js";

let instance: Instance;

/**
 * Run once on `vitest` command. NOT on test re-runs
 */
export async function setup() {
    instance = anvil({
        host: "127.0.0.1",
        port,
        chainId: 1337,
        //Test without auto-confirmation
        // blockTime: 1,
    });
    await instance.start();
}

/**
 * Run once `vitest` process has exited. NOT on test re-runs
 */
export async function teardown() {
    await instance.stop();
}
