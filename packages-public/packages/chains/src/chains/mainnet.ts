import { mainnet as mainnetViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const mainnet = /*#__PURE__*/ defineNetwork({
    ...mainnetViem,
    rpcUrls: {
        ...mainnetViem.rpcUrls,
        public: mainnetViem.rpcUrls.default,
    },
    slug: "mainnet",
    slugAnkr: "eth",
    slugDrpc: "ethereum",
});
