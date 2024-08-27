import { polygonAmoy as polygonAmoyViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const polygonAmoy = /*#__PURE__*/ defineNetwork({
    ...polygonAmoyViem,
    rpcUrls: {
        ...polygonAmoyViem.rpcUrls,
        public: polygonAmoyViem.rpcUrls.default,
    },
    slug: "polygon-amoy",
    slugDrpc: "polygon-amoy",
    enabled: true,
});
