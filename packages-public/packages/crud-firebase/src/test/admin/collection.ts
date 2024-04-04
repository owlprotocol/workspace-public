import { firestore } from "../../admin/config.js";
import { getColRef } from "../../admin/document.js";
import { itemCompositePath, itemPath, itemSubPath } from "../collections.js";
import { ItemData, ItemId } from "../models/Item.js";

export const itemCol = getColRef<ItemData>(firestore, itemPath);
export const itemCompositeCol = getColRef<ItemData>(firestore, itemCompositePath);
export const itemSubCol = (collectionId: Required<ItemId>) => getColRef<ItemData>(firestore, itemSubPath(collectionId));
