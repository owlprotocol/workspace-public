import { base as baseViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const base = /*#__PURE__*/ defineNetwork({
    ...baseViem,
    rpcUrls: {
        ...baseViem.rpcUrls,
        public: baseViem.rpcUrls.default,
    },
    slug: "base",
    slugAnkr: "base",
    slugDrpc: "base",
});
