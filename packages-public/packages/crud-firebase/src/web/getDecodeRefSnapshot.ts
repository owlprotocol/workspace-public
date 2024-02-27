import { DocumentReference, QueryDocumentSnapshot } from "firebase/firestore";

export interface DecodeRef<
    ResourceId extends Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
> {
    decodeRef?: (ref: DocumentReference) => ResourceId;
    decodeId?: (id: string) => ResourceId;
    decodeParentDocRef?: CollectionId extends Record<string, never>
        ? undefined
        : (ref: DocumentReference) => CollectionId;
    decodeParentDocId?: CollectionId extends Record<string, never> ? undefined : (id: string) => CollectionId;
}

export function getDecodeRefSnapshot<
    ResourceData extends Record<string, any>,
    ResourceId extends Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
>(validators?: DecodeRef<ResourceId, CollectionId>) {
    type Resource = CollectionId & ResourceId & ResourceData;

    const { decodeRef, decodeId, decodeParentDocRef, decodeParentDocId } = validators ?? {};

    return function decodeRefSnapshot(refSnapshot: QueryDocumentSnapshot<ResourceData>): Resource {
        const parentDoc = refSnapshot.ref.parent.parent;
        if (!parentDoc) {
            if (decodeParentDocRef) {
                throw new Error(`${refSnapshot.ref.path} is not a subcollection but decodeCollectionDocRef defined`);
            } else if (decodeParentDocId) {
                throw new Error(`${refSnapshot.ref.path} is not a subcollection but decodeCollectionDocId defined`);
            }
        }

        return {
            ...refSnapshot.data(),
            ...(decodeRef ? decodeRef(refSnapshot.ref) : {}),
            ...(decodeId ? decodeId(refSnapshot.id) : {}),
            ...(decodeParentDocRef ? decodeParentDocRef(parentDoc!) : {}),
            ...(decodeParentDocId ? decodeParentDocId(parentDoc!.id) : {}),
        } as Resource;
    };
}
