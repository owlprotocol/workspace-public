import {
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_AUTH_EMULATOR_HOST,
    FIREBASE_DATABASE_URL,
    FIREBASE_MOCK,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID,
    FIREBASE_SERVICE_EMAIL,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_STORAGE_EMULATOR_HOST,
    FIRESTORE_EMULATOR_HOST,
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
    }

    return firebaseConfig;
}

/**
 * Calls `initializeApp` with custom overrides for settings
 * @warning Can only be called **once** (see `initializeApp` docs)
 * @returns firebase app instance
 */
export function initializeAppForEnv(): App {
    if (GCLOUD_PROJECT) {
        console.debug(
            "Initializing Firebase App in Google/Emulator environment using Default Credentials (ignoring envvars). Read more https://firebase.google.com/docs/admin/setup#initialize-sdk",
        );
        const app = initializeApp();
        return app;
    } else {
        // This is only relevant when not being run in Google / Emulator (eg. TRPC Express)
        console.debug(
            "Initializing Firebase App in non-Google environment using Service Account envvars/Emulator defaults. Read more https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments",
        );
        const app = initializeApp(getFirebaseConfig());
        return app;
    }
}

/**
 * Calls `initializeFirestore` with custom overrides for settings
 * @warning Can only be called **once** (see `initializeFirestore` docs)
 * @param app
 * @param settings
 * @returns firestore instance
 */
function initializeFirestoreForEnv(app: App, settings: FirestoreSettings = {}): Firestore {
    const firestore = initializeFirestore(app, settings);
    firestore.settings({ ignoreUndefinedProperties: true });
    return firestore;
}

/**
 * Get singleton Firebase app, and underlying sdk modules
 */
export function getFirebaseApp(): {
    firebaseApp: App;
    firestore: Firestore;
    auth: Auth;
    storage: Storage;
} {
    let firebaseApp: App;
    let firestore: Firestore;
    let auth: Auth;
    let storage: Storage;

    if (getApps().length === 0) {
        // Override envvars if needed
        // Admin SDK can only be connected to emulator using envvars
        // FIREBASE_MOCK envvar is used as a flag to set *_EMULATOR_HOST envvars to default values if needed
        if (FIREBASE_MOCK === "true") {
            //@ts-expect-error admin sdk only supports envvars
            process.env["FIRESTORE_EMULATOR_HOST"] = FIRESTORE_EMULATOR_HOST ?? DEFAULT_FIRESTORE_EMULATOR_HOST;
            //@ts-expect-error admin sdk only supports envvars
            process.env["FIREBASE_AUTH_EMULATOR_HOST"] =
                FIREBASE_AUTH_EMULATOR_HOST ?? DEFAULT_FIREBASE_AUTH_EMULATOR_HOST;
            //@ts-expect-error admin sdk only supports envvars
            process.env["FIREBASE_STORAGE_EMULATOR_HOST"] =
                FIREBASE_STORAGE_EMULATOR_HOST ?? DEFAULT_FIREBASE_STORAGE_EMULATOR_HOST;
        }

        // Initialize App
        firebaseApp = initializeAppForEnv();
        firestore = initializeFirestoreForEnv(firebaseApp);
        auth = getAuth(firebaseApp);
        // NOTE: storage.apiEndponit stores the prefix of each file's publicUrl
        storage = getStorage(firebaseApp);

        return { firebaseApp, firestore, auth, storage };
    } else {
        // Existing App
        firebaseApp = getApp();
        firestore = getFirestore(firebaseApp);
        auth = getAuth(firebaseApp);
        storage = getStorage(firebaseApp);

        return { firebaseApp, firestore, auth, storage };
    }
}

/**
 * Get firestore instance settings for usage in custom api calls
 * Currently used to clear the emulator
 * @param firestore
 * @returns host, projectId, databaseId
 */
export function getFirestoreSettings(firestore: Firestore) {
    //@ts-expect-error
    const hostname = firestore._settings.servicePath as string;
    //@ts-expect-error
    const hostport = firestore._settings.port as number;
    const host = `${hostname}:${hostport}`;
    //@ts-expect-error
    const projectId = firestore._projectId as string;
    //@ts-expect-error
    const databaseId = firestore._databaseId as string;

    return { host, hostname, hostport, projectId, databaseId };
}
