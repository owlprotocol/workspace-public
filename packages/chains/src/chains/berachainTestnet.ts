import { bera } from "../currencies/index.js";
import { defineNetwork } from "../defineChain.js";

export const berachainTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 80085,
    slug: "berachain-testnet",
    slugAnkr: "berachain_testnet",
    slugDrpc: "artio",
    name: "Berachain Artio Testnet",
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
    enabled: true,
    rank: 9999,
});
