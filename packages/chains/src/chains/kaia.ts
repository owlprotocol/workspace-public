import { kaia as kaiaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const kaia = /*#__PURE__*/ defineNetwork({
    ...kaiaViem,
    rpcUrls: {
        ...kaiaViem.rpcUrls,
        public: kaiaViem.rpcUrls.default,
    },
    slug: "kaia",
    slugAnkr: "klaytn",
    slugDrpc: "klaytn",
    enabled: false,
});
