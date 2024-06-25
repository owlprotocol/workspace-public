import { polygonZkEvmCardona as polygonZkEvmCardonaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const polygonZkEvmCardona = /*#__PURE__*/ defineNetwork({
    ...polygonZkEvmCardonaViem,
    rpcUrls: {
        ...polygonZkEvmCardonaViem.rpcUrls,
        public: polygonZkEvmCardonaViem.rpcUrls.default,
    },
    testnet: true,
    slug: "polygon-zkevm-cardona",
    slugDrpc: "polygon-zkevm-cardona",
    enabled: false,
});
