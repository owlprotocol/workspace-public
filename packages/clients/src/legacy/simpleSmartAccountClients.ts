import { type Chain, type Address } from "viem";
import { entryPoint07Address } from "viem/account-abstraction";

import { createSmartAccountClient, SmartAccountClient } from "permissionless/clients";
import { createPimlicoClient } from "permissionless/clients/pimlico";

import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { getAdminSimpleSmartAccount, getUserSimpleSmartAccount } from "./simpleSmartAccounts.js";
import { getOwlUserRpcTransport, Auth, getOwlAdminRpcTransport } from "./transports.js";

export async function getUserSimpleSmartAccountClient(
    jwt: string,
    projectId: string,
    chain: Chain,
    owlApiRestBaseUrl = API_REST_BASE_URL,
    factoryAddress: Address = "0xe7A78BA9be87103C317a66EF78e6085BD74Dd538",
): Promise<SmartAccountClient> {
    const simpleSmartAccount = await getUserSimpleSmartAccount(
        jwt,
        projectId,
        chain,
        owlApiRestBaseUrl,
        factoryAddress,
    );

    const owlRpcTransport = getOwlUserRpcTransport(jwt, projectId, chain.id, owlApiRestBaseUrl);

    const paymasterClient = createPimlicoClient({
        transport: owlRpcTransport,
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7",
        },
    });

    return createSmartAccountClient({
        account: simpleSmartAccount,
        chain,
        bundlerTransport: owlRpcTransport,
        paymaster: paymasterClient,
        userOperation: {
            estimateFeesPerGas: async () => (await paymasterClient.getUserOperationGasPrice()).fast,
        },
    });
}

export async function getAdminSimpleSmartAccountClient(
    auth: Auth,
    projectId: string,
    chain: Chain,
    owlApiRestBaseUrl = API_REST_BASE_URL,
    factoryAddress: Address = "0xe7A78BA9be87103C317a66EF78e6085BD74Dd538",
): Promise<SmartAccountClient> {
    const simpleSmartAccount = await getAdminSimpleSmartAccount(
        auth,
        projectId,
        chain,
        owlApiRestBaseUrl,
        factoryAddress,
    );

    const owlRpcTransport = getOwlAdminRpcTransport(auth, projectId, chain.id, owlApiRestBaseUrl);

    const paymasterClient = createPimlicoClient({
        transport: owlRpcTransport,
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7",
        },
    });

    return createSmartAccountClient({
        account: simpleSmartAccount,
        chain,
        bundlerTransport: owlRpcTransport,
        paymaster: paymasterClient,
        userOperation: {
            estimateFeesPerGas: async () => (await paymasterClient.getUserOperationGasPrice()).fast,
        },
    });
}
