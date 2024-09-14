import { defineNetwork } from "../defineChain.js";
import { btc } from "../currencies/index.js";

export const bitlayerTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 200810,
    slug: "bitlayer-testnet",
    slugAnkr: "bitlayer_testnet",
    name: "Bitlayer Testnet",
    testnet: true,
    nativeCurrency: btc,
    blockExplorers: {
        btrscan: {
            name: "btrscan",
            url: "https://testnet-scan.bitlayer.org",
        },
        default: {
            name: "btrscan",
            url: "https://testnet-scan.bitlayer.org",
        },
    },
    rpcUrls: {
        default: {
            http: ["https://testnet-rpc.bitlayer.org"],
            webSocket: ["wss://testnet-ws.bitlayer.org"],
        },
    },
    faucets: {
        default: {
            name: "bitlayer",
            url: "https://www.bitlayer.org/faucet",
        },
    },
    enabled: true,
    rank: 9999,
});
