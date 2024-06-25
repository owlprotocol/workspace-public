import { ItemId } from "./models/Item.js";

//Hacky join implementation
function join(...parameters: string[]) {
    return parameters.join("/");
}

export const itemPath = "item";
export const itemCompositePath = "itemComposite";
export const itemChildGroupPath = "children";
export const itemChildPath = (collectionId: Required<ItemId>) => join(itemPath, collectionId.id, itemChildGroupPath);
