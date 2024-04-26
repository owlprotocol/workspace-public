import { arbitrumNova as arbitrumNovaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const arbitrumNova = /*#__PURE__*/ defineNetwork({
    ...arbitrumNovaViem,
    rpcUrls: {
        ...arbitrumNovaViem.rpcUrls,
        public: arbitrumNovaViem.rpcUrls.default,
    },
    slug: "arbitrum-nova",
    slugAnkr: "arbitrumnova",
    slugDrpc: "arbitrum-nova",
});
