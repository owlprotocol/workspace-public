import { globSync } from "glob";
import { generateBarrelFileForDir } from "@owlprotocol/utils";
import { ESLint } from "eslint";
import { Hex, Abi, zeroAddress, zeroHash, Address } from "viem";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { createHash } from "node:crypto";
import { join } from "path";
import { getDeployAddress } from "../Create2Factory/getAddress.js";
import { CREATE2_FACTORY_ADDRESS } from "../Create2Factory/constants.js";
import { getDeployDeterministicAddress } from "../DeterministicDeployer/getAddress.js";

interface Artifact {
    _format: string;
    contractName: string;
    sourceName: string;
    abi: Abi;
    bytecode: Hex;
    deployedBytecode: Hex;
    linkReferences: Record<string, any>;
    deployedLinkReferences: Record<string, any>;
}

type Deployer = "Create2Factory" | "DeterministicDeployer";

/**
 * Takes an artifact and generates proper export file content.
 *   - Inidvidual keys are exported for better tree-shaking
 * @param artifact contains abi, bytecode, deployedBytecode
 * @param deployer what type of deployer is used for implementation.
 * @param implementations hard-coded implementations
 */
export function getArtifactExportFileContent(
    artifact: Artifact,
    deployer: Deployer = "Create2Factory",
    implementations: Record<string, Address> = {},
): string {
    if (artifact.bytecode != "0x") {
        let implementation: Address;
        if (implementations[artifact.contractName]) {
            implementation = implementations[artifact.contractName];
        } else if (artifact.contractName === "Create2Factory") {
            implementation = CREATE2_FACTORY_ADDRESS;
        } else if (deployer === "DeterministicDeployer") {
            implementation = getDeployDeterministicAddress({
                salt: zeroHash,
                bytecode: artifact.bytecode,
            });
        } else if (deployer === "Create2Factory") {
            //Implementation address deployed using Create2Factory
            implementation = getDeployAddress(zeroAddress, {
                salt: zeroHash,
                bytecode: artifact.bytecode,
                initData: "0x",
            });
        } else {
            throw new Error(`getArtifactExportFileContent invalid deployer ${deployer}`);
        }
        return `import { Hex, Address } from "viem";

export const abi = ${JSON.stringify(artifact.abi)} as const;
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
export const abi = ${JSON.stringify(artifact.abi)} as const;
export const ${artifact.contractName} = {
    abi,
};
`;
    }
}

export async function hardhatArtifactsExport(
    artifactDir = "./src/artifacts",
    cacheDir = "./cache",
    hardhatArtifactsGlob: string | string[] = "artifacts/contracts/**/*.json",
    deployer: Deployer = "Create2Factory",
    implementations: Record<string, Address> = {},
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
        const artifactData = getArtifactExportFileContent(artifact, deployer, implementations);
        writeFileSync(join(artifactDir, `${contractName}.ts`), artifactData);
    });

    generateBarrelFileForDir(artifactDir, "namedModule");

    //save cache
    writeFileSync(artifactExportsCachePath, JSON.stringify(artifactExportsCache));

    //Lint changed files
    const eslintArtifactsFiles = contractArtifactsChanged.map((artifact) =>
        join(artifactDir, `${artifact.contractName}.ts`),
    );
    if (eslintArtifactsFiles.length > 0) {
        //files changed, lint index.ts too
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
