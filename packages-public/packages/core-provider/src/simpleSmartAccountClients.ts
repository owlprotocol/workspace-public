import { ENTRYPOINT_ADDRESS_V07, type SmartAccountClient, createSmartAccountClient } from "permissionless";
import { type Chain, type HttpTransport, type Address } from "viem";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { getAdminSimpleSmartAccount, getUserSimpleSmartAccount } from "./simpleSmartAccounts.js";
import { getOwlUserRpcTransport, Auth, getOwlAdminRpcTransport } from "./transports.js";

export async function getUserSimpleSmartAccountClient(
    jwt: string,
    projectId: string,
    chain: Chain,
    owlApiRestBaseUrl = API_REST_BASE_URL,
    factoryAddress: Address = "0xe7A78BA9be87103C317a66EF78e6085BD74Dd538",
): Promise<SmartAccountClient<ENTRYPOINT_ADDRESS_V07_TYPE, HttpTransport, typeof chain>> {
    const simpleSmartAccount = await getUserSimpleSmartAccount(
        jwt,
        projectId,
        chain,
        owlApiRestBaseUrl,
        factoryAddress,
    );

    const owlRpcTransport = getOwlUserRpcTransport(jwt, projectId, chain.id, owlApiRestBaseUrl);

    const paymasterClient = createPimlicoPaymasterClient({
        transport: owlRpcTransport,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    });

    return createSmartAccountClient({
        account: simpleSmartAccount,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        chain,
        bundlerTransport: owlRpcTransport,
        middleware: {
            sponsorUserOperation: paymasterClient.sponsorUserOperation,
        },
    });
}

export async function getAdminSimpleSmartAccountClient(
    auth: Auth,
    projectId: string,
    chain: Chain,
    owlApiRestBaseUrl = API_REST_BASE_URL,
    factoryAddress: Address = "0xe7A78BA9be87103C317a66EF78e6085BD74Dd538",
): Promise<SmartAccountClient<ENTRYPOINT_ADDRESS_V07_TYPE, HttpTransport, typeof chain>> {
    const simpleSmartAccount = await getAdminSimpleSmartAccount(
        auth,
        projectId,
        chain,
        owlApiRestBaseUrl,
        factoryAddress,
    );

    const owlRpcTransport = getOwlAdminRpcTransport(auth, projectId, chain.id, owlApiRestBaseUrl);

    const paymasterClient = createPimlicoPaymasterClient({
        transport: owlRpcTransport,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
    });

    return createSmartAccountClient({
        account: simpleSmartAccount,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        chain,
        bundlerTransport: owlRpcTransport,
        middleware: {
            sponsorUserOperation: paymasterClient.sponsorUserOperation,
        },
    });
}
