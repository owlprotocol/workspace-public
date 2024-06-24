import { mode as modeViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

const sourceId = modeViem.sourceId!; // mainnet

export const mode = /*#__PURE__*/ defineNetwork({
    ...modeViem,
    rpcUrls: {
        ...modeViem.rpcUrls,
        public: modeViem.rpcUrls.default,
    },
    contracts: {
        ...modeViem.contracts,
        //TODO: Add more contracts
        //https://docs.mode.network/mode-mainnet/mainnet-contract-addresses/l1-l2-contracts
        portal: {
            [sourceId]: {
                address: "0x8B34b14c7c7123459Cf3076b8Cb929BE097d0C07",
                blockCreated: 1,
            },
        },
    },
    slug: "mode",
    slugDrpc: "mode",
    enabled: true,
    stack: "opstack-bedrock",
});
