import { RouterProvider, createRouter } from "@tanstack/react-router";
import { CLERK_PUBLISHABLE_KEY } from "@owlprotocol/envvars/browser";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import {
    useUser as useClerkUser,
    SignInButton,
    SignUpButton,
} from "@clerk/clerk-react";
import { routeTree } from "./routeTree.gen";
import { withTRPCProvider } from "./components/reactProviders";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";

const router = createRouter({
    routeTree,
});
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

//TODO: Deprecate this as no longer using this pattern
const InnerApp = () => {
    const clerkUserStatus = useClerkUser();
    const {
        isSignedIn: clerkSignedIn,
        isLoaded: clerkIsLoaded,
        user,
    } = clerkUserStatus;
    const userId = user?.id;
    const currentUrl: string = location.href || "";

    return (
        <>
            <RouterProvider router={router} />
            <h1>Hello</h1>
            <p>{userId}</p>
            {clerkIsLoaded && !clerkSignedIn && (
                <>
                    <SignInButton mode="modal" fallbackRedirectUrl={currentUrl}>
                        <Button className="w-full text-xl py-6">Sign in</Button>
                    </SignInButton>
                    <SignUpButton mode="modal" fallbackRedirectUrl={currentUrl}>
                        <Button className="w-full text-xl py-6">Sign up</Button>
                    </SignUpButton>
                </>
            )}
        </>
    );
};

const InnerAppWithTRPC = withTRPCProvider(
    InnerApp,
    CLERK_PUBLISHABLE_KEY,
    API_TRPC_BASE_URL
);

export const App = () => {
    return (
        <>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <InnerAppWithTRPC />
                <Toaster />
            </ThemeProvider>
        </>
    );
};
