import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import { PropsWithChildren, useCallback } from "react";
import { useClient, trpc } from "@owlprotocol/core-trpc/react-query";
import { queryClient } from "../clients.js";

/**
 * Default TRPC provider for Owl Protocol
 * - Get user token from Clerk
 * - Loads TRP Client
 * @param param0
 * @returns wraps children with TRPC provider
 */
export function OwlTrpcProvider({
    children,
    apiTrpcBaseUrl,
}: PropsWithChildren<{ apiTrpcBaseUrl?: string }>) {
    //Clerk Auth
    //TODO: Can this just be imported from js sdk?
    const { getToken, isSignedIn, isLoaded } = useClerkAuth();

    //TRPC Client
    const getHeaders = useCallback(async () => {
        //Not signed in, empty header (public endpoints)
        if (!isSignedIn) {
            return {} as { Authorization?: string };
        }
        //Signed in, use bearer token
        const token = await getToken({ template: "email" });
        return {
            Authorization: token ? `Bearer ${token}` : "",
        };
        //We use !!isSigned as behaviour is same if null | false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getToken, !!isSignedIn]);

    const [trpcClientReact] = useClient(
        getHeaders,
        apiTrpcBaseUrl ?? API_TRPC_BASE_URL
    );

    //TODO: Should we remove this OR replace with Suspense API compatible
    if (!isLoaded) <>Loading Clerk...</>;

    return (
        <trpc.Provider client={trpcClientReact} queryClient={queryClient}>
            {children}
        </trpc.Provider>
    );
}
