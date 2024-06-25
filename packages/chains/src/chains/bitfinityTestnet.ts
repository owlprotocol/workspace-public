import { parseEther } from "viem/utils";
import { defineNetwork } from "../defineChain.js";

export const bitfinityTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 355113,
    slug: "biftinity-testnet",
    name: "Bitfinity Testnet",
    testnet: true,
    nativeCurrency: {
        decimals: 18,
        name: "Bitfinity Testnet",
        symbol: "BFT",
    },
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://explorer.testnet.bitfinity.network",
        },
        default: {
            name: "blocksckout",
            url: "https://explorer.testnet.bitfinity.network",
        },
    },
    rpcUrls: {
        default: {
            http: ["https://testnet.bitfinity.network"],
        },
    },
    enabled: false,
    rank: 9999,
    minUtilityBalance: parseEther("1"),
    targetUtilityBalance: parseEther("8"),
    minPaymasterBalance: parseEther("0.1"),
    targetPaymasterBalance: parseEther("2"),
    minRelayerBalance: parseEther("0.1"),
    targetRelayerBalance: parseEther("1"),
});
