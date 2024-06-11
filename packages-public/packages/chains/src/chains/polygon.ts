import { polygon as polygonViem } from "viem/chains";
import { parseEther } from "viem/utils";
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
    minUtilityBalance: parseEther("10"),
    targetUtilityBalance: parseEther("20"),
    minPaymasterBalance: parseEther("10"),
    targetPaymasterBalance: parseEther("30"),
    minRelayerBalance: parseEther("10"),
    targetRelayerBalance: parseEther("30"),
});
