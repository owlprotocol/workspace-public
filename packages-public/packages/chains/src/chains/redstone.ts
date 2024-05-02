import { parseEther } from "viem/utils";
import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

const sourceId = 1; // ethereum

export const redstone = /*#__PURE__*/ defineNetwork({
    chainId: 690,
    slug: "redstone",
    name: "Redstone",
    testnet: false,
    nativeCurrency: ether,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://explorer.redstone.xyz",
        },
        default: {
            name: "blocksckout",
            url: "https://explorer.redstone.xyz",
        },
    },
    rpcDefault: "https://rpc.redstonechain.com",
    rpcUrls: {
        default: {
            http: ["https://rpc.redstonechain.com"],
            webSocket: ["wss://rpc.redstonechain.com"],
        },
    },
    contracts: {
        //TODO: Add additional contracts
        portal: {
            [sourceId]: {
                address: "0xC7bCb0e8839a28A1cFadd1CF716de9016CdA51ae",
                blockCreated: 1,
            },
        },
    },
    sourceId,
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
