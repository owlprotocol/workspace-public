import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { MetadataContractData } from "../models/MetadataContract.js";

export const metadataContractBaseUriPrefix = `${API_REST_BASE_URL}/metadata/contract`;

/**
 * Get contract metadata base uri
 * @param id
 * @param baseUri (optional)
 * @returns
 */
export function getMetadataContractURI(id: string, baseUri?: string): string {
    return `${baseUri ?? metadataContractBaseUriPrefix}/${id}`;
}

export function createMetadataContractData(name: string, userId: string, imageUrl?: string): MetadataContractData {
    const metadataJson = imageUrl ? { name, image: imageUrl } : { name };
    const metadataContract: MetadataContractData = {
        owner: userId,
        metadataJson: metadataJson,
        type: "firebase",
        name: name,
    };

    return metadataContract;
}
