import { parseEther } from "viem/utils";
import { defineNetwork } from "../defineChain.js";
import { btc } from "../currencies/index.js";

export const bitlayer = /*#__PURE__*/ defineNetwork({
    chainId: 200910,
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
    enabled: false,
    rank: 9999,
    minUtilityBalance: parseEther("1"),
    //TODO: Topup code what if utility < target?
    targetUtilityBalance: parseEther("8"),
    minPaymasterBalance: parseEther("0.1"),
    targetPaymasterBalance: parseEther("2"),
    minRelayerBalance: parseEther("0.1"),
    targetRelayerBalance: parseEther("1"),
});
