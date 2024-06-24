import { arbitrumNova as arbitrumNovaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const arbitrumNova = /*#__PURE__*/ defineNetwork({
    ...arbitrumNovaViem,
    rpcUrls: {
        ...arbitrumNovaViem.rpcUrls,
        public: arbitrumNovaViem.rpcUrls.default,
    },
    description:
        "Arbitrum Nova is an AnyTrust chain that aims for ultra low transaction fees. Nova differs from Arbitrum One by not posting transaction data on chain, but to Data Availability Committee.",
    slug: "arbitrum-nova",
    slugAnkr: "arbitrumnova",
    slugDrpc: "arbitrum-nova",
    enabled: true,
    stack: "arbitrum-anytrust",
});
