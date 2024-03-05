import { getFirebaseApp } from "./getConfig.js";

export const { firebaseApp, firestore, auth, storage } = getFirebaseApp();

export const bucket = storage.bucket();
