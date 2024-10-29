import { GithubRegistry } from "@hyperlane-xyz/registry";
import { Address } from "viem";

type MaybePromise<T> = T | Promise<T> | PromiseLike<T>;

/** Hyperlane Registry Chain Metadata (sdk type inference seems to break) */
export interface HyperlaneChainMetadata {
    chainId: string | number;
    name: string;
    logoUri?: string;
    [key: string]: any;
}

/** Hyperlane Registry getChainAddresses retrurn type with stricter types */
export interface HyperlaneChainAddresses {
    aggregationHook?: Address;
    domainRoutingIsm?: Address;
    domainRoutingIsmFactory?: Address;
    fallbackRoutingHook?: Address;
    interchainAccountIsm?: Address;
    interchainAccountRouter?: Address;
    interchainGasPaymaster?: Address;
    interchainSecurityModule?: Address;
    mailbox?: Address;
    merkleTreeHook?: Address;
    pausableHook?: Address;
    pausableIsm?: Address;
    protocolFee: Address;
    proxyAdmin?: Address;
    staticAggregationHookFactory?: Address;
    staticAggregationIsm?: Address;
    staticAggregationIsmFactory?: Address;
    staticMerkleRootMultisigIsmFactory?: Address;
    staticMerkleRootWeightedMultisigIsmFactory?: Address;
    staticMessageIdMultisigIsmFactory?: Address;
    staticMessageIdWeightedMultisigIsmFactory?: Address;
    storageGasOracle?: Address;
    testRecipient?: Address;
    testTokenRecipient?: Address;
    timelockController?: Address;
    validatorAnnounce?: Address;
    [key: string]: Address | undefined;
}

export interface HyperlaneRegistryData {
    metadata: Record<string, HyperlaneChainMetadata>;
    addresses: Record<string, HyperlaneChainAddresses>;
}

/** Partial IRegistry interface for commond read functionality with better types */
export interface IHyperlaneRegistryRead {
    getChains(): MaybePromise<string[]>;
    getMetadata(): MaybePromise<Record<string, HyperlaneChainMetadata>>;
    getChainMetadata(chainName: string): MaybePromise<HyperlaneChainMetadata | null>;
    getAddresses(): MaybePromise<Record<string, HyperlaneChainAddresses>>;
    getChainAddresses(chainName: string): MaybePromise<HyperlaneChainAddresses | null>;
    getChainLogoUri(chainName: string): Promise<string | null>;
}

/**
 * Create Hyperlane Registry with data
 * @warning Only implements read functionality
 * @returns IRegistryRead
 */
export function createHyperlaneRegistryWithData(data: HyperlaneRegistryData): IHyperlaneRegistryRead {
    return {
        getChains: () => {
            return Object.keys(data.metadata);
        },
        getMetadata: () => {
            return data.metadata;
        },
        getChainMetadata: (chainName: string) => {
            return data.metadata[chainName];
        },
        getChainLogoUri: async (chainName: string) => {
            return data.metadata[chainName].logoUri ?? null;
        },
        getChainAddresses: async (chainName: string) => {
            return data.addresses[chainName] ?? null;
        },
        getAddresses: () => {
            return data.addresses;
        },
    };
}

/** Default Hyperlane Registry URL */
export const REGISTRY_URL = "https://proxy.hyperlane.xyz";

/**
 * Get Hyperlane Registry
 * @param url
 * @returns Hyperlane Registry
 */
export function getHyperlaneRegistry(url = REGISTRY_URL) {
    return new GithubRegistry({
        proxyUrl: url,
    });
}

/** Default Hyperlane Registry */
export const hyperlaneRegistry = getHyperlaneRegistry() as IHyperlaneRegistryRead;
