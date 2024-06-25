import { coreDao as coreDaoViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const coreDao = /*#__PURE__*/ defineNetwork({
    ...coreDaoViem,
    rpcUrls: {
        ...coreDaoViem.rpcUrls,
        public: coreDaoViem.rpcUrls.default,
    },
    description:
        "Core (CORE) is a Turing-complete and EVM-compatible layer-one blockchain leveraging the Bitcoin hash rate and DPoS consensus. Powered by its novel consensus mechanism, “Satoshi Plus,” Core aims to be secure, scalable, and decentralized.",
    slug: "coredao",
    slugAnkr: "core",
    slugDrpc: "core",
    enabled: false,
});
