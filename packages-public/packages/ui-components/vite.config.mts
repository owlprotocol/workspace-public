import { mergeConfig } from "vite";
import { config } from "@owlprotocol/vite-config";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { resolve } from "path";

//Dependency aliases
const alias = {};

const formats = {
    es: "mjs",
    cjs: "cjs",
};
const build = {
    lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "UIComponentsReactLib",
        formats: ["es", "cjs"],
        fileName: (format) => `index.${formats[format]}`,
    },
    rollupOptions: {
        //Library Mode
        ...config.build.rollupOptions,
        // external: ["react", "react-dom", /^react\//],
        output: {
            globals: {
                react: "React",
                "react-dom": "ReactDOM",
            },
        },
    },
};
const configOverrides = {
    plugins: [externalizeDeps()],
    resolve: {
        alias,
    },
    build,
};

const finalConfig = mergeConfig(config, configOverrides);

export default finalConfig;
