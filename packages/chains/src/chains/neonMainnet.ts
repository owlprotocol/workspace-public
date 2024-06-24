import { neonMainnet as neonMainnetViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const neonMainnet = /*#__PURE__*/ defineNetwork({
    ...neonMainnetViem,
    rpcUrls: {
        ...neonMainnetViem.rpcUrls,
        public: neonMainnetViem.rpcUrls.default,
    },
    description:
        "Neon EVM bridges Ethereum dApps onto Solana, offering seamless scalability and vibrant ecosystem access.",
    slug: "neon-evm",
    slugDrpc: "neon-evm",
    enabled: false,
});
