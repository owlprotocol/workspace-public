import { hardhatArtifactsExport } from "@owlprotocol/viem-utils/codegen";

hardhatArtifactsExport("./src/artifacts", "./cache", [
    "artifacts/contracts/**/*.json",
    //Optimized re-builds with 1000000 runs + viaIR + yul optimizer
    //We specify contracts explicitly (to exclude any other contracts that might get re-compiled)
    "artifacts/@hyperlane-xyz/core/contracts/**/*.json",
]);
