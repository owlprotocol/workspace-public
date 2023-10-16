/**
 * Generic Contract-level metadata. See https://docs.opensea.io/docs/contract-level-metadata
 **/
export interface ContractMetadataData {
    /** Contract name */
    readonly name?: string;
    /** Contract description */
    readonly description?: string;
    /** Image url */
    readonly image?: string;
    /** Relevant url to read contract information */
    readonly external_url?: string;
}

export interface ContractMetadata extends ContractMetadataData {
    readonly id: string;
}

/** Specific metadata for collection contracts */
export interface CollectionMetadataData extends ContractMetadata {
    /** Indicates a 1/10000 seller fee 100 = 1%. */
    readonly seller_fee_basis_points?: number;
    /** Where seller fees will be paid to. */
    readonly fee_recipient?: string;
}

export interface CollectionMetadata extends CollectionMetadataData {
    readonly id: string;
}
