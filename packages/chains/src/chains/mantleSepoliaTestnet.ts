import { mantleSepoliaTestnet as mantleSepoliaTestnetViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const mantleSepoliaTestnet = /*#__PURE__*/ defineNetwork({
    ...mantleSepoliaTestnetViem,
    rpcUrls: {
        ...mantleSepoliaTestnetViem.rpcUrls,
        public: mantleSepoliaTestnetViem.rpcUrls.default,
    },
    slug: "mantle-sepolia",
    slugAnkr: "mantle_sepolia",
    slugDrpc: "mantle-sepolia",
    enabled: false,
    stack: "opstack-ovm",
});
