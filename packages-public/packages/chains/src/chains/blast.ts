import { blast as blastViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const blast = /*#__PURE__*/ defineNetwork({
    ...blastViem,
    rpcUrls: {
        ...blastViem.rpcUrls,
        public: blastViem.rpcUrls.default,
    },
    slug: "blast",
    slugAnkr: "blast",
    slugDrpc: "blast",
});
