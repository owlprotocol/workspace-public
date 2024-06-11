import { zoraSepolia as zoraSepoliaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const zoraSepolia = /*#__PURE__*/ defineNetwork({
    ...zoraSepoliaViem,
    rpcUrls: {
        ...zoraSepoliaViem.rpcUrls,
        public: zoraSepoliaViem.rpcUrls.default,
    },
    slug: "zora-sepolia",
    enabled: true,
    stack: "opstack-bedrock",
});
