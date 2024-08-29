import { FLARE_API_KEY } from "@owlprotocol/envvars";
import { defineNetwork } from "../defineChain.js";
import { getFlareEndpoints } from "../providers/flare.js";

export const flareTestnet = /*#__PURE__*/ defineNetwork({
    chainId: 114,
    slug: "coston2",
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
        default: FLARE_API_KEY
            ? getFlareEndpoints({ network: "coston2", key: FLARE_API_KEY })
            : {
                  http: ["https://coston2-api.flare.network/ext/bc/C/rpc"],
              },
        public: {
            http: ["https://coston2-api.flare.network/ext/bc/C/rpc"],
        },
    },
    enabled: false,
    rank: 9999,
});
