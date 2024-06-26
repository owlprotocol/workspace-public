import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

const sourceId = 17000; // ethereum holesky

export const redstoneTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 17069,
    slug: "redstone-testnet",
    name: "Garnet Holesky Redstone Testnet",
    testnet: true,
    nativeCurrency: ether,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://explorer.garnetchain.com",
        },
        default: {
            name: "blocksckout",
            url: "https://explorer.garnetchain.com",
        },
    },
    rpcDefault: "https://rpc.garnetchain.com",
    rpcUrls: {
        default: {
            http: ["https://rpc.garnetchain.com"],
            webSocket: ["wss://rpc.garnetchain.com"],
        },
    },
    contracts: {
        portal: {
            [sourceId]: {
                address: "0x57ee40586fbE286AfC75E67cb69511A6D9aF5909",
                blockCreated: 1274684,
            },
        },
    },
    sourceId,
    enabled: true,
    stack: "opstack-bedrock",
    rank: 9999,
});
