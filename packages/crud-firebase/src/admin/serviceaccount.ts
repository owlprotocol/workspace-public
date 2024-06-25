/*
//DEPRECATED, simply use CLI
import { FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID, FIREBASE_SERVICE_EMAIL } from "@owlprotocol/envvars";
import { google } from "googleapis";
import { join } from "path";

const scopes = ["https://www.googleapis.com/auth/cloud-platform", "https://www.googleapis.com/auth/datastore"];
const auth = new google.auth.GoogleAuth({
    credentials: {
        private_key: FIREBASE_PRIVATE_KEY!,
        client_email: FIREBASE_SERVICE_EMAIL,
        project_id: FIREBASE_PROJECT_ID,
    },
    scopes,
});

const clientV1 = google.firestore({
    version: "v1",
    auth,
});
const database = "(default)";
const databasePath = join("projects", FIREBASE_PROJECT_ID, "databases", database);

//Fetch collectionGroup custom fields
const fields = await clientV1.projects.databases.collectionGroups.fields.list({
    parent: join(databasePath, "collectionGroups", "projectApiKey"),
    filter: "indexConfig.usesAncestorConfig:false",
});
console.debug(fields.data.fields[0].indexConfig?.indexes);

const result = await clientV1.projects.databases.collectionGroups.indexes.create({
    parent: join(databasePath, "collectionGroups", "erc271"),
    requestBody: {
        queryScope: "COLLECTION_GROUP",
        fields: [
            {
                fieldPath: "owner",
                order: "ASCENDING",
            },
        ],
    },
});
console.debug(result);

//TODO: Group query composite indexes
//Fetch collectionGroup indexes
const indexes = await clientV1.projects.databases.collectionGroups.indexes.list({
parent: join(databasePath, "collectionGroups", "projectApiKey"),
});
console.debug(indexes.data.indexes);

//Still fails after adding the following oles
//- Cloud Datastore Owner
//- Cloud Datastore Index Admin
//-
*/
export {};
