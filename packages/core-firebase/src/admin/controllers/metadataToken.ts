// import * as jp from "jsonpath";
// import { isEmpty } from "lodash-es";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";

export const metadataTokenBaseUriPrefix = `${API_REST_BASE_URL}/metadata-token`;

/**
 * Get tokens metadata base uri
 * @param id
 * @param baseUri (optional)
 * @returns
 */
export function getMetadataTokenUri(chainId: number, address: string, baseUri?: string): string {
    return `${baseUri ?? metadataTokenBaseUriPrefix}/${chainId}/${address}/`;
}
export const isOwlMetadataTokenBaseUri = (uri: string) => uri.startsWith(metadataTokenBaseUriPrefix);

/**
 * getJsonPath JSON Path
 * @param any the MetadataTokens object to search in
 * @param jsonPath the JSON path of the data to return
 * @returns the first match of the JSON path of the token's metadata
 */
/*
export function getJsonPath(item: any, jsonPath: string): any {
    if (isEmpty(item)) {
        // Don't bother if the object is empty
        return item;
    }

    if (jsonPath === "") {
        // Return the entrie object if no path is specified
        return item;
    }

    try {
        return jp.value(item, jsonPath);
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.startsWith("Lexical error")) {
                throw new Error("Lexical error in JSON path");
            }
        }

        throw new Error(`Error parsing JSON path: ${e}`);
    }
}
*/
