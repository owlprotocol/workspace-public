import { cjsLibConfig, esmLibConfig, buildLib } from "@owlprotocol/esbuild-config";

//Ignore browser files
cjsLibConfig.entryPoints = [
    "src/index.ts",
    "src/envvars.ts",
    "src/getChainWithData.ts",
    "src/isProductionOrStaging.ts"
]
//esmLibConfig.outExtension = { ".js": ".mjs" };

await buildLib();
