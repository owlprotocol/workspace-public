import { mainnet as mainnetViem } from "viem/chains";
import { parseEther } from "viem";
import { defineNetwork } from "../defineChain.js";

export const mainnet = /*#__PURE__*/ defineNetwork({
    ...mainnetViem,
    rpcUrls: {
        ...mainnetViem.rpcUrls,
        public: mainnetViem.rpcUrls.default,
    },
    enabled: true,
    description:
        "Ethereum (ETH) is a decentralized, open-source blockchain featuring smart contract functionality. It is the second-largest cryptocurrency by market capitalization, after Bitcoin.",
    slug: "mainnet",
    slugAnkr: "eth",
    slugDrpc: "ethereum",
    //~500 USD / chain
    minPaymasterBalance: parseEther("0.5"),
    targetPaymasterBalance: parseEther("1"),
    minRelayerBalance: parseEther("0.05"),
    targetRelayerBalance: parseEther("0.1"),
});
