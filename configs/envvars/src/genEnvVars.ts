import { ESLint } from "eslint";
import { writeFileSync } from "fs";

export enum Platform {
    NODE = "NODE",
    BROWSER = "BROWSER",
}

/** Define an envvar, defaultValues, and enum values if applicable */
export interface EnvVarDef {
    readonly name: string;
    readonly defaultValue?: string;
    readonly enumValues?: string[];
    /** Which platform envvar is supported on neutral = both browser and node */
    readonly platform: "browser" | "node" | "neutral";
}

//DFNS MPC Config
const DFNS_ENVVARS: EnvVarDef[] = [
    { name: "DFNS_MOCK", platform: "node", defaultValue: "true", enumValues: ["true", "false"] },
    //Mock latency for creating wallets from "Creating" -> "Active"
    { name: "DFNS_MOCK_TIMEOUT", platform: "node", defaultValue: "0" },
    { name: "DFNS_PRIVATE_KEY", platform: "node" },
    { name: "DFNS_AUTH_TOKEN", platform: "node" },
    { name: "DFNS_CRED_ID", platform: "node" },
    { name: "DFNS_APP_ORIGIN", platform: "node" },
    { name: "DFNS_APP_ID", platform: "node" },
    { name: "DFNS_API_URL", platform: "node", defaultValue: "https://api.dfns.io" },
];
//Firebase config (admin & web sdks)
const FIREBASE_ENVVARS: EnvVarDef[] = [
    { name: "FIREBASE_MOCK", platform: "neutral", defaultValue: "true", enumValues: ["true", "false"] },
    { name: "FIREBASE_API_KEY", platform: "neutral" },
    { name: "FIREBASE_AUTH_DOMAIN", platform: "neutral" },
    { name: "FIREBASE_PROJECT_ID", platform: "neutral", defaultValue: "owl-protocol" },
    { name: "FIREBASE_APP_ID", platform: "neutral", defaultValue: "owl-protocol" },
    { name: "FIREBASE_MEASUREMENT_ID", platform: "neutral" },
    { name: "FIREBASE_SERVICE_EMAIL", platform: "node" },
    { name: "FIREBASE_PRIVATE_KEY", platform: "node" },
    { name: "FIREBASE_DATABASE_URL", platform: "neutral" },
    { name: "FIREBASE_STORAGE_BUCKET", platform: "neutral", defaultValue: "owl-protocol" },
    { name: "FIREBASE_LOCAL_CACHE_SIZE", platform: "neutral", defaultValue: "-1" },
    {
        name: "FIREBASE_LOCAL_CACHE_MANAGER",
        platform: "neutral",
        defaultValue: "MEMORY",
        enumValues: ["MEMORY", "SINGLE_TAB", "MULTIPLE_TAB"],
    },
];

//Clerk config
const CLERK_ENVVARS: EnvVarDef[] = [
    { name: "CLERK_PUBLISHABLE_KEY", platform: "browser" },
    { name: "CLERK_SECRET_KEY", platform: "node" },
    { name: "CLERK_WEBHOOK_MOCK", platform: "node", defaultValue: "true", enumValues: ["true", "false"] },
    { name: "CLERK_WEBHOOK_SECRET_KEY", platform: "node" },
    { name: "CLERK_JWT_KEY", platform: "node" },
    { name: "CLERK_LOGGING", platform: "neutral", defaultValue: "true" },
];
//Readme config
const README_ENVVARS: EnvVarDef[] = [
    { name: "README_MOCK", platform: "node", defaultValue: "true", enumValues: ["true", "false"] },
    { name: "README_SECRET", platform: "node" },
];
//Intercom config
const INTERCOM_ENVVARS: EnvVarDef[] = [{ name: "INTERCOM_APP_ID", platform: "browser", defaultValue: "ndx9cj0b" }];
//Resend config
const RESEND_ENVVARS: EnvVarDef[] = [
    { name: "RESEND_MOCK", platform: "node", defaultValue: "true", enumValues: ["true", "false"] },
    { name: "RESEND_API_KEY", platform: "node" },
];
//Shopify config
const SHOPIFY_ENVVARS: EnvVarDef[] = [
    { name: "SHOPIFY_DEMO_STORE_DOMAIN", platform: "node" },
    { name: "SHOPIFY_DEMO_STORE_TOKEN", platform: "node" },
    { name: "SHOPIFY_DEMO_STORE_STATE", platform: "node" },
    { name: "SHOPIFY_MOCK", platform: "node", defaultValue: "true", enumValues: ["true", "false"] },
    { name: "SHOPIFY_API_KEY", platform: "node" },
    { name: "SHOPIFY_API_SECRET", platform: "node" },
    { name: "SHOPIFY_SCOPES", platform: "node", defaultValue: "read_customers,read_orders,write_price_rules" },
    { name: "SHOPIFY_HOSTNAME", platform: "neutral" },
];
/** Add public defaults that are free */
const BLOCKCHAIN_ENVVARS: EnvVarDef[] = [
    //rpc providers
    { name: "ANKR_API_KEY", platform: "node" },
    { name: "DRPC_API_KEY", platform: "node" },
    { name: "FLARE_API_KEY", platform: "node" },
    { name: "INFURA_API_KEY", platform: "node", defaultValue: "f47a5c2dfc1f4c4385f6372fade38618" },
    { name: "THIRDWEB_API_KEY", platform: "node", defaultValue: "50072e65e03dfde6c855d89392bad2b6" },
    //byte4 pre-image db
    { name: "BYTE4_URL", platform: "node", defaultValue: "https://www.4byte.directory/api/v1" },
    //ipfs
    { name: "IPFS_URL", platform: "node", defaultValue: "http://localhost:5001" },
    { name: "IPFS_GATEWAY_URL", platform: "neutral", defaultValue: "https://public-owlprotocol.infura-ipfs.io" },
    {
        name: "PINATA_JWT",
        platform: "node",
        defaultValue:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlMzMxZDljZC05MDk4LTRkOTctOGI4Zi03ODY3NTFkZTQxYjgiLCJlbWFpbCI6Imxlby52aWduYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzZmYTgwY2I2ZWRmMTkxNTVjODUiLCJzY29wZWRLZXlTZWNyZXQiOiI2YTM1MTkxYThjOTMxMzU3MGFmOGU3NGEyZWQzZmVhYWYxYjFhZDUxY2FkY2ZkNGFhZTc1YjNjMmQ0YzQwMWI3IiwiaWF0IjoxNjgxMDk1ODM3fQ.As9jjfv7BoPF9pTY_Lqj67iMWZXp9EIoGs50zcXaF5Y",
    },
    { name: "INFURA_IPFS_PROJECT_ID", platform: "node", defaultValue: "2OAhenU1T1fxTGyQMTTFDwdyW5p" },
    { name: "INFURA_IPFS_PROJECT_SECRET", platform: "node", defaultValue: "8ffddfdc95f32ea7aa43ee3ba9d2d603" },
    //wallets
    { name: "PRIVATE_KEY_PAYMASTER_SIGNER", platform: "node" },
    { name: "PRIVATE_KEY_UTILITY", platform: "node" },
    { name: "PUBLIC_ADDRESS_UTILITY", platform: "neutral", defaultValue: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF" },
    { name: "PRIVATE_KEY_RELAYER", platform: "node" },
    { name: "PUBLIC_ADDRESS_RELAYER", platform: "neutral", defaultValue: "0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf" },
    //owl chain (hedwig)
    { name: "OWL_TESTNET_NETWORK_ID", platform: "neutral", defaultValue: "1337" },
];

const INDEXER_ENVVARS: EnvVarDef[] = [
    { name: "INDEXER_NETWORK_ID", platform: "node", defaultValue: "1337" },
    { name: "INDEXER_MAX_ADDRESSES", platform: "node", defaultValue: "100" },
    { name: "INDEXER_MAX_FILTERS", platform: "node", defaultValue: "10" },
];
const TELEGRAM_BOT_ENVVARS: EnvVarDef[] = [
    { name: "TELEGRAM_BOT_TOKEN", platform: "node" },
    { name: "TELEGRAM_BOT_HANDLE", platform: "node", defaultValue: "@easywallet" },
    { name: "TELEGRAM_BOT_NAME", platform: "node", defaultValue: "Easy Wallet" },
];

const POH_ENVVARS: EnvVarDef[] = [{ name: "POH_NETWORK_ID", platform: "node", defaultValue: "1337" }];

/** Chainlist data sufficient mostly, we just override here for localhost */
const RPC_DEFAULTS: Record<string, string | undefined> = {
    1337: "http://127.0.0.1:8545",
};
const WS_DEFAULTS: Record<string, string | undefined> = {
    1337: "ws://127.0.0.1:8545",
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
    //Blast
    168587773: "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
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
    //Blast
    168587773: "routescan",
};

/**
 * Get envvar definitions for networkId
 * @param networkId
 * @returns
 */
export function getEnvVarsForNetworkId(networkId: string): EnvVarDef[] {
    const network = `NETWORK_${networkId}`;
    return [
        { name: `${network}_RPC`, platform: "node", defaultValue: RPC_DEFAULTS[networkId] },
        { name: `${network}_WS`, platform: "node", defaultValue: WS_DEFAULTS[networkId] },
        { name: `${network}_EXPLORER`, platform: "node" },
        { name: `${network}_EXPLORER_API`, platform: "node", defaultValue: EXPLORER_API_DEFAULTS[networkId] },
        { name: `${network}_EXPLORER_API_KEY`, platform: "node", defaultValue: EXPLORER_API_KEY_DEFAULTS[networkId] },
    ];
}

//const chainIds = allChains.map((c) => c.chainId);
const chainIds = [1, 5, 1337, 11155111, 59144, 59140, 137, 80001, 42161, 10, 43114, 56, 97, 168587773];
//TODO: For all networkIds, right now this breaks because file is too big. Is there a better way?
const NETWORK_ENVVARS: EnvVarDef[] = [];
chainIds.forEach((c) => NETWORK_ENVVARS.push(...getEnvVarsForNetworkId(`${c}`)));

export const ENVVARS: EnvVarDef[] = [
    {
        name: "LOG_LEVEL",
        platform: "neutral",
        defaultValue: "warn",
        enumValues: ["trace", "debug", "info", "warn", "error"],
    },
    { name: "TITLE", platform: "browser" },
    { name: "API_VERSION", platform: "browser" },
    { name: "API_REST_BASE_URL", platform: "neutral", defaultValue: "https://api.owl.build/api" },
    { name: "API_TRPC_BASE_URL", platform: "neutral", defaultValue: "https://api.owl.build/api/trpc" },
    { name: "CORS_PROXY", platform: "browser" },
    { name: "CHAIN_ID_FALLBACK", platform: "browser", defaultValue: "80001" },
    ...README_ENVVARS,
    ...RESEND_ENVVARS,
    ...DFNS_ENVVARS,
    ...FIREBASE_ENVVARS,
    ...CLERK_ENVVARS,
    ...INTERCOM_ENVVARS,
    ...SHOPIFY_ENVVARS,
    ...BLOCKCHAIN_ENVVARS,
    ...INDEXER_ENVVARS,
    ...POH_ENVVARS,
    ...TELEGRAM_BOT_ENVVARS,
    ...NETWORK_ENVVARS,
    { name: "OPENAI_SECRET_KEY", platform: "node" },
    { name: "OWL_DOMAINS", platform: "node", defaultValue: "*" },
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
export function genEnvVarStatement(name: string, platform: Platform, defaultValue?: string): string {
    const varName = `export const ${name}`;
    let varValue: string;
    if (platform === Platform.NODE) {
        //value as process.env (NodeJS only)
        varValue = `process.env.${name}`;
    } else if (platform === Platform.BROWSER) {
        varValue = `import.meta.env.VITE_${name}`;
    } else {
        throw new Error(`Invalid moduleType ${platform}`);
    }
    //Add default value
    if (defaultValue) {
        varValue = `${varValue} ?? "${defaultValue}"`;
    }
    return `${varName} = ${varValue};`;
}

export function genEnvVarTypeDef(name: string, enumValues?: string[], defined?: boolean) {
    if (enumValues) return `readonly ${name}${defined ? "" : "?"}: ${enumValues.map((e) => `"${e}"`).join("|")};`;

    return `readonly ${name}${defined ? "" : "?"}: string;`;
}

/** Generate envvar exports */
export function genEnvVarsExports(envvars: EnvVarDef[], platform: Platform) {
    envvars = envvars.filter((e) => {
        if (platform === Platform.NODE) {
            return e.platform === "node" || e.platform === "neutral";
        } else if (platform === Platform.BROWSER) {
            return e.platform === "browser" || e.platform === "neutral";
        }
    });

    const exports = envvars.map((e) => genEnvVarStatement(e.name, platform, e.defaultValue)).join("\n");
    return exports;
}

/** Prefix data for the file */
export function genEnvVarsPrelude(envvars: EnvVarDef[], platform: Platform): string {
    envvars = envvars.filter((e) => {
        if (platform === Platform.NODE) {
            return e.platform === "node" || e.platform === "neutral";
        } else if (platform === Platform.BROWSER) {
            return e.platform === "browser" || e.platform === "neutral";
        }
    });

    const comment = `
/**
 * Environment variables. We use a hybrid solution that supports both import.meta.env for static
 * replacement used by client bundlers (Vite, Webpack...) and process.env for NodeJS libraries.
 * @module Environment
 */
console.debug("Loading ${platform} envvars")
`;

    if (platform === Platform.NODE) {
        //NODE_ENV loaded before .env file
        const dotenvLoad = `
import { dotenvConfig } from "./dotenvConfig.js";
dotenvConfig();`;

        const types = [
            genEnvVarTypeDef(NODE_ENV_VAR.name, NODE_ENV_VAR.enumValues),
            ...envvars.map((e) => genEnvVarTypeDef(e.name, e.enumValues)),
        ];
        const globalNameSpace = `declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            ${types.join("\n            ")}
        }
    }
}
`;
        return [comment, globalNameSpace, dotenvLoad].join("\n");
    } else if (platform === Platform.BROWSER) {
        const NODE_ENV_EXPORT = `export const NODE_ENV = import.meta.env.MODE ?? "development";`;

        const typesWithVITE = [...envvars.map((e) => genEnvVarTypeDef(`VITE_${e.name}`, e.enumValues))];
        const globalNameSpace = `declare global {
    interface ImportMetaEnv {
        ${typesWithVITE.join("\n        ")}
    }
}
`;
        //Define Import Meta
        const viteClientDTS = `/// <reference types="vite/client" />`;
        return [viteClientDTS, comment, globalNameSpace, NODE_ENV_EXPORT].join("\n");
    } else {
        throw new Error(`Invalid moduleType ${platform}`);
    }
}

export async function writeEnvVarFile(envvars: EnvVarDef[], moduleType: Platform, envVarsPath: string) {
    const file = `${genEnvVarsPrelude(envvars, moduleType)}\n${genEnvVarsExports(envvars, moduleType)}`;
    writeFileSync(envVarsPath, file);

    //Lint files
    const eslint = new ESLint({ useEslintrc: true, fix: true });
    const results = await eslint.lintFiles(envVarsPath);
    await ESLint.outputFixes(results);
}

export async function main() {
    await Promise.all([
        writeEnvVarFile(ENVVARS, Platform.BROWSER, "src/envvars.browser.ts"),
        writeEnvVarFile(ENVVARS, Platform.NODE, "src/envvars.ts"),
    ]);
}

main();
