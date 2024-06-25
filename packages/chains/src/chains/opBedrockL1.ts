import { parseEther } from "viem/utils";
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
    minUtilityBalance: parseEther("1"),
    targetUtilityBalance: parseEther("1000"),
    minPaymasterBalance: parseEther("1"),
    targetPaymasterBalance: parseEther("10"),
    minRelayerBalance: parseEther("1"),
    targetRelayerBalance: parseEther("10"),
    enabled: true,
    rank: -1,
});
