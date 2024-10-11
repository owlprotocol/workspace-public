import { BlockTag, Hex } from "viem";

export function isBlockTag(blockTagOrNumberHex: Hex | BlockTag): blockTagOrNumberHex is BlockTag {
    const blockTags = ["latest", "earliest", "pending", "safe", "finalized"];
    return blockTags.includes(blockTagOrNumberHex);
}
