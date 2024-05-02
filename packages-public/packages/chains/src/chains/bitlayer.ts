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
    enabled: false,
    rank: 9999,
    minUtilityBalance: parseEther("0.001"),
    //TODO: Topup code what if utility < target?
    targetUtilityBalance: parseEther("0.01"),
    minPaymasterBalance: parseEther("0.001"),
    targetPaymasterBalance: parseEther("0.004"),
    minRelayerBalance: parseEther("0.001"),
    targetRelayerBalance: parseEther("0.002"),
});
