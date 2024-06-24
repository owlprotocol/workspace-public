import { polygonZkEvm as polygonZkEvmViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const polygonZkEvm = /*#__PURE__*/ defineNetwork({
    ...polygonZkEvmViem,
    rpcUrls: {
        ...polygonZkEvmViem.rpcUrls,
        public: polygonZkEvmViem.rpcUrls.default,
    },
    description:
        "An innovative layer 2 scaling solution combining ZK-Rollups and Ethereum Virtual Machine compatibility. Enhancing scalability and efficiency on the Polygon network, it enables fast, low-cost transactions for decentralized applications while maintaining Ethereum's familiar development environment and tools.",
    slug: "polygon-zkevm",
    slugDrpc: "polygon-zkevm",
    enabled: false,
});
