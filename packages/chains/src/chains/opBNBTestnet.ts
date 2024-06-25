import { opBNBTestnet as opBNBTestnetViem, bscTestnet } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

const sourceId = bscTestnet.id;

export const opBNBTestnet = /*#__PURE__*/ defineNetwork({
    ...opBNBTestnetViem,
    rpcUrls: {
        ...opBNBTestnetViem.rpcUrls,
        public: opBNBTestnetViem.rpcUrls.default,
    },
    testnet: true,
    slug: "opbnb-testnet",
    slugAnkr: "opbnb-testnet",
    slugDrpc: "opbnb-testnet",
    enabled: false,
    stack: "opstack-bedrock",
    sourceId,
    contracts: {
        portal: {
            [sourceId]: {
                address: "0x4386C8ABf2009aC0c263462Da568DD9d46e52a31",
                blockCreated: 1,
            },
        },
    },
});
