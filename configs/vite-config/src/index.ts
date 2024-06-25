import { defineConfig, Plugin, UserConfig } from "vite";

//ESBuild Plugins
//https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
//import { NodeGlobalsPolyfillPlugin as esbuildGlobals } from "@esbuild-plugins/node-globals-polyfill";
//import { NodeModulesPolyfillPlugin as esbuildPolyfills } from "@esbuild-plugins/node-modules-polyfill";

//Rollup Plugins
//import rollupPolyfills from "rollup-plugin-node-polyfills";
//import rollupInject from "@rollup/plugin-inject";

//Vite Plugins
import ReactPlugin from "@vitejs/plugin-react-swc";
import CheckerPlugin from "vite-plugin-checker";
import SVGRPlugin from "vite-plugin-svgr";
import DTSPlugin from "vite-plugin-dts";
//import { nodePolyfills as vitePolyfills } from "vite-plugin-node-polyfills";

//import { createRequire } from "node:module";
//const require = createRequire(import.meta.url)

//const NODE_ENV = process.env.NODE_ENV ?? "development"; /// process.env.MODE
export const define = {
    //patch ipfs utils
    //"globalThis.process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    //pathc @storybook/theming
    //"process.env.FORCE_SIMILAR_INSTEAD_OF_MAP": JSON.stringify(false),
};

export const plugins = [
    //TODO: Re-enable?
    /**
     * Breaks with lodash-es
     * - imports buffer polyfill package (breaks)
     * - solution => disable buffer from dependencies in pnpmfile.cjs
     * - vite-plugin-node-polyfills breaks because cannot import buffer
     *   - under the hood imported by node-stdlib-browser
     */
    /*
    vitePolyfills({
            overrides: {
                //buffer: require.resolve("rollup-plugin-node-polyfills/polyfills/buffer-es6"),
                //Not work because string_decoder import
                //crypto: require.resolve("rollup-plugin-node-polyfills/polyfills/crypto-browserify"),
                //events: require.resolve("rollup-plugin-node-polyfills/polyfills/events"),
                //http: require.resolve("rollup-plugin-node-polyfills/polyfills/http"),
                //https: require.resolve("rollup-plugin-node-polyfills/polyfills/http"),
                //process: require.resolve("rollup-plugin-node-polyfills/polyfills/process-es6"),
                //stream: require.resolve("rollup-plugin-node-polyfills/polyfills/stream"),
                //util: require.resolve("rollup-plugin-node-polyfills/polyfills/util"),
                //querystring: require.resolve("rollup-plugin-node-polyfills/polyfills/qs"),
                //url: require.resolve("rollup-plugin-node-polyfills/polyfills/url"),
                //path: require.resolve("rollup-plugin-node-polyfills/polyfills/path"),
                //string_decoder: require.resolve("rollup-plugin-node-polyfills/polyfills/string-decoder"),
                //punycode: require.resolve("rollup-plugin-node-polyfills/polyfills/punycode"),
            },
            protocolImports: true,
            globals: {
                Buffer: true
            }
        }),
        */
    ReactPlugin(),
    SVGRPlugin({
        svgrOptions: {
            icon: "100%",
        },
    }),
    DTSPlugin(),
    CheckerPlugin({
        typescript: true, //TODO: Disable for now
        overlay: true,
        /*
        eslint: {
            lintCommand: 'eslint .  --ext .ts,.tsx',
        },
        */
    }),
] as Plugin[];

/*
export const esbuildPlugins = [
    esbuildGlobals({
        process: true,
        buffer: true,
    }),
    esbuildPolyfills(),
] as any[];

export const rollupPlugins = [
    rollupPolyfills(),
    rollupInject({
        Buffer: ["buffer", "Buffer"],
    }),
] as any[];
*/

//No work since dependencies require cjs polyfills
export const alias = {
    //buffer: require.resolve("rollup-plugin-node-polyfills/polyfills/buffer-es6"),
    //Not work because string_decoder import
    //crypto: require.resolve("rollup-plugin-node-polyfills/polyfills/crypto-browserify"),
    //events: require.resolve("rollup-plugin-node-polyfills/polyfills/events"),
    //http: require.resujjjjjjuuuuuuolve("rollup-plugin-node-polyfills/polyfills/http"),
    //https: require.resolve("rollup-plugin-node-polyfills/polyfills/http"),
    //process: require.resolve("rollup-plugin-node-polyfills/polyfills/process-es6"),
    //stream: require.resolve("rollup-plugin-node-polyfills/polyfills/stream"),
    //util: require.resolve("rollup-plugin-node-polyfills/polyfills/util"),
    //querystring: require.resolve("rollup-plugin-node-polyfills/polyfills/qs"),
    //url: require.resolve("rollup-plugin-node-polyfills/polyfills/url"),
    //path: require.resolve("rollup-plugin-node-polyfills/polyfills/path"),
    //string_decoder: require.resolve("rollup-plugin-node-polyfills/polyfills/string-decoder"),
    //punycode: require.resolve("rollup-plugin-node-polyfills/polyfills/punycode"),
    //"string_decoder/": "rollup-plugin-node-polyfills/polyfills/string-decoder",
};

//https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
export const manualChunks = (id) => {
    const vendors = [
        { match: /web3@/, chunk: "web3" },
        { match: /@web3-react/, chunk: "web3-react" },
        { match: /@walletconnect/, chunk: "walletconnect" },
        { match: /@fortawesome/, chunk: "@fortawesome" },
        //{ match: /lodash@/, chunck: "lodash" },
        { match: /ipfs-http-client@/, chunk: "ipfs-http-client" },
        /*
        { match: /react@/, chunk: 'react' },
        { match: /react-dom@/, chunk: 'react-dom' },
        { match: /@emotion/, chunk: 'emotion' },
        { match: /@chakra-ui/, chunk: 'chakra-ui' },
        { match: /@storybook/, chunk: 'storybook' },
        */
    ];
    for (const v of vendors) {
        if (id.match(v.match)) return v.chunk;
    }

    if (id.includes("node_modules")) {
        return "vendor";
    }
};

export const config = defineConfig({
    define,
    plugins,
    resolve: {
        alias,
    },
    optimizeDeps: {
        include: [],
        esbuildOptions: {
            plugins: [], //esbuildPlugins
        },
    },
    build: {
        rollupOptions: {
            plugins: [], //rollupPlugins,
            output: {
                manualChunks,
                inlineDynamicImports: false,
            },
        },
    },
    //@ts-expect-error
    test: {
        globals: false,
        testTimeout: 60000,
        threads: false,
        watch: true,
        include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    },
}) as UserConfig;
