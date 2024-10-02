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
    FIRESTORE_EMULATOR_HOST,
    FIREBASE_AUTH_EMULATOR_HOST,
    FIREBASE_STORAGE_EMULATOR_HOST,
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
import {
    DEFAULT_FIREBASE_AUTH_EMULATOR_HOST,
    DEFAULT_FIREBASE_STORAGE_EMULATOR_HOST,
    DEFAULT_FIRESTORE_EMULATOR_HOST,
} from "../common.js";

function getFirebaseConfig() {
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
 * Calls `initializeFirestore` with custom overrides for handling cache & emulator settings
 * @warning Can only be called **once** (see `initializeFirestore` docs)
 * @param app
 * @param settings
 * @returns firestore instance
 */
function initializeFirestoreForEnv(app: FirebaseApp, settings: FirestoreSettings = {}): Firestore {
    // Cache Settings
    const cacheSizeBytes = settings.cacheSizeBytes ?? parseInt(FIREBASE_LOCAL_CACHE_SIZE);
    // https://firebase.google.com/docs/firestore/manage-data/enable-offline
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

    if (settings.localCache) {
        // setting `localCache` field and `cacheSizeBytes` at the same time will throw exception
        delete settings.cacheSizeBytes;
    }

    // Initialize Firestore
    const firestore = initializeFirestore(app, settings);

    // Connect to emulator
    if (FIRESTORE_EMULATOR_HOST || FIREBASE_MOCK === "true") {
        const host = FIRESTORE_EMULATOR_HOST ?? DEFAULT_FIRESTORE_EMULATOR_HOST;
        const [hostname, hostportStr] = host.split(":", 2);
        const hostport = parseInt(hostportStr);
        connectFirestoreEmulator(firestore, hostname, hostport);
    }

    return firestore;
}

/**
 * Calls `initializeAuth` with custom overrides for handling emulator settings
 * @warning Can only be called **once** (see `initializeAuth` docs)
 * @param app
 * @param settings
 * @returns auth instance
 */
function initializeAuthForEnv(app: FirebaseApp, settings: Dependencies = {}): Auth {
    // Initialize Auth
    let defaultAuthSettings: Dependencies = {};
    if (typeof window != "undefined") {
        defaultAuthSettings = {
            persistence: browserLocalPersistence,
            popupRedirectResolver: browserPopupRedirectResolver,
        };
    }

    const auth = initializeAuth(app, { ...defaultAuthSettings, ...settings });
    // Connect to emulator
    if (FIREBASE_AUTH_EMULATOR_HOST || FIREBASE_MOCK === "true") {
        let host = FIRESTORE_EMULATOR_HOST ?? DEFAULT_FIREBASE_AUTH_EMULATOR_HOST;

        if (!host.startsWith("http")) {
            //Hack: Emulator sets HOST without `http://`
            host = `http://${host}`;
        }
        connectAuthEmulator(auth, host);
    }

    return auth;
}

/**
 * Calls `getStorage` with custom overrides for handling emulator settings
 * @warning Can only be called **once**
 * @param app
 * @returns storage instance
 */
function initializeStorageForEnv(app: FirebaseApp): FirebaseStorage {
    // Initialize Storage
    const storage = getStorage(app);
    if (FIREBASE_STORAGE_EMULATOR_HOST || FIREBASE_MOCK === "true") {
        const host = FIRESTORE_EMULATOR_HOST ?? DEFAULT_FIREBASE_STORAGE_EMULATOR_HOST;
        const [hostname, hostportStr] = host.split(":", 2);
        const hostport = parseInt(hostportStr);

        connectStorageEmulator(storage, hostname, hostport);
    }

    return storage;
}

/**
 * Get singleton Firebase app, and underlying sdk modules
 */
export function getFirebaseApp(settings?: { firestore?: FirestoreSettings; auth?: Dependencies }): {
    firebaseApp: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
    storage: FirebaseStorage;
} {
    let firebaseApp: FirebaseApp;
    let firestore: Firestore;
    let auth: Auth;
    let storage: FirebaseStorage;

    if (getApps().length === 0) {
        // Initialize App
        const config = getFirebaseConfig();
        firebaseApp = initializeApp(config);
        firestore = initializeFirestoreForEnv(firebaseApp, settings?.firestore ?? {});
        auth = initializeAuthForEnv(firebaseApp, settings?.auth ?? {});
        storage = initializeStorageForEnv(firebaseApp);
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
export function getFirestoreInstanceSettings(firestore: Firestore) {
    //@ts-expect-error
    const host = firestore._settings.host as string;
    //@ts-expect-error
    const projectId = firestore._databaseId.projectId as string;
    //@ts-expect-error
    const databaseId = firestore._databaseId.database as string;

    return { host, projectId, databaseId };
}
