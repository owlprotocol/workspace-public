import { describe, test, expect } from "vitest";
import { createPublicClient, formatUnits, http } from "viem";
import { balancePortfolio } from "./balancePortfolio.js";

describe("balancePortfolio.test.ts", function () {
    const publicClient = createPublicClient({
        transport: http("https://mode.drpc.org/"),
    });
    const quoterV2Address = "0x7c5aaa464f736740156fd69171505d344855d1e5";
    const swapRouterAddress = "0xAc48FcF1049668B285f3dC72483DF5Ae2162f7e8";

    const USDC = "0xd988097fb8612cc24eeC14542bC03424c656005f";
    const WETH = "0x4200000000000000000000000000000000000006";
    const MODE = "0xDfc7C877a950e49D2610114102175A06C2e3167a";

    test("balancePortfolio", async () => {
        const portfolio = await balancePortfolio({
            publicClient,
            quoterV2Address,
            swapRouterAddress,
            intermediateAddresses: [WETH],
            account: "0xfE732ca712C695Ee14a8A015E65997dD9189C31b",
            assets: [
                { address: USDC, targetRatio: 0 },
                { address: WETH, targetRatio: 1 },
                { address: MODE, targetRatio: 0 },
            ],
            valueTokenAddress: USDC,
        });

        expect(portfolio).toBeDefined();

        console.debug(portfolio);
        console.debug(`Total Holding Value $${formatUnits(portfolio.totalValue, 6)}`);
        console.debug(`Total Trade Value $${formatUnits(portfolio.totalTradeValue, 6)}`);
    });
});
