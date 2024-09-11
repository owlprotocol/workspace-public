import { describe, test, expect } from "vitest";
import { createPublicClient, formatEther, formatUnits, http, parseEther, parseUnits } from "viem";
import { getPoolAddress, getPoolState } from "./getPool.js";
import { quoteWithPrice } from "./getPoolPrice.js";

describe("getPool.test.ts", function () {
    const publicClient = createPublicClient({
        transport: http("https://mode.drpc.org/"),
    });

    const USDC = "0xd988097fb8612cc24eeC14542bC03424c656005f";
    const WETH = "0x4200000000000000000000000000000000000006";
    const WETH_USDC = "0x468cC91dF6F669CaE6cdCE766995Bd7874052FBc";

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
        expect(pool).toBe(WETH_USDC);
    });

    test("getPoolData WETH/USDC", async () => {
        const state = await getPoolState({ publicClient, address: WETH_USDC });
        expect(state).toBeDefined();

        const { sqrtPrice } = state;

        const quoteWethUsdc = quoteWithPrice({
            base: WETH,
            quote: USDC,
            amount: parseEther("1"),
            sqrtPrice,
        });
        console.debug(`1 ETH = ${formatUnits(quoteWethUsdc, 6)} USDC`);

        const quoteUsdcWeth = quoteWithPrice({
            base: USDC,
            quote: WETH,
            amount: parseUnits("2500", 6),
            sqrtPrice,
        });
        console.debug(`2500 USDC = ${formatEther(quoteUsdcWeth)} ETH`);
    });
});
