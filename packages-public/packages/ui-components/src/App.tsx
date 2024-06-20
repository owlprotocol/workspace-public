import { RouterProvider, createRouter } from "@tanstack/react-router";
import { CLERK_PUBLISHABLE_KEY } from "@owlprotocol/envvars/browser";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { OwlProvider } from "./components";
import "@rainbow-me/rainbowkit/styles.css";

const router = createRouter({
    routeTree,
});
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export const App = () => {
    return (
        <>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                {/* <InnerAppWithTRPC /> */}
                <OwlProvider
                    clerkPublishableKey={CLERK_PUBLISHABLE_KEY}
                    apiTrpcBaseUrl={API_TRPC_BASE_URL}
                >
                    <RouterProvider router={router} />

                    {/*<InnerApp />*/}
                </OwlProvider>
                <Toaster />
            </ThemeProvider>
        </>
    );
};
