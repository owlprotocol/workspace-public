import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

export const gelatoBlackberry = /*#__PURE__*/ defineNetwork({
    chainId: 94204209,
    slug: "polygon-blackberry",
    name: "Polygon Blackberry Testnet",
    sourceId: 11155111,
    testnet: true,
    nativeCurrency: ether,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://polygon-blackberry.gelatoscout.com",
        },
        default: {
            name: "blocksckout",
            url: "https://polygon-blackberry.gelatoscout.com",
        },
    },
    rpcDefault: "https://rpc.polygon-blackberry.gelato.digital",
    rpcUrls: {
        default: {
            http: ["https://rpc.polygon-blackberry.gelato.digital"],
            webSocket: ["wss://ws.polygon-blackberry.gelato.digital"],
        },
    },
    enabled: false,
    rank: 9999,
});
