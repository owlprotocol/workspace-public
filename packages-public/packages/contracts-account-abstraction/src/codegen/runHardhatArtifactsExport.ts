import { hardhatArtifactsExport } from "@owlprotocol/contracts-create2factory";

hardhatArtifactsExport("./src/artifacts", "./cache", "node_modules/@account-abstraction/contracts/artifacts/**/*.json");
