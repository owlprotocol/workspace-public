import { mergeConfig } from "vite";
import { config } from "@owlprotocol/vite-config";
import { dotenvConfig } from "@owlprotocol/envvars";

dotenvConfig();

const overrideConfig = {
    resolve: {},
    define: {
        global: "globalThis",
    },
    commonjsOptions: {
        transformMixedEsModules: false,
    },
    build: {},
};
const finalConfig = mergeConfig(config, overrideConfig);

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default finalConfig;
