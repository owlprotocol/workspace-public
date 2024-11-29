import { opBNB as opBNBViem, bsc } from "viem/chains";
import { parseEther } from "viem";
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
    enabled: true,
    stack: "opstack-bedrock",
    sourceId,
    contracts: {
        portal: {
            [sourceId]: {
                address: "0x1876EA7702C0ad0C6A2ae6036DE7733edfBca519",
            },
        },
    },
    targetPaymasterBalance: parseEther("0.1"),
});
