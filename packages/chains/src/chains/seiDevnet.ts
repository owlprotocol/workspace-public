import { seiDevnet as seiDevnetViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const seiDevnet = /*#__PURE__*/ defineNetwork({
    ...seiDevnetViem,
    rpcUrls: {
        ...seiDevnetViem.rpcUrls,
        public: seiDevnetViem.rpcUrls.default,
    },
    slug: "seiDevnet",
    slugDrpc: "sei-devnet",
    enabled: true,
});
