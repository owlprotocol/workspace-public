import { parseEther } from "viem/utils";
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
