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
    //~500 USD / chain
    minPaymasterBalance: parseEther("0.05"),
    targetPaymasterBalance: parseEther("0.1"),
    minRelayerBalance: parseEther("0.05"),
    targetRelayerBalance: parseEther("0.1"),
});
