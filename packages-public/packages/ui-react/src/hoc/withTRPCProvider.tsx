/* eslint-disable react-hooks/rules-of-hooks */
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars/browser";
import { useCallback, useContext, useState } from "react";
import { useClient, trpc } from "@owlprotocol/contracts-api-client-trpc/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getComponentDisplayName } from "./getComponentDisplayName.js";
import { FirebaseSigninContext } from "./withFirebaseSigninCheck.js";

/**
 * Wrapp component with TRPC provider
 * @param WrappedComponent
 * @returns
 */
export const withTRPCProvider = (WrappedComponent: any) => {
    const component = (props: any) => {
        const [queryClient] = useState(() => new QueryClient());

        const { trpcToken } = useContext(FirebaseSigninContext);
        const getHeaders = useCallback(async () => {
            return {
                Authorization: trpcToken ? `Bearer ${trpcToken}` : "",
            };
        }, [trpcToken]);

        //TODO: Add headers function
        const [trpcClient] = useClient(getHeaders, API_TRPC_BASE_URL);

        return (
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <WrappedComponent {...props} />
                </QueryClientProvider>
            </trpc.Provider>
        );
    };
    component.displayName = `withTRPCProvider(${getComponentDisplayName(WrappedComponent)})`;
    return component;
};
