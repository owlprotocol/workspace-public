import { createServer, CreateServerReturnType } from "prool";
import { anvil } from "prool/instances";

let server: CreateServerReturnType;

/**
 * Run once on `vitest` command. NOT on test re-runs
 */
export async function setup() {
    server = createServer({
        host: "127.0.0.1",
        port: 8545,
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
