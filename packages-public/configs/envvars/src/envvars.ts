/**
 * Environment variables. We use a hybrid solution that supports both `import.meta.env` for static
 * replacement used by client bundlers (Vite, Webpack...) and `process.env` for NodeJS libraries.
 * @module Environment
 */
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV?: 'development' | 'production' | 'test';
            readonly LOG_LEVEL?: "trace" | "debug" | "info" | "warn" | "error";
            readonly TITLE?: string;
            readonly CORS_PROXY?: string
            readonly PINATA_JWT?: string;
            readonly INFURA_API_KEY?: string
            readonly INFURA_IPFS_PROJECT_ID?: string;
            readonly INFURA_IPFS_PROJECT_SECRET?: string;
            readonly IPFS_URL?: string;
            readonly BYTE4_URL?: string;
            readonly ETHERSCAN_API_KEY?: string;
            readonly LOG_REDUX_ACTIONS?: string;
            readonly GANACHE_RPC?: string;
            readonly ANVIL_RPC?: string
            readonly MAINNET_RPC?: string;
            readonly MAINNET_EXPLORER?: string;
            readonly MAINNET_EXPLORER_API?: string
            readonly GOERLI_RPC?: string;
            readonly GOERLI_EXPLORER?: string;
            readonly GOERLI_EXPLORER_API?: string;
            readonly SEPOLIA_RPC?: string;
            readonly SEPOLIA_EXPLORER?: string;
            readonly SEPOLIA_EXPLORER_API?: string;
            readonly POLYGON_RPC?: string;
            readonly POLYGON_EXPLORER?: string;
            readonly POLYGON_EXPLORER_API?: string;
            readonly POLYGON_MUMBAI_RPC?: string;
            readonly POLYGON_MUMBAI_EXPLORER?: string;
            readonly POLYGON_MUMBAI_EXPLORER_API?: string;
            readonly ARBITRUM_RPC?: string;
            readonly ARBITRUM_EXPLORER?: string;
            readonly ARBITRUM_EXPLORER_API?: string;
            readonly OPTIMISM_RPC?: string;
            readonly OPTIMISM_EXPLORER?: string;
            readonly OPTIMISM_EXPLORER_API?: string;
            readonly AVALANCHE_RPC?: string;
            readonly AVALANCHE_EXPLORER?: string;
            readonly AVALANCHE_EXPLORER_API?: string;
            readonly BSC_RPC?: string;
            readonly BSC_EXPLORER?: string;
            readonly BSC_EXPLORER_API?: string;
            readonly GNOSIS_RPC?: string;
            readonly GNOSIS_EXPLORER?: string;
            readonly GNOSIS_EXPLORER_API?: string;
            readonly ETC_RPC?: string;
            readonly ETC_EXPLORER?: string;
            readonly ETC_EXPLORER_API?: string;
        }
    }
}

declare global {
    interface ImportMetaEnv {
        readonly VITE_NODE_ENV?: 'development' | 'production' | 'test'
        readonly VITE_LOG_LEVEL?: "trace" | "debug" | "info" | "warn" | "error";
        readonly VITE_TITLE?: string;
        readonly VITE_CORS_PROXY?: string
        readonly VITE_INFURA_API_KEY?: string
        readonly VITE_INFURA_IPFS_PROJECT_ID?: string;
        readonly VITE_INFURA_IPFS_PROJECT_SECRET?: string;
        readonly VITE_PINATA_JWT?: string;
        readonly VITE_IPFS_URL?: string;
        readonly VITE_BYTE4_URL?: string;
        readonly VITE_ETHERSCAN_API_KEY?: string;
        readonly VITE_LOG_REDUX_ACTIONS?: string;
        readonly VITE_GANACHE_RPC?: string;
        readonly VITE_ANVIL_RPC?: string
        readonly VITE_MAINNET_RPC?: string;
        readonly VITE_MAINNET_EXPLORER?: string;
        readonly VITE_MAINNET_EXPLORER_API?: string
        readonly VITE_GOERLI_RPC?: string;
        readonly VITE_GOERLI_EXPLORER?: string;
        readonly VITE_GOERLI_EXPLORER_API?: string;
        readonly VITE_SEPOLIA_RPC?: string;
        readonly VITE_SEPOLIA_EXPLORER?: string;
        readonly VITE_SEPOLIA_EXPLORER_API?: string;
        readonly VITE_POLYGON_RPC?: string;
        readonly VITE_POLYGON_EXPLORER?: string;
        readonly VITE_POLYGON_EXPLORER_API?: string;
        readonly VITE_POLYGON_MUMBAI_RPC?: string;
        readonly VITE_POLYGON_MUMBAI_EXPLORER?: string;
        readonly VITE_POLYGON_MUMBAI_EXPLORER_API?: string;
        readonly VITE_ARBITRUM_RPC?: string;
        readonly VITE_ARBITRUM_EXPLORER?: string;
        readonly VITE_ARBITRUM_EXPLORER_API?: string;
        readonly VITE_OPTIMISM_RPC?: string;
        readonly VITE_OPTIMISM_EXPLORER?: string;
        readonly VITE_OPTIMISM_EXPLORER_API?: string;
        readonly VITE_AVALANCHE_RPC?: string;
        readonly VITE_AVALANCHE_EXPLORER?: string;
        readonly VITE_AVALANCHE_EXPLORER_API?: string;
        readonly VITE_BSC_RPC?: string;
        readonly VITE_BSC_EXPLORER?: string;
        readonly VITE_BSC_EXPLORER_API?: string;
        readonly VITE_GNOSIS_RPC?: string;
        readonly VITE_GNOSIS_EXPLORER?: string;
        readonly VITE_GNOSIS_EXPLORER_API?: string;
        readonly VITE_ETC_RPC?: string;
        readonly VITE_ETC_EXPLORER?: string;
        readonly VITE_ETC_EXPLORER_API?: string;
    }
}

const isClient = () => typeof window !== 'undefined';

import dotenv from "dotenv";
if (!isClient()) {
    dotenv.config()
}

export const NODE_ENV = import.meta.env ? import.meta.env.VITE_NODE_ENV : process.env.NODE_ENV ?? "development"
export const LOG_LEVEL = import.meta.env ? import.meta.env.VITE_LOG_LEVEL : process.env.LOG_LEVEL ?? (
    (NODE_ENV === "development" || NODE_ENV === "test") ? "debug" : "warn"
)

/** CORS Proxy Endpoint */
export const TITLE = import.meta.env ? import.meta.env.VITE_TITLE : process.env.TITLE
export const CORS_PROXY = import.meta.env ? import.meta.env.VITE_CORS_PROXY : process.env.CORS_PROXY

//Default Public Keys Hard-coded
//WARNING: These keys are insecure and are meant for ease of use in a testing environment.
//WARNING: These keys are subject to deletion in the event of abuse.
export const INFURA_API_KEY_PUBLIC = undefined //"f47a5c2dfc1f4c4385f6372fade38618"
export const INFURA_IPFS_PROJECT_ID_PUBLIC = "2OAhenU1T1fxTGyQMTTFDwdyW5p"
export const INFURA_IPFS_PROJECT_SECRET_PUBLIC = "8ffddfdc95f32ea7aa43ee3ba9d2d603"
export const PINATA_JWT_PUBLIC = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlMzMxZDljZC05MDk4LTRkOTctOGI4Zi03ODY3NTFkZTQxYjgiLCJlbWFpbCI6Imxlby52aWduYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzZmYTgwY2I2ZWRmMTkxNTVjODUiLCJzY29wZWRLZXlTZWNyZXQiOiI2YTM1MTkxYThjOTMxMzU3MGFmOGU3NGEyZWQzZmVhYWYxYjFhZDUxY2FkY2ZkNGFhZTc1YjNjMmQ0YzQwMWI3IiwiaWF0IjoxNjgxMDk1ODM3fQ.As9jjfv7BoPF9pTY_Lqj67iMWZXp9EIoGs50zcXaF5Y"

/**
 * Infura API Project Id.
 * Used to defive default Infura connection uri. */
//Default "Public" Infura Key
export const INFURA_API_KEY = import.meta.env ? import.meta.env.VITE_INFURA_API_KEY : process.env.INFURA_API_KEY ?? INFURA_API_KEY_PUBLIC
//Infura uses Basic Auth for IPFS
//https://infura.io/docs/ipfs#section/Getting-Started/Create-your-Infura-IPFS-project
//TODO: Add basic auth support
/** Infura Project Id for IPFS API */
//Default "Public" Infura Key
export const INFURA_IPFS_PROJECT_ID = import.meta.env ? import.meta.env.VITE_INFURA_IPFS_PROJECT_ID : process.env.INFURA_IPFS_PROJECT_ID ?? INFURA_IPFS_PROJECT_ID_PUBLIC
/** Infura Basic Auth for IPFS */
//Default "Public" Infura Key
export const INFURA_IPFS_PROJECT_SECRET = import.meta.env ? import.meta.env.VITE_INFURA_IPFS_PROJECT_SECRET : process.env.INFURA_IPFS_PROJECT_SECRET ?? INFURA_IPFS_PROJECT_SECRET_PUBLIC
export const PINATA_JWT = import.meta.env ? import.meta.env.VITE_PINATA_JWT : process.env.PINATA_JWT ?? PINATA_JWT_PUBLIC;

/** Etherscan API Key */
export const ETHERSCAN_API_KEY = import.meta.env ? import.meta.env.VITE_ETHERSCAN_API_KEY : process.env.ETHERSCAN_API_KEY
export const LOG_REDUX_ACTIONS = import.meta.env ? import.meta.env.VITE_LOG_REDUX_ACTIONS : process.env.LOG_REDUX_ACTIONS

/** Local Ganache Blockchain */
export const GANACHE_RPC = import.meta.env ? import.meta.env.VITE_GANACHE_RPC : process.env.GANACHE_RPC ?? "ws://localhost:8545"
export const ANVIL_RPC = import.meta.env ? import.meta.env.VITE_ANVIL_RPC : process.env.ANVIL_RPC ?? "ws://localhost:8545"

/** Ethereum Mainnet Blockchain */
export const MAINNET_RPC = import.meta.env ? import.meta.env.VITE_MAINNET_RPC : process.env.MAINNET_RPC ?? (INFURA_API_KEY ? `wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}` : undefined)
export const MAINNET_EXPLORER = import.meta.env ? import.meta.env.VITE_MAINNET_EXPLORER : process.env.MAINNET_EXPLORER ?? "https://etherscan.io/";
export const MAINNET_EXPLORER_API = import.meta.env ? import.meta.env.VITE_MAINNET_EXPLORER_API : process.env.MAINNET_EXPLORER_API ?? "https://api.etherscan.io/api";

export const GOERLI_RPC = import.meta.env ? import.meta.env.VITE_GOERLI_RPC : process.env.GOERLI_RPC ?? (INFURA_API_KEY ? `wss://goerli.infura.io/ws/v3/${INFURA_API_KEY}` : undefined)
export const GOERLI_EXPLORER = import.meta.env ? import.meta.env.VITE_GOERLI_EXPLORER : process.env.GOERLI_EXPLORER ?? "https://goerli.etherscan.io/";
export const GOERLI_EXPLORER_API = import.meta.env ? import.meta.env.VITE_GOERLI_EXPLORER_API : process.env.GOERLI_EXPLORER_API ?? "https://api-goerli.etherscan.io/api";

export const SEPOLIA_RPC = import.meta.env ? import.meta.env.VITE_SEPOLIA_RPC : process.env.SEPOLIA_RPC ?? (INFURA_API_KEY ? `wss://sepolia.infura.io/ws/v3/${INFURA_API_KEY}` : undefined)
export const SEPOLIA_EXPLORER = import.meta.env ? import.meta.env.VITE_SEPOLIA_EXPLORER : process.env.SEPOLIA_EXPLORER ?? "https://sepolia.etherscan.io/";
export const SEPOLIA_EXPLORER_API = import.meta.env ? import.meta.env.VITE_SEPOLIA_EXPLORER_API : process.env.SEPOLIA_EXPLORER_API ?? "https://api-sepolia.etherscan.io/api";

export const POLYGON_RPC = import.meta.env ? import.meta.env.VITE_POLYGON_RPC : process.env.POLYGON_RPC ?? (INFURA_API_KEY ? `wss://polygon-mainnet.infura.io/ws/v3/${INFURA_API_KEY}` : undefined)
export const POLYGON_EXPLORER = import.meta.env ? import.meta.env.VITE_POLYGON_EXPLORER : process.env.POLYGON_EXPLORER ?? "https://polygonscan.com/";
export const POLYGON_EXPLORER_API = import.meta.env ? import.meta.env.VITE_POLYGON_EXPLORER_API : process.env.POLYGON_EXPLORER_API ?? "https://api.polygonscan.com/api";

export const POLYGON_MUMBAI_RPC = import.meta.env ? import.meta.env.VITE_POLYGON_MUMBAI_RPC : process.env.POLYGON_MUMBAI_RPC ?? (INFURA_API_KEY ? `wss://polygon-mumbai.infura.io/ws/v3/${INFURA_API_KEY}` : undefined)
export const POLYGON_MUMBAI_EXPLORER = import.meta.env ? import.meta.env.VITE_POLYGON_MUMBAI_EXPLORER : process.env.POLYGON_MUMBAI_EXPLORER ?? "https://testnet.polygonscan.com/";
export const POLYGON_MUMBAI_EXPLORER_API = import.meta.env ? import.meta.env.VITE_POLYGON_MUMBAI_EXPLORER_API : process.env.POLYGON_MUMBAI_EXPLORER_API ?? "https://api-testnet.polygonscan.com/api";

export const ARBITRUM_RPC = import.meta.env ? import.meta.env.VITE_ARBITRUM_RPC : process.env.ARBITRUM_RPC ?? (INFURA_API_KEY ? `wss://arbitrum-mainnet.infura.io/ws/v3/${INFURA_API_KEY}` : undefined)
export const ARBITRUM_EXPLORER = import.meta.env ? import.meta.env.VITE_ARBITRUM_EXPLORER : process.env.ARBITRUM_EXPLORER ?? "https://arbiscan.io/";
export const ARBITRUM_EXPLORER_API = import.meta.env ? import.meta.env.VITE_ARBITRUM_EXPLORER_API : process.env.ARBITRUM_EXPLORER_API ?? "https://api.arbiscan.io/api";

export const OPTIMISM_RPC = import.meta.env ? import.meta.env.VITE_OPTIMISM_RPC : process.env.OPTIMISM_RPC ?? (INFURA_API_KEY ? `wss://optimism-mainnet.infura.io/ws/v3/${INFURA_API_KEY}` : undefined)
export const OPTIMISM_EXPLORER = import.meta.env ? import.meta.env.VITE_OPTIMISM_EXPLORER : process.env.OPTIMISM_EXPLORER ?? "https://optimistic.etherscan.io/";
export const OPTIMISM_EXPLORER_API = import.meta.env ? import.meta.env.VITE_OPTIMISM_EXPLORER_API : process.env.OPTIMISM_EXPLORER_API ?? "https://api-optimistic.etherscan.io/api";

export const AVALANCHE_RPC = import.meta.env ? import.meta.env.VITE_AVALANCHE_RPC : process.env.AVALANCHE_RPC
export const AVALANCHE_EXPLORER = import.meta.env ? import.meta.env.VITE_AVALANCHE_EXPLORER : process.env.AVALANCHE_EXPLORER ?? "https://snowtrace.io";
export const AVALANCHE_EXPLORER_API = import.meta.env ? import.meta.env.VITE_AVALANCHE_EXPLORER_API : process.env.AVALANCHE_EXPLORER_API ?? "https://api.snowtrace.io/api";

export const BSC_RPC = import.meta.env ? import.meta.env.VITE_BSC_RPC : process.env.BSC_RPC
export const BSC_EXPLORER = import.meta.env ? import.meta.env.VITE_BSC_EXPLORER : process.env.BSC_EXPLORER ?? "https://bscscan.com";
export const BSC_EXPLORER_API = import.meta.env ? import.meta.env.VITE_BSC_EXPLORER_API : process.env.BSC_EXPLORER_API ?? "https://api.bscscan.com/api";

export const GNOSIS_RPC = import.meta.env ? import.meta.env.VITE_GNOSIS_RPC : process.env.GNOSIS_RPC
export const GNOSIS_EXPLORER = import.meta.env ? import.meta.env.VITE_GNOSIS_EXPLORER : process.env.GNOSIS_EXPLORER ?? "https://blockscout.com/xdai/mainnet";
export const GNOSIS_EXPLORER_API = import.meta.env ? import.meta.env.VITE_GNOSIS_EXPLORER_API : process.env.GNOSIS_EXPLORER_API ?? "https://api.blockscout.com/xdai/mainnet/api";

export const ETC_RPC = import.meta.env ? import.meta.env.VITE_ETC_RPC : process.env.ETC_RPC
export const ETC_EXPLORER = import.meta.env ? import.meta.env.VITE_ETC_EXPLORER : process.env.ETC_EXPLORER ?? "https://blockscout.com/etc/mainnet";
export const ETC_EXPLORER_API = import.meta.env ? import.meta.env.VITE_ETC_EXPLORER_API : process.env.ETC_EXPLORER_API ?? "https://api.blockscout.com/etc/mainnet/api";

//IPFS

/** IPFS RPC */
export const IPFS_URL = import.meta.env ? import.meta.env.VITE_IPFS_URL : process.env.IPFS_URL ?? "http://localhost:5001";
/** 4byte.directory API */
export const BYTE4_URL = import.meta.env ? import.meta.env.VITE_BYTE4_URL : process.env.BYTE4_URL ?? "https://www.4byte.directory/api/v1";
