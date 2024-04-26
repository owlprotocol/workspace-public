import { optimismSepolia as optimismSepoliaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const optimismSepolia = /*#__PURE__*/ defineNetwork({
    ...optimismSepoliaViem,
    rpcUrls: {
        ...optimismSepoliaViem.rpcUrls,
        public: optimismSepoliaViem.rpcUrls.default,
    },
    slug: "optimism-sepolia",
    slugAnkr: "optimism_sepolia",
    slugDrpc: "optimism-sepolia",
});
