import { curtis as curtisViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const curtis = /*#__PURE__*/ defineNetwork({
    ...curtisViem,
    rpcUrls: {
        ...curtisViem.rpcUrls,
        public: curtisViem.rpcUrls.default,
    },
    slug: "curtis",
    slugDrpc: "apechain-curtis",
    enabled: true,
});
