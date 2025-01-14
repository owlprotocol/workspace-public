import { sei as seiViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const sei = /*#__PURE__*/ defineNetwork({
    ...seiViem,
    rpcUrls: {
        ...seiViem.rpcUrls,
        public: seiViem.rpcUrls.default,
    },
    slug: "sei",
    slugAnkr: "sei",
    slugDrpc: "sei",
    enabled: true,
});
