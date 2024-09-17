import {
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_MOCK,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID,
    FIREBASE_SERVICE_EMAIL,
    FIREBASE_STORAGE_BUCKET,
    GCLOUD_PROJECT,
    NODE_ENV,
} from "@owlprotocol/envvars";
import { initializeApp, getApp, getApps, App } from "firebase-admin/app";
import { Firestore, FirestoreSettings, getFirestore, initializeFirestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";
import { Storage, getStorage } from "firebase-admin/storage";
import type { AppOptions } from "firebase-admin";
import { cert } from "firebase-admin/app";
import {
    DEFAULT_FIRESTORE_EMULATOR_HOST,
    DEFAULT_FIREBASE_STORAGE_EMULATOR_HOST,
    DEFAULT_FIREBASE_AUTH_EMULATOR_HOST,
} from "../common.js";

export function getFirebaseConfig() {
    let firebaseConfig: AppOptions = {};
    if (FIREBASE_MOCK === "false") {
        console.debug(`Connecting to remote Firebase ${FIREBASE_AUTH_DOMAIN} with ${NODE_ENV} credentials`);
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
        console.debug("Connecting to local Firebase emulator");
        //Emulator Firebase Config
        firebaseConfig = {
            //https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks
            //Demo prefix forces connection to emulator
            projectId: FIREBASE_PROJECT_ID.startsWith("demo-") ? FIREBASE_PROJECT_ID : `demo-${FIREBASE_PROJECT_ID}`,
            storageBucket: FIREBASE_STORAGE_BUCKET,
        };
        // Connect to emulator (if test). Do NOT use localhost as breaks in CI
        process.env["FIRESTORE_EMULATOR_HOST"] = DEFAULT_FIRESTORE_EMULATOR_HOST;
        process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = DEFAULT_FIREBASE_STORAGE_EMULATOR_HOST;
        process.env["FIREBASE_AUTH_EMULATOR_HOST"] = DEFAULT_FIREBASE_AUTH_EMULATOR_HOST;
    }

    return firebaseConfig;
}

/**
 * Get default app, initialize or get current.
 */
export function getAppInitialized(config?: AppOptions): App {
    if (getApps().length === 0) {
        if (GCLOUD_PROJECT) {
            console.debug(
                "Initializing Firebase App in Google/Emulator environment using Default Credentials (ignoring envvars). Read more https://firebase.google.com/docs/admin/setup#initialize-sdk",
            );
            const app = initializeApp();
            return app;
        } else {
            // This is only relevant when not being run in Google / Emulator (eg. TRPC Express)
            // TODO: Note this assumes the Emulator is on 18080 and sets the environment var
            console.debug(
                "Initializing Firebase App in non-Google environment using Service Account envvars/Emulator defaults. Read more https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments",
            );
            if (!config) {
                throw new Error(`GCLOUD_PROJECT undefined, config must be defined`);
            }
            const app = initializeApp(config);
            return app;
        }
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
    //Initialize firestore
    const firebaseApp = GCLOUD_PROJECT ? getAppInitialized() : getAppInitialized(getFirebaseConfig());
    const firestore = getFirestoreInitialized(firebaseApp);
    const auth = getAuthInitialized(firebaseApp);

    //No way to tell if storage is initialized
    // NOTE: storage.apiEndponit stores the prefix of each file's publicUrl
    const storage = getStorage(firebaseApp);

    return { firebaseApp, firestore, auth, storage };
}
