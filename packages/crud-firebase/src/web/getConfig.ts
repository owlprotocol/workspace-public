import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_MOCK,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_LOCAL_CACHE_SIZE,
    FIREBASE_LOCAL_CACHE_MANAGER,
    NODE_ENV,
} from "@owlprotocol/envvars";
import { FirebaseOptions, initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
    initializeFirestore,
    getFirestore,
    connectFirestoreEmulator,
    Firestore,
    FirestoreSettings,
    persistentLocalCache,
    persistentMultipleTabManager,
    memoryLocalCache,
} from "firebase/firestore";
import {
    initializeAuth,
    getAuth,
    connectAuthEmulator,
    Auth,
    Dependencies,
    browserPopupRedirectResolver,
    browserLocalPersistence,
} from "firebase/auth";
import { getStorage, connectStorageEmulator, FirebaseStorage } from "firebase/storage";

export function getFirebaseConfig() {
    let firebaseConfig: FirebaseOptions = {};
    if (FIREBASE_MOCK === "false") {
        console.debug(`Connecting to remote Firebase ${FIREBASE_AUTH_DOMAIN} with ${NODE_ENV} credentials`);
        //Live Firebase Config
        firebaseConfig = {
            apiKey: FIREBASE_API_KEY,
            authDomain: FIREBASE_AUTH_DOMAIN,
            databaseURL: FIREBASE_DATABASE_URL,
            projectId: FIREBASE_PROJECT_ID,
            storageBucket: FIREBASE_STORAGE_BUCKET,
            appId: FIREBASE_APP_ID,
        };
    } else {
        console.debug("Connecting to local Firebase emulator");
        //Emulator Firebase Config
        firebaseConfig = {
            apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            //https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks
            //Demo prefix forces connection to emulator
            projectId: FIREBASE_PROJECT_ID.startsWith("demo-") ? FIREBASE_PROJECT_ID : `demo-${FIREBASE_PROJECT_ID}`,
            authDomain: "localhost",
            storageBucket: FIREBASE_STORAGE_BUCKET,
        };
    }

    return firebaseConfig;
}

/**
 * Get default app, initialize or get current.
 */
export function getAppInitialized(config: FirebaseOptions): FirebaseApp {
    if (getApps().length === 0) {
        //Initialize firestore
        const app = initializeApp(config);
        console.debug("Initialized Firebase App");
        return app;
    }

    return getApp();
}

/**
 * Get default firestore (WARNING: Does not work properly due to imports)
 */
export function getFirestoreInitialized(app: FirebaseApp, settings: FirestoreSettings = {}): Firestore {
    try {
        const cacheSizeBytes = settings.cacheSizeBytes ?? parseInt(FIREBASE_LOCAL_CACHE_SIZE);
        //https://firebase.google.com/docs/firestore/manage-data/enable-offline
        if (settings.localCache === undefined) {
            if (FIREBASE_LOCAL_CACHE_MANAGER === "MEMORY") {
                settings.localCache = memoryLocalCache();
            } else if (FIREBASE_LOCAL_CACHE_MANAGER === "SINGLE_TAB") {
                settings.localCache = persistentLocalCache({ cacheSizeBytes });
            } else if (FIREBASE_LOCAL_CACHE_MANAGER === "MULTIPLE_TAB") {
                settings.localCache = persistentLocalCache({
                    cacheSizeBytes,
                    tabManager: persistentMultipleTabManager(),
                });
            }
        }
        const firestore = initializeFirestore(app, settings);
        const host = process.env.FIRESTORE_EMULATOR_HOST ?? "127.0.0.1:18100";
        const [hostname, hostportStr] = host.split(":", 2);

        const hostport = parseInt(hostportStr);

        //Initialize Emulator
        if (NODE_ENV !== "production" && NODE_ENV !== "staging") {
            connectFirestoreEmulator(firestore, hostname, hostport);
        }
        console.debug("Initialized Firebase Firestore", settings);
        return firestore;
    } catch (error) {
        //console.debug(error);
        return getFirestore(app);
    }
}

export function getFirestoreSettings(firestore: Firestore) {
    //@ts-expect-error
    const host = firestore._settings.host as string;
    //@ts-expect-error
    const projectId = firestore._databaseId.projectId as string;
    //@ts-expect-error
    const databaseId = firestore._databaseId.database as string;

    return { host, projectId, databaseId };
}

const defaultAuthSettings = {
    persistence: browserLocalPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
};

/**
 * Get default auth
 */
export function getAuthInitialized(app: FirebaseApp, settings: Dependencies = defaultAuthSettings): Auth {
    try {
        const auth = initializeAuth(app, settings);
        //Initialize Emulator
        if (NODE_ENV !== "production" && NODE_ENV !== "staging") {
            connectAuthEmulator(auth, "http://127.0.0.1:9099");
        }
        return auth;
    } catch (error) {
        return getAuth(app);
    }
}

/**
 * Get singleton Firebase app, and underlying sdk modules
 */
export function getFirebaseApp(): {
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
    storage: FirebaseStorage;
    config: FirebaseOptions;
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

    if (getApps().length === 0) {
        //Initial setup & running in non-prod
        //Initialize Emulator
        if (NODE_ENV !== "production" && NODE_ENV !== "staging") {
            connectStorageEmulator(storage, "127.0.0.1", 9199);
        }
    }

    return { firebaseApp, firestore, auth, storage, config };
}
