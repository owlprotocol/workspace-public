import { bera } from "../currencies/index.js";
import { defineNetwork } from "../defineChain.js";

export const berachainArtioTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 80085,
    slug: "berachain-artio-testnet",
    slugAnkr: "artio",
    slugDrpc: "artio",
    name: "Berachain Artio Testnet (Deprecated)",
    testnet: true,
    nativeCurrency: bera,
    blockExplorers: {
        routescan: {
            name: "routescan",
            url: "https://artio.beratrail.io",
        },
        default: {
            name: "blocksckout",
            url: "https://artio.beratrail.io",
        },
    },
    rpcUrls: {
        default: {
            http: ["https://artio.rpc.berachain.com"],
            webSocket: [],
        },
        public: {
            http: ["https://artio.rpc.berachain.com"],
            webSocket: [],
        },
    },
    enabled: false,
    rank: 9999,
});
