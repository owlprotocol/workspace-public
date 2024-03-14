import {
    FIREBASE_DATABASE_URL,
    FIREBASE_MOCK,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID,
    FIREBASE_SERVICE_EMAIL,
    FIREBASE_STORAGE_BUCKET,
} from "@owlprotocol/envvars";
import { initializeApp, getApp, getApps, App } from "firebase-admin/app";
import { Firestore, FirestoreSettings, getFirestore, initializeFirestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";
import { Storage, getStorage } from "firebase-admin/storage";
import type { AppOptions } from "firebase-admin";
import { cert } from "firebase-admin/app";

export function getFirebaseConfig() {
    let firebaseConfig: AppOptions = {};
    if (FIREBASE_MOCK === "false") {
        console.debug("Running production Firebase with API Keys");
        //Live Firebase Config
        if (
            !FIREBASE_PROJECT_ID ||
            !FIREBASE_PRIVATE_KEY ||
            !FIREBASE_SERVICE_EMAIL ||
            !FIREBASE_PROJECT_ID ||
            !FIREBASE_STORAGE_BUCKET
        ) {
            const message =
                "FIREBASE_PRIVATE_KEY, FIREBASE_SERVICE_EMAIL, FIREBASE_PROJECT_ID, and FIREBASE_STORAGE_BUCKET required for production";
            throw new Error(message);
        }

        firebaseConfig = {
            projectId: FIREBASE_PROJECT_ID,
            credential: cert({
                privateKey: FIREBASE_PRIVATE_KEY,
                clientEmail: FIREBASE_SERVICE_EMAIL,
                projectId: FIREBASE_PROJECT_ID,
            }),
            databaseURL: FIREBASE_DATABASE_URL,
            storageBucket: FIREBASE_STORAGE_BUCKET,
        };
    } else {
        console.debug("Running development Firebase with emulator");
        //Emulator Firebase Config
        firebaseConfig = {
            //https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks
            //Demo prefix forces connection to emulator
            projectId: FIREBASE_PROJECT_ID.startsWith("demo-") ? FIREBASE_PROJECT_ID : `demo-${FIREBASE_PROJECT_ID}`,
            storageBucket: FIREBASE_STORAGE_BUCKET,
        };
        // Connect to emulator (if test). Do NOT use localhost as breaks in CI
        process.env["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8080";
        process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "127.0.0.1:9199";
        process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "127.0.0.1:9099";
    }

    return firebaseConfig;
}

/**
 * Get default app, initialize or get current.
 */
export function getAppInitialized(config: AppOptions): App {
    if (getApps().length === 0) {
        const app = initializeApp(config);
        console.debug("Initialized Firebase App");
        return app;
    }

    return getApp();
}

/**
 * Get default firestore
 */
export function getFirestoreInitialized(app: App, settings: FirestoreSettings = {}): Firestore {
    try {
        const firestore = initializeFirestore(app, settings);
        firestore.settings({ ignoreUndefinedProperties: true });
        console.debug("Initialized Firebase Firestore", { settings });
        return firestore;
    } catch (error) {
        return getFirestore(app);
    }
}

/**
 * Get default auth
 */
export function getAuthInitialized(app: App): Auth {
    return getAuth(app);
}

export function getFirebaseApp(): {
    firebaseApp: App;
    firestore: Firestore;
    auth: Auth;
    storage: Storage;
} {
    // Init the firebase app if not in test environment
    const config = getFirebaseConfig();
    //Initialize firestore
    const firebaseApp = getAppInitialized(config);
    const firestore = getFirestoreInitialized(firebaseApp);
    const auth = getAuthInitialized(firebaseApp);

    //No way to tell if storage is initialized
    // NOTE: storage.apiEndponit stores the prefix of each file's publicUrl
    const storage = getStorage(firebaseApp);

    return { firebaseApp, firestore, auth, storage };
}
