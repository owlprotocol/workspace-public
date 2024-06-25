import { addressZod } from "@owlprotocol/zod-sol";
import { z } from "zod";

export const chainBlockExplorerZod = z.object({
    name: z.string(),
    url: z.string(),
    apiUrl: z.string().optional(),
});

export const chainContractZod = z.object({
    address: addressZod,
    blockCreated: z.number().optional(),
});

export const chainNativeCurrencyZod = z
    .object({
        name: z.string(),
        symbol: z.string(),
        decimals: z.number(),
    })
    .describe("Currency used by chain");

export type ChainRpcUrls = {
    http: readonly string[];
    webSocket?: readonly string[] | undefined;
};

export const chainRpcUrlsZod = z.object({
    http: z.array(z.string()),
    webSocket: z.array(z.string()).optional(),
});

export interface ChainFaucet {
    name: string;
    url: string;
}

export const chainFaucetZod = z.object({
    name: z.string(),
    url: z.string(),
});

export interface ChainBridge {
    name: string;
    url: string;
}

export const chainBridgeZod = z.object({
    name: z.string(),
    url: z.string(),
});

/** Zod for viem chain interface (omit id) */
export const chainZod = z
    .object({
        blockExplorers: z
            .record(z.string(), chainBlockExplorerZod)
            .optional()
            .describe("Collection of block explorers"),
        contracts: z
            .record(
                z.string().describe("contract name"),
                z.union([chainContractZod, z.record(z.string().describe("sourceId"), chainContractZod)]),
            )
            .optional()
            .describe("Collection of contracts"),
        name: z.string(),
        nativeCurrency: chainNativeCurrencyZod,
        rpcUrls: z.record(z.string(), chainRpcUrlsZod).describe("Collection of RPC endpoints"),
        sourceId: z.number().optional().describe("Source Chain ID (ie. the L1 chain)"),
        testnet: z.boolean().optional().describe("Flag for test networks"),
    })
    .describe("viem chain");

/*
//Old interface from ethereum-lists/ThirdWeb
export type ChainIcon = {
    url: string;
    width: number;
    height: number;
    format: string;
};

export type Chain = {
    name: string;
    title?: string;
    chain: string;
    icon?: ChainIcon;
    rpc: readonly string[];
    features?: Readonly<Array<{ name: string }>>;
    faucets?: readonly string[];
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    infoURL?: string;
    shortName: string;
    chainId: number;
    networkId?: number;
    ens?: {
        registry: string;
    };
    explorers?: Readonly<
        Array<{
            name: string;
            url: string;
            icon?: ChainIcon;
            standard: string;
        }>
    >;
    testnet: boolean;
    slug: string;
    slip44?: number;
    status?: string;
    redFlags?: readonly string[];
    parent?: {
        chain: string;
        type: string;
        bridges?: Readonly<Array<{ url: string }>>;
    };
};

// MinimalChain is a subset of Chain with only the fields that are required / non-optional
export type MinimalChain = Pick<
    Chain,
    "name" | "chain" | "rpc" | "nativeCurrency" | "shortName" | "chainId" | "testnet" | "slug" | "icon"
>;

export interface ChainWithData extends Chain {
    readonly rpcThirdWeb?: string;
    readonly rpcAlchemy?: string;
    readonly rpcInfura?: string;
    readonly rpcAnkr?: string;
    readonly rpcPublic?: string;
    readonly rpcDefault?: string;

    readonly wsThirdWeb?: string;
    readonly wsAlchemy?: string;
    readonly wsInfura?: string;
    readonly wsAnkr?: string;
    readonly wsPublic?: string;
    readonly wsDefault?: string;

    readonly explorerEtherscan?: string;
    readonly explorerBlockscout?: string;
    readonly explorer?: string;
    readonly explorerApi?: string;
    readonly explorerApiKey?: string;
}

export interface GetChainWithDataOptions {
    readonly THIRDWEB_API_KEY?: string;
    readonly INFURA_API_KEY?: string;
    readonly ANKR_API_KEY?: string;
    readonly ALCHEMY_API_KEY?: string;
    readonly rpc?: string;
    readonly ws?: string;
    readonly explorer?: string;
    readonly explorerApi?: string;
    readonly explorerApiKey?: string;
}
export function getChainWithData(chain: Chain, options?: GetChainWithDataOptions): ChainWithData {
    const { THIRDWEB_API_KEY, INFURA_API_KEY, ANKR_API_KEY, ALCHEMY_API_KEY, rpc, ws } = options ?? {};

    let rpcThirdWeb = chain.rpc.find((r) => {
        return THIRDWEB_API_KEY && r.startsWith("https://") && r.includes("${THIRDWEB_API_KEY}");
    });
    if (rpcThirdWeb && THIRDWEB_API_KEY) rpcThirdWeb = rpcThirdWeb.replace("${THIRDWEB_API_KEY}", THIRDWEB_API_KEY);

    let wsThirdWeb = chain.rpc.find((r) => {
        return THIRDWEB_API_KEY && r.startsWith("wss://") && r.includes("${THIRDWEB_API_KEY}");
    });
    if (wsThirdWeb && THIRDWEB_API_KEY) wsThirdWeb = wsThirdWeb.replace("${THIRDWEB_API_KEY}", THIRDWEB_API_KEY);

    let rpcInfura = chain.rpc.find((r) => {
        return INFURA_API_KEY && r.startsWith("https://") && r.includes("${INFURA_API_KEY}");
    });
    if (rpcInfura && INFURA_API_KEY) rpcInfura = rpcInfura.replace("${INFURA_API_KEY}", INFURA_API_KEY);

    let wsInfura = chain.rpc.find((r) => {
        return INFURA_API_KEY && r.startsWith("wss://") && r.includes("${INFURA_API_KEY}");
    });
    if (wsInfura && INFURA_API_KEY) wsInfura = wsInfura.replace("${INFURA_API_KEY}", INFURA_API_KEY);

    let rpcAnkr = chain.rpc.find((r) => {
        return ANKR_API_KEY && r.startsWith("https://") && r.includes("${ANKR_API_KEY}");
    });
    if (rpcAnkr && ANKR_API_KEY) rpcAnkr = rpcAnkr.replace("${ANKR_API_KEY}", ANKR_API_KEY);

    let wsAnkr = chain.rpc.find((r) => {
        return ANKR_API_KEY && r.startsWith("wss://") && r.includes("${ANKR_API_KEY}");
    });
    if (wsAnkr && ANKR_API_KEY) wsAnkr = wsAnkr.replace("${ANKR_API_KEY}", ANKR_API_KEY);

    //TODO: Alchemy API Keys are per-app (network) selected string will only be template string
    let rpcAlchemy = chain.rpc.find((r) => {
        return ALCHEMY_API_KEY && r.startsWith("https://") && r.includes("${ALCHEMY_API_KEY}");
    });
    if (rpcAlchemy && ALCHEMY_API_KEY) rpcAlchemy = rpcAlchemy.replace("${ALCHEMY_API_KEY}", ALCHEMY_API_KEY);

    let wsAlchemy = chain.rpc.find((r) => {
        return ALCHEMY_API_KEY && r.startsWith("wss://") && r.includes("${ALCHEMY_API_KEY}");
    });
    if (wsAlchemy && ALCHEMY_API_KEY) wsAlchemy = wsAlchemy.replace("${ALCHEMY_API_KEY}", ALCHEMY_API_KEY);

    //Note: Only secure https supported
    const rpcPublic = chain.rpc.find((r) => {
        return (
            r.startsWith("https://") &&
            !r.includes("${THIRDWEB_API_KEY}") &&
            !r.includes("${INFURA_API_KEY}") &&
            !r.includes("${ANKR_API_KEY}") &&
            !r.includes("${ALCHEMY_API_KEY}")
        );
    });

    //Note: Only secure websocket supported
    const wsPublic = chain.rpc.find((r) => {
        return (
            r.startsWith("wss://") &&
            !r.includes("${THIRDWEB_API_KEY}") &&
            !r.includes("${INFURA_API_KEY}") &&
            !r.includes("${ANKR_API_KEY}") &&
            !r.includes("${ALCHEMY_API_KEY}")
        );
    });

    const rpcDefault = rpc ?? rpcInfura ?? rpcThirdWeb ?? rpcAnkr ?? rpcAlchemy ?? rpcPublic;
    const wsDefault = ws ?? wsInfura ?? wsThirdWeb ?? wsAnkr ?? wsAlchemy ?? wsPublic;

    const explorerEtherscan = chain.explorers?.find((r) => {
        return r.name.toLowerCase().includes("scan");
    })?.url;
    const explorerBlockscout = chain.explorers?.find((r) => {
        return r.name.toLowerCase().includes("scout");
    })?.url;
    const explorer = options?.explorer ?? explorerEtherscan ?? explorerBlockscout;
    const explorerApi = options?.explorerApi;
    const explorerApiKey = options?.explorerApiKey;

    return {
        ...chain,
        rpcThirdWeb,
        wsThirdWeb,
        rpcInfura,
        wsInfura,
        rpcAnkr,
        wsAnkr,
        rpcAlchemy,
        wsAlchemy,
        rpcPublic,
        wsPublic,
        rpcDefault,
        wsDefault,
        explorerEtherscan,
        explorerBlockscout,
        explorer,
        explorerApi,
        explorerApiKey,
    };
}
*/
