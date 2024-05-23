import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { OwlFirebaseProvider } from "./OwlFirebaseProvider.js";
import { OwlTrpcProvider } from "./OwlTrpcProvider.js";
import { OwlFirebaseClerkAuth } from "./OwlFirebaseClerkAuth.js";
import { queryClient } from "../clients.js";

/**
 * Full provider for Owl Protocol
 * - Clerk Provider
 * - Firebase Provider
 * - QueryClient Provider
 * - TRPC Provider
 * @param param0
 * @returns wraps children with all providers
 */
export function OwlProvider({
    children,
    clerkPublishableKey,
    apiTrpcBaseUrl,
}: PropsWithChildren<{
    clerkPublishableKey?: string;
    apiTrpcBaseUrl?: string;
}>) {
    return (
        <ClerkProvider publishableKey={clerkPublishableKey!}>
            <OwlFirebaseProvider>
                <OwlFirebaseClerkAuth>
                    <OwlTrpcProvider apiTrpcBaseUrl={apiTrpcBaseUrl}>
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </OwlTrpcProvider>
                </OwlFirebaseClerkAuth>
            </OwlFirebaseProvider>
        </ClerkProvider>
    );
}
