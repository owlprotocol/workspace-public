/***** Generics for Firebase Web CRUD *****/
import { Query } from "firebase/firestore";
import { getFirebaseQuerySnapshot } from "./getFirebaseQuerySnapshot.js";
import { DecodeRef, getDecodeRefSnapshot } from "./getDecodeRefSnapshot.js";
import { FirebaseQueryResource, ResourceDataValidators } from "../resource.js";

/**
 * Firebase Query Resource. To be used with Collection or CollectionGroup.
 * Only read queries are supported (no write or id-based access).
 * - getAll, getWhere, getWhereCount, getWhereFirst
 * @template ResourceData Resource data
 * @template ResourceId Resource id params
 * @param col Firestore Collection Reference or CollectionGroup (technically any query will do)
 * @param validators Validators for decoding id and validating query data.
 * @returns wrapper functions for access Firebase
 */
export function getFirebaseQueryResource<
    ResourceData extends Record<string, any>,
    ResourceId extends Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
>(
    col: Query<ResourceData>,
    validators: DecodeRef<Required<ResourceId>, CollectionId> &
        Pick<ResourceDataValidators<ResourceData>, "validateDataPartial">,
) {
    type Resource = CollectionId & Required<ResourceId> & ResourceData;

    const validateDataPartial = validators.validateDataPartial;
    const decodeRefSnapshot = getDecodeRefSnapshot<ResourceData, Required<ResourceId>, CollectionId>(validators);

    const { getAllSnapshot, getAll, _getWhereQuery, getWhereSnapshot, getWhere, getWhereFirst, getWhereCount } =
        getFirebaseQuerySnapshot<ResourceData, Resource>(col, validateDataPartial, decodeRefSnapshot);

    const resource = {
        getAll,
        getWhere,
        getWhereCount,
        getWhereFirst,
    } satisfies FirebaseQueryResource<CollectionId & ResourceData, ResourceId>;

    return {
        getAllSnapshot,
        _getWhereQuery,
        getWhereSnapshot,
        ...resource,
    };
}
