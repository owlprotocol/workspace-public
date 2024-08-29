import { parseEther } from "viem";
import { iotx } from "../currencies/iotx.js";
import { defineNetwork } from "../defineChain.js";

export const iotexTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 4690,
    slug: "iotex-testnet",
    name: "Iotex Testnet",
    testnet: true,
    nativeCurrency: iotx,
    blockExplorers: {
        default: {
            name: "iotextscan",
            url: "https://testnet.iotexscan.io",
        },
    },
    rpcDefault: "https://babel-api.testnet.iotex.io",
    rpcUrls: {
        default: {
            http: ["https://babel-api.testnet.iotex.io"],
            webSocket: ["wss://babel-api.testnet.iotex.io/ws"],
        },
    },
    enabled: false,
    rank: 0,
    minUtilityBalance: parseEther("1"),
    //TODO: Topup code what if utility < target?
    targetUtilityBalance: parseEther("8"),
    minPaymasterBalance: parseEther("1"),
    targetPaymasterBalance: parseEther("20"),
    minRelayerBalance: parseEther("1"),
    targetRelayerBalance: parseEther("5"),
});
