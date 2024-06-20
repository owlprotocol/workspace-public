import { ProviderNotFoundError, createConnector } from "@wagmi/core";
import { ActiveSessionResource, LoadedClerk } from "@clerk/types";
import {
    type EIP1193RequestFn,
    type WalletClient,
    type Transport,
    createWalletClient,
    getAddress,
    createPublicClient,
    http,
} from "viem";
import { getOwlUserRpcTransport } from "@owlprotocol/core-provider";
export interface ProviderWithChainId {
    request: EIP1193RequestFn;
    chainId: number;
}

export interface OwlConnectorParameters {
    owlClerk: LoadedClerk;
    projectId: string;
    owlApiRestBaseUrl?: string;
    /** Url to redirect after Owl sign in. Defaults to page root */
    forceRedirectUrl?: string;
}

/**
 * Get the Clerk JWT to use with out API. Assumes the session is defined
 */
export async function getOwlJwt(
    owlClerkSession: ActiveSessionResource
): Promise<string> {
    let jwt: string | null;
    try {
        jwt = await owlClerkSession.getToken({ template: "email" });
    } catch (e) {
        throw new Error("Error getting Owl JWT");
    }

    if (jwt === null) {
        throw new Error("Error getting Owl JWT");
    }

    return jwt;
}

getConnector.type = "owlProtocol" as const;
export function getConnector({
    owlClerk,
    projectId,
    owlApiRestBaseUrl,
    forceRedirectUrl,
}: OwlConnectorParameters) {
    let provider: ProviderWithChainId;
    let walletClient: WalletClient;
    let transport: Transport;

    return createConnector<ProviderWithChainId | undefined>((config) => ({
        id: "OwlConnector",
        name: "Owl Protocol Connector",
        type: "owlProtocol",
        isAuthorized: async () => !!owlClerk.user,
        async getProvider({ chainId } = {}): Promise<
            ProviderWithChainId | undefined
        > {
            if (chainId) {
                const chain = config.chains.find((c) => c.id === chainId);
                if (!chain) {
                    throw Error(`Chain id ${chainId} not found in connector`);
                }

                if (!owlClerk.session) {
                    // TODO: avoid returning public client, just return no provider
                    // Clerk sign in modal shows up behind rainbowkit modal if provider is undefined
                    const publicClient = createPublicClient({
                        chain,
                        transport: http(),
                    });
                    return { request: publicClient.request, chainId };
                }

                // Session is defined
                const jwt = await getOwlJwt(owlClerk.session);

                transport = getOwlUserRpcTransport(
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
                const firstConfigChain = config.chains[0];
                const chainId = firstConfigChain.id;

                if (!owlClerk.session) {
                    const publicClient = createPublicClient({
                        chain: firstConfigChain,
                        transport: http(),
                    });
                    return { request: publicClient.request, chainId };
                }

                const jwt = await getOwlJwt(owlClerk.session);

                transport = getOwlUserRpcTransport(
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
            if (!owlClerk.session) {
                owlClerk.openSignIn({ forceRedirectUrl });
            }

            const provider = await this.getProvider({ chainId });

            const accounts = (
                (await provider!.request({
                    method: "eth_requestAccounts",
                })) as string[]
            ).map((x) => getAddress(x));

            chainId = provider!.chainId;

            return { accounts, chainId };
        },
        disconnect: async () => {
            await owlClerk.signOut({ redirectUrl: forceRedirectUrl });
        },
        async getAccounts() {
            const provider = await this.getProvider();
            if (!provider) {
                throw ProviderNotFoundError;
            }
            return (
                (await provider.request({
                    method: "eth_accounts",
                })) as string[]
            ).map((x) => getAddress(x));
        },
        async getChainId() {
            const provider = await this.getProvider();
            if (!provider) throw ProviderNotFoundError;
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
