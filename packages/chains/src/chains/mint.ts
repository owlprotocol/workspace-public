import { mainnet } from "viem/chains";
import { defineNetwork } from "../defineChain.js";
import { ether } from "../currencies/ether.js";

const sourceId = mainnet.id;

export const mint = /*#__PURE__*/ defineNetwork({
    id: 185,
    name: "Mint Mainnet",
    nativeCurrency: ether,
    rpcUrls: {
        default: {
            http: ["https://rpc.mintchain.io"],
            webSocket: ["wss://rpc.mintchain.io"],
        },
        public: {
            http: ["https://rpc.mintchain.io"],
            webSocket: ["wss://rpc.mintchain.io"],
        },
    },
    blockExplorers: {
        default: {
            name: "Mint Mainnet Explorer",
            url: "https://explorer.mintchain.io",
        },
    },
    slug: "mint",
    enabled: true,
    stack: "opstack-bedrock",
    sourceId,
    contracts: {
        portal: {
            [sourceId]: {
                address: "0x59625d1FE0Eeb8114a4d13c863978F39b3471781",
                blockCreated: 19861572,
            },
        },
    },
});
