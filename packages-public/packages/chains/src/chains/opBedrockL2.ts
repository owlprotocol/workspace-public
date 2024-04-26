import { parseEther } from "viem/utils";
import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

export const opBedrockL2 = /*#__PURE__*/ defineNetwork({
    chainId: 901,
    slug: "opbedrock-l2",
    name: "Optimism Bedrock L2",
    sourceId: 900,
    testnet: true,
    nativeCurrency: ether,
    rpcDefault: "http://127.0.0.1:9545",
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:9545"],
        },
    },
    minUtilityBalance: parseEther("0.1"),
    targetUtilityBalance: parseEther("10"),
    minPaymasterBalance: parseEther("0.1"),
    targetPaymasterBalance: parseEther("1"),
    minRelayerBalance: parseEther("0.1"),
    targetRelayerBalance: parseEther("1"),
    contracts: {
        portal: {
            [900]: {
                address: "0x9A676e781A523b5d0C0e43731313A708CB607508",
            },
        },
    },
    enabled: true,
    rank: -1,
});
