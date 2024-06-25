import { scrollSepolia as scrollSepoliaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const scrollSepolia = /*#__PURE__*/ defineNetwork({
    ...scrollSepoliaViem,
    rpcUrls: {
        ...scrollSepoliaViem.rpcUrls,
        public: scrollSepoliaViem.rpcUrls.default,
    },
    slug: "scroll-sepolia",
    slugAnkr: "scroll-sepolia",
    slugDrpc: "scroll-sepolia",
    enabled: false,
});
