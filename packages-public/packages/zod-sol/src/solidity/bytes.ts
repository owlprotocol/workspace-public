import { SolidityBytes } from "abitype";
import { Hex } from "viem";
import { z } from "zod";

export const bytesZod = getSolidityBytesZod("bytes");
export const bytes32Zod = getSolidityBytesZod("bytes32");
export const bytes16Zod = getSolidityBytesZod("bytes16");
export const bytes8Zod = getSolidityBytesZod("bytes8");
export const bytes4Zod = getSolidityBytesZod("bytes4");

/**
 * Create zod validator that takes `bigint` input,
 * and returns bigint in given integer range.
 * Throws proper `ZodIssueCode.too_big` and `ZodIssueCode.too_small` errors.
 * @param name
 * @returns
 */
export function getSolidityBytesZod(name: SolidityBytes): z.ZodEffects<z.ZodString, Hex, Hex> {
    if (name === "bytes") {
        return z
            .string()
            .regex(/^0x[a-fA-F0-9]+$/)
            .describe("solidity bytes") as unknown as z.ZodEffects<z.ZodString, Hex, Hex>;
    }
    const size = parseInt(name.replace("bytes", ""));
    //Hexadecimal representation size 2 (0x) + size * 2 (2 nibbles = 1 byte)
    const sizeHex = 2 + size * 2;

    return z
        .string()
        .regex(/^0x[a-fA-F0-9]+$/)
        .length(sizeHex)
        .describe(`solidity bytes${size}`) as unknown as z.ZodEffects<z.ZodString, Hex, Hex>;
}
