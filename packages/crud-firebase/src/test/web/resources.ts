import { itemCol, itemCompositeCol, itemChildCol } from "./collection.js";
import { firestore, getFirebaseResource } from "../../web/index.js";
import {
    ItemCompositeId,
    ItemData,
    ItemId,
    decodeItemCompositeId,
    decodeItemData,
    decodeItemId,
    encodeItemCompositeId,
    encodeItemData,
    encodeItemDataPartial,
    encodeItemId,
} from "../models/index.js";

/**
 * To keep patterns consistent, top-level collections are still functions
 * but we have them be a constant result to avoid unecessary gc.
 * */
export const itemResource = getFirebaseResource<ItemData, ItemId>(firestore, itemCol, {
    encodeId: encodeItemId,
    decodeId: decodeItemId,
    encodeDataPartial: encodeItemDataPartial,
    encodeData: encodeItemData,
    decodeData: decodeItemData,
});

/**
 * We recommend using zod to encode/decode ids and encode data
 * However, the library does not lock you into a specific implementation
 */
export const itemCompositeResource = getFirebaseResource<ItemData, ItemCompositeId>(firestore, itemCompositeCol, {
    encodeId: encodeItemCompositeId,
    decodeId: decodeItemCompositeId,
    encodeDataPartial: encodeItemDataPartial,
    encodeData: encodeItemData,
    decodeData: decodeItemData,
});

/**
 * Subcollections are collections tied to a document path
 * This subcollections is similar to itemComposite but
 * instead of `/itemComposite/{idPrefix}-{idSuffix}`
 * items will be at `/item/{id}/children/{idPrefix}-{idSuffix}`
 */
export const itemChildResource = getFirebaseResource<ItemData, ItemCompositeId, Required<ItemId>>(
    firestore,
    itemChildCol,
    {
        encodeId: encodeItemCompositeId,
        decodeId: decodeItemCompositeId,
        encodeDataPartial: encodeItemDataPartial,
        encodeData: encodeItemData,
        decodeData: decodeItemData,
        decodeParentDocId: decodeItemId,
        encodeParentDocId: encodeItemId,
    },
);

/**
 * Item resource with LRU Cache enabled up to 10 items
 * */
export const itemResourceCached = getFirebaseResource<ItemData, ItemId>(
    firestore,
    itemCol,
    {
        encodeId: encodeItemId,
        decodeId: decodeItemId,
        encodeDataPartial: encodeItemDataPartial,
        encodeData: encodeItemData,
        decodeData: decodeItemData,
    },
    { lruCacheSize: 10 },
);
