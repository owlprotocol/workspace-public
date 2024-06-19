import { http } from "viem";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { getOwlAdminRpcUrl, getOwlAdminSignUrl, getOwlRpcUrl, getOwlUserRpcUrl, getOwlUserSignUrl } from "./rpcUrls.js";

export type Auth = { jwt: string; apiKey?: never } | { apiKey: string; jwt?: never };

export const getJwtAuthHeaders = (jwt: string) => ({ authorization: `Bearer ${jwt}` });

export const getAuthHeaders = (auth: Auth) => {
    if (auth.apiKey) {
        return { "x-api-key": auth.apiKey };
    }

    // From type definition, jwt has to be defined
    return getJwtAuthHeaders(auth.jwt!);
};

export const getOwlRpcTransport = (chainId: number, owlApiRestBaseUrl = API_REST_BASE_URL) =>
    http(getOwlRpcUrl(chainId, owlApiRestBaseUrl));

export const getOwlUserRpcTransport = (
    jwt: string,
    projectId: string,
    chainId: number,
    owlApiRestBaseUrl = API_REST_BASE_URL,
) =>
    http(getOwlUserRpcUrl(projectId, chainId, owlApiRestBaseUrl), {
        fetchOptions: { headers: getJwtAuthHeaders(jwt) },
    });

export const getOwlUserSignTransport = (jwt: string, projectId: string, owlApiRestBaseUrl = API_REST_BASE_URL) =>
    http(getOwlUserSignUrl(projectId, owlApiRestBaseUrl), {
        fetchOptions: { headers: getJwtAuthHeaders(jwt) },
    });

export const getOwlAdminRpcTransport = (
    auth: Auth,
    projectId: string,
    chainId: number,
    owlApiRestBaseUrl = API_REST_BASE_URL,
) =>
    http(getOwlAdminRpcUrl(projectId, chainId, owlApiRestBaseUrl), {
        fetchOptions: { headers: getAuthHeaders(auth) },
    });

export const getOwlAdminSignTransport = (auth: Auth, projectId: string, owlApiRestBaseUrl = API_REST_BASE_URL) =>
    http(getOwlAdminSignUrl(projectId, owlApiRestBaseUrl), {
        fetchOptions: { headers: getAuthHeaders(auth) },
    });
