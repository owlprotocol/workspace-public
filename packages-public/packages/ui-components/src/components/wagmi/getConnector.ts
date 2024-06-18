import { createConnector } from "@wagmi/core";
import { LoadedClerk } from "@clerk/types";
import {
    type EIP1193RequestFn,
    type WalletClient,
    type Transport,
    createWalletClient,
    http,
    getAddress,
} from "viem";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";

export interface ProviderWithChainId {
    request: EIP1193RequestFn;
    chainId: number;
}

export interface OwlConnectorParameters {
    owlClerk: LoadedClerk;
    projectId: string;
    owlApiRestBaseUrl?: string;
}

export const getOwlUserRpcUrl = (
    projectId: string,
    chainId: number,
    owlApiRestBaseUrl = API_REST_BASE_URL
) => `${owlApiRestBaseUrl}/project/${projectId}/network/${chainId}/userRpc`;

export const getOwlTransport = (
    jwt: string,
    projectId: string,
    chainId: number,
    owlApiRestBaseUrl = API_REST_BASE_URL
) =>
    http(getOwlUserRpcUrl(projectId, chainId, owlApiRestBaseUrl), {
        fetchOptions: { headers: { authorization: `Bearer ${jwt}` } },
    });

export async function getOwlJwt(owlClerk: LoadedClerk): Promise<string> {
    if (!owlClerk.session) {
        owlClerk.openSignIn();
        throw new Error("User not signed in");
    }

    let jwt: string | null;
    try {
        jwt = await owlClerk.session.getToken({ template: "email" });
    } catch (e) {
        owlClerk.openSignIn();
        throw new Error("User needs to sign in again");
    }

    if (jwt === null) {
        owlClerk.openSignIn();
        throw new Error("User needs to sign in again");
    }

    return jwt;
}

getConnector.type = "owlProtocol" as const;
export function getConnector({
    owlClerk,
    projectId,
    owlApiRestBaseUrl,
}: OwlConnectorParameters) {
    let provider: ProviderWithChainId;
    let walletClient: WalletClient;
    let transport: Transport;

    return createConnector<ProviderWithChainId>((config) => ({
        id: "OwlConnector",
        name: "Owl Protocol Connector",
        type: "owlProtocol",
        isAuthorized: async () => !!owlClerk.user,
        async getProvider({ chainId } = {}): Promise<ProviderWithChainId> {
            if (chainId) {
                const jwt = await getOwlJwt(owlClerk);

                const chain = config.chains.find((c) => c.id === chainId);
                if (!chain) {
                    throw Error(`Chain id ${chainId} not found in connector`);
                }

                // TODO: create getOwlTransport function
                transport = getOwlTransport(
                    jwt,
                    projectId,
                    chainId,
                    owlApiRestBaseUrl
                );
                walletClient = createWalletClient({
                    chain,
                    transport,
                });
                provider = { request: walletClient.request, chainId };
            } else if (!provider) {
                const jwt = await getOwlJwt(owlClerk);

                const firstConfigChain = config.chains[0];
                const chainId = firstConfigChain.id;
                transport = getOwlTransport(
                    jwt,
                    projectId,
                    chainId,
                    owlApiRestBaseUrl
                );
                walletClient = createWalletClient({
                    chain: firstConfigChain,
                    transport,
                });
                provider = { request: walletClient.request, chainId };
            }

            return provider;
        },
        async connect({ chainId } = {}) {
            const provider = await this.getProvider({ chainId });

            const accounts = (
                (await provider.request({
                    method: "eth_requestAccounts",
                })) as string[]
            ).map((x) => getAddress(x));

            chainId = provider.chainId;

            return { accounts, chainId };
        },
        disconnect: async () => {
            await owlClerk.signOut();
        },
        async getAccounts() {
            const provider = await this.getProvider();
            return (
                (await provider.request({
                    method: "eth_accounts",
                })) as string[]
            ).map((x) => getAddress(x));
        },
        async getChainId() {
            const provider = await this.getProvider();
            return provider.chainId;
        },
        // Not relevant for Owl
        onAccountsChanged: () => {},
        // Not relevant for Owl
        onChainChanged: () => {},
        onDisconnect: () => {
            config.emitter.emit("disconnect");
        },
    }));
}
