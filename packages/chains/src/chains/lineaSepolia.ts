import { lineaSepolia as lineaSepoliaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const lineaSepolia = /*#__PURE__*/ defineNetwork({
    ...lineaSepoliaViem,
    rpcUrls: {
        ...lineaSepoliaViem.rpcUrls,
        public: lineaSepoliaViem.rpcUrls.default,
    },
    slug: "linea-sepolia",
    slugAnkr: "linea_sepolia",
    slugDrpc: "linea-sepolia",
    enabled: true,
});
