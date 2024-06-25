import { mantle as mantleViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const mantle = /*#__PURE__*/ defineNetwork({
    ...mantleViem,
    rpcUrls: {
        ...mantleViem.rpcUrls,
        public: mantleViem.rpcUrls.default,
    },
    description: "Mantle Network is an EVM-compatible technology stack for scaling Ethereum.",
    slug: "mantle",
    slugAnkr: "mantle",
    slugDrpc: "mantle",
    enabled: false,
    stack: "opstack-ovm",
});
