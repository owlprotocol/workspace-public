import { blastSepolia as blastSepoliaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const blastSepolia = /*#__PURE__*/ defineNetwork({
    ...blastSepoliaViem,
    rpcUrls: {
        ...blastSepoliaViem.rpcUrls,
        public: blastSepoliaViem.rpcUrls.default,
    },
    slug: "blast-sepolia",
    slugAnkr: "base_testnet_sepolia",
    slugDrpc: "blast-sepolia",
});
