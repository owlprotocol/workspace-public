import { useMemo, PropsWithChildren } from "react";
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

/**
 * Default firebase provider for Owl Protocol
 * - Loads firebase config
 * - Configures firebase cache
 * @param param0
 * @returns wraps children with Firebase providers
 */
export function OwlFirebaseProvider({ children }: PropsWithChildren) {
    //Firebase SDKs
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

    return (
        <FirebaseAppProvider firebaseApp={firebaseApp} suspense={true}>
            <AuthProvider sdk={auth}>
                <FirestoreProvider sdk={firestore}>
                    {children}
                </FirestoreProvider>
            </AuthProvider>
        </FirebaseAppProvider>
    );
}
