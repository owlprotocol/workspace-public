import type { ChainWithData } from "@owlprotocol/chains";

/**
 * Network config for public backend (we don't use our api keys to templatize)
 */
export interface NetworkReadOnly extends ChainWithData {
    readonly id: string;
    /** Network enabled or not */
    readonly enabled: boolean;
    /** Network rank sorting in terms of relevance, lower = higher priority in search result */
    readonly rank: number;
    readonly default: boolean;
}

/**
 * Network config for private backend (we use our api keys to templatize so no need for envvars)
 */
export interface NetworkPrivate extends ChainWithData {
    readonly id: string;
    /** Network enabled or not */
    readonly enabled: boolean;
    /** Network rank sorting in terms of relevance, lower = higher priority in search result */
    readonly rank: number;
}

/**
 * Pre-signed create2 factory transaction for network
 */
export interface NetworkCreate2FactoryTransaction {
    readonly id: string;
    /** Pre-signed Create2Factory deploy transaction */
    readonly tx: string;
}
