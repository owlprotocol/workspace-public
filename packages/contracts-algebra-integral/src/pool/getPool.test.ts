import { describe, test, expect } from "vitest";
import { getPoolAddress } from "./getPool.js";

describe("getPool.test.ts", function () {
    const USDC = "0xd988097fb8612cc24eeC14542bC03424c656005f";
    const WETH = "0x4200000000000000000000000000000000000006";

    // kim.exchange
    // https://explorer.mode.network/address/0xB5F00c2C5f8821155D8ed27E31932CFD9DB3C5D5?tab=read_contract
    const poolInitCodeHash = "0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d";
    const poolDeployer = "0x6414A461B19726410E52488d9D5ff33682701635";

    test("getPoolAddress WETH/USDC", () => {
        const pool = getPoolAddress({
            token0: USDC,
            token1: WETH,
            poolDeployer,
            poolInitCodeHash,
        });

        // https://explorer.mode.network/address/0x468cC91dF6F669CaE6cdCE766995Bd7874052FBc?tab=contract
        const expected = "0x468cC91dF6F669CaE6cdCE766995Bd7874052FBc";
        expect(pool).toBe(expected);
    });
});
