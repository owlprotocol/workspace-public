import { mergeConfig } from "vite";
import { config } from "@owlprotocol/vite-config";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import { resolve } from "path";

//Library vite config.
//This is used to generate the npm package NOT the dev app for local dev "storybook"
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
    resolve: {},
    build,
};

const finalConfig = mergeConfig(config, configOverrides);

export default finalConfig;
