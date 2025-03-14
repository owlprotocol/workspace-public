import { defineChain } from "viem/utils";
import { defineNetwork } from "../defineChain.js";

const storyAeneidViem = /*#__PURE__*/ defineChain({
    id: 1315,
    name: "Story Aeneid",
    nativeCurrency: {
        decimals: 18,
        name: "IP",
        symbol: "IP",
    },
    rpcUrls: {
        default: { http: ["https://aeneid.storyrpc.io"] },
    },
    blockExplorers: {
        default: {
            name: "Story Aeneid Explorer",
            url: "https://aeneid.storyscan.xyz",
            apiUrl: "https://aeneid.storyscan.xyz/api/v2",
        },
    },
    testnet: true,
});

export const storyAeneid = /*#__PURE__*/ defineNetwork({
    ...storyAeneidViem,
    rpcUrls: {
        ...storyAeneidViem.rpcUrls,
        public: storyAeneidViem.rpcUrls.default,
    },
    slug: "storyAeneid",
    // TODO: enable again if it works, currently times out
    slugAnkr: "story_aeneid_testnet",
    enabled: true,
});
