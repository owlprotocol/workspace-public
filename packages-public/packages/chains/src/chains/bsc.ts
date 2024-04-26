import { bsc as bscViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const bsc = /*#__PURE__*/ defineNetwork({
    ...bscViem,
    rpcUrls: {
        ...bscViem.rpcUrls,
        public: bscViem.rpcUrls.default,
    },
    slug: "bsc",
    slugAnkr: "bsc",
    slugDrpc: "bsc",
});
