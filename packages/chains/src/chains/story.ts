import { defineChain } from "viem/utils";
import { defineNetwork } from "../defineChain.js";

const storyViem = /*#__PURE__*/ defineChain({
    id: 1514,
    name: "Story",
    nativeCurrency: {
        decimals: 18,
        name: "IP Token",
        symbol: "IP",
    },
    rpcUrls: {
        default: { http: ["https://mainnet.storyrpc.io"] },
    },
    blockExplorers: {
        default: {
            name: "Story explorer",
            url: "https://www.storyscan.xyz/",
            apiUrl: "https://www.storyscan.xyz/api/v2/",
        },
    },
    testnet: false,
});

export const story = /*#__PURE__*/ defineNetwork({
    ...storyViem,
    rpcUrls: {
        ...storyViem.rpcUrls,
        public: storyViem.rpcUrls.default,
    },
    slug: "story",
    enabled: true,
});
