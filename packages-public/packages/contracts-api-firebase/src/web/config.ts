import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_MOCK,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    NODE_ENV,
} from "@owlprotocol/envvars";
import { FirebaseOptions, initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, collection, CollectionReference, connectFirestoreEmulator, Firestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { getStorage, connectStorageEmulator, FirebaseStorage } from "firebase/storage";
import {
    User,
    Contract,
    MetadataContract,
    MetadataTokens,
    RequestTemplate,
    ProjectTemplate,
    Project,
    Store,
    StorePrivate,
    CouponDefinition,
    CouponCampaign,
    CouponInstance,
    Email,
    UserPersonal,
    UserPrivate,
} from "../models/index.js";

function getFirebaseConfig() {
    let firebaseConfig: FirebaseOptions = {};
    if (FIREBASE_MOCK === "false") {
        console.debug("Running production Firebase with API Keys");
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
        console.debug("Running development Firebase with emulator");
        //Emulator Firebase Config
        firebaseConfig = {
            apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            //https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks
            //Demo prefix forces connection to emulator
            projectId: FIREBASE_PROJECT_ID.startsWith("demo-") ? FIREBASE_PROJECT_ID : `demo-${FIREBASE_PROJECT_ID}`,
            storageBucket: FIREBASE_STORAGE_BUCKET,
        };
    }

    return firebaseConfig;
}

/**
 * Get singleton Firebase app, and underlying sdk modules
 */
function getFirebaseApp(): { firebaseApp: FirebaseApp; firestore: Firestore; auth: Auth; storage: FirebaseStorage } {
    // Init the firebase app if not in test environment
    if (getApps().length === 0) {
        const config = getFirebaseConfig();
        //Initialize firestore
        const firebaseApp = initializeApp(config);
        const firestore = getFirestore(firebaseApp);
        const auth = getAuth(firebaseApp);
        // NOTE: storage.apiEndponit stores the prefix of each file's publicUrl
        const storage = getStorage(firebaseApp);

        //Initial setup & running in non-prod
        //Initialize Emulator
        if (NODE_ENV !== "production" && NODE_ENV !== "staging") {
            connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
            connectAuthEmulator(auth, "http://127.0.0.1:9099");
            connectStorageEmulator(storage, "127.0.0.1", 9199);
        }

        return { firebaseApp, firestore, auth, storage };
    } else {
        const firebaseApp = getApp();
        const firestore = getFirestore(firebaseApp);
        const auth = getAuth(firebaseApp);
        // NOTE: storage.apiEndponit stores the prefix of each file's publicUrl
        const storage = getStorage(firebaseApp);

        return { firebaseApp, firestore, auth, storage };
    }
}

export const { firebaseApp, firestore, auth, storage } = getFirebaseApp();

//TODO: Doesn't work, maybe see compat api?
//export const bucket: ReturnType<typeof storage.bucket> = storage.bucket();

//Collections
export const usersCol = collection(firestore, "users") as CollectionReference<User>;
export const usersPersonalCol = collection(firestore, "usersPersonal") as CollectionReference<UserPersonal>;
export const usersPrivateCol = collection(firestore, "usersPrivate") as CollectionReference<UserPrivate>;
export const projectTemplatesCol = collection(firestore, "projectTemplates") as CollectionReference<ProjectTemplate>;
export const projectsCol = collection(firestore, "projects") as CollectionReference<Project>;
export const requestTemplatesCol = collection(firestore, "requestTemplates") as CollectionReference<RequestTemplate>;
export const contractsCol = collection(firestore, "contracts") as CollectionReference<Contract>;
export const metadataContractsCol = collection(firestore, "metadataContracts") as CollectionReference<MetadataContract>;
export const metadataTokensCol = collection(firestore, "metadataTokens") as CollectionReference<MetadataTokens>;
export const storesCol = collection(firestore, "stores") as CollectionReference<Store>;
export const storePrivatesCol = collection(firestore, "storePrivates") as CollectionReference<StorePrivate>;
export const couponDefinitionsCol = collection(firestore, "couponDefinitions") as CollectionReference<CouponDefinition>;
export const couponCampaignsCol = collection(firestore, "couponCampaigns") as CollectionReference<CouponCampaign>;
export const couponInstancesCol = collection(firestore, "couponInstances") as CollectionReference<CouponInstance>;
export const emailsCol = collection(firestore, "emails") as CollectionReference<Email>;
