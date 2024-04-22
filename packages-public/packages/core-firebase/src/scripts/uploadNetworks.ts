import { isDevelopment } from "@owlprotocol/envvars";
import { Chain, localhost } from "viem/chains";
import { NetworkPrivate, Network } from "../models/index.js";
import { networkPrivateResource, networkResource } from "../admin/resources.js";

//TODO: Removed chain upload, for now only localhost
export const enabledNetworksDefault = [137, 80001, 59140, 168587773, 11155111, 130130];
export const ranksByNetworkDefault: Record<number, number> = {
    137: 1,
    80001: 2,
    59140: 3,
    168587773: 4,
    11155111: 0,
    130130: 0,
};

if (isDevelopment()) {
    enabledNetworksDefault.push(1337);
    ranksByNetworkDefault[1337] = 0;
}

/**
 * Upload chain configurations to firebase
 * @param chains
 * @param enabledNetworks
 * @param ranksByNetwork
 * @returns
 */
const localhostChain = {
    ...localhost,
    shortName: "localhost",
    testnet: true,
    enabled: true,
};
export function uploadNetworks(
    //TODO: For now only localhost & using viem model, switch back to ethereum-lists
    chains: (Chain & { shortName: string; enabled: boolean })[] = [localhostChain],
    ranksByNetwork = ranksByNetworkDefault,
) {
    const networksReadOnly: Network[] = chains.map((c) => {
        const chainId = c.id;

        return {
            name: c.name,
            shortName: c.shortName,
            chain: c.shortName,
            slug: c.shortName,
            testnet: c.testnet || chainId == 1337,
            chainId,
            nativeCurrency: c.nativeCurrency,
            rpc: c.rpcUrls.public?.http ?? c.rpcUrls.default.http,
            rpcDefault: c.rpcUrls.public?.http[0] ?? c.rpcUrls.default.http[0],
            enabled: c.enabled,
            rank: ranksByNetwork[chainId] ?? 9999,
            id: `${chainId}`,
            default: false,
        };
    });

    const networksPrivate: NetworkPrivate[] = chains.map((c) => {
        const chainId = c.id;
        return {
            name: c.name,
            shortName: c.shortName,
            chain: c.shortName,
            slug: c.shortName,
            testnet: c.testnet || chainId == 1337,
            chainId,
            nativeCurrency: c.nativeCurrency,
            rpc: c.rpcUrls.default.http,
            rpcDefault: c.rpcUrls.default.http[0],
            enabled: c.enabled,
            rank: ranksByNetwork[chainId] ?? 9999,
            id: `${chainId}`,
        };
    });

    return Promise.all([networkResource.setBatch(networksReadOnly), networkPrivateResource.setBatch(networksPrivate)]);
}

/**
 * Upload localhost chain config to firebase
 * @returns
 */
export function uploadLocalNetwork() {
    return uploadNetworks([localhostChain]);
}

export async function main() {
    // await networkResource().deleteAll();
    // await networkPrivateResource().deleteAll();
    const hedwig: Chain & { shortName: string; enabled: boolean } = {
        id: 130130,
        name: "Owl Hedwig Testnet",
        shortName: "hedwig",
        sourceId: 11155111,
        testnet: true,
        nativeCurrency: localhost.nativeCurrency,
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
        rpcUrls: {
            default: {
                http: ["https://owl-hedwig-testnet.rpc.caldera.xyz/http"],
                webSocket: ["wss://owl-hedwig-testnet.rpc.caldera.xyz/ws"],
            },
        },
        enabled: true,
    };

    const gelatoRaspberry: Chain & { shortName: string; enabled: boolean } = {
        id: 123420111,
        name: "OP Celestia Raspberry Testnet",
        shortName: "opcelestia-raspberry",
        sourceId: 11155111,
        testnet: true,
        nativeCurrency: localhost.nativeCurrency,
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
        rpcUrls: {
            default: {
                http: ["https://rpc.opcelestia-raspberry.gelato.digital"],
                webSocket: ["wss://ws.opcelestia-raspberry.gelato.digital"],
            },
        },
        enabled: true,
    };

    const gelatoBlueberry: Chain & { shortName: string; enabled: boolean } = {
        id: 88153591557,
        name: "Arbitrum Blueberry Testnet",
        shortName: "arb-blueberry",
        sourceId: 421614,
        testnet: true,
        nativeCurrency: localhost.nativeCurrency,
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
        rpcUrls: {
            default: {
                http: ["https://rpc.arb-blueberry.gelato.digital"],
                webSocket: ["wss://ws.arb-blueberry.gelato.digital"],
            },
        },
        enabled: true,
    };

    const gelatoBlackberry: Chain & { shortName: string; enabled: boolean } = {
        id: 94204209,
        name: "Polygon Blackberry Testnet",
        shortName: "polygon-blackberry",
        sourceId: 11155111,
        testnet: true,
        nativeCurrency: localhost.nativeCurrency,
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
        rpcUrls: {
            default: {
                http: ["https://rpc.polygon-blackberry.gelato.digital"],
                webSocket: ["wss://ws.polygon-blackberry.gelato.digital"],
            },
        },
        enabled: true,
    };

    const flareCoston: Chain & { shortName: string; enabled: boolean } = {
        id: 114,
        name: "Flare Coston 2 Testnet",
        shortName: "flare-coston2",
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
    };

    const berachainTestnet: Chain & { shortName: string; enabled: boolean } = {
        id: 80085,
        name: "Berachain Testnet",
        shortName: "berachain-testnet",
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
    };

    //
    //

    await uploadNetworks([hedwig, gelatoRaspberry, gelatoBlueberry, gelatoBlackberry, flareCoston, berachainTestnet]);
}

// main();
