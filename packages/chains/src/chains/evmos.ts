import { evmos as evmosViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const evmos = /*#__PURE__*/ defineNetwork({
    ...evmosViem,
    rpcUrls: {
        ...evmosViem.rpcUrls,
        public: evmosViem.rpcUrls.default,
    },
    slug: "evmos",
    slugDrpc: "evmos",
    enabled: true,
});
