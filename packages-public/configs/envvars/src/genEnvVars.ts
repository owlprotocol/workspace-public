import { ESLint } from "eslint";
import { writeFileSync } from "fs";

export enum ModuleType {
    CJS = "CJS",
    ESM = "ESM",
}

/** Define an envvar, defaultValues, and enum values if applicable */
export interface EnvVarDef {
    readonly name: string;
    readonly defaultValue?: string;
    readonly enumValues?: string[];
}

//DFNS MPC Config
const DFNS_ENVVARS: EnvVarDef[] = [
    { name: "DFNS_PRIVATE_KEY" },
    { name: "DFNS_AUTH_TOKEN" },
    { name: "DFNS_CRED_ID" },
    { name: "DFNS_APP_ORIGIN" },
    { name: "DFNS_APP_ID" },
    { name: "DFNS_API_URL", defaultValue: "https://api.dfns.io" },
];
//Firebase config (admin & web sdks)
const FIREBASE_ENVVARS: EnvVarDef[] = [
    { name: "FIREBASE_API_KEY" },
    { name: "FIREBASE_AUTH_DOMAIN" },
    { name: "FIREBASE_PROJECT_ID", defaultValue: "owl-protocol" },
    { name: "FIREBASE_APP_ID", defaultValue: "owl-protocol" },
    { name: "FIREBASE_MEASUREMENT_ID" },
    { name: "FIREBASE_SERVICE_EMAIL" },
    { name: "FIREBASE_PRIVATE_KEY" },
    { name: "FIREBASE_DATABASE_URL" },
    { name: "FIREBASE_STORAGE_BUCKET" },
];
const SCRIPT_ENVVARS: EnvVarDef[] = [
    //Cold-storage admin for beacons
    { name: "BEACON_ADMIN", defaultValue: "0xad839Bc20a349b2502468c9d6ba47531f435491f" },
    //Hot-wallet for contracts-api relayer
    { name: "PRIVATE_KEY_RELAYER" },
    {
        name: "PRIVATE_KEY_RELAYER_LOCAL",
        defaultValue: "0x0000000000000000000000000000000000000000000000000000000000000001",
    },
    //Hot-wallet for deployment
    { name: "PRIVATE_KEY_0" },
    { name: "PUBLIC_ADDRESS_0" },
    { name: "PRIVATE_KEY_1" },
    { name: "PUBLIC_ADDRESS_1" },
    //Local private keys
    { name: "PRIVATE_KEY_ANVIL", defaultValue: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" },
    { name: "PRIVATE_KEY_0_LOCAL", defaultValue: "0x0000000000000000000000000000000000000000000000000000000000000001" },
    { name: "PUBLIC_ADDRESS_0_LOCAL", defaultValue: "0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf" },
    { name: "PRIVATE_KEY_1_LOCAL", defaultValue: "0x0000000000000000000000000000000000000000000000000000000000000002" },
    { name: "PUBLIC_ADDRESS_1_LOCAL", defaultValue: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF" },
    //Singleton factory
    { name: "PRIVATE_KEY_FACTORY_DEPLOYER" },
    { name: "PUBLIC_ADDRESS_FACTORY_DEPLOYER", defaultValue: "0x9E6e5DfD101CF9a3f063D396Bbc92F67940cae4a" },
];
/** Add public defaults that are free */
const BLOCKCHAIN_ENVVARS: EnvVarDef[] = [
    { name: "INFURA_API_KEY", defaultValue: "f47a5c2dfc1f4c4385f6372fade38618" },
    { name: "THIRDWEB_API_KEY", defaultValue: "50072e65e03dfde6c855d89392bad2b6" },
    { name: "ANKR_API_KEY" },
    { name: "ETHERSCAN_API_KEY" },
    { name: "BYTE4_URL", defaultValue: "https://www.4byte.directory/api/v1" },
    { name: "IPFS_URL", defaultValue: "http://localhost:5001" },
    {
        name: "PINATA_JWT",
        defaultValue:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlMzMxZDljZC05MDk4LTRkOTctOGI4Zi03ODY3NTFkZTQxYjgiLCJlbWFpbCI6Imxlby52aWduYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzZmYTgwY2I2ZWRmMTkxNTVjODUiLCJzY29wZWRLZXlTZWNyZXQiOiI2YTM1MTkxYThjOTMxMzU3MGFmOGU3NGEyZWQzZmVhYWYxYjFhZDUxY2FkY2ZkNGFhZTc1YjNjMmQ0YzQwMWI3IiwiaWF0IjoxNjgxMDk1ODM3fQ.As9jjfv7BoPF9pTY_Lqj67iMWZXp9EIoGs50zcXaF5Y",
    },
    { name: "INFURA_IPFS_PROJECT_ID", defaultValue: "2OAhenU1T1fxTGyQMTTFDwdyW5p" },
    { name: "INFURA_IPFS_PROJECT_SECRET", defaultValue: "8ffddfdc95f32ea7aa43ee3ba9d2d603" },
];

/** Chainlist data sufficient mostly, we just override here for localhost */
const RPC_DEFAULTS: Record<string, string | undefined> = {
    1337: "http://localhost:8545",
};
const WS_DEFAULTS: Record<string, string | undefined> = {
    1337: "ws://localhost:8545",
};
/** API endpoints are not stable. Usually testnet and mainnet are on same domain. */
const EXPLORER_API_DEFAULTS: Record<string, string | undefined> = {
    //Ethereum
    1: "https://api.etherscan.io/api",
    5: "https://api-goerli.etherscan.io/api",
    11155111: "https://api-sepolia.etherscan.io/api",
    //Linea
    59144: "https://api.lineascan.build/api",
    59140: "https://api-goerli.lineascan.build/api",
    //Polygon
    137: "https://api.polygonscan.com/api",
    80001: "https://api-testnet.polygonscan.com/api",
    //Arbitrum
    42161: "https://api.arbiscan.io/api",
    //Optimism
    10: "https://api-optimistic.etherscan.io/api",
    //Avalanche
    43114: "https://api.snowtrace.io/api",
    //BSC
    56: "https://api.bscscan.com/api",
    97: "https://api-testnet.bscscan.com/api",
    //Gnosis
    //"https://api.blockscout.com/xdai/mainnet/api"
    //Moonriver
    //"https://blockscout.moonriver.moonbeam.network/api"
    //Moonbeam
    //"https://api-moonbeam.moonscan.io"
};

/** API Keys are per-domain */
//Exposed API Key are meant for public use, not used in production
const EXPLORER_API_KEY_DEFAULTS: Record<string, string | undefined> = {
    //Ethereum
    1: "BG78ZBIAH64QWA748MMNVVZEHW13JR4Z6I",
    5: "BG78ZBIAH64QWA748MMNVVZEHW13JR4Z6I",
    11155111: "BG78ZBIAH64QWA748MMNVVZEHW13JR4Z6I",
    //Linea
    //59144: "",
    //59140: "",
    //Polygon
    137: "R6G9K1EKZGBYYG528576GS5A6J4YF1WS6I",
    80001: "R6G9K1EKZGBYYG528576GS5A6J4YF1WS6I",
    //Arbitrum
    //42161: "",
    //Optimism
    //10: "",
    //Avalanche
    //43114: "",
    //BSC
    56: "9TRND69HZABV4HU73SPTECP72S94Q8K5B7",
    97: "9TRND69HZABV4HU73SPTECP72S94Q8K5B7",
};
/**
 * Get envvar definitions for networkId
 * @param networkId
 * @returns
 */
export function getEnvVarsForNetworkId(networkId: string): EnvVarDef[] {
    const network = `NETWORK_${networkId}`;
    return [
        { name: `${network}_RPC`, defaultValue: RPC_DEFAULTS[networkId] },
        { name: `${network}_WS`, defaultValue: WS_DEFAULTS[networkId] },
        { name: `${network}_EXPLORER` },
        { name: `${network}_EXPLORER_API`, defaultValue: EXPLORER_API_DEFAULTS[networkId] },
        { name: `${network}_EXPLORER_API_KEY`, defaultValue: EXPLORER_API_KEY_DEFAULTS[networkId] },
    ];
}

//const chainIds = allChains.map((c) => c.chainId);
const chainIds = [1, 5, 1337, 11155111, 59144, 59140, 137, 80001, 42161, 10, 43114, 56, 97];
//TODO: For all networkIds, right now this breaks because file is too big. Is there a better way?
const NETWORK_ENVVARS: EnvVarDef[] = [];
chainIds.forEach((c) => NETWORK_ENVVARS.push(...getEnvVarsForNetworkId(`${c}`)));

export const ENVVARS: EnvVarDef[] = [
    { name: "LOG_LEVEL", defaultValue: "warn", enumValues: ["trace", "debug", "info", "warn", "error"] },
    { name: "TITLE" },
    { name: "API_BASE_URL", defaultValue: "http://localhost:3000/api" },
    { name: "CORS_PROXY" },
    { name: "README_SECRET" },
    { name: "CLERK_PUBLISHABLE_KEY" },
    { name: "CLERK_WEBHOOK_SECRET_KEY" },
    ...DFNS_ENVVARS,
    ...FIREBASE_ENVVARS,
    ...SCRIPT_ENVVARS,
    ...BLOCKCHAIN_ENVVARS,
    ...NETWORK_ENVVARS,
];

const NODE_ENV_VAR = {
    name: "NODE_ENV",
    defaultValue: "development",
    enumValues: ["development", "test", "ci", "staging", "production"],
};

/**
 * Support both import.meta.env imports and process.env imports
 * @param name of envvar
 * @param defaultValue default hard-coded value
 * @returns
 */
export function genEnvVarStatement(name: string, moduleType: ModuleType, defaultValue?: string): string {
    const varName = `export const ${name}`;
    let varValue: string;
    if (moduleType === ModuleType.CJS) {
        //value as process.env (NodeJS only)
        varValue = `process.env.${name}`;
    } else if (moduleType === ModuleType.ESM) {
        //value as import.meta.env (NodeJS ESM or Vite bundler)
        //import.meta.env is used by Vite (transform)
        //process.env is used by NodeJS (runtime)
        varValue = `import.meta.env ? (import.meta.env.${name} ?? import.meta.env.VITE_${name}) : process.env.${name}`;
    } else {
        throw new Error(`Invalid moduleType ${moduleType}`);
    }
    //Add default value
    if (defaultValue) {
        varValue = `(${varValue}) ?? "${defaultValue}"`;
    }
    return `${varName} = ${varValue};`;
}

export function genEnvVarTypeDef(name: string, enumValues?: string[]) {
    if (enumValues) return `readonly ${name}?: ${enumValues.map((e) => `"${e}"`).join("|")};`;

    return `readonly ${name}?: string;`;
}

/** Generate envvar exports */
export function genEnvVarsFile(envvars: EnvVarDef[], moduleType: ModuleType) {
    const exports = envvars.map((e) => genEnvVarStatement(e.name, moduleType, e.defaultValue)).join("\n");
    return exports;
}

export function genEnvDtsFile(envvars: EnvVarDef[], moduleType: ModuleType): string {
    const dtsFilePrefix = `
/**
 * Environment variables. We use a hybrid solution that supports both import.meta.env for static
 * replacement used by client bundlers (Vite, Webpack...) and process.env for NodeJS libraries.
 * @module Environment
 */
`;

    const NODE_ENV_EXPORT_CJS = `export const NODE_ENV = (import.meta.env ? import.meta.env.NODE_ENV : process.env.NODE_ENV) ?? "development";`;
    const NODE_ENV_EXPORT_ESM = `export const NODE_ENV = process.env.NODE_ENV ?? "development";`;
    const NODE_ENV_EXPORT = moduleType === ModuleType.CJS ? NODE_ENV_EXPORT_CJS : NODE_ENV_EXPORT_ESM;

    //NODE_ENV loaded before .env file
    const dtsFileSuffix = `
${NODE_ENV_EXPORT}

const isClient = () => typeof window !== "undefined";

import dotenv from "dotenv";
import { resolve } from "path";
if (!isClient()) {
    const DOTENV_KEY = process.env.DOTENV_KEY;
    if (DOTENV_KEY) {
        //Load remote envvars
        dotenv.config();
    } else if (NODE_ENV === "development") {
        dotenv.config({ path: resolve(process.cwd(), ".env") });
    } else if (NODE_ENV === "test") {
        dotenv.config({ path: resolve(process.cwd(), ".env.test") });
    } else if (NODE_ENV === "ci") {
        dotenv.config({ path: resolve(process.cwd(), ".env.ci") });
    } else if (NODE_ENV === "staging") {
        dotenv.config({ path: resolve(process.cwd(), ".env.staging") });
    } else if (NODE_ENV === "production") {
        dotenv.config({ path: resolve(process.cwd(), ".env.production") });
    }
}`;

    const types = [
        genEnvVarTypeDef(NODE_ENV_VAR.name, NODE_ENV_VAR.enumValues),
        ...envvars.map((e) => genEnvVarTypeDef(e.name, e.enumValues)),
    ];
    const typesWithVITE = [...envvars.map((e) => genEnvVarTypeDef(`VITE_${e.name}`, e.enumValues))];
    if (moduleType === ModuleType.CJS) {
        const globalNameSpace = `declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            ${types.join("\n            ")}
        }
    }
}
`;
        return [dtsFilePrefix, globalNameSpace, dtsFileSuffix].join("\n");
    } else if (moduleType === ModuleType.ESM) {
        const globalNameSpace = `declare global {
    interface ImportMetaEnv {
        ${types.join("\n            ")}
        ${typesWithVITE.join("\n            ")}
    }
}
`;
        //Define Import Meta
        const dtsFileImportMetaEnv = `/// <reference types="vite/client" />`;

        return [dtsFileImportMetaEnv, dtsFilePrefix, globalNameSpace, dtsFileSuffix].join("\n");
    } else {
        throw new Error(`Invalid moduleType ${moduleType}`);
    }
}

export async function writeEnvVarFile(envvars: EnvVarDef[], moduleType: ModuleType, envVarsPath: string) {
    const file = `${genEnvDtsFile(envvars, moduleType)}\n${genEnvVarsFile(envvars, moduleType)}`;
    writeFileSync(envVarsPath, file);

    //Lint files
    const eslint = new ESLint({ useEslintrc: true, fix: true });
    const results = await eslint.lintFiles(envVarsPath);
    await ESLint.outputFixes(results);
}

export async function main() {
    await Promise.all([
        writeEnvVarFile(ENVVARS, ModuleType.CJS, "src/envvars.cts"),
        writeEnvVarFile(ENVVARS, ModuleType.ESM, "src/envvars.mts"),
    ]);
}

main();
