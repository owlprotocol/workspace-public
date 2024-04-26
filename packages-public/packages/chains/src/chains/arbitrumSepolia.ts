import { arbitrumSepolia as arbitrumSepoliaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const arbitrumSepolia = /*#__PURE__*/ defineNetwork({
    ...arbitrumSepoliaViem,
    rpcUrls: {
        ...arbitrumSepoliaViem.rpcUrls,
        public: arbitrumSepoliaViem.rpcUrls.default,
    },
    slug: "arbitrum-sepolia",
    slugAnkr: "arbitrum_sepolia",
    slugDrpc: "arbitrum-sepolia",
});
