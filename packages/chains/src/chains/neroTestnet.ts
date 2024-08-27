import { parseEther } from "viem/utils";
import { nero } from "../currencies/nero.js";
import { defineNetwork } from "../defineChain.js";

export const neroTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 6660001,
    slug: "nero-testnet",
    name: "Nero Testnet",
    testnet: true,
    nativeCurrency: nero,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://testnetscan.nerochain.io",
        },
        default: {
            name: "blocksckout",
            url: "https://testnetscan.nerochain.io",
        },
    },
    rpcDefault: "https://testnet.nerochain.io",
    rpcUrls: {
        default: {
            http: ["https://testnet.nerochain.io"],
        },
    },
    enabled: true,
    rank: 1,
    minUtilityBalance: parseEther("0.1"),
    //No parent chain to bridge from
    targetUtilityBalance: parseEther("0"),
    minPaymasterBalance: parseEther("0.1"),
    targetPaymasterBalance: parseEther("0.4"),
    minRelayerBalance: parseEther("0.1"),
    targetRelayerBalance: parseEther("0.4"),
});
