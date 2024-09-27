import type { Bucket } from "@google-cloud/storage";
import { getFirebaseApp, getFirestoreSettings } from "./getConfig.js";

export const { firebaseApp, firestore, auth, storage } = getFirebaseApp();

export const bucket: Bucket = storage.bucket() as unknown as Bucket;

export function deleteEmulatorData(): Promise<Response> {
    const { host, projectId, databaseId } = getFirestoreSettings(firestore);
    const url = `http://${host}/emulator/v1/projects/${projectId}/databases/${databaseId}/documents`;

    return fetch(url, { method: "DELETE" });
}
