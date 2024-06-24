import { getFirebaseApp } from "./getConfig.js";
import { FIRESTORE_EMULATOR_HOST } from "../common.js";

export const { firebaseApp, firestore, auth, storage, config } = getFirebaseApp();

export const projectUrl = `http://${FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${config.projectId}/databases/(default)/documents`;

export function deleteEmulatorData(): Promise<Response> {
    return fetch(projectUrl, { method: "DELETE" });
}
