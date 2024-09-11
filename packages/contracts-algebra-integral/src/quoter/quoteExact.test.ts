import { describe, test, expect } from "vitest";
import { createPublicClient, http, parseEther } from "viem";
import { quoteExactInput, quoteExactOutput, quoteExact } from "./quoteExact.js";
import { encodeTradePath } from "./tradePath.js";

describe("quoteExact.test.ts", function () {
    const publicClient = createPublicClient({
        transport: http("https://mode.drpc.org/"),
    });
    const quoterV2 = "0x7c5aaa464f736740156fd69171505d344855d1e5";

    const USDC = "0xd988097fb8612cc24eeC14542bC03424c656005f";
    const WETH = "0x4200000000000000000000000000000000000006";

    test("quoteExactInput USDC > WETH", async () => {
        const quote = await quoteExactInput({
            publicClient,
            quoterV2,
            amountIn: 1_000_000n, //1 USDC
            path: encodeTradePath([USDC, WETH]),
        });
        expect(quote).toBeDefined();
    });

    test("quoteExactInput WETH > USDC", async () => {
        const quote = await quoteExactInput({
            publicClient,
            quoterV2,
            amountIn: parseEther("0.0005"), // ~ $1 of ETH
            path: encodeTradePath([WETH, USDC]),
        });
        expect(quote).toBeDefined();
    });

    test("quoteExactOutput WETH < USDC", async () => {
        const quote = await quoteExactOutput({
            publicClient,
            quoterV2,
            amountOut: parseEther("0.0005"), // ~ $1 of ETH
            path: encodeTradePath([WETH, USDC]),
        });
        expect(quote).toBeDefined();
    });

    test("quoteExactOutput USDC < WETH", async () => {
        const quote = await quoteExactOutput({
            publicClient,
            quoterV2,
            amountOut: 1_000_000n, //1 USDC
            path: encodeTradePath([USDC, WETH]),
        });
        expect(quote).toBeDefined();
    });

    test("quoteExact USDC > WETH", async () => {
        const quote = await quoteExact({
            publicClient,
            quoterV2,
            amountIn: 1_000_000n, //1 USDC
            tokens: [USDC, WETH],
        });
        expect(quote).toBeDefined();
    });

    test("quoteExact USDC < WETH", async () => {
        const quote = await quoteExact({
            publicClient,
            quoterV2,
            amountOut: parseEther("0.0005"), // ~ $1 of ETH
            tokens: [USDC, WETH],
        });
        expect(quote).toBeDefined();
    });
});
