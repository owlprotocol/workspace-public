import { hardhatArtifactsExport } from "@owlprotocol/viem-utils/codegen";
import { join } from "path";

const cryptoAlgebra = "node_modules/@cryptoalgebra";

const cryptoAlgebraCore = join(cryptoAlgebra, "integral-core/artifacts/contracts");
const cryptoAlgebraCoreInterfaces = join(cryptoAlgebraCore, "interfaces");

const cryptoAlgebraPeriphery = join(cryptoAlgebra, "integral-periphery/artifacts/contracts");
const cryptoAlgebraPeripheryInterfaces = join(cryptoAlgebraPeriphery, "interfaces");

hardhatArtifactsExport("./src/artifacts", "./cache", [
    //EntryPoint Simulation Contracts
    //TODO: hardhatArtifactsExport caching doesn't work anymore 'EntryPoint', 'IEntryPoint' getting recompiled
    // "artifacts/contracts/**/*.json",
    // Core
    join(cryptoAlgebraCoreInterfaces, "IAlgebraFactory.sol/IAlgebraFactory.json"),
    join(cryptoAlgebraCoreInterfaces, "IAlgebraPool.sol/IAlgebraPool.json"),
    join(cryptoAlgebraCoreInterfaces, "IAlgebraPoolDeployer.sol/IAlgebraPoolDeployer.json"),
    // Periphery
    join(cryptoAlgebraPeripheryInterfaces, "external/IWNativeToken.sol/IWNativeToken.json"),
    join(cryptoAlgebraPeripheryInterfaces, "IQuoterV2.sol/IQuoterV2.json"),
    join(cryptoAlgebraPeripheryInterfaces, "ISwapRouter.sol/ISwapRouter.json"),
    join(cryptoAlgebraPeripheryInterfaces, "IMulticall.sol/IMulticall.json"),
    join(cryptoAlgebraPeripheryInterfaces, "IPeripheryPayments.sol/IPeripheryPayments.json"),
    join(cryptoAlgebraPeriphery, "SwapRouter.sol/SwapRouter.json"),
]);
