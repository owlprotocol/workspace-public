import { TRPCError } from "@trpc/server";
import * as jp from "jsonpath";
import { isEmpty } from "lodash-es";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import crypto from "node:crypto";
import { MetadataTokens } from "../models/tokens/MetadataTokens.js";

export const metadataTokensBaseUriPrefix = `${API_REST_BASE_URL}/metadataTokens`;

/**
 * Get tokens metadata base uri
 * @param id
 * @param baseUri (optional)
 * @returns
 */
export function getMetadataTokensUri(id: string, baseUri?: string): string {
    return `${baseUri ?? metadataTokensBaseUriPrefix}/${id}/`;
}
export const isOwlMetadataTokensBaseUri = (uri: string) => uri.startsWith(metadataTokensBaseUriPrefix);
export const getMetadataTokensIdFromBaseUri = (uri: string, baseUri?: string) =>
    uri.replace(baseUri ?? `${metadataTokensBaseUriPrefix}/`, "").split("/")[0];

export function createMetadataTokensData(
    name: string,
    userId: string,
    tokenMap: Record<string, Record<string, any>> = {},
): MetadataTokens {
    const metadataTokens: MetadataTokens = {
        id: crypto.randomUUID(),
        owner: userId,
        type: "firebase",
        tokenMap: tokenMap,
        name: `${name} tokens metadata`,
    };

    return metadataTokens;
}

/**
 * getJsonPath JSON Path
 * @param any the MetadataTokens object to search in
 * @param jsonPath the JSON path of the data to return
 * @returns the first match of the JSON path of the token's metadata
 */
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
                throw new TRPCError({ message: "Lexical error in JSON path", code: "BAD_REQUEST" });
            }
        }

        throw new TRPCError({ message: `Error parsing JSON path: ${e}`, code: "INTERNAL_SERVER_ERROR" });
    }
}
