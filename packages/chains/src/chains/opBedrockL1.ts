import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

//Warning: Same port as localhost (either run anvil, or run op-bedrock devnet)
export const opBedrockL1 = /*#__PURE__*/ defineNetwork({
    chainId: 900,
    slug: "opbedrock-l1",
    name: "Optimism Bedrock L1",
    testnet: true,
    nativeCurrency: ether,
    rpcDefault: "http://127.0.0.1:8545",
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:8545"],
        },
    },
    enabled: true,
    rank: -1,
});
