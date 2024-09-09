import { hardhatArtifactsExport } from "@owlprotocol/viem-utils/codegen";

hardhatArtifactsExport("./src/artifacts", "./cache", [
    //EntryPoint Simulation Contracts
    //TODO: hardhatArtifactsExport caching doesn't work anymore 'EntryPoint', 'IEntryPoint' getting recompiled
    // "artifacts/contracts/**/*.json",
    //Cached official builds
    "node_modules/@cryptoalgebra/integral-periphery/artifacts/contracts/interfaces/IQuoterV2.sol/IQuoterV2.json",
    "node_modules/@cryptoalgebra/integral-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json",
]);
