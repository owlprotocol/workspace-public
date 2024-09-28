import { getFirebaseApp, getFirestoreInstanceSettings } from "./getConfig.js";

export const { firebaseApp, firestore, auth, storage } = getFirebaseApp();

export function deleteEmulatorData(): Promise<Response> {
    const { host, projectId, databaseId } = getFirestoreInstanceSettings(firestore);

    const url = `http://${host}/emulator/v1/projects/${projectId}/databases/${databaseId}/documents`;
    return fetch(url, { method: "DELETE" });
}
