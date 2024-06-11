import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

const sourceId = 1; // ethereum

export const redstone = /*#__PURE__*/ defineNetwork({
    chainId: 690,
    slug: "redstone",
    name: "Redstone",
    testnet: false,
    nativeCurrency: ether,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://explorer.redstone.xyz",
        },
        default: {
            name: "blocksckout",
            url: "https://explorer.redstone.xyz",
        },
    },
    rpcDefault: "https://rpc.redstonechain.com",
    rpcUrls: {
        default: {
            http: ["https://rpc.redstonechain.com"],
            webSocket: ["wss://rpc.redstonechain.com"],
        },
    },
    contracts: {
        portal: {
            [sourceId]: {
                address: "0xC7bCb0e8839a28A1cFadd1CF716de9016CdA51ae",
                blockCreated: 19578329,
            },
        },
    },
    sourceId,
    enabled: true,
    stack: "opstack-bedrock",
    rank: 9999,
});
