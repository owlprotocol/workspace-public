import { polygonAmoy as polygonAmoyViem } from "viem/chains";
import { parseEther } from "viem/utils";
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
    minUtilityBalance: parseEther("2"),
    targetUtilityBalance: parseEther("25"),
    minPaymasterBalance: parseEther("2"),
    targetPaymasterBalance: parseEther("10"),
    minRelayerBalance: parseEther("2"),
    targetRelayerBalance: parseEther("10"),
});
