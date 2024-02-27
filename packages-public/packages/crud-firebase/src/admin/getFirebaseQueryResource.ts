/***** Generics for Firebase Admin CRUD *****/
import { Query } from "firebase-admin/firestore";
import { getFirebaseQuerySnapshot } from "./getFirebaseQuerySnapshot.js";
import { DecodeRef, getDecodeRefSnapshot } from "./getDecodeRefSnapshot.js";
import { ResourceQueryOptions, FirebaseQueryResource, ResourceDataValidators } from "../resource.js";

export interface ResourceAccessControl<ResourceData, AccessControlParams = never> {
    readAccessCheck?: (item: ResourceData, accessParams: AccessControlParams) => boolean;
    setAccessCheck?: (item: ResourceData, accessParams: AccessControlParams) => boolean;
    updateAccessCheck?: (item: Partial<ResourceData>, accessParams: AccessControlParams) => boolean;
    deleteAccessCheck?: (item: ResourceData, accessParams: AccessControlParams) => boolean;
}

/**
 * Firebase Query Resource. To be used with Collection or CollectionGroup.
 * Only read queries are supported (no write or id-based access).
 * - getAll, getWhere, getWhereCount, getWhereFirst
 * @template ResourceData Resource data
 * @template ResourceId Resource id params
 * @template AccessControlParams Resource server-side access control check params
 * @param col Firestore Collection Reference or CollectionGroup
 * @param validators Validators for decoding id and validating query data.
 * @param options Access control functions for firebase admin. (Firestore Rules don't apply on admin)
 * @returns wrapper functions for access Firebase
 */
export function getFirebaseQueryResource<
    ResourceData extends Record<string, any>,
    ResourceId extends Record<string, any>,
    CollectionId extends Record<string, any> = Record<string, never>,
    AccessControlParams extends any[] = [],
>(
    col: Query<ResourceData>,
    validators: DecodeRef<Required<ResourceId>, CollectionId> &
        Pick<ResourceDataValidators<ResourceData>, "validateDataPartial">,
    options?: Pick<ResourceAccessControl<ResourceData, AccessControlParams>, "readAccessCheck">,
) {
    type Resource = CollectionId & Required<ResourceId> & ResourceData;

    const validateDataPartial = validators.validateDataPartial;
    const decodeRefSnapshot = getDecodeRefSnapshot<ResourceData, Required<ResourceId>, CollectionId>(validators);

    const { readAccessCheck } = options ?? {};
    const colQuerySnapshot = getFirebaseQuerySnapshot(col, validateDataPartial, decodeRefSnapshot);

    /**
     * Get all docs
     * @params security checks
     * @returns docs
     */
    const getAll = async (options?: ResourceQueryOptions, accessParams?: AccessControlParams): Promise<Resource[]> => {
        let data = await colQuerySnapshot.getAll(options);
        //Filter un-authorized results
        if (accessParams && readAccessCheck) {
            data = data.filter((item) => readAccessCheck(item, accessParams));
        }
        return data;
    };

    /**
     * Get docs that match filter
     * @param filter
     * @param options limit, orderBy, order
     * @params security checks
     * @returns docs
     */
    const getWhere = async (
        filter: Partial<ResourceData>,
        options?: ResourceQueryOptions,
        accessParams?: AccessControlParams,
    ): Promise<Resource[]> => {
        let data = await colQuerySnapshot.getWhere(filter, options); //Filter un-authorized results

        if (accessParams && readAccessCheck) {
            data = data.filter((item) => readAccessCheck(item, accessParams));
        }

        return data;
    };

    /**
     * Get first doc that matches filter
     * @param filter
     * @param options orderBy, order
     * @param security checks
     * @returns
     */
    const getWhereFirst = async (
        filter: Partial<ResourceData>,
        options?: Omit<ResourceQueryOptions, "limit">,
        accessParams?: AccessControlParams,
    ): Promise<Resource | undefined> => {
        const snapshot = await colQuerySnapshot.getWhereSnapshot(filter, options);
        const dataRef = snapshot.docs[0];
        const data = dataRef.data();

        //check read access
        if (data && accessParams && readAccessCheck && !readAccessCheck(data, accessParams)) {
            throw new Error(`${dataRef.ref.path} permission-denied`);
        }

        return decodeRefSnapshot(dataRef);
    };

    const resource = {
        getAll,
        getWhere,
        getWhereCount: colQuerySnapshot.getWhereCount,
        getWhereFirst,
    } satisfies FirebaseQueryResource<ResourceData, ResourceId>;

    return {
        _getWhereQuery: colQuerySnapshot._getWhereQuery,
        ...resource,
    };
}
