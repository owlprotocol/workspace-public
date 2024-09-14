import { defineNetwork } from "../defineChain.js";

export const kaiaTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 1001,
    slug: "kaia-testnet",
    name: "Kaia Kairos Testnet",
    testnet: true,
    nativeCurrency: { name: "Kaia", symbol: "KLAY", decimals: 18 },
    blockExplorers: {
        default: {
            name: "kaiascan",
            url: "https://kaiascan.io/",
        },
        kaiascope: {
            name: "kaiascope",
            url: "https://kaiascope.com/",
        },
        kaiascan: {
            name: "kaiascan",
            url: "https://kaiascan.io/",
        },
    },
    rpcDefault: "https://public-en-kairos.node.kaia.io",
    rpcUrls: {
        default: {
            http: ["https://public-en-kairos.node.kaia.io"],
        },
    },
    enabled: true,
    rank: 0,
});
