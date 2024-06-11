import { opBNB as opBNBViem, bsc } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

const sourceId = bsc.id;

export const opBNB = /*#__PURE__*/ defineNetwork({
    ...opBNBViem,
    rpcUrls: {
        ...opBNBViem.rpcUrls,
        public: opBNBViem.rpcUrls.default,
    },
    description:
        "opBNB is a high-performance layer-2 solution within the BNB ecosystem, built using the OP Stack. Leveraging its block size of 100M, opBNB's gas fees remain stable and low cost, making it a great solution for widespread adoption across multiple digital environments. From gaming and decentralized exchanges to daily use and digital collectibles, opBNB caters to a diverse set of needs while delivering optimal performance.",
    slug: "opbnb",
    slugAnkr: "opbnb",
    slugDrpc: "opbnb",
    enabled: false,
    stack: "opstack-bedrock",
    sourceId,
    contracts: {
        portal: {
            [sourceId]: {
                address: "0x4386C8ABf2009aC0c263462Da568DD9d46e52a31",
                blockCreated: 30727869,
            },
        },
    },
});
