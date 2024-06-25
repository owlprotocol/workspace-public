import { sepolia as sepoliaViem } from "viem/chains";
import { parseEther } from "viem/utils";
import { defineNetwork } from "../defineChain.js";

export const sepolia = /*#__PURE__*/ defineNetwork({
    ...sepoliaViem,
    rpcUrls: {
        ...sepoliaViem.rpcUrls,
        public: sepoliaViem.rpcUrls.default,
    },
    slug: "sepolia",
    slugAnkr: "eth_sepolia",
    slugDrpc: "sepolia",
    //Disabled but rpc still useful for L2 OPStack bridging
    enabled: false,
    //TODO: Figure these out amounts
    minUtilityBalance: parseEther("1"),
    targetUtilityBalance: parseEther("20"),
    minPaymasterBalance: parseEther("1"),
    targetPaymasterBalance: parseEther("10"),
    minRelayerBalance: parseEther("0.1"),
    targetRelayerBalance: parseEther("1"),
});
