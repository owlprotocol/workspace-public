import { bscTestnet as bscTestnetViem } from "viem/chains";
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
});
