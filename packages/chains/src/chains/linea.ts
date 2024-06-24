import { linea as lineaViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const linea = /*#__PURE__*/ defineNetwork({
    ...lineaViem,
    rpcUrls: {
        ...lineaViem.rpcUrls,
        public: lineaViem.rpcUrls.default,
    },
    description:
        "Linea is a network that scales the experience of Ethereum. Its out-of-the-box compatibility with the Ethereum Virtual Machine enables the deployment of already-existing applications, as well as the creation of new ones that would be too costly on Mainnet.",
    slug: "linea",
    slugAnkr: "linea",
    slugDrpc: "linea",
    enabled: true,
});
