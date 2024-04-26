import { zora as zoraViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const zora = /*#__PURE__*/ defineNetwork({
    ...zoraViem,
    rpcUrls: {
        ...zoraViem.rpcUrls,
        public: zoraViem.rpcUrls.default,
    },
    slug: "zora",
    slugDrpc: "zora",
});
