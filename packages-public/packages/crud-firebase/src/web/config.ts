import { getFirebaseApp } from "./getConfig.js";

export const { firebaseApp, firestore, auth, storage } = getFirebaseApp();
