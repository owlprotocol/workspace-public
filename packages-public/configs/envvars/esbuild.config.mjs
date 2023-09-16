import { cjsLibConfig, esmLibConfig, buildLib } from "@owlprotocol/esbuild-config";

cjsLibConfig.outExtension = { ".js": ".cjs" };
esmLibConfig.outExtension = { ".js": ".mjs" };

await buildLib();
