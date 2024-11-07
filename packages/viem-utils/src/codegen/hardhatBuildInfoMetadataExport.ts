import { globSync } from "glob";
import { generateBarrelFileForDir } from "@owlprotocol/utils";
import { ESLint } from "eslint";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { createHash } from "crypto";
import { BuildInfo, SolcMetadata } from "../types/buildinfo.js";

export const BUILD_INFO_DIR = "artifacts/build-info";
export const OUTPUT_DIR = "src/solc-metadata";
export const CACHE_DIR = "./cache";
export const BUILD_INFO_GLOB = `${BUILD_INFO_DIR}/*.json`;

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });

/**
 * Helper function to extract and format verification metadata.
 */
function getVerificationMetadata(buildInfo: BuildInfo, sourcePath: string, contractName: string): string | null {
    const contract = buildInfo.output.contracts[sourcePath][contractName];
    if (!contract || !contract.metadata) {
        console.warn(`Metadata missing for contract: ${contractName} at path: ${sourcePath}. Skipping.`);
        return null;
    }

    const metadata: SolcMetadata =
        typeof contract.metadata === "string" ? JSON.parse(contract.metadata) : contract.metadata;

    return `
import { SolcMetadata } from "@owlprotocol/viem-utils";

export const ${contractName}: SolcMetadata = {
    compiler: {
        version: "${metadata.compiler.version}"
    },
    language: "${metadata.language}",
    output: ${JSON.stringify(metadata.output, null, 2)},
    settings: ${JSON.stringify(metadata.settings, null, 2)},
    sources: ${JSON.stringify(metadata.sources, null, 2)},
    version: ${metadata.version}
};
`;
}

/**
 * Main function to export metadata for contract verification.
 */
export async function hardhatVerificationMetadataExport(
    outputDir = OUTPUT_DIR,
    buildInfoGlob = BUILD_INFO_GLOB,
    cacheDir = CACHE_DIR,
) {
    const buildInfoPaths = globSync(buildInfoGlob);
    const cachePath = join(cacheDir, "build-info-cache.json");
    let buildInfoCache: Record<string, string> = {};

    if (existsSync(cachePath)) {
        buildInfoCache = JSON.parse(readFileSync(cachePath, "utf-8"));
    }

    const changedBuildInfoFiles = buildInfoPaths.filter((filePath) => {
        const buildInfo = JSON.parse(readFileSync(filePath, "utf-8")) as BuildInfo;
        const buildInfoHash = createHash("md5").update(JSON.stringify(buildInfo)).digest("hex");

        const contractPaths = Object.values(buildInfo.output.contracts).flatMap((contracts) =>
            Object.keys(contracts).map((contractName) => join(outputDir, `${contractName}.ts`)),
        );

        const filesMissing = contractPaths.some((contractPath) => !existsSync(contractPath));
        return buildInfoCache[filePath] !== buildInfoHash || filesMissing;
    });

    changedBuildInfoFiles.forEach((filePath) => {
        const buildInfo = JSON.parse(readFileSync(filePath, "utf-8")) as BuildInfo;
        const buildInfoHash = createHash("md5").update(JSON.stringify(buildInfo)).digest("hex");
        buildInfoCache[filePath] = buildInfoHash;

        Object.entries(buildInfo.output.contracts).forEach(([sourcePath, contracts]) => {
            Object.keys(contracts).forEach((contractName) => {
                const outputPath = join(outputDir, `${contractName}.ts`);
                const metadataContent = getVerificationMetadata(buildInfo, sourcePath, contractName);

                if (metadataContent) {
                    writeFileSync(outputPath, metadataContent);
                    console.log(`Exported verification metadata for ${contractName} to ${outputPath}`);
                }
            });
        });
    });

    writeFileSync(cachePath, JSON.stringify(buildInfoCache, null, 2));
    generateBarrelFileForDir(outputDir, "namedModule");

    const filesToLint = changedBuildInfoFiles.flatMap((filePath) => {
        const buildInfo = JSON.parse(readFileSync(filePath, "utf-8")) as BuildInfo;
        return Object.values(buildInfo.output.contracts).flatMap((contracts) =>
            Object.keys(contracts).map((contractName) => join(outputDir, `${contractName}.ts`)),
        );
    });

    if (filesToLint.length > 0) {
        const eslint = new ESLint({ useEslintrc: true, fix: true });
        const results = await eslint.lintFiles(filesToLint);
        await ESLint.outputFixes(results);
    } else {
        console.log("No changes detected in metadata files.");
    }
}
