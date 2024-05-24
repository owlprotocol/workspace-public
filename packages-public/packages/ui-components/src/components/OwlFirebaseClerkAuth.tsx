import { PropsWithChildren, useEffect } from "react";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import { signInWithCustomToken, signOut } from "firebase/auth";
import { useAuth as useFirebaseAuth } from "reactfire";

/**
 * Connect Firebase Auth with Clerk Auth
 * - MUST have Firebase & Clerk provider context
 * - Watch Clerk signing state
 * - Signin/Signout from Firebase
 * @param param0
 * @returns wraps children with logic to sign-in/out Clerk Firebase integration
 */
export function OwlFirebaseClerkAuth({ children }: PropsWithChildren) {
    //Clerk User
    const { getToken, isSignedIn } = useClerkAuth();

    //Firebase Signin
    //Only reason we need this is because intializing the auth/firestore with custom persistence
    //Therefore auth is only accessible from provider (and not import)
    const auth = useFirebaseAuth();

    //Sync Clerk & Firebase signin
    useEffect(() => {
        if (isSignedIn) {
            getToken({
                template: "integration_firebase",
            }).then((token) => {
                console.debug({ token });
                if (token) {
                    signInWithCustomToken(auth, token);
                }
                console.debug("Signed-in to Firebase");
            });
        } else if (isSignedIn === false) {
            signOut(auth);
            console.debug("Signed-out of Firebase");
        }
        //isSignedIn === undefined means loading so skip
    }, [getToken, auth, isSignedIn]);

    return <>{children}</>;
}
