import { hardhatArtifactsExport } from "@owlprotocol/viem-utils/codegen";
import { join } from "path";

const cryptoAlgebraPath = "node_modules/@cryptoalgebra/integral-periphery/artifacts/contracts";
const cryptoAlgebraPathInterfaces = join(cryptoAlgebraPath, "interfaces");

hardhatArtifactsExport("./src/artifacts", "./cache", [
    //EntryPoint Simulation Contracts
    //TODO: hardhatArtifactsExport caching doesn't work anymore 'EntryPoint', 'IEntryPoint' getting recompiled
    // "artifacts/contracts/**/*.json",
    //Cached official builds
    join(cryptoAlgebraPathInterfaces, "IQuoterV2.sol/IQuoterV2.json"),
    join(cryptoAlgebraPathInterfaces, "ISwapRouter.sol/ISwapRouter.json"),
    join(cryptoAlgebraPathInterfaces, "IMulticall.sol/IMulticall.json"),
    join(cryptoAlgebraPathInterfaces, "IPeripheryPayments.sol/IPeripheryPayments.json"),
    join(cryptoAlgebraPath, "SwapRouter.sol/SwapRouter.json"),
]);
