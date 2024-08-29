import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

//Old testnet deployed via Caldera on Sepolia + OPStack + Celestia
export const hedwigSepoliaTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 130130,
    slug: "hedwig-sepolia-testnet",
    name: "Hedwig Sepolia Testnet (Deprecated)",
    sourceId: 11155111,
    testnet: true,
    nativeCurrency: ether,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://owl-hedwig-testnet.explorer.caldera.xyz",
        },
        default: {
            name: "blocksckout",
            url: "https://owl-hedwig-testnet.explorer.caldera.xyz",
        },
    },
    rpcDefault: "https://owl-hedwig-testnet.rpc.caldera.xyz/http",
    rpcUrls: {
        default: {
            http: ["https://owl-hedwig-testnet.rpc.caldera.xyz/http"],
            webSocket: ["wss://owl-hedwig-testnet.rpc.caldera.xyz/ws"],
        },
    },
    enabled: false,
    stack: "opstack-bedrock",
    rank: 0,
});
