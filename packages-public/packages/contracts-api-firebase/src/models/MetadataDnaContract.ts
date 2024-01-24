import { NFTGenerativeTrait } from "@owlprotocol/nft-sdk";
import { MetadataContractData } from "./MetadataContract.js";

/**
 * The metadata for an NFT contract with DNA.
 * `metadataJson` is a JSON object that can returned by a contract's `contractURI` method
 */
export interface MetadataDnaContractData extends MetadataContractData {
    metadataJson: {
        traits: NFTGenerativeTrait[];
        children?: Record<string, any>;
        generatedImageType?: "png" | "svg";
        name: string;
        [key: string]: any;
    };
}

export interface MetadataDnaContract extends MetadataDnaContractData {
    id: string;
}
