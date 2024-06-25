import { arbitrum as arbitrumViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const arbitrum = /*#__PURE__*/ defineNetwork({
    ...arbitrumViem,
    rpcUrls: {
        ...arbitrumViem.rpcUrls,
        public: arbitrumViem.rpcUrls.default,
    },
    description:
        "A significant layer 2 scaling solution for Ethereum (categorized as level 2). Utilizing its native token, ETH, for cost-efficient and rapid transactions. Enhancing decentralized applications with advanced scalability and usability.",
    slug: "arbitrum",
    slugAnkr: "arbitrum",
    slugDrpc: "arbitrum",
    enabled: true,
    stack: "arbitrum-rollup",
});
