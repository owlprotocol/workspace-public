import { globSync } from "glob";
import { generateBarrelFileForDir } from "@owlprotocol/utils";
import { ESLint } from "eslint";
import { Hex, Abi, zeroHash, Address } from "viem";
import { toFunctionSignature } from "viem/utils";
import { AbiConstructor, AbiError, AbiEvent, AbiFallback, AbiFunction, AbiReceive, formatAbiItem } from "abitype";
import { flatten, uniqBy } from "lodash-es";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { createHash } from "node:crypto";
import { join } from "path";
import { getDeployDeterministicAddress } from "../DeterministicDeployer/getAddress.js";

export interface Artifact {
    _format: string;
    contractName: string;
    sourceName: string;
    abi: Abi;
    bytecode: Hex;
    deployedBytecode: Hex;
    linkReferences: Record<string, any>;
    deployedLinkReferences: Record<string, any>;
}

/**
 * Export events, functions, errors
 * Export individual
 */

/**
 * Abi exports
 */
export type AbiExports = {
    abi: string[];
    functions: string[];
    events: string[];
    errors: string[];
} & { [key: string]: AbiConstructor | AbiError | AbiEvent | AbiFallback | AbiFunction | AbiReceive };

/**
 * Parse abi to unique exports
 * - individual functions, events, errors
 * - all functions, events, errors
 * - full abi
 * @param abi
 * @returns abi exports
 */
export function getAbiExports(abi: Abi): AbiExports {
    //TODO: Reserved keywords (eg. abi, implementation, bytecode etc...)

    const names: Record<string, string> = {};
    const signatures: Record<string, boolean> = {};

    const abiExports = {
        abi: [],
        functions: [],
        events: [],
        errors: [],
    } as unknown as AbiExports;

    abi.forEach((f) => {
        if (f.type === "constructor") {
            //Default reserved functions
            abiExports.abi.push("_constructor");
            abiExports.functions.push("_constructor");
            //constructor is reserved keyword in js, use _constructor instead
            abiExports["_constructor"] = f;
        } else if (f.type === "fallback" || f.type === "receive") {
            //Default reserved functions
            abiExports.abi.push(f.type);
            abiExports.functions.push(f.type);
            abiExports[f.type] = f;
        } else {
            const abiFormatted = formatAbiItem(f);
            const signature = toFunctionSignature(abiFormatted);
            //skip
            if (signatures[signature]) return;
            signatures[signature] = true;
            //remove return statement
            let signatureClean = signature;
            signatureClean = signature
                .replaceAll("(", "_")
                .replaceAll(")", "_")
                .replaceAll(",", "_")
                .replaceAll("[]", "array");
            //Remove trailing _ from closing )
            signatureClean = signatureClean.substring(0, signatureClean.length - 1);

            //Export array
            let exportsArray: string[];
            if (f.type === "function") exportsArray = abiExports.functions;
            else if (f.type === "event") exportsArray = abiExports.events;
            else if (f.type === "error") exportsArray = abiExports.errors;
            else throw new Error("Invalid abi type");

            if (!names[f.name]) {
                //Export friendly name
                names[f.name] = signatureClean;
                abiExports.abi.push(f.name);
                exportsArray.push(f.name);
                abiExports[f.name] = f;
            } else {
                //TODO: Also export original signature
                //Duplicate name, export signature
                abiExports.abi.push(signatureClean);
                exportsArray.push(signatureClean);
                abiExports[signatureClean] = f;
            }
        }
    });

    return abiExports;
}

export function getAbiExportsString(abiExports: AbiExports): string {
    let abiExportsString = "";
    Object.entries(abiExports).forEach(([key, value]) => {
        if (key != "abi" && key != "functions" && key != "events" && key != "errors") {
            abiExportsString = `${abiExportsString}export const ${key} = ${JSON.stringify(value)} as const;\n`;
        }
    });

    abiExportsString = `${abiExportsString}export const functions = [${abiExports.functions.join(",")}] as const;
export const events = [${abiExports.events.join(",")}] as const;
export const errors = [${abiExports.errors.join(",")}] as const;
export const abi = [...functions, ...events, ...errors] as const;
`;

    return abiExportsString;
}

export type GetArtifactImplementationFn = (artifact: Artifact) => Address;
/**
 * Return function that computes implementation address for artifact except if hard-coded in
 * implementations
 * @param implementations
 * @returns GetArtifactImplementationFn that takes artifact and returns implementation address
 */
export function getArtifactImplementationFactory(implementations: Record<string, Address> = {}) {
    return function getArtifactImplementation(artifact: Artifact) {
        if (implementations[artifact.contractName]) {
            return implementations[artifact.contractName];
        }

        return getDeployDeterministicAddress({
            salt: zeroHash,
            bytecode: artifact.bytecode,
        });
    };
}

/**
 * Takes an artifact and generates proper export file content.
 *   - Inidvidual keys are exported for better tree-shaking
 * @param artifact contains abi, bytecode, deployedBytecode
 * @param getImplementation function that takes artifact and returns implementation
 */
export function getArtifactExportFileContent(
    artifact: Artifact,
    getImplementation: GetArtifactImplementationFn,
): string {
    const abiExportsString = getAbiExportsString(getAbiExports(artifact.abi));
    if (artifact.bytecode != "0x") {
        const implementation = getImplementation(artifact);
        return `import { Hex, Address } from "viem";

${abiExportsString}
export const bytecode = "${artifact.bytecode}" as Hex;
export const deployedBytecode = "${artifact.deployedBytecode}" as Hex;
export const implementation = "${implementation}" as Address;
export const ${artifact.contractName} = {
    abi,
    bytecode,
    deployedBytecode,
    implementation
};
`;
    } else {
        return `
${abiExportsString}
export const ${artifact.contractName} = {
    abi,
};
`;
    }
}

export const DEFAULT_ARTIFACTS_DIR = "./src/artifacts";
export const DEFAULT_CACHE_DIR = "./cache";
export const DEFAULT_ARTIFACTS_GLOB = "artifacts/contracts/**/*.json";

export async function hardhatArtifactsExport(
    artifactDir = DEFAULT_ARTIFACTS_DIR,
    cacheDir = DEFAULT_CACHE_DIR,
    hardhatArtifactsGlob: string | string[] = DEFAULT_ARTIFACTS_GLOB,
    getImplementation: GetArtifactImplementationFn = getArtifactImplementationFactory(),
) {
    if (!existsSync(artifactDir)) {
        mkdirSync(artifactDir);
    }

    if (!existsSync(cacheDir)) {
        mkdirSync(cacheDir);
    }

    //Get files paths for artifacts, this includes libraries
    const artifactPaths = globSync(hardhatArtifactsGlob).filter((f) => !f.endsWith(".dbg.json"));
    //console.debug(artifactPaths);

    // Filter contract/interface artifacts.
    // To do so we load the abi, and check if any `type: function | fallback`
    // exists since libraries cannot have those
    const contractArtifacts = artifactPaths
        .map((artifactPath) => {
            return JSON.parse(readFileSync(artifactPath, "utf-8")) as Artifact;
        })
        .filter((artifact) => {
            const abi = artifact.abi;
            const abiFunctions = abi.filter((a) => a.type === "function" || a.type === "fallback");
            return abiFunctions.length > 0;
        });

    //Load exports cache last hash
    const artifactExportsCachePath = join(cacheDir, "artifact-exports-cache.json");
    let artifactExportsCache: { [path: string]: string } = {};
    if (existsSync(artifactExportsCachePath)) {
        artifactExportsCache = JSON.parse(readFileSync(artifactExportsCachePath, "utf-8"));
    }

    //Filter artifacts that don't match cached hash
    const contractArtifactsChanged = contractArtifacts.filter((artifact) => {
        const artifactHash = createHash("md5").update(JSON.stringify(artifact)).digest("hex");
        return artifactExportsCache[artifact.contractName] != artifactHash;
    });

    //For each artifact, write to .ts file
    contractArtifactsChanged.forEach((artifact) => {
        const contractName = artifact.contractName;
        //update cache
        artifactExportsCache[contractName] = createHash("md5").update(JSON.stringify(artifact)).digest("hex");

        //write to `src/artifacts/{artifact.contractName}.ts`
        const artifactData = getArtifactExportFileContent(artifact, getImplementation);
        writeFileSync(join(artifactDir, `${contractName}.ts`), artifactData);
    });

    //Check if all contracts cached
    const allCached = contractArtifactsChanged.length === 0;

    if (!allCached) {
        //All functions
        const functions = uniqBy(
            flatten(
                contractArtifacts.map((artifact) => artifact.abi.filter((item) => item.type === "function")),
            ) as AbiFunction[],
            (f) => toFunctionSignature(formatAbiItem(f)),
        );
        writeFileSync(
            join(artifactDir, "functions.ts"),
            `export const functions = [${functions.map((f) => JSON.stringify(f)).join(",")}] as const;`,
        );

        //All events
        const events = uniqBy(
            flatten(
                contractArtifacts.map((artifact) => artifact.abi.filter((item) => item.type === "event")),
            ) as AbiEvent[],
            (f) => `${toFunctionSignature(formatAbiItem(f))}-${f.inputs.filter((input) => input.indexed).length}`,
        );
        writeFileSync(
            join(artifactDir, "events.ts"),
            `export const events = [${events.map((f) => JSON.stringify(f)).join(",")}] as const;`,
        );
        //All errors
        const errors = uniqBy(
            flatten(
                contractArtifacts.map((artifact) => artifact.abi.filter((item) => item.type === "error")),
            ) as AbiError[],
            (f) => toFunctionSignature(formatAbiItem(f)),
        );
        writeFileSync(
            join(artifactDir, "errors.ts"),
            `export const errors = [${errors.map((f) => JSON.stringify(f)).join(",")}] as const;`,
        );
    }

    generateBarrelFileForDir(artifactDir, "namedModule");

    //save cache
    writeFileSync(artifactExportsCachePath, JSON.stringify(artifactExportsCache));

    //Lint changed files
    const eslintArtifactsFiles = contractArtifactsChanged.map((artifact) =>
        join(artifactDir, `${artifact.contractName}.ts`),
    );
    if (eslintArtifactsFiles.length > 0) {
        //files changed, lint functions.ts, events.ts, errors.ts
        eslintArtifactsFiles.push(join(artifactDir, "functions.ts"));
        eslintArtifactsFiles.push(join(artifactDir, "events.ts"));
        eslintArtifactsFiles.push(join(artifactDir, "errors.ts"));

        //files changed, lint index.ts
        eslintArtifactsFiles.push(join(artifactDir, "index.ts"));
    }

    const eslintFiles = [...eslintArtifactsFiles];
    if (eslintFiles.length > 0) {
        console.debug(
            `Exported ${eslintArtifactsFiles.length} Artifact file${eslintFiles.length > 1 ? "s" : ""} successfully`,
        );
        console.debug("Please wait for linting to complete...");

        //files changed, lint index.ts too
        eslintFiles.push(join(artifactDir, "index.ts"));

        const eslint = new ESLint({ useEslintrc: true, fix: true });
        const results = await eslint.lintFiles(eslintFiles);
        await ESLint.outputFixes(results);
    } else {
        console.debug("Nothing to export");
    }
}
