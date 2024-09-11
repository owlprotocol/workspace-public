import { describe, test, expect } from "vitest";
import { createPublicClient, http } from "viem";
import { getBalancePortfolioTrades } from "./getBalancePortfolioTrades.js";
import { getBalancePortfolioAmounts } from "./getBalancePortfolioAmounts.js";
import { getOptimalTrade } from "../quoter/getOptimalTrade.js";

describe("getBalancePortfolioTrades.test.ts", function () {
    const publicClient = createPublicClient({
        transport: http("https://mode.drpc.org/"),
    });
    const quoterV2Address = "0x7c5aaa464f736740156fd69171505d344855d1e5";

    const USDC = "0xd988097fb8612cc24eeC14542bC03424c656005f";
    const WETH = "0x4200000000000000000000000000000000000006";
    const MODE = "0xDfc7C877a950e49D2610114102175A06C2e3167a";

    test("getBalancePortfolioAmounts", async () => {
        const portfolio = await getBalancePortfolioAmounts({
            assets: [
                { address: USDC, balance: 100n, value: 100n, targetRatio: 50 },
                { address: WETH, balance: 100n, value: 100n, targetRatio: 25 },
                { address: MODE, balance: 100n, value: 100n, targetRatio: 10 },
            ],
        });
        expect(portfolio).toBeDefined();
    });

    test("getBalancePortfolioTrades", async () => {
        const usdcWethTrade = await getOptimalTrade({
            publicClient,
            quoterV2Address,
            inputAddress: USDC,
            outputAddress: WETH,
            amountIn: 50_000_000n,
        });

        const usdcModeTrade = await getOptimalTrade({
            publicClient,
            quoterV2Address,
            inputAddress: USDC,
            outputAddress: MODE,
            intermediateAddresses: [WETH],
            amountIn: 50_000_000n,
        });

        // Spend $100
        const { trades, dust: delta } = await getBalancePortfolioTrades({
            publicClient,
            quoterV2Address,
            intermediateAddresses: [WETH],
            assets: [
                { address: USDC, balanceDelta: -90_000_000n, valueDelta: -90_000_000n },
                {
                    address: WETH,
                    balanceDelta: usdcWethTrade.optimalTrade.quote.amountOut,
                    valueDelta: usdcWethTrade.optimalTrade.quote.amountIn,
                },
                {
                    address: MODE,
                    balanceDelta: usdcModeTrade.optimalTrade.quote.amountOut,
                    valueDelta: usdcModeTrade.optimalTrade.quote.amountIn,
                },
            ],
        });

        expect(trades).toBeDefined();
        expect(delta).toBeDefined();
    });
});
