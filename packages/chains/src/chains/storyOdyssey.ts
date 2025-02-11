import { defineChain } from "viem/utils";
import { defineNetwork } from "../defineChain.js";

const storyOdysseyViem = /*#__PURE__*/ defineChain({
    id: 1516,
    name: "Story Odyssey",
    nativeCurrency: {
        decimals: 18,
        name: "IP",
        symbol: "IP",
    },
    rpcUrls: {
        default: { http: ["https://rpc.odyssey.storyrpc.io"] },
    },
    blockExplorers: {
        default: {
            name: "Story Odyssey Explorer",
            url: "https://odyssey.storyscan.xyz",
        },
    },
    testnet: true,
});

export const storyOdyssey = /*#__PURE__*/ defineNetwork({
    ...storyOdysseyViem,
    rpcUrls: {
        ...storyOdysseyViem.rpcUrls,
        public: storyOdysseyViem.rpcUrls.default,
    },
    slug: "storyOdyssey",
    // TODO: enable again if it works, currently times out
    // slugAnkr: "story_odyssey",
    enabled: true,
});
