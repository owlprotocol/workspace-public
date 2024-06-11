import { blastSepolia as blastSepoliaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

const sourceId = blastSepoliaViem.sourceId;

export const blastSepolia = /*#__PURE__*/ defineNetwork({
    ...blastSepoliaViem,
    rpcUrls: {
        ...blastSepoliaViem.rpcUrls,
        public: blastSepoliaViem.rpcUrls.default,
    },
    slug: "blast-sepolia",
    slugAnkr: "base_testnet_sepolia",
    slugDrpc: "blast-sepolia",
    enabled: true,
    stack: "opstack-bedrock",
    contracts: {
        ...blastSepoliaViem.contracts,
        portal: {
            [sourceId]: {
                address: "0x2757E4430e694F27b73EC9C02257cab3a498C8C5",
                blockCreated: 5044377,
            },
        },
    },
});
