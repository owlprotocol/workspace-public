import { firestore, getFirebaseResource, getFirebaseResourceFactory } from "../../web/index.js";
import { uuidDecodeId, uuidEncodeId } from "../../resource.js";
import { itemCompositePath, itemPath, itemSubcollection } from "../collections.js";
import { ItemCompositeId, ItemData, ItemId, validateItemData, validateItemDataPartial } from "../models/index.js";

/**
 * To keep patterns consistent, top-level collections are still functions
 * but we have them be a constant result to avoid unecessary gc.
 * */
const itemResourceInternal = getFirebaseResource<ItemData, ItemId>(firestore, itemPath, {
    encodeId: uuidEncodeId,
    decodeId: uuidDecodeId,
    validateDataPartial: validateItemDataPartial,
    validateData: validateItemData,
});
export const itemResource = () => itemResourceInternal;

/**
 * We recommend using zod to encode/decode ids and validate data
 * However, the library does not lock you into a specific implementation
 */
const itemCompositeResourceInternal = getFirebaseResource<ItemData, ItemCompositeId>(firestore, itemCompositePath, {
    encodeId: (idParams) => (typeof idParams === "string" ? idParams : `${idParams.idPrefix}-${idParams.idSuffix}`),
    decodeId: (id) => {
        const [idPrefix, idSuffix] = id.split("-");
        return { idPrefix, idSuffix };
    },
    validateDataPartial: validateItemDataPartial,
    validateData: validateItemData,
});
export const itemCompositeResource = () => itemCompositeResourceInternal;

/**
 * Subcollections are collections tied to a document path
 * This subcollections is similar to itemComposite but
 * instead of `/itemComposite/{idPrefix}-{idSuffix}`
 * items will be at `/item/{id}/children/{idPrefix}-{idSuffix}`
 */
export const itemSubcollectionResource = getFirebaseResourceFactory<Required<ItemId>, ItemData, ItemCompositeId>(
    firestore,
    itemSubcollection,
    {
        encodeId: (idParams) => (typeof idParams === "string" ? idParams : `${idParams.idPrefix}-${idParams.idSuffix}`),
        decodeId: (id) => {
            const [idPrefix, idSuffix] = id.split("-");
            return { idPrefix, idSuffix };
        },
        validateDataPartial: validateItemDataPartial,
        validateData: validateItemData,
    },
);

/**
 * Item resource with LRU Cache enabled up to 10 items
 * */
const itemResourceCachedInternal = getFirebaseResource<ItemData, ItemId>(
    firestore,
    itemPath,
    {
        encodeId: uuidEncodeId,
        decodeId: uuidDecodeId,
        validateDataPartial: validateItemDataPartial,
        validateData: validateItemData,
    },
    { lruCacheSize: 10 },
);
export const itemResourceCached = () => itemResourceCachedInternal;
