import { hardhatArtifactsExport } from "@owlprotocol/viem-utils";
import { getArtifactImplementationCreate2Factory } from "@owlprotocol/contracts-create2factory";

hardhatArtifactsExport(
    "./src/artifacts",
    "./cache",
    ["artifacts/contracts/**/*.json", "artifacts/@openzeppelin/contracts/**/*.json"],
    getArtifactImplementationCreate2Factory,
);
