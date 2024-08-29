import { polygon as polygonViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const polygon = /*#__PURE__*/ defineNetwork({
    ...polygonViem,
    rpcUrls: {
        ...polygonViem.rpcUrls,
        public: polygonViem.rpcUrls.default,
    },
    description:
        "Polygon is a layer two or sidechain scaling solution that runs alongside the Ethereum blockchain, allowing for speedy transactions and low fees. MATIC is the network's native cryptocurrency, which is used for fees, staking, and more.",
    slug: "polygon",
    slugAnkr: "polygon",
    slugDrpc: "polygon",
    enabled: true,
});
