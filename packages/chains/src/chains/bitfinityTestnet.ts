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
});
