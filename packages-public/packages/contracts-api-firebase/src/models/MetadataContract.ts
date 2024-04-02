/**
 * The metadata for an NFT contract.
 * `metadataJson` is a JSON object that can returned by a contract's `contractURI` method
 */
export interface MetadataContractData {
    projectId: string;
    // A user defined identifier, not unique
    name: string;
    metadataJson: Record<string, any>;
    ipfsHash?: string;
    type: "ipfs" | "firebase";
}

export interface MetadataContract extends MetadataContractData {
    id: string;
}
