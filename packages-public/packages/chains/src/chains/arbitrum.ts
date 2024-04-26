import { arbitrum as arbitrumViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const arbitrum = /*#__PURE__*/ defineNetwork({
    ...arbitrumViem,
    rpcUrls: {
        ...arbitrumViem.rpcUrls,
        public: arbitrumViem.rpcUrls.default,
    },
    slug: "arbitrum",
    slugAnkr: "arbitrum",
    slugDrpc: "arbitrum",
});
