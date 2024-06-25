import { neonDevnet as neonDevnetViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const neonDevnet = /*#__PURE__*/ defineNetwork({
    ...neonDevnetViem,
    rpcUrls: {
        ...neonDevnetViem.rpcUrls,
        public: neonDevnetViem.rpcUrls.default,
    },
    testnet: true,
    slug: "neon-evm-devnet",
    slugDrpc: "neon-evm-devnet",
    enabled: false,
});
