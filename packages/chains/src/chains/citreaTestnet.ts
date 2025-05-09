import { defineChain } from "viem/utils";
import { defineNetwork } from "../defineChain.js";

const citreaTestnetViem = /*#__PURE__*/ defineChain({
    id: 5115,
    name: "Citrea Testnet",
    nativeCurrency: { name: "cBTC", symbol: "cBTC", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://rpc.testnet.citrea.xyz"],
        },
    },
    blockExplorers: {
        default: {
            name: "Citrea Explorer",
            url: "https://explorer.testnet.citrea.xyz",
            apiUrl: "https://explorer.testnet.citrea.xyz/api",
        },
    },
    testnet: true,
});

export const citreaTestnet = /*#__PURE__*/ defineNetwork({
    ...citreaTestnetViem,
    rpcUrls: {
        ...citreaTestnetViem.rpcUrls,
        public: citreaTestnetViem.rpcUrls.default,
    },
    slug: "citreaTestnet",
    enabled: true,
});
