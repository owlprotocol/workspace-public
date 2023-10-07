import { cjsLibConfig, buildLib } from "@owlprotocol/esbuild-config";

//Ignore browser files
cjsLibConfig.entryPoints = [
    "src/index.ts",
    "src/dotenvConfig.ts",
    "src/envvars.ts",
    "src/getChainWithData.ts",
    "src/isProductionOrStaging.ts",
];

await buildLib();
