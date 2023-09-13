/**
 * The metadata for an NFT contract.
 * `metadataJson` is a JSON object that can returned by a contract's `contractURI` method
 */
export interface MetadataContract {
    // The userId of the owner
    readonly owner: string;
    // A user defined identifier, not unique
    name: string;
    metadataJson: Record<string, any>;
    ipfsHash?: string;
    type: "ipfs" | "firebase";
}
