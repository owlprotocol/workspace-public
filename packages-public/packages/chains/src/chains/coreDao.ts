import { coreDao as coreDaoViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const coreDao = /*#__PURE__*/ defineNetwork({
    ...coreDaoViem,
    rpcUrls: {
        ...coreDaoViem.rpcUrls,
        public: coreDaoViem.rpcUrls.default,
    },
    slug: "coredao",
    slugAnkr: "core",
    slugDrpc: "core",
});
