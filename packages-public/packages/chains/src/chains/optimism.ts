import { optimism as optimismViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const optimism = /*#__PURE__*/ defineNetwork({
    ...optimismViem,
    rpcUrls: {
        ...optimismViem.rpcUrls,
        public: optimismViem.rpcUrls.default,
    },
    slug: "optimism",
    slugAnkr: "optimism",
    slugDrpc: "optimism",
});
