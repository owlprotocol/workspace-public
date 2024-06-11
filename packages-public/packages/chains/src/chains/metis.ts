import { metis as metisViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const metis = /*#__PURE__*/ defineNetwork({
    ...metisViem,
    rpcUrls: {
        ...metisViem.rpcUrls,
        public: metisViem.rpcUrls.default,
    },
    description:
        "Metis is an Ethereum Layer 2 Rollup platform that offers simple and fast smart contract deployment within the network. Metis provides several solutions to solve the big challenges we face in the main net Ethereum, including transaction speed, cost, and scalability.",
    slug: "metis",
    slugAnkr: "metis",
    slugDrpc: "metis",
    enabled: false,
    stack: "opstack-ovm",
});
