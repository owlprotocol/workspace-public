import { Address, Hex } from "viem";
import { readFileSync } from "fs";

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// From hardhat-core
/**
 * A BuildInfo is a file that contains all the information of a solc run. It
 * includes all the necessary information to recreate that exact same run, and
 * all of its output.
 */
export interface BuildInfo {
    _format: string;
    id: string;
    solcVersion: string;
    solcLongVersion: string;
    input: CompilerInput;
    output: CompilerOutput;
}

export interface LinkReferences {
    [libraryFileName: string]: {
        [libraryName: string]: Array<{ length: number; start: number }>;
    };
}

export interface CompilerInput {
    language: string;
    sources: { [sourceName: string]: { content: string } };
    settings: {
        viaIR?: boolean;
        optimizer: {
            runs?: number;
            enabled?: boolean;
            details?: {
                yulDetails: {
                    optimizerSteps: string;
                };
            };
        };
        metadata?: { useLiteralContent: boolean };
        outputSelection: {
            [sourceName: string]: {
                [contractName: string]: string[];
            };
        };
        evmVersion?: string;
        libraries?: {
            [libraryFileName: string]: {
                [libraryName: string]: string;
            };
        };
        remappings?: string[];
    };
}

export interface CompilerOutputContract {
    abi: any;
    evm: {
        bytecode: CompilerOutputBytecode;
        deployedBytecode: CompilerOutputBytecode;
        methodIdentifiers: {
            [methodSignature: string]: string;
        };
    };
    metadata: any;
}

export interface CompilerOutput {
    sources: CompilerOutputSources;
    contracts: {
        [sourceName: string]: {
            [contractName: string]: CompilerOutputContract;
        };
    };
}

export interface CompilerOutputSource {
    id: number;
    ast: any;
}

export interface CompilerOutputSources {
    [sourceName: string]: CompilerOutputSource;
}

export interface CompilerOutputBytecode {
    object: string;
    opcodes: string;
    sourceMap: string;
    linkReferences: {
        [sourceName: string]: {
            [libraryName: string]: Array<{ start: number; length: 20 }>;
        };
    };
    immutableReferences?: {
        [key: string]: Array<{ start: number; length: number }>;
    };
}

export interface VerifyEtherscanParameters {
    apiKey: string;
    contractName: string;
    contractAddress: Address;
    compilerVersion: string;
    sourceCode: string;
    constructorArguments?: string;
    evmVersion?: string;
}
export function verifyEtherscan({
    apiKey,
    contractAddress,
    sourceCode,
    contractName,
    compilerVersion,
    constructorArguments,
    evmVersion,
}: VerifyEtherscanParameters) {
    const params = {
        apikey: apiKey,
        module: "contract",
        action: "verifysourcecode",
        contractaddress: contractAddress,
        sourceCode,
        codeformat: "solidity-standard-json-input",
        contractname: contractName,
        compilerversion: compilerVersion,
    } as any;

    //Weird typo in Etherscan API?
    if (constructorArguments) params.constructorArguements = constructorArguments;
    if (evmVersion) params.evmversion = evmVersion;

    const parameters = new URLSearchParams(params);

    const apiUrl = "https://api.polygonscan.com/api";
    const url = new URL(apiUrl);

    return fetch(url, {
        method: "POST",
        body: parameters,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
}

//TODO: Implement wait for verify?
export function checkVerifyStatusEtherscan({ apiKey, guid }: { apiKey: string; guid: string }) {
    const params = {
        apikey: apiKey,
        module: "contract",
        action: "checkverifystatus",
        guid,
    } as any;
    const parameters = new URLSearchParams(params);

    const apiUrl = "https://api.polygonscan.com/api";
    const url = new URL(apiUrl);

    return fetch(url, {
        method: "POST",
        body: parameters,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
}

export async function main() {
    const buildInfoPath = "artifacts/build-info/1afa25cf92de5ec814b300b7ef4c7ee1.json";
    const buildInfo: BuildInfo = JSON.parse(readFileSync(buildInfoPath, "utf-8"));

    const name = "contracts/Create2Factory.sol";
    const contract = buildInfo.output.contracts[name];
    const Create2Factory = contract.Create2Factory;

    //Looks like proper solc output???
    //TODO: Get proper type interface for this
    const metadata = JSON.parse(Create2Factory.metadata);
    const compilerVersion = ("v" + metadata.compiler.version) as string;
    const contractName = `${name}:Create2Factory`;

    // console.debug({ compilerVersion, contractName });

    //TODO: Add api key here
    const apiKey = "xxxx";
    //TODO: Already verified on Polygonscan, but try with different chain?
    const contractAddress: Address = "0x57318Dc30FE4da0a1b20eBbD4Dfd16aa66cfDB46";

    Object.values(metadata.sources).forEach((source: any) => {
        // source.content = source.content.replaceAll(/"/g, "'");
        delete source.license;
    });
    //https://gist.github.com/0xV4L3NT1N3/974d6bfb58070e0fe4e38d626cdf1c44
    const settings = {
        metadata: metadata.settings.metadata,
        optimizer: metadata.settings.optimizer,
        evmVersion: metadata.settings.evmVersion,
        viaIR: metadata.settings.viaIR,
        outputSelection: {
            "*": {
                "*": ["abi", "evm.bytecode", "evm.deployedBytecode", "evm.methodIdentifiers", "metadata"],
                "": ["ast"],
            },
        },
    };

    const standardJSONInput = {
        language: metadata.language,
        sources: metadata.sources,
        settings,
    };
    console.debug(metadata.settings);

    //TODO: Get proper type interface for this
    const sourceCode = JSON.stringify(standardJSONInput);
    const evmVersion = metadata.settings.evmVersion;
    // console.debug(Object.keys(metadata.sources));

    const response = await verifyEtherscan({
        apiKey,
        contractAddress,
        contractName,
        sourceCode,
        compilerVersion,
        evmVersion,
    });

    const { result: guid } = (await response.json()) as { result: string };
    console.debug(guid);

    // await sleep(5000);

    // const status = await checkVerifyStatusEtherscan({ apiKey, guid });
    // console.debug(await status.text());
}

/**
 * TODO: Refactor verification
 * - api wrappers, add url parameter (rn hard-coded)
 * - types for metadata & sourceCode (not exactly the same)
 *
 * - etherscanVerifySourceCode (rename & refactor)
 * - etherscanCheckVerifyStatus (rename & refactor)
 * - waitForEtherscanVerifyStatus - retry logic for when checkVerifyStatus returns "pending"
 *
 * - etherscanGetAbi (used to check if verified)
 * https://docs.polygonscan.com/api-endpoints/contracts#get-contract-abi-for-verified-contract-source-codes
 *
 */

main();
