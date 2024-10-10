//polyfill Promise.withResolvers
import "core-js/actual/promise";
import { Instance } from "prool";
import { anvil } from "prool/instances";
import { chainId2, port, port2 } from "./src/test/constants.js";

let instance: Instance;
let instance2: Instance;

/**
 * Run once on `vitest` command. NOT on test re-runs
 */
export async function setup() {
    instance = anvil({
        host: "127.0.0.1",
        port,
        chainId: 1337,
    });
    await instance.start();

    instance2 = anvil({
        host: "127.0.0.1",
        port: port2,
        chainId: chainId2,
    });
    await instance2.start();
}

/**
 * Run once `vitest` process has exited. NOT on test re-runs
 */
export async function teardown() {
    await instance.stop();
    await instance2.stop();
}
