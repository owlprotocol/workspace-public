import {
    //@ts-expect-error
    FirebaseAppProvider,
    //@ts-expect-error
    AuthProvider,
    //@ts-expect-error
    FirestoreProvider,
} from "reactfire";
import { auth, firestore, firebaseApp } from "@owlprotocol/contracts-api-firebase/web";
import { getComponentDisplayName } from "./getComponentDisplayName.js";

/**
 * Wrap component with FirebaseApp provider
 * @param WrappedComponent
 * @returns
 */
export function withFirebaseAppProvider(WrappedComponent: any) {
    const component = (props: any) => {
        return (
            <FirebaseAppProvider firebaseApp={firebaseApp}>
                <AuthProvider sdk={auth}>
                    <FirestoreProvider sdk={firestore}>
                        <WrappedComponent {...props} />
                    </FirestoreProvider>
                </AuthProvider>
            </FirebaseAppProvider>
        );
    };
    component.displayName = `withFirebaseAppProvider(${getComponentDisplayName(WrappedComponent)})`;
    return component;
}
