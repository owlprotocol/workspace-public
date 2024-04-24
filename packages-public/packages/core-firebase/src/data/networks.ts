import { localhost as localhostViem } from "viem/chains";
import { Network } from "../models/Network.js";

/***** Local networks *****/
export const localhost: Network = {
    chainId: 1337,
    rpcDefault: "http://127.0.0.1:8545",
    ...localhostViem,
    enabled: true,
    rank: -1,
};

//TODO: Add portal contract address
//Warning: Same port as localhost (either run anvil, or run op-bedrock devnet)
export const opBedrockL1: Network = {
    chainId: 900,
    name: "Optimism Bedrock L1",
    testnet: true,
    nativeCurrency: localhostViem.nativeCurrency,
    rpcDefault: "http://127.0.0.1:8545",
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:8545"],
        },
    },
    enabled: true,
    rank: -1,
};

export const opBedrockL2: Network = {
    chainId: 901,
    name: "Optimism Bedrock L2",
    sourceId: 900,
    testnet: true,
    nativeCurrency: localhostViem.nativeCurrency,
    rpcDefault: "http://127.0.0.1:9545",
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:9545"],
        },
    },
    enabled: true,
    rank: -1,
};

/***** Live networks *****/
export const hedwig: Network = {
    chainId: 130130,
    name: "Owl Hedwig Testnet",
    sourceId: 11155111,
    testnet: true,
    nativeCurrency: localhostViem.nativeCurrency,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://owl-hedwig-testnet.explorer.caldera.xyz",
        },
        default: {
            name: "blocksckout",
            url: "https://owl-hedwig-testnet.explorer.caldera.xyz",
        },
    },
    rpcDefault: "https://owl-hedwig-testnet.rpc.caldera.xyz/http",
    rpcUrls: {
        default: {
            http: ["https://owl-hedwig-testnet.rpc.caldera.xyz/http"],
            webSocket: ["wss://owl-hedwig-testnet.rpc.caldera.xyz/ws"],
        },
    },
    enabled: true,
    rank: 0,
};

export const gelatoRaspberry: Network = {
    chainId: 123420111,
    name: "OP Celestia Raspberry Testnet",
    sourceId: 11155111,
    testnet: true,
    nativeCurrency: localhostViem.nativeCurrency,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://opcelestia-raspberry.gelatoscout.com",
        },
        default: {
            name: "blocksckout",
            url: "https://opcelestia-raspberry.gelatoscout.com",
        },
    },
    rpcDefault: "https://rpc.opcelestia-raspberry.gelato.digital",
    rpcUrls: {
        default: {
            http: ["https://rpc.opcelestia-raspberry.gelato.digital"],
            webSocket: ["wss://ws.opcelestia-raspberry.gelato.digital"],
        },
    },
    enabled: true,
    rank: 9999,
};

export const gelatoBlueberry: Network = {
    chainId: 88153591557,
    name: "Arbitrum Blueberry Testnet",
    sourceId: 421614,
    testnet: true,
    nativeCurrency: localhostViem.nativeCurrency,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://arb-blueberry.gelatoscout.com",
        },
        default: {
            name: "blocksckout",
            url: "https://arb-blueberry.gelatoscout.com",
        },
    },
    rpcDefault: "https://rpc.arb-blueberry.gelato.digital",
    rpcUrls: {
        default: {
            http: ["https://rpc.arb-blueberry.gelato.digital"],
            webSocket: ["wss://ws.arb-blueberry.gelato.digital"],
        },
    },
    enabled: true,
    rank: 9999,
};

export const gelatoBlackberry: Network = {
    chainId: 94204209,
    name: "Polygon Blackberry Testnet",
    sourceId: 11155111,
    testnet: true,
    nativeCurrency: localhostViem.nativeCurrency,
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://polygon-blackberry.gelatoscout.com",
        },
        default: {
            name: "blocksckout",
            url: "https://polygon-blackberry.gelatoscout.com",
        },
    },
    rpcDefault: "https://rpc.polygon-blackberry.gelato.digital",
    rpcUrls: {
        default: {
            http: ["https://rpc.polygon-blackberry.gelato.digital"],
            webSocket: ["wss://ws.polygon-blackberry.gelato.digital"],
        },
    },
    enabled: true,
    rank: 9999,
};

export const flareCoston: Network = {
    chainId: 114,
    name: "Flare Coston 2 Testnet",
    testnet: true,
    nativeCurrency: {
        decimals: 18,
        name: "Coston 2 Flare",
        symbol: "C2FLR",
    },
    blockExplorers: {
        blockscout: {
            name: "blocksckout",
            url: "https://coston2-explorer.flare.network",
        },
        default: {
            name: "blocksckout",
            url: "https://coston2-explorer.flare.network",
        },
    },
    rpcUrls: {
        default: {
            http: [
                "https://api.flare.network/coston2/bc/C/rpc?x-apikey=5xjwHUbQIOdQATM8RHCqLpBdQD34BGA1WDIMZDVyMwXRa6bt",
            ],
            webSocket: [
                "wss://api.flare.network/coston2/bc/C/ws?x-apikey=5xjwHUbQIOdQATM8RHCqLpBdQD34BGA1WDIMZDVyMwXRa6bt",
            ],
        },
        public: {
            http: ["https://coston2-api.flare.network/ext/bc/C/rpc"],
            webSocket: [],
        },
    },
    enabled: true,
    rank: 9999,
};

export const berachainTestnet: Network = {
    chainId: 80085,
    name: "Berachain Testnet",
    testnet: true,
    nativeCurrency: {
        decimals: 18,
        name: "Bera",
        symbol: "BERA",
    },
    blockExplorers: {
        routescan: {
            name: "routescan",
            url: "https://artio.beratrail.io",
        },
        default: {
            name: "blocksckout",
            url: "https://artio.beratrail.io",
        },
    },
    rpcUrls: {
        default: {
            http: [
                "https://rpc.ankr.com/berachain_testnet/67f6fc7f0b7c79a2f695dfbd7c9f281f5edea90efad8caec412031a608654c82",
            ],
            webSocket: [
                "wss://rpc.ankr.com/berachain_testnet/ws/67f6fc7f0b7c79a2f695dfbd7c9f281f5edea90efad8caec412031a608654c82",
            ],
        },
        public: {
            http: ["https://artio.rpc.berachain.com"],
            webSocket: [],
        },
    },
    enabled: true,
    rank: 9999,
};
