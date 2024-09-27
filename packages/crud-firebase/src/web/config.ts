import { getFirebaseApp, getFirestoreSettings } from "./getConfig.js";

export const { firebaseApp, firestore, auth, storage, config } = getFirebaseApp();

export function deleteEmulatorData(): Promise<Response> {
    const { host, projectId, databaseId } = getFirestoreSettings(firestore);

    const url = `http://${host}/emulator/v1/projects/${projectId}/databases/${databaseId}/documents`;
    return fetch(url, { method: "DELETE" });
}
