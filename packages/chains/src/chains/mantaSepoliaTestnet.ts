import { mantaSepoliaTestnet as mantaSepoliaTestnetViem, sepolia } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

const sourceId = sepolia.id;

export const mantaSepoliaTestnet = /*#__PURE__*/ defineNetwork({
    ...mantaSepoliaTestnetViem,
    rpcUrls: {
        ...mantaSepoliaTestnetViem.rpcUrls,
        public: mantaSepoliaTestnetViem.rpcUrls.default,
    },
    testnet: true,
    slug: "manta-sepolia",
    slugDrpc: "manta-pacific-sepolia",
    enabled: true,
    stack: "opstack-bedrock",
    sourceId,
    contracts: {
        portal: {
            [sourceId]: {
                address: "0x80f86c5d3AE8cF84596FF22DB2829F1b7a9Fe83d",
                blockCreated: 5304433,
            },
        },
    },
});
