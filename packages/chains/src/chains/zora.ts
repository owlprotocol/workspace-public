import { zora as zoraViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const zora = /*#__PURE__*/ defineNetwork({
    ...zoraViem,
    rpcUrls: {
        ...zoraViem.rpcUrls,
        public: zoraViem.rpcUrls.default,
    },
    description:
        "The Zora Network is Layer 2 blockchain built to help bring media onchain. Most L2s are DeFi centric whereas the Zora Network is an “NTF first” ecosystem. Zora is secured by Ethereum and Powered by the OP Stack.",
    slug: "zora",
    slugDrpc: "zora",
    enabled: true,
    stack: "opstack-bedrock",
});
