import { Address, Hex } from "viem";

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

interface CompilerOutputContract {
    abi: any;
    evm: {
        bytecode: CompilerOutputBytecode;
        deployedBytecode: CompilerOutputBytecode;
        methodIdentifiers: {
            [methodSignature: string]: string;
        };
    };
    metadata: SlocMetadata;
}

interface CompilerOutput {
    sources: CompilerOutputSources;
    contracts: {
        [sourceName: string]: {
            [contractName: string]: CompilerOutputContract;
        };
    };
}

interface CompilerOutputSource {
    id: number;
    ast: any;
}

interface CompilerOutputSources {
    [sourceName: string]: CompilerOutputSource;
}

interface CompilerOutputBytecode {
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
    apiUrl: string;
    apiKey: string;
    contractName: string;
    contractAddress: Address;
    compilerVersion: string;
    sourceCode: string;
    constructorArguments?: Hex;
    evmVersion?: string;
}
export interface SlocMetadata {
    compiler: {
        version: string;
    };
    language: string;
    output: {
        abi: any[];
        devdoc?: {
            author?: string;
            details?: string;
            errors?: Record<string, any>;
            events?: Record<string, any>;
            kind: string;
            methods?: Record<string, any>;
            stateVariables?: Record<string, any>;
            title?: string;
            version: number;
            [key: string]: any;
        };
        userdoc?: {
            errors?: Record<string, any>;
            events?: Record<string, any>;
            kind: string;
            methods: Record<string, any>;
            notice?: string;
            version: number;
        };
    };
    settings: {
        compilationTarget: Record<string, string>;
        optimizer: {
            enabled: boolean;
            runs: number;
        };
        evmVersion?: string;
        metadata: {
            bytecodeHash: string;
            useLiteralContent?: boolean;
        };
        viaIR?: boolean;
        libraries?: Record<string, Record<string, string>>;
        remappings?: string[];
    };
    sources: {
        [fileName: string]: {
            content: string;
            keccak256?: string;
            license?: string;
        };
    };
    version: number;
}

export interface StandardJSONInput {
    language: string;
    sources: {
        [fileName: string]: {
            content: string;
        };
    };
    settings: {
        optimizer: {
            enabled: boolean;
            runs: number;
        };
        evmVersion?: string;
        outputSelection: {
            [fileName: string]: {
                [contractName: string]: string[];
            };
        };
    };
}
