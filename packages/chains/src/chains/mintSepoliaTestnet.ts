import { sepolia } from "viem/chains";
import { defineNetwork } from "../defineChain.js";
import { ether } from "../currencies/ether.js";

const sourceId = sepolia.id;

export const mintSepoliaTestnet = /*#__PURE__*/ defineNetwork({
    id: 1687,
    name: "Mint Sepolia Testnet",
    nativeCurrency: ether,
    rpcUrls: {
        default: {
            http: ["https://sepolia-testnet-rpc.mintchain.io"],
            webSocket: ["wss://sepolia-testnet-rpc.mintchain.io"],
        },
        public: {
            http: ["https://sepolia-testnet-rpc.mintchain.io"],
            webSocket: ["wss://sepolia-testnet-rpc.mintchain.io"],
        },
    },
    blockExplorers: {
        default: {
            name: "Mint Sepolia Testnet Explorer",
            url: "https://sepolia-testnet-explorer.mintchain.io",
        },
    },
    slug: "mint-sepolia-testnet",
    testnet: true,
    enabled: true,
    stack: "opstack-bedrock",
    sourceId,
    contracts: {
        portal: {
            [sourceId]: {
                address: "0x0f598aFc1c303BF2d0Ee82435b58c7b47BC56Ed1",
                blockCreated: 5645825,
            },
        },
    },
});
