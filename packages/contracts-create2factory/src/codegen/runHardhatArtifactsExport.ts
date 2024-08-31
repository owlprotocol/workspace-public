import {
    hardhatArtifactsExport,
    DEFAULT_ARTIFACTS_DIR,
    DEFAULT_CACHE_DIR,
    DEFAULT_ARTIFACTS_GLOB,
} from "@owlprotocol/viem-utils/codegen";
import { getArtifactImplementationCreate2Factory } from "./hardhatArtifactsExport.js";

hardhatArtifactsExport(
    DEFAULT_ARTIFACTS_DIR,
    DEFAULT_CACHE_DIR,
    DEFAULT_ARTIFACTS_GLOB,
    //compute implementation with create2Factory
    getArtifactImplementationCreate2Factory,
);
