import { base as baseViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const base = /*#__PURE__*/ defineNetwork({
    ...baseViem,
    rpcUrls: {
        ...baseViem.rpcUrls,
        public: baseViem.rpcUrls.default,
    },
    description:
        "Base is an open-source optimistic rollup built on the Ethereum blockchain. Rollups are L2 blockchains built to help layer one (L1) blockchains like Bitcoin and Ethereum scale. They bundle hundreds of transactions and submit them to L1 as a single transaction, which reduces gas fees for the end user.",
    slug: "base",
    slugAnkr: "base",
    slugDrpc: "base",
    enabled: true,
    stack: "opstack-bedrock",
});
