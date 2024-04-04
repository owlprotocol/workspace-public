import { collectionGroup } from "firebase/firestore";
import { ItemCompositeId, ItemData, ItemId } from "../models/index.js";
import { firestore, getFirebaseQueryResource } from "../../web/index.js";
import { Query } from "../../query.js";
import { itemSubGroupPath } from "../collections.js";

/**
 * Collection group query on `/children` path
 * will match the subcollection `/item/{id}/children/{idPrefix}-{idSuffix}`
 */
const childrenColGroup = collectionGroup(firestore, itemSubGroupPath) as Query<"web", ItemData>;
export const childrenGroupQuery = getFirebaseQueryResource<
    ItemData,
    ItemCompositeId,
    Required<ItemId>,
    ItemData,
    ItemData,
    Query<"web", ItemData>
>(childrenColGroup, {
    decodeId: (id) => {
        const [idPrefix, idSuffix] = id.split("-");
        return { idPrefix, idSuffix };
    },
    decodeParentDocId: (id: string) => {
        return { id };
    },
});
