import { sepolia as sepoliaViem } from "viem/chains";
import { parseEther } from "viem";
import { defineNetwork } from "../defineChain.js";

export const sepolia = /*#__PURE__*/ defineNetwork({
    ...sepoliaViem,
    rpcUrls: {
        ...sepoliaViem.rpcUrls,
        public: sepoliaViem.rpcUrls.default,
    },
    slug: "sepolia",
    slugAnkr: "eth_sepolia",
    slugDrpc: "sepolia",
    enabled: true,
    faucets: {
        default: { name: "nero", url: "https://www.app.testnet.nerochain.io/faucet" },
    },
    minPaymasterBalance: parseEther("0.6"),
    targetPaymasterBalance: parseEther("2"),
});
