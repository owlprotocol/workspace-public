import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    NODE_ENV,
} from "@owlprotocol/envvars";
import { FirebaseOptions, initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, CollectionReference, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { User } from "../models/User.js";
import { Contract } from "../models/Contract.js";
import { MetadataContract } from "../models/MetadataContract.js";
import { MetadataTokens } from "../models/MetadataTokens.js";
import { RequestTemplate } from "../models/RequestTemplate.js";

function getFirebaseConfig() {
    let firebaseConfig: FirebaseOptions = {};
    if (NODE_ENV === "production") {
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
        //Emulator Firebase Config
        firebaseConfig = {
            apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            //https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks
            //Demo prefix forces connection to emulator
            projectId: `demo-${FIREBASE_PROJECT_ID}`,
            storageBucket: `demo-${FIREBASE_STORAGE_BUCKET}`,
        };
    }

    return firebaseConfig;
}

function getFirebaseApp() {
    // Init the firebase app if not in test environment
    if (getApps().length === 0) {
        const config = getFirebaseConfig();
        //Initialize firestore
        return initializeApp(config);
    } else {
        return getApp();
    }
}

export const firebaseApp = getFirebaseApp();
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
// NOTE: storage.apiEndponit stores the prefix of each file's publicUrl
export const storage = getStorage(firebaseApp);

if (NODE_ENV !== "production") {
    connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectStorageEmulator(storage, "127.0.0.1", 9199);
}
//TODO: Doesn't work, maybe see compat api?
//export const bucket: ReturnType<typeof storage.bucket> = storage.bucket();

//Collections
export const usersCol = collection(firestore, "users") as CollectionReference<User>;
export const requestTemplatesCol = collection(firestore, "requestTemplates") as CollectionReference<RequestTemplate>;
export const contractsCol = collection(firestore, "contracts") as CollectionReference<Contract>;
export const metadataContractsCol = collection(firestore, "metadataContracts") as CollectionReference<MetadataContract>;
export const metadataTokensCol = collection(firestore, "metadataTokens") as CollectionReference<MetadataTokens>;
