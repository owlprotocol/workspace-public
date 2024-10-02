import { API_REST_BASE_URL } from "@owlprotocol/envvars";

export const getOwlRpcUrl = (chainId: number, owlApiRestBaseUrl = API_REST_BASE_URL) =>
    `${owlApiRestBaseUrl}/network/${chainId}/rpc`;

export const getOwlUserRpcUrl = (projectId: string, chainId: number, owlApiRestBaseUrl = API_REST_BASE_URL) =>
    `${owlApiRestBaseUrl}/project/${projectId}/network/${chainId}/userRpc`;

export const getOwlUserSignUrl = (projectId: string, owlApiRestBaseUrl = API_REST_BASE_URL) =>
    `${owlApiRestBaseUrl}/project/${projectId}/userSignRpc`;

export const getOwlAdminRpcUrl = (projectId: string, chainId: number, owlApiRestBaseUrl = API_REST_BASE_URL) =>
    `${owlApiRestBaseUrl}/project/${projectId}/network/${chainId}/adminRpc`;

export const getOwlAdminSignUrl = (projectId: string, owlApiRestBaseUrl = API_REST_BASE_URL) =>
    `${owlApiRestBaseUrl}/project/${projectId}/adminSignRpc`;
