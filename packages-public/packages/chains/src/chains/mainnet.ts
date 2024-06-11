import { mainnet as mainnetViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const mainnet = /*#__PURE__*/ defineNetwork({
    ...mainnetViem,
    rpcUrls: {
        ...mainnetViem.rpcUrls,
        public: mainnetViem.rpcUrls.default,
    },
    description:
        "Ethereum (ETH) is a decentralized, open-source blockchain featuring smart contract functionality. It is the second-largest cryptocurrency by market capitalization, after Bitcoin.",
    slug: "mainnet",
    slugAnkr: "eth",
    slugDrpc: "ethereum",
});
