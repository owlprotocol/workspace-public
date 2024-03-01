import { collectionGroup, Query } from "firebase/firestore";
import { childrenColGroupPath } from "../collections.js";
import { ItemCompositeId, ItemData, ItemId } from "../models/index.js";
import { firestore, getFirebaseQueryResource } from "../../web/index.js";

/**
 * Collection group query on `/children` path
 * will match the subcollection `/item/{id}/children/{idPrefix}-{idSuffix}`
 */
const childrenColGroup = collectionGroup(firestore, childrenColGroupPath) as Query<ItemData>;
export const childrenGroupQuery = getFirebaseQueryResource<ItemData, ItemCompositeId, Required<ItemId>>(
    childrenColGroup,
    {
        decodeId: (id) => {
            const [idPrefix, idSuffix] = id.split("-");
            return { idPrefix, idSuffix };
        },
        decodeParentDocId: (id: string) => {
            return { id };
        },
        validateDataPartial: (itemComposite) => itemComposite,
    },
);
