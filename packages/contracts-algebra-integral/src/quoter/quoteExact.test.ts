import { describe, test, expect } from "vitest";
import { createPublicClient, http, parseEther } from "viem";
import { BigNumber } from "bignumber.js";
import { quoteExactInput, quoteExactOutput, quoteExact } from "./quoteExact.js";
import { encodeTradePath } from "./tradePath.js";

describe("quoteExact.test.ts", function () {
    const publicClient = createPublicClient({
        transport: http("https://mode.drpc.org/"),
    });
    const quoterV2Address = "0x7c5aaa464f736740156fd69171505d344855d1e5";

    const USDC = "0xd988097fb8612cc24eeC14542bC03424c656005f";
    const WETH = "0x4200000000000000000000000000000000000006";

    test.only("quoteExactInput USDC > WETH", async () => {
        const quote = await quoteExactInput({
            publicClient,
            quoterV2Address,
            amountIn: 1_000_000n, //1 USDC
            path: encodeTradePath([USDC, WETH]),
        });
        expect(quote).toBeDefined();
        const pricePool = BigNumber(quote.sqrtPriceX96AfterList[0] as any);
        const priceInstant = pricePool.div(BigNumber(2).pow(96)).pow(2);
        const ETH_TO_USDC = BigNumber(1).times(BigNumber(10).pow(18)).times(priceInstant).div(BigNumber(10).pow(6));
        // const priceInstant = (pricePool / 2n ** 96n) ** 2n;
        console.debug({ pricePool, priceInstant, ETH_TO_USDC });
    });

    test("quoteExactInput WETH > USDC", async () => {
        const quote = await quoteExactInput({
            publicClient,
            quoterV2Address,
            amountIn: parseEther("0.0005"), // ~ $1 of ETH
            path: encodeTradePath([WETH, USDC]),
        });
        expect(quote).toBeDefined();
    });

    test("quoteExactOutput WETH < USDC", async () => {
        const quote = await quoteExactOutput({
            publicClient,
            quoterV2Address,
            amountOut: parseEther("0.0005"), // ~ $1 of ETH
            path: encodeTradePath([WETH, USDC]),
        });
        expect(quote).toBeDefined();
    });

    test("quoteExactOutput USDC < WETH", async () => {
        const quote = await quoteExactOutput({
            publicClient,
            quoterV2Address,
            amountOut: 1_000_000n, //1 USDC
            path: encodeTradePath([USDC, WETH]),
        });
        expect(quote).toBeDefined();
    });

    test("quoteExact USDC > WETH", async () => {
        const quote = await quoteExact({
            publicClient,
            quoterV2Address,
            amountIn: 1_000_000n, //1 USDC
            tokens: [USDC, WETH],
        });
        expect(quote).toBeDefined();
    });

    test("quoteExact USDC < WETH", async () => {
        const quote = await quoteExact({
            publicClient,
            quoterV2Address,
            amountOut: parseEther("0.0005"), // ~ $1 of ETH
            tokens: [USDC, WETH],
        });
        expect(quote).toBeDefined();
    });
});
