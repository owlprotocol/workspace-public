import { baseSepolia as baseSepoliaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const baseSepolia = /*#__PURE__*/ defineNetwork({
    ...baseSepoliaViem,
    rpcUrls: {
        ...baseSepoliaViem.rpcUrls,
        public: baseSepoliaViem.rpcUrls.default,
    },
    slug: "base-sepolia",
    slugAnkr: "base_sepolia",
    slugDrpc: "base-sepolia",
    enabled: true,
    stack: "opstack-bedrock",
});
