import {
    FIREBASE_DATABASE_URL,
    FIREBASE_MOCK,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID,
    FIREBASE_SERVICE_EMAIL,
    FIREBASE_STORAGE_BUCKET,
} from "@owlprotocol/envvars";
import { initializeApp, getApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import type { AppOptions } from "firebase-admin";
import { cert } from "firebase-admin/app";

function getFirebaseConfig() {
    let firebaseConfig: AppOptions = {};
    if (FIREBASE_MOCK === "false") {
        console.debug("Running production Firebase with API Keys");
        //Live Firebase Config
        if (
            !FIREBASE_PROJECT_ID ||
            !FIREBASE_PRIVATE_KEY ||
            !FIREBASE_SERVICE_EMAIL ||
            !FIREBASE_PROJECT_ID ||
            !FIREBASE_DATABASE_URL ||
            !FIREBASE_STORAGE_BUCKET
        ) {
            const message =
                "FIREBASE_PRIVATE_KEY, FIREBASE_SERVICE_EMAIL, FIREBASE_PROJECT_ID, FIREBASE_DATABASE_URL, and FIREBASE_STORAGE_BUCKET required for production";
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

function getFirebaseApp() {
    // Init the firebase app if not in test environment
    if (getApps().length === 0) {
        const config = getFirebaseConfig();
        //Initialize firestore
        const firebaseApp = initializeApp(config);
        const firestore = getFirestore(firebaseApp);
        firestore.settings({ ignoreUndefinedProperties: true });
        const auth = getAuth(firebaseApp);
        // NOTE: storage.apiEndpoint stores the prefix of each file's publicUrl
        const storage = getStorage(firebaseApp);

        return { firebaseApp, firestore, auth, storage };
    } else {
        const firebaseApp = getApp();
        const firestore = getFirestore(firebaseApp);
        const auth = getAuth(firebaseApp);
        // NOTE: storage.apiEndpoint stores the prefix of each file's publicUrl
        const storage = getStorage(firebaseApp);

        return { firebaseApp, firestore, auth, storage };
    }
}

export const { firebaseApp, firestore, auth, storage } = getFirebaseApp();

export const bucket = storage.bucket();
