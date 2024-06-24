import { optimism as optimismViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const optimism = /*#__PURE__*/ defineNetwork({
    ...optimismViem,
    rpcUrls: {
        ...optimismViem.rpcUrls,
        public: optimismViem.rpcUrls.default,
    },
    description:
        "Optimism, a leading Layer 2 scaling solution for Ethereum, revolutionizes blockchain interactions with its Optimistic Rollups technology. By providing faster and more cost-effective transactions, Optimism significantly improves the user experience on the Ethereum network.",
    slug: "optimism",
    slugAnkr: "optimism",
    slugDrpc: "optimism",
    enabled: true,
    stack: "opstack-bedrock",
});
