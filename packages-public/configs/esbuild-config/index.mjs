import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";
import * as glob from "glob";
import * as esbuild from "esbuild";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const files = glob.default.sync("src/**/*.{ts,tsx,json}");

const excludeNodeModulesPlugin = NodeResolvePlugin({
    extensions: [".ts", ".js", ".json"],
    onResolved: (resolved) => {
        //console.debug(resolved)
        if (resolved.includes("node_modules")) {
            return {
                external: true,
            };
        }
        return resolved;
    },
});

const ESBUILD_WATCH = process.env.ESBUILD_WATCH === "true" || process.env.ESBUILD_WATCH === "1";

const external = ["url", "events", "path"];
const inject = []; //['./react-shim.mjs']

export const baseConfig = {
    sourcemap: "external",
    platform: "neutral",
    target: ["es2020"],
    inject,
    plugins: [excludeNodeModulesPlugin],
};

//CJS Library (Testing)
export const cjsLibConfig = {
    entryPoints: files,
    bundle: false,
    outdir: "lib/cjs",
    //outExtension: { '.js': '.cjs' },
    format: "cjs",
    ...baseConfig,
};

//ESM Library
export const esmLibConfig = {
    entryPoints: files,
    bundle: false,
    outdir: "lib/esm",
    format: "esm",
    ...baseConfig,
};

//CJS Bundle
export const cjsBundleConfig = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: false,
    outfile: "dist/index.cjs",
    format: "cjs",
    external,
    ...baseConfig,
};

export const cjsBundleMinConfig = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    outfile: "dist/index.min.cjs",
    format: "cjs",
    external,
    ...baseConfig,
};

//ESM Bundle
export const esmBundleConfig = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: false,
    outfile: "dist/index.mjs",
    format: "esm",
    external,
    ...baseConfig,
};

export const esmBundleMinConfig = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    outfile: "dist/index.min.mjs",
    format: "esm",
    external,
    ...baseConfig,
};

export const libConfigs = [cjsLibConfig, esmLibConfig];

export const distConfigs = [cjsBundleConfig, cjsBundleMinConfig, esmBundleConfig, esmBundleMinConfig];

export const configs = [...libConfigs, ...distConfigs];

export const buildLib = async () => {
    //Write package.json
    await Promise.all(
        libConfigs.map(async (c) => {
            const dir = c.outdir;
            if (!existsSync(dir)) {
                mkdirSync(dir, { recursive: true });
            }
            const p = join(dir, "package.json");
            if (!existsSync(p)) {
                const type = c.format === "esm" ? "module" : "commonjs";
                writeFileSync(p, JSON.stringify({ type }), "utf-8");
            }
        }),
    );

    if (!ESBUILD_WATCH) {
        //Static build
        await Promise.all(libConfigs.map((c) => esbuild.build(c)));
    } else {
        //Incremental build
        await Promise.all(libConfigs.map((c) => esbuild.context(c).then((c) => c.watch())));
    }
};

export const buildDist = async () => {
    if (!ESBUILD_WATCH) {
        //Static build
        await Promise.all(distConfigs.map((c) => esbuild.build(c)));
    } else {
        //Incremental build
        await Promise.all(distConfigs.map((c) => esbuild.context(c).then((c) => c.watch())));
    }
};

export const buildAll = async () => {
    await Promise.all([buildLib(), buildDist()]);
};
