import { CLERK_PUBLISHABLE_KEY } from "@owlprotocol/envvars/browser";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import {
    useUser as useClerkUser,
    SignInButton,
    SignUpButton,
} from "@clerk/clerk-react";
import { withTRPCProvider } from "./components/reactProviders.js";
import { Button } from "./components/ui/button.js";

const InnerApp = () => {
    const clerkUserStatus = useClerkUser();
    const {
        isSignedIn: clerkSignedIn,
        isLoaded: clerkIsLoaded,
        user,
    } = clerkUserStatus;
    console.log({ clerkUserStatus });
    const userId = user?.id;
    const currentUrl: string = location.href || "";

    return (
        <>
            <h1>Hello</h1>
            <p>{userId}</p>
            {clerkIsLoaded && !clerkSignedIn && (
                <>
                    <SignInButton mode="modal" redirectUrl={currentUrl}>
                        <Button className="w-full text-xl py-6">Sign in</Button>
                    </SignInButton>
                    <SignUpButton mode="modal" redirectUrl={currentUrl}>
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
    return <InnerAppWithTRPC />;
};
