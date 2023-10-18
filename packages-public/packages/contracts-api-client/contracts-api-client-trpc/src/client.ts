import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@owlprotocol/contracts-api";
import fetch from "cross-fetch";

/**
 * Create JS TRPC Client
 * @param apiKey
 * @param url
 * @returns
 */
export function createClient(
    auth?: {
        apiKey?: string;
        jwt?: string;
    },
    url = "https://contracts-api.owlprotocol.xyz/api/trpc",
): AppClient {
    const client = createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url,
                fetch,
                // You can pass any HTTP headers you wish here
                headers() {
                    if (auth?.apiKey) {
                        return { "x-api-key": auth.apiKey };
                    } else if (auth?.jwt) {
                        return { authorization: auth.jwt };
                    } else {
                        return {};
                    }
                },
            }),
        ],
    });

    return client;
}

export type AppClient = ReturnType<typeof createTRPCProxyClient<AppRouter>>;
