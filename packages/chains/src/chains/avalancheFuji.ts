import { avalancheFuji as avalancheFujiViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const avalancheFuji = /*#__PURE__*/ defineNetwork({
    ...avalancheFujiViem,
    rpcUrls: {
        ...avalancheFujiViem.rpcUrls,
        public: avalancheFujiViem.rpcUrls.default,
    },
    slug: "avalanche-fuji",
    slugAnkr: "avalanche-fuji",
    slugDrpc: "avalanche-fuji",
    enabled: true,
});
