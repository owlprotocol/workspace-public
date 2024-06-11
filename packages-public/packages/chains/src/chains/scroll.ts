import { scroll as scrollViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const scroll = /*#__PURE__*/ defineNetwork({
    ...scrollViem,
    rpcUrls: {
        ...scrollViem.rpcUrls,
        public: scrollViem.rpcUrls.default,
    },
    description:
        "Scroll seamlessly extends Ethereum’s capabilities through zero knowledge tech and EVM equivalence. The L2 blockchain built by Ethereum devs for Ethereum devs.",
    slug: "scroll",
    slugAnkr: "scroll",
    slugDrpc: "scroll",
    enabled: false,
});
