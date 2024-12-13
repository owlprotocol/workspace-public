import { avalanche as avalancheViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const avalanche = /*#__PURE__*/ defineNetwork({
    ...avalancheViem,
    testnet: false,
    rpcUrls: {
        ...avalancheViem.rpcUrls,
        public: avalancheViem.rpcUrls.default,
    },
    slug: "avalanche",
    slugAnkr: "avalanche",
    slugDrpc: "avalanche",
    enabled: true,
});
