import { QueryClient } from "@tanstack/react-query";
import { createTRPCQueryUtils } from "@trpc/react-query";
import { trpc, AppRouter } from "@owlprotocol/core-trpc/react-query";

//TODO: Move on SSR
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
        },
    },
});

// TODO: fix type annotation
export type TrpcClient = ReturnType<typeof createTRPCQueryUtils<AppRouter>>;
export const trpcClient: TrpcClient = createTRPCQueryUtils<AppRouter>({
    queryClient,
    //@ts-expect-error
    client: trpc,
});
