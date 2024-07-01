//polyfill Promise.withResolvers
import "core-js/actual/promise";
import { createServer, CreateServerReturnType } from "prool";
import { anvil } from "prool/instances";
import { port } from "./src/test/constants.js";

let server: CreateServerReturnType;

/**
 * Run once on `vitest` command. NOT on test re-runs
 */
export async function setup() {
    server = createServer({
        host: "127.0.0.1",
        port,
        instance: anvil({
            chainId: 1337,
        }),
    });
    await server.start();
}

/**
 * Run once `vitest` process has exited. NOT on test re-runs
 */
export async function teardown() {
    await server.stop();
}
