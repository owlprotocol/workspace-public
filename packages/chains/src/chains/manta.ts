import { manta as mantaViem, mainnet } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

const sourceId = mainnet.id;

export const manta = /*#__PURE__*/ defineNetwork({
    ...mantaViem,
    rpcUrls: {
        ...mantaViem.rpcUrls,
        public: mantaViem.rpcUrls.default,
    },
    description:
        "Manta Network is a privacy-focused Layer-2 scaling solution for Ethereum, providing confidential transactions and privacy-preserving decentralized applications.",
    slug: "manta",
    slugDrpc: "manta-pacific",
    enabled: false,
    stack: "opstack-bedrock",
    sourceId,
    contracts: {
        portal: {
            [sourceId]: {
                address: "0x9168765EE952de7C6f8fC6FaD5Ec209B960b7622",
                blockCreated: 18095726,
            },
        },
    },
});
