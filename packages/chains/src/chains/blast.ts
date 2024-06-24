import { blast as blastViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

const sourceId = blastViem.sourceId;

export const blast = /*#__PURE__*/ defineNetwork({
    ...blastViem,
    rpcUrls: {
        ...blastViem.rpcUrls,
        public: blastViem.rpcUrls.default,
    },
    description:
        "Blast is an L2 with native yield for ETH and stablecoins. Yield makes it possible to create new revenue streams and provide novel rewards for end-users.",
    slug: "blast",
    slugAnkr: "blast",
    slugDrpc: "blast",
    enabled: true,
    stack: "opstack-bedrock",
    contracts: {
        ...blastViem.contracts,
        portal: {
            [sourceId]: {
                address: "0x0Ec68c5B10F21EFFb74f2A5C61DFe6b08C0Db6Cb",
                blockCreated: 19300357,
            },
        },
    },
});
