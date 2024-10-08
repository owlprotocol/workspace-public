import { describe, test, expect } from "vitest";
import { createPublicClient, http, parseEther } from "viem";
import { getOptimalTrade, getOptimalTradeExactInput, getOptimalTradeExactOutput } from "./getOptimalTrade.js";

describe("getOptimalTrade.test.ts", function () {
    const publicClient = createPublicClient({
        transport: http("https://mode.drpc.org/"),
    });
    const quoterV2 = "0x7c5aaa464f736740156fd69171505d344855d1e5";

    const USDC = "0xd988097fb8612cc24eeC14542bC03424c656005f";
    const WETH = "0x4200000000000000000000000000000000000006";
    const MODE = "0xDfc7C877a950e49D2610114102175A06C2e3167a";

    test("getOptimalTradeExactInput USDC > WETH", async () => {
        const { trades, optimalTrade } = await getOptimalTradeExactInput({
            publicClient,
            quoterV2,
            amountIn: 1_000_000n, //1 USDC
            inputAddress: USDC,
            outputAddress: WETH,
        });

        expect(trades).toBeDefined();
        expect(optimalTrade).toBeDefined();
    });

    test("getOptimalTradeExactInput USDC > WETH > MODE", async () => {
        const { trades, optimalTrade } = await getOptimalTradeExactInput({
            publicClient,
            quoterV2,
            amountIn: 10_000_000n, //1 USDC
            inputAddress: USDC,
            outputAddress: MODE,
            liquidityTokens: [WETH],
        });

        expect(trades).toBeDefined();
        expect(optimalTrade).toBeDefined();
    });

    test("getOptimalTradeExactOutput WETH < USDC", async () => {
        const { trades, optimalTrade } = await getOptimalTradeExactOutput({
            publicClient,
            quoterV2,
            amountOut: parseEther("0.0005"), // ~ $1 of ETH
            inputAddress: USDC,
            outputAddress: WETH,
        });

        expect(trades).toBeDefined();
        expect(optimalTrade).toBeDefined();
    });

    test("getOptimalTradeExactOutput MODE < WETH < USDC", async () => {
        const { trades, optimalTrade } = await getOptimalTradeExactOutput({
            publicClient,
            quoterV2,
            amountOut: parseEther("90"), // ~ $1 of MODE
            inputAddress: USDC,
            outputAddress: MODE,
            liquidityTokens: [WETH],
        });

        expect(trades).toBeDefined();
        expect(optimalTrade).toBeDefined();
    });

    test("getOptimalTrade USDC > WETH", async () => {
        const { trades, optimalTrade } = await getOptimalTrade({
            publicClient,
            quoterV2,
            amountIn: 1_000_000n, //1 USDC
            inputAddress: USDC,
            outputAddress: WETH,
        });

        expect(trades).toBeDefined();
        expect(optimalTrade).toBeDefined();
    });

    test("getOptimalTrade WETH < USDC", async () => {
        const { trades, optimalTrade } = await getOptimalTrade({
            publicClient,
            quoterV2,
            amountOut: parseEther("0.0005"), // ~ $1 of ETH
            inputAddress: USDC,
            outputAddress: WETH,
        });

        expect(trades).toBeDefined();
        expect(optimalTrade).toBeDefined();
    });
});
