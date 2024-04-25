import { ClerkProvider, useAuth as useClerkAuth } from "@clerk/clerk-react";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import { QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import {
    getAppInitialized,
    getAuthInitialized,
    getFirebaseConfig,
    getFirestoreInitialized,
} from "@owlprotocol/core-firebase/web";
import {
    persistentLocalCache,
    persistentMultipleTabManager,
    CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import {
    FirebaseAppProvider,
    AuthProvider,
    FirestoreProvider,
} from "reactfire";
import { useClient, trpc } from "@owlprotocol/core-trpc/react-query";
import { queryClient } from "../clients.js";

export function getComponentDisplayName(WrappedComponent: any) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

/**
 * Wrap a component with TRPC provider. Needed for inner components to use auth when calling the TRPC client
 * @param WrappedComponent the component to wrap with the TRPC provider
 * @param clerkPublishableKey the Clerk publishable key from Owl
 * @param apiTrpcBaseUrl the URL of the Owl API
 */
export const withTRPCProvider = (
    //TODO: Constrain type better, maybe use just () => JSX.Fragment
    WrappedComponent: any,
    clerkPublishableKey?: string,
    apiTrpcBaseUrl = API_TRPC_BASE_URL
) => {
    const ComponentWithTRPC = (props: any) => {
        const { firebaseApp, auth, firestore } = useMemo(() => {
            const firebaseApp = getAppInitialized(getFirebaseConfig());
            const firestore = getFirestoreInitialized(firebaseApp, {
                localCache: persistentLocalCache({
                    tabManager: persistentMultipleTabManager(),
                }),
                cacheSizeBytes: CACHE_SIZE_UNLIMITED,
            });
            const auth = getAuthInitialized(firebaseApp);
            return { firebaseApp, firestore, auth };
        }, []);

        //Clerk User
        const { getToken } = useClerkAuth();

        //TRPC Client
        const getHeaders = useCallback(async () => {
            const token = await getToken({ template: "email" });
            return {
                Authorization: token ? `Bearer ${token}` : "",
            };
        }, [getToken]);
        const [trpcClientReact] = useClient(getHeaders, apiTrpcBaseUrl);

        return (
            <FirebaseAppProvider firebaseApp={firebaseApp}>
                <AuthProvider sdk={auth}>
                    <FirestoreProvider sdk={firestore}>
                        <trpc.Provider
                            client={trpcClientReact}
                            queryClient={queryClient}
                        >
                            <QueryClientProvider client={queryClient}>
                                {/* My App */}
                                <WrappedComponent {...props} />
                            </QueryClientProvider>
                        </trpc.Provider>
                    </FirestoreProvider>
                </AuthProvider>
            </FirebaseAppProvider>
        );
    };

    ComponentWithTRPC.displayName = `withTRPCProvider(${getComponentDisplayName(
        WrappedComponent
    )})`;

    return () => (
        <ClerkProvider publishableKey={clerkPublishableKey!}>
            <ComponentWithTRPC />
        </ClerkProvider>
    );
};
