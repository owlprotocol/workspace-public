import { bsc as bscViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const bsc = /*#__PURE__*/ defineNetwork({
    ...bscViem,
    rpcUrls: {
        ...bscViem.rpcUrls,
        public: bscViem.rpcUrls.default,
    },
    description:
        "A major Layer 1 blockchain empowering decentralized applications with high-speed, low-cost transactions. BNB serves as its native currency, fueling the Binance Smart Chain ecosystem's growth and innovation.",
    slug: "bsc",
    slugAnkr: "bsc",
    slugDrpc: "bsc",
    enabled: false,
});
