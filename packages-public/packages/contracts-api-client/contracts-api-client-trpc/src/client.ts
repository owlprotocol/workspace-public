import { TRPCClient, createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@owlprotocol/contracts-api';

export const createClient = (apiKey: string, url?: string) => {
    const client = createTRPCProxyClient<AppRouter>({
        links: [
            httpBatchLink({
            url: url ?? "https://contracts-api.owlprotocol.xyz",
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

export type AppClient = ReturnType<typeof createTRPCProxyClient<AppRouter>>
