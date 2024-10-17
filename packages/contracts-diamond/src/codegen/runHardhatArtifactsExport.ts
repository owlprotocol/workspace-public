import { hardhatArtifactsExport } from "@owlprotocol/viem-utils/codegen";

hardhatArtifactsExport("./src/artifacts", "./cache", [
    "artifacts/contracts/**/*.json",
    "artifacts/@openzeppelin/contracts/**/*.json",
]);
