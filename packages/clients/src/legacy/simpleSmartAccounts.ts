import { type Address, type Chain, createPublicClient } from "viem";
import { signerToSimpleSmartAccount } from "permissionless/accounts";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless/utils";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { type Auth, getOwlRpcTransport, getOwlUserRpcTransport } from "./transports.js";
import { createAdminLocalAccount, createUserLocalAccount } from "./localAccounts.js";

export async function getUserSimpleSmartAccount(
    jwt: string,
    projectId: string,
    chain: Chain,
    owlApiRestBaseUrl = API_REST_BASE_URL,
    factoryAddress: Address = "0xe7A78BA9be87103C317a66EF78e6085BD74Dd538",
) {
    const publicClient = createPublicClient({
        chain,
        transport: getOwlUserRpcTransport(jwt, projectId, chain.id, owlApiRestBaseUrl),
    });

    const localClient = await createUserLocalAccount({ jwt, projectId }, owlApiRestBaseUrl);

    return signerToSimpleSmartAccount(publicClient, {
        signer: localClient,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        factoryAddress,
    });
}

export async function getAdminSimpleSmartAccount(
    auth: Auth,
    projectId: string,
    chain: Chain,
    owlApiRestBaseUrl = API_REST_BASE_URL,
    factoryAddress: Address = "0xe7A78BA9be87103C317a66EF78e6085BD74Dd538",
) {
    const publicClient = createPublicClient({
        chain,
        transport: getOwlRpcTransport(chain.id, owlApiRestBaseUrl),
    });

    const localClient = await createAdminLocalAccount(
        {
            auth,
            projectId,
        },
        owlApiRestBaseUrl,
    );

    return signerToSimpleSmartAccount(publicClient, {
        signer: localClient,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        factoryAddress,
    });
}
