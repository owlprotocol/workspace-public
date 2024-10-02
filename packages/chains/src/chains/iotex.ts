import { iotx } from "../currencies/iotx.js";
import { defineNetwork } from "../defineChain.js";

export const iotex = /*#__PURE__*/ defineNetwork({
    chainId: 4689,
    slug: "iotex",
    name: "Iotex",
    testnet: false,
    nativeCurrency: iotx,
    blockExplorers: {
        default: {
            name: "iotextscan",
            url: "https://iotexscan.io",
        },
    },
    rpcDefault: "https://babel-api.mainnet.iotex.io",
    rpcUrls: {
        default: {
            http: ["https://babel-api.mainnet.iotex.io"],
            webSocket: ["wss://babel-api.mainnet.iotex.io/ws"],
        },
    },
    enabled: false,
    rank: 0,
});
