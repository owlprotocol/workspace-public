import { defineNetwork } from "../defineChain.js";
import { btc } from "../currencies/index.js";

export const bitlayer = /*#__PURE__*/ defineNetwork({
    chainId: 200901,
    slug: "bitlayer",
    slugAnkr: "bitlayer",
    name: "Bitlayer",
    testnet: false,
    nativeCurrency: btc,
    blockExplorers: {
        btrscan: {
            name: "btrscan",
            url: "https://www.btrscan.com",
        },
        default: {
            name: "btrscan",
            url: "https://www.btrscan.com",
        },
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.bitlayer.org"],
            webSocket: ["wss://ws.bitlayer.org"],
        },
    },
    bridges: {
        meson: {
            name: "meson",
            url: "https://meson.fi",
        },
        orbiter: {
            name: "orbiter",
            url: "https://www.orbiter.finance/?source=Ethereum&dest=Bitlayer&token=BTC",
        },
        owlto: {
            name: "owlto",
            url: "https://owlto.finance",
        },
        default: {
            name: "bitlayer",
            url: "https://www.bitlayer.org/bridge",
        },
    },
    enabled: true,
    rank: 9999,
});
