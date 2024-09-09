import { describe, test } from "vitest";
import { createPublicClient, http, parseEther } from "viem";
import { getOptimalTradeExactInput } from "./getOptimalTrade.js";

describe("getOptimalTrade.test.ts", function () {
    const publicClient = createPublicClient({
        transport: http("https://mode.drpc.org/"),
    });
    const quoterV2Address = "0x7c5aaa464f736740156fd69171505d344855d1e5";

    const USDC = "0xd988097fb8612cc24eeC14542bC03424c656005f";
    const WETH = "0x4200000000000000000000000000000000000006";
    const MODE = "0xDfc7C877a950e49D2610114102175A06C2e3167a";

    test.skip("getOptimalTradeExactInput USDC - WETH", async () => {
        const { trades, optimalTrade } = await getOptimalTradeExactInput({
            publicClient,
            quoterV2Address,
            amountIn: 1_000_000n, //1 USDC
            inputAddress: USDC,
            outputAddress: WETH,
        });

        console.debug(trades);
        console.debug(optimalTrade);
    });

    test("getOptimalTradeExactInput USDC - MODE", async () => {
        const { optimalTrade } = await getOptimalTradeExactInput({
            publicClient,
            quoterV2Address,
            amountIn: 10_000_000n, //1 USDC
            inputAddress: USDC,
            outputAddress: MODE,
            intermediateAddresses: [WETH],
        });

        // console.debug(trades);
        console.debug(optimalTrade);
    });
});
