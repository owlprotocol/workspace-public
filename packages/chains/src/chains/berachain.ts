import { defineChain } from "viem/utils";
import { defineNetwork } from "../defineChain.js";

const berachainViem = /*#__PURE__*/ defineChain({
    id: 80094,
    name: "Berachain",
    nativeCurrency: {
        decimals: 18,
        name: "BERA Token",
        symbol: "BERA",
    },
    rpcUrls: {
        default: { http: ["https://rpc.berachain.com"] },
    },
    blockExplorers: {
        default: {
            name: "Berascan",
            url: "https://berascan.com",
        },
    },
    testnet: false,
});

export const berachain = /*#__PURE__*/ defineNetwork({
    ...berachainViem,
    rpcUrls: {
        ...berachainViem.rpcUrls,
        public: berachainViem.rpcUrls.default,
    },
    slug: "berachain",
    // TODO: Fix when drpc works with bera
    // slugDrpc: "berachain",
    enabled: true,
});
