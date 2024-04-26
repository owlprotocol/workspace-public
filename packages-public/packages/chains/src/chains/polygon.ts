import { polygon as polygonViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const polygon = /*#__PURE__*/ defineNetwork({
    ...polygonViem,
    rpcUrls: {
        ...polygonViem.rpcUrls,
        public: polygonViem.rpcUrls.default,
    },
    slug: "polygon",
    slugAnkr: "polygon",
    slugDrpc: "polygon",
});
