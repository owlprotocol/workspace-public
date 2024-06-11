import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

export const gelatoRaspberry = /*#__PURE__*/ defineNetwork({
    chainId: 123420111,
    slug: "opcelestia-raspberry",
    name: "OP Celestia Raspberry Testnet",
    sourceId: 11155111,
    testnet: true,
    nativeCurrency: ether,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://opcelestia-raspberry.gelatoscout.com",
        },
        default: {
            name: "blocksckout",
            url: "https://opcelestia-raspberry.gelatoscout.com",
        },
    },
    rpcDefault: "https://rpc.opcelestia-raspberry.gelato.digital",
    rpcUrls: {
        default: {
            http: ["https://rpc.opcelestia-raspberry.gelato.digital"],
            webSocket: ["wss://ws.opcelestia-raspberry.gelato.digital"],
        },
    },
    enabled: true,
    stack: "opstack-bedrock",
    rank: 9999,
});
