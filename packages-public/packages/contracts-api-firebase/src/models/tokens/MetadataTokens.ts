/**
 * The metadata for a collection of tokens.
 * `tokenMap` is a map of token id token metadata. Each item in the `tokenMap` will map to one file on IPFS, whose name is the key, and whose content is the value
 */
export interface MetadataTokensData {
    // The userId of the owner
    owner: string;
    // A user defined identifier, not unique
    name: string;
    tokenMap: Record<string, Record<string, any>>;
    // The hash of the folder containing the token metadata files
    ipfsHash?: string;
    type: "ipfs" | "firebase";
}

export interface MetadataTokens extends MetadataTokensData {
    id: string;
}
