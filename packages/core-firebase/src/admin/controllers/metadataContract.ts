import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { Address } from "viem";
import { ProjectContractMetadata } from "../../models/projects/ProjectContractMetadata.js";

export const metadataContractBaseUriPrefix = `${API_REST_BASE_URL}/metadata-contract`;

/**
 * Get contract metadata base uri
 * @param id
 * @param baseUri (optional)
 * @returns
 */
export function getMetadataContractURI(chainId: number, address: string, baseUri?: string): string {
    return `${baseUri ?? metadataContractBaseUriPrefix}/${chainId}/${address}`;
}

export function createMetadataContractData(
    address: Address,
    chainId: number,
    name?: string,
    imageUrl?: string,
): ProjectContractMetadata {
    const metadataJson = imageUrl ? { name, image: imageUrl } : { name };
    const metadataContract: ProjectContractMetadata = {
        metadata: metadataJson,
        address,
        chainId,
    };

    return metadataContract;
}
