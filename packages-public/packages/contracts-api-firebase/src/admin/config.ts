import {
    FIREBASE_DATABASE_URL,
    FIREBASE_MOCK,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID,
    FIREBASE_SERVICE_EMAIL,
    FIREBASE_STORAGE_BUCKET,
} from "@owlprotocol/envvars";
import { initializeApp, getApp, getApps } from "firebase-admin/app";
import { getFirestore, CollectionReference } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import type { AppOptions } from "firebase-admin";
import { cert } from "firebase-admin/app";
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
} from "../models/index.js";

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
export const bucket = storage.bucket();

//Collections
export const usersCol = firestore.collection("users") as CollectionReference<User>;
export const projectTemplatesCol = firestore.collection("projectTempalates") as CollectionReference<ProjectTemplate>;
export const projectsCol = firestore.collection("projects") as CollectionReference<Project>;
export const requestTemplatesCol = firestore.collection("requestTemplates") as CollectionReference<RequestTemplate>;
export const contractsCol = firestore.collection("contracts") as CollectionReference<Contract>;
export const metadataContractsCol = firestore.collection("metadataContracts") as CollectionReference<MetadataContract>;
export const metadataTokensCol = firestore.collection("metadataTokens") as CollectionReference<MetadataTokens>;
export const storesCol = firestore.collection("stores") as CollectionReference<Store>;
export const storePrivatesCol = firestore.collection("storePrivates") as CollectionReference<StorePrivate>;
export const couponDefinitionsCol = firestore.collection("couponDefinitions") as CollectionReference<CouponDefinition>;
export const couponCampaignsCol = firestore.collection("couponCampaigns") as CollectionReference<CouponCampaign>;
export const couponInstancesCol = firestore.collection("couponInstances") as CollectionReference<CouponInstance>;
export const emailsCol = firestore.collection("emails") as CollectionReference<Email>;
