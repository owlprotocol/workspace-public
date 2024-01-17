import { ClerkProvider } from "@clerk/clerk-react";
import { CLERK_PUBLISHABLE_KEY } from "@owlprotocol/envvars/browser";
import { getComponentDisplayName } from "./getComponentDisplayName.js";

/**
 * Wrapp component with Clerk provider
 * @param WrappedComponent
 * @returns
 */
export const withClerkProvider = (WrappedComponent: any) => {
    const component = (props: any) => {
        return (
            <>
                {/** @ts-expect-error */}
                <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
                    <WrappedComponent {...props} />
                </ClerkProvider>
            </>
        );
    };
    component.displayName = `withClerkProvider(${getComponentDisplayName(WrappedComponent)})`;
    return component;
};
