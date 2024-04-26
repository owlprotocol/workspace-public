import { polygonMumbai as polygonMumbaiViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const polygonMumbai = /*#__PURE__*/ defineNetwork({
    ...polygonMumbaiViem,
    rpcUrls: {
        ...polygonMumbaiViem.rpcUrls,
        public: polygonMumbaiViem.rpcUrls.default,
    },
    slug: "polygon-mumbai",
    slugDrpc: "polygon-mumbai",
});
