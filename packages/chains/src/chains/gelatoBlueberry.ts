import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

export const gelatoBlueberry = /*#__PURE__*/ defineNetwork({
    chainId: 88153591557,
    slug: "arb-blueberry",
    name: "Arbitrum Blueberry Testnet",
    sourceId: 421614,
    testnet: true,
    nativeCurrency: ether,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://arb-blueberry.gelatoscout.com",
        },
        default: {
            name: "blocksckout",
            url: "https://arb-blueberry.gelatoscout.com",
        },
    },
    rpcDefault: "https://rpc.arb-blueberry.gelato.digital",
    rpcUrls: {
        default: {
            http: ["https://rpc.arb-blueberry.gelato.digital"],
            webSocket: ["wss://ws.arb-blueberry.gelato.digital"],
        },
    },
    enabled: true,
    rank: 9999,
});
