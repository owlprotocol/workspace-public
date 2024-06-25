import { parseEther } from "viem/utils";
import { ether } from "../currencies/ether.js";
import { defineNetwork } from "../defineChain.js";

const sourceId = 919; // mode

export const hedwigTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 150150,
    slug: "hedwig-testnet",
    name: "Hedwig Testnet",
    testnet: true,
    nativeCurrency: ether,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://explorerl2new-hedwig-testnet-6uuksiwu6t.t.conduit.xyz",
        },
        default: {
            name: "blocksckout",
            url: "https://explorerl2new-hedwig-testnet-6uuksiwu6t.t.conduit.xyz",
        },
    },
    rpcDefault: "https://rpc-hedwig-testnet-6uuksiwu6t.t.conduit.xyz",
    rpcUrls: {
        default: {
            http: ["https://rpc-hedwig-testnet-6uuksiwu6t.t.conduit.xyz"],
            webSocket: ["wss://rpc-hedwig-testnet-6uuksiwu6t.t.conduit.xyz"],
        },
    },
    contracts: {
        //TODO: Add additional contracts
        //https://api.conduit.xyz/file/getOptimismContractsJSON?network=aad781a3-b316-42af-9000-003d06568456&organization=2803fa80-a3e5-43bf-a14b-197bc7c8e928
        portal: {
            [sourceId]: {
                address: "0x33a4Bd45253477A5ab454F2a6DFaA07e985B5C11",
                blockCreated: 1,
            },
        },
    },
    sourceId,
    enabled: true,
    stack: "opstack-bedrock",
    rank: 0,
    minUtilityBalance: parseEther("1"),
    //TODO: Topup code what if utility < target?
    targetUtilityBalance: parseEther("8"),
    minPaymasterBalance: parseEther("0.1"),
    targetPaymasterBalance: parseEther("2"),
    minRelayerBalance: parseEther("0.1"),
    targetRelayerBalance: parseEther("1"),
});
