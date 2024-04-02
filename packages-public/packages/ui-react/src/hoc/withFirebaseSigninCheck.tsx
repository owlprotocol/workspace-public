/* eslint-disable react-hooks/rules-of-hooks */
import { Center, Spinner } from "@chakra-ui/react";
import { useAuth, useUser as useClerkUser } from "@clerk/clerk-react";
import { createClient } from "@owlprotocol/contracts-api-client-trpc/client";
import { auth } from "@owlprotocol/contracts-api-firebase/web";
import { isProductionOrStaging } from "@owlprotocol/envvars/browser";
import { signInWithCustomToken } from "firebase/auth";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
//@ts-expect-error
import { useSigninCheck } from "reactfire";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import { getComponentDisplayName } from "./getComponentDisplayName.js";

/* eslint-disable @typescript-eslint/no-empty-function */
export const FirebaseSigninContext = createContext<{
    firebaseToken: null | string;
    trpcToken: null | string;
    userId: undefined | string;
    revokeTokens: () => void;
}>({
    firebaseToken: null,
    trpcToken: null,
    userId: undefined,
    revokeTokens: () => {},
});

/**
 * Wrap component with User provider
 * @param WrappedComponent
 * @returns
 */
export function withFirebaseSigninCheck(WrappedComponent: any) {
    const component = (props: any) => {
        const { getToken } = useAuth();
        const { isSignedIn, user: clerkUser } = useClerkUser();
        const userId = clerkUser?.id;

        const [firebaseToken, setFirebaseToken] = useState<null | string>(null);
        const [trpcToken, setTrpcToken] = useState<null | string>(null);

        //Get firebase token
        const getFirebaseToken = useCallback(async () => {
            let token: string | null;
            if (isProductionOrStaging()) {
                token = await getToken({
                    template: "integration_firebase",
                });
            } else {
                //TODO: Mock token
                token = await getToken({
                    template: "integration_firebase",
                });
            }
            return token;
        }, [getToken]);

        //Get trpc token
        const getTrpcToken = useCallback(async () => {
            let token: string | null;
            if (isProductionOrStaging()) {
                token = await getToken({
                    template: "email",
                });
            } else {
                //TODO: Mock token
                token = await getToken({
                    template: "email",
                });
            }
            return token;
        }, [getToken]);

        const revokeTokens = () => {
            setFirebaseToken(null);
            setTrpcToken(null);
        };

        //Set firebase token in state
        useEffect(() => {
            // isSignedIn can be undefined, false or true, userId can be undefined or a string
            if (!(isSignedIn && userId)) {
                return;
            }

            // isSignedIn is true, and userId is a string that is not empty
            Promise.all([getFirebaseToken(), getTrpcToken()]).then(async ([firebaseToken, trpcToken]) => {
                if (firebaseToken) {
                    await signInWithCustomToken(auth, firebaseToken);
                }
                setFirebaseToken(firebaseToken);
                setTrpcToken(trpcToken);

                if (trpcToken) {
                    const trpcClient = createClient({ jwt: trpcToken }, API_TRPC_BASE_URL);
                    // This is used to create the user if it does not exist yet
                    await trpcClient.users.me.query();
                }
            });
        }, [isSignedIn, userId]);

        const { status } = useSigninCheck();

        const ctxValue = useMemo(() => {
            return {
                userId,
                firebaseToken,
                trpcToken,
                revokeTokens,
            };
        }, [userId, firebaseToken, trpcToken]);

        if (status === "loading") {
            return (
                <main>
                    <Center width="100vw" height="100vh">
                        <Spinner size="xl" />
                    </Center>
                </main>
            );
        } else if (status === "error") {
            return <>Error</>;
        }
        return (
            <FirebaseSigninContext.Provider value={ctxValue}>
                <WrappedComponent {...props} />
            </FirebaseSigninContext.Provider>
        );
    };
    component.displayName = `withFirebaseSigninCheck(${getComponentDisplayName(WrappedComponent)})`;
    return component;
}
