import type { Bucket } from "@google-cloud/storage";
import { getFirebaseApp } from "./getConfig.js";
import { DEFAULT_FIRESTORE_EMULATOR_HOST } from "../common.js";

export const { firebaseApp, firestore, auth, storage } = getFirebaseApp();

export const bucket: Bucket = storage.bucket() as unknown as Bucket;

export const projectUrl = `http://${
    process.env["FIRESTORE_EMULATOR_HOST"] ?? DEFAULT_FIRESTORE_EMULATOR_HOST
}/emulator/v1/projects/${firebaseApp.options.projectId}/databases/(default)/documents`;

export function deleteEmulatorData(): Promise<Response> {
    return fetch(projectUrl, { method: "DELETE" });
}
