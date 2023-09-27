import {
    FIREBASE_DATABASE_URL,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID,
    FIREBASE_SERVICE_EMAIL,
    FIREBASE_STORAGE_BUCKET,
    isProductionOrStaging,
} from "@owlprotocol/envvars";
import { initializeApp, getApp, getApps } from "firebase-admin/app";
import { getFirestore, CollectionReference } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import type { AppOptions } from "firebase-admin";
import { cert } from "firebase-admin/app";
import { User } from "../models/User.js";
import { Contract } from "../models/Contract.js";
import { MetadataContract } from "../models/MetadataContract.js";
import { MetadataTokens } from "../models/MetadataTokens.js";
import { RequestTemplate } from "../models/RequestTemplate.js";
import { ProjectTemplate } from "../models/ProjectTemplate.js";
import { Project } from "../models/Project.js";
import { Store } from "../models/Store.js";
import { StorePrivate } from "../models/StorePrivate.js";
import { CouponDefinition } from "../models/CouponDefinition.js";
import { CouponCampaign } from "../models/CouponCampaign.js";
import { CouponInstance } from "../models/CouponInstance.js";
import { Email } from "../models/Email.js";

function getFirebaseConfig() {
    let firebaseConfig: AppOptions = {};
    if (isProductionOrStaging()) {
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
        //Emulator Firebase Config
        firebaseConfig = {
            //https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks
            //Demo prefix forces connection to emulator
            projectId: `demo-${FIREBASE_PROJECT_ID}`,
            storageBucket: `demo-${FIREBASE_STORAGE_BUCKET}`,
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
