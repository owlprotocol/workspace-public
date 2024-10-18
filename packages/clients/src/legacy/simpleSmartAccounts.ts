import { type Address, type Chain, createPublicClient } from "viem";
import { entryPoint07Address } from "viem/account-abstraction";

import { toSimpleSmartAccount, ToSimpleSmartAccountReturnType } from "permissionless/accounts";

import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { getSimpleAccountAddress } from "@owlprotocol/contracts-account-abstraction/SimpleAccount";
import { type Auth, getOwlRpcTransport, getOwlUserRpcTransport } from "./transports.js";
import { createAdminLocalAccount, createUserLocalAccount } from "./localAccounts.js";

export async function getUserSimpleSmartAccount(
    jwt: string,
    projectId: string,
    chain: Chain,
    owlApiRestBaseUrl = API_REST_BASE_URL,
    factoryAddress: Address = "0xe7A78BA9be87103C317a66EF78e6085BD74Dd538",
): Promise<ToSimpleSmartAccountReturnType<"0.7">> {
    const publicClient = createPublicClient({
        chain,
        transport: getOwlUserRpcTransport(jwt, projectId, chain.id, owlApiRestBaseUrl),
    });

    const localClient = await createUserLocalAccount({ jwt, projectId }, owlApiRestBaseUrl);

    return toSimpleSmartAccount({
        client: publicClient,
        owner: localClient,
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7",
        },
        factoryAddress,
    });
}

export async function getAdminSimpleSmartAccount(
    auth: Auth,
    projectId: string,
    chain: Chain,
    owlApiRestBaseUrl = API_REST_BASE_URL,
    factoryAddress: Address = "0xe7A78BA9be87103C317a66EF78e6085BD74Dd538",
): Promise<ToSimpleSmartAccountReturnType<"0.7">> {
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

    return toSimpleSmartAccount({
        client: publicClient,
        owner: localClient,
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7",
        },
        factoryAddress,
        address: getSimpleAccountAddress({ owner: localClient.address }),
    });
}
