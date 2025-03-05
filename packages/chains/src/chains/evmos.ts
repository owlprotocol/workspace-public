import { evmos as evmosViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const evmos = /*#__PURE__*/ defineNetwork({
    ...evmosViem,
    rpcUrls: {
        ...evmosViem.rpcUrls,
        // public: evmosViem.rpcUrls.default,
        public: { http: ["https://evmos.lava.build"] },
        default: { http: ["https://evmos.lava.build"] },
    },
    slug: "evmos",
    // slugDrpc: "evmos",
    enabled: true,
});
