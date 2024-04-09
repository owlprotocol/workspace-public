import { hardhatArtifactsExport } from "@owlprotocol/contracts-create2factory";

hardhatArtifactsExport("./src/artifacts", "./cache", [
    "artifacts/contracts/**/*.json",
    "artifacts/@openzeppelin/contracts/**/*.json",
]);
