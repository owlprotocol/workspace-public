import { bscTestnet as bscTestnetViem } from "viem/chains";
import { parseEther } from "viem/utils";
import { defineNetwork } from "../defineChain.js";

export const bscTestnet = /*#__PURE__*/ defineNetwork({
    ...bscTestnetViem,
    rpcUrls: {
        ...bscTestnetViem.rpcUrls,
        public: bscTestnetViem.rpcUrls.default,
    },
    slug: "bsc-testnet",
    slugAnkr: "bsc_testnet_chapel",
    slugDrpc: "bsc-testnet",
    enabled: false,
    minUtilityBalance: parseEther("1"),
    targetUtilityBalance: parseEther("4"),
    minPaymasterBalance: parseEther("0.25"),
    targetPaymasterBalance: parseEther("1.5"),
    minRelayerBalance: parseEther("0.25"),
    targetRelayerBalance: parseEther("1.5"),
});
