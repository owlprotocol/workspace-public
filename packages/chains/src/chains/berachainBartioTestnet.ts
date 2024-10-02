import { bera } from "../currencies/index.js";
import { defineNetwork } from "../defineChain.js";

export const berachainBartioTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 80084,
    slug: "berachain-bartio-testnet",
    slugAnkr: "bartio",
    slugDrpc: "bartio",
    name: "Berachain bArtio Testnet",
    testnet: true,
    nativeCurrency: bera,
    blockExplorers: {
        routescan: {
            name: "routescan",
            url: "https://bartio.beratrail.io",
        },
        default: {
            name: "blocksckout",
            url: "https://bartio.beratrail.io",
        },
    },
    rpcUrls: {
        default: {
            http: ["https://bartio.rpc.berachain.com"],
            webSocket: [],
        },
        public: {
            http: ["https://bartio.rpc.berachain.com"],
            webSocket: [],
        },
    },
    enabled: true,
    rank: 9999,
});
