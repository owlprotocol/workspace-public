import { bsc as bscViem } from "viem/chains";
import { parseEther } from "viem/utils";
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
    minUtilityBalance: parseEther("0.1"),
    targetUtilityBalance: parseEther("0.1"),
    minPaymasterBalance: parseEther("0.02"),
    targetPaymasterBalance: parseEther("0.1"),
    minRelayerBalance: parseEther("0.02"),
    targetRelayerBalance: parseEther("0.1"),
});
