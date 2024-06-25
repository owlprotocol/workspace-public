import { modeTestnet as modeTestnetViem } from "viem/chains";
import { parseEther } from "viem/utils";
import { defineNetwork } from "../defineChain.js";

const sourceId = modeTestnetViem.sourceId!; // sepolia

export const modeTestnet = /*#__PURE__*/ defineNetwork({
    ...modeTestnetViem,
    rpcUrls: {
        ...modeTestnetViem.rpcUrls,
        public: modeTestnetViem.rpcUrls.default,
    },
    contracts: {
        ...modeTestnetViem.contracts,
        //TODO: Add more contracts
        //https://docs.mode.network/mode-testnet/testnet-contract-addresses
        portal: {
            [sourceId]: {
                address: "0x320e1580effF37E008F1C92700d1eBa47c1B23fD",
                blockCreated: 1,
            },
        },
    },
    slug: "mode-testnet",
    slugDrpc: "mode-testnet",
    enabled: true,
    stack: "opstack-bedrock",
    rank: 1,
    minUtilityBalance: parseEther("1"),
    //TODO: Topup code what if utility < target?
    targetUtilityBalance: parseEther("8"),
    minPaymasterBalance: parseEther("0.1"),
    targetPaymasterBalance: parseEther("2"),
    minRelayerBalance: parseEther("0.1"),
    targetRelayerBalance: parseEther("1"),
});
