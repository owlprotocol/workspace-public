import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@owlprotocol/contracts-api";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";

export const trpc: AppReactQuery = createTRPCReact<AppRouter>();

export type AppReactQuery = ReturnType<typeof createTRPCReact<AppRouter>>;

/**
 * Create React TRPC Client Hook
 * @param url
 * @returns
 */
export function useClient(
    headers: () => Promise<Record<string, string>>,
    url = API_TRPC_BASE_URL,
): [ReturnType<(typeof trpc)["createClient"]>] {
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url,
                    headers,
                }),
            ],
        }),
    );

    return [trpcClient];
}
