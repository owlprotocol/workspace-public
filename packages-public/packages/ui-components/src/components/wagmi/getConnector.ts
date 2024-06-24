import { createConnector, type CreateConnectorFn } from "@wagmi/core";
import { type ActiveSessionResource, type LoadedClerk } from "@clerk/types";
import {
    type EIP1193RequestFn,
    type WalletClient,
    type Transport,
    type Chain,
    createWalletClient,
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

type GetClient = NonNullable<ReturnType<CreateConnectorFn>["getClient"]>;

getConnector.type = "owlProtocol" as const;
export function getConnector({
    owlClerk,
    projectId,
    owlApiRestBaseUrl,
    forceRedirectUrl,
}: OwlConnectorParameters) {
    let walletClient: WalletClient;
    let transport: Transport;

    return createConnector<
        ProviderWithChainId,
        {
            getClient: GetClient;
        }
    >((config) => ({
        id: "OwlConnector",
        name: "Owl Protocol Connector",
        type: "owlProtocol",
        isAuthorized: async () => !!owlClerk.user,
        async getProvider({ chainId } = {}) {
            const client = await this.getClient({ chainId });
            // Chain is always defined in the returned clients
            return { request: client.request, chainId: client.chain!.id };
        },
        async getClient({ chainId } = {}) {
            if (chainId) {
                const chain = config.chains.find((c) => c.id === chainId);
                if (!chain) {
                    throw Error(`Chain id ${chainId} not found in connector`);
                }

                if (!owlClerk.session) {
                    // TODO: avoid returning public client if possible, can we return undefined?
                    // Clerk sign in modal shows up behind rainbowkit modal if provider is undefined
                    const publicClient = createPublicClient({
                        chain,
                        transport: http(),
                    });

                    return publicClient;
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
            } else if (!walletClient) {
                const firstConfigChain = config.chains[0];
                const chainId = firstConfigChain.id;

                if (!owlClerk.session) {
                    const publicClient = createPublicClient({
                        chain: firstConfigChain,
                        transport: http(),
                    });
                    return publicClient;
                }

                const jwt = await getOwlJwt(owlClerk.session);

                transport = getOwlUserRpcTransport(
                    jwt,
                    projectId,
                    chainId,
                    owlApiRestBaseUrl
                );
                walletClient = createWalletClient<Transport, Chain>({
                    chain: firstConfigChain,
                    transport,
                });
            }

            return walletClient;
        },
        async connect({ chainId } = {}) {
            if (!owlClerk.session) {
                owlClerk.openSignIn({ forceRedirectUrl });
            }

            const client = await this.getClient({ chainId });

            if (!(client.type === "walletClient")) {
                // NOTE: this error should not happen because once user is logged into clerk, we should have a wallet client
                throw new Error("Must be logged in first");
            }
            const walletClient = client as WalletClient;

            const accounts = await walletClient.getAddresses();

            // Chain is always defined in the returned clients
            return { accounts, chainId: walletClient.chain!.id };
        },
        disconnect: async () => {
            await owlClerk.signOut({ redirectUrl: forceRedirectUrl });
        },
        async getAccounts() {
            const client = await this.getClient();

            if (!(client.type === "walletClient")) {
                // User is not logged in => no address to return
                return [];
            }
            const walletClient = client as WalletClient;

            return walletClient.getAddresses();
        },
        async getChainId() {
            const client = await this.getClient();
            // Chain is always defined in the returned clients
            return client.chain!.id;
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
