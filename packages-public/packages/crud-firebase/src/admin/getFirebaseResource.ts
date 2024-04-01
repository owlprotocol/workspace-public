/***** Generics for Firebase Admin CRUD *****/
import { getFirebaseQueryResource } from "./getFirebaseQueryResource.js";
import {
    deleteDoc,
    deleteDocTransaction,
    exists,
    getColRef,
    getDoc,
    getDocRef,
    getDocTransaction,
    runTransaction,
    setDoc,
    setDocTransaction,
    updateDoc,
    updateDocTransaction,
} from "./document.js";
import { DecodeRef } from "../getDecodeRefSnapshot.js";
import {
    FirebaseResourceFactory,
    ResourceIdDefault,
    ResourceDataValidators,
    ResourceIdValidators,
} from "../resource.js";
import type { Firestore } from "../document.js";
import { getFirebaseResourceForSdk } from "../getFirebaseResource.js";

/**
 * Firebase Resource. create, get, getAll, update, delete, deleteAll and more
 * @template ResourceData Resource data
 * @template ResourceIdPartial Resource id params
 * @param firestore Firestore instance
 * @param collectionPath Collection path (eg. `/users`)
 * @param validators Validators for id and data.
 * @param options Cache options
 * @returns wrapper functions for access Firebase
 */
export const getFirebaseResource = getFirebaseResourceForSdk<"admin">({
    getColRef,
    getDocRef,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    exists,
    runTransaction,
    getDocTransaction,
    setDocTransaction,
    updateDocTransaction,
    deleteDocTransaction,
    getFirebaseQueryResource,
});

/**
 * Return factory function for generating Firebase resource when dealing with subcollections.
 * @template CollectionId Subcollection Params
 * @template ResourceData Resource data
 * @template ResourceIdPartial Resource id params
 * @param firestore Firestore instance
 * @param collectionPathTemplate Template string to generate collection (eg. `/project/{projectId}/contract`)
 * @param validators Validators for id and data.
 */
export function getFirebaseResourceFactory<
    CollectionId extends Record<string, any>,
    ResourceData extends Record<string, any>,
    ResourceIdPartial extends Record<string, any> = ResourceIdDefault,
>(
    firestore: Firestore<"admin">,
    collectionPathTemplate: string,
    validators: DecodeRef<Required<ResourceIdPartial>> &
        ResourceDataValidators<ResourceData> &
        ResourceIdValidators<ResourceIdPartial>,
): FirebaseResourceFactory<"admin", CollectionId, ResourceData, ResourceIdPartial> {
    return function getFirebaseResource2(params: CollectionId) {
        const collectionPath = Object.entries(params).reduce(
            (acc, [key, val]) => acc.replace(`{${key}}`, val),
            collectionPathTemplate,
        );
        return getFirebaseResource(firestore, collectionPath, validators);
    };
}
