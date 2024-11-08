import {
    hardhatVerificationMetadataExport,
    OUTPUT_DIR,
    CACHE_DIR,
    BUILD_INFO_GLOB,
} from "@owlprotocol/viem-utils/codegen";

hardhatVerificationMetadataExport(OUTPUT_DIR, BUILD_INFO_GLOB, CACHE_DIR)
    .then(() => console.log("Metadata export completed successfully."))
    .catch((error) => console.error("Error during metadata export:", error));
