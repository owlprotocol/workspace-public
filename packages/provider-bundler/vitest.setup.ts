/**
 * Run once on `vitest` command. NOT on test re-runs
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function setup() {
    process.env.HELLO = "World!";
}

/**
 * Run once `vitest` process has exited. NOT on test re-runs
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function teardown() {}
