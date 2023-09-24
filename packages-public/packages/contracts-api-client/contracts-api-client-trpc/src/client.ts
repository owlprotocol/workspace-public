import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@owlprotocol/contracts-api";
import fetch from "cross-fetch";

/**
 * Create JS TRPC Client
 * @param apiKey
 * @param url
 * @returns
 */
export function createClient(apiKey: string, url = "https://contracts-api.owlprotocol.xyz/api/trpc"): AppClient {
    const client = createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
                url,
                fetch,
                // You can pass any HTTP headers you wish here
                async headers() {
                    return {
                        "x-api-key": apiKey,
                    };
                },
            }),
        ],
    });

    return client;
}

export type AppClient = ReturnType<typeof createTRPCProxyClient<AppRouter>>;
