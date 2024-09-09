import { describe, test } from "vitest";
import { createPublicClient, http, parseEther } from "viem";
import { quoteExactInput, quoteExactOutput, quoteExact } from "./quoteExact.js";
import { encodeTradePath } from "./tradePath.js";

describe("quoteExact.test.ts", function () {
    const publicClient = createPublicClient({
        transport: http("https://mode.drpc.org/"),
    });
    const quoterV2Address = "0x7c5aaa464f736740156fd69171505d344855d1e5";

    const USDC = "0xd988097fb8612cc24eeC14542bC03424c656005f";
    const WETH = "0x4200000000000000000000000000000000000006";

    test("quoteExactInput USDC - WETH", async () => {
        const quote = await quoteExactInput({
            publicClient,
            quoterV2Address,
            amountIn: 1_000_000n, //1 USDC
            path: encodeTradePath([USDC, WETH]),
        });

        console.debug(quote);
    });

    test("quoteExactInput WETH - USDC", async () => {
        const quote = await quoteExactInput({
            publicClient,
            quoterV2Address,
            amountIn: parseEther("0.0005"), // ~ $1 of ETH
            path: encodeTradePath([WETH, USDC]),
        });

        console.debug(quote);
    });

    //TODO: Reverts with `Not received full amountOut` ???
    test.skip("quoteExactOutput USDC - WETH", async () => {
        const quote = await quoteExactOutput({
            publicClient,
            quoterV2Address,
            amountOut: parseEther("0.0005"), // ~ $1 of ETH
            path: encodeTradePath([USDC, WETH]),
        });

        console.debug(quote);
    });

    test.skip("quoteExact USDC - WETH", async () => {
        const quote = await quoteExact({
            publicClient,
            quoterV2Address,
            amountIn: 1_000_000n, //1 USDC
            path: encodeTradePath([USDC, WETH]),
        });

        console.debug(quote);
    });
});
