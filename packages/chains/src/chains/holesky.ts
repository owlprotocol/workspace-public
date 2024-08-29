import { holesky as holeskyViem } from "viem/chains";
import { defineNetwork } from "../defineChain.js";

export const holesky = /*#__PURE__*/ defineNetwork({
    ...holeskyViem,
    slug: "holesky",
    slugDrpc: "holesky",
    slugAnkr: "eth_holesky",
    testnet: true,
    enabled: true,
});
