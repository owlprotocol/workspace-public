import { SolidityBytes } from "abitype";
import { z } from "zod";

export const bytesZod = z
    .string()
    .regex(/^0x[a-fA-F0-9]+$/)
    .describe("An arbitrary length byte array");

//TODO: Length checks
export const bytes32Zod = z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/)
    .describe("A solidity bytes32");
export const bytes16Zod = z
    .string()
    .regex(/^0x[a-fA-F0-9]{32}$/)
    .describe("A solidity bytes16");
export const bytes8Zod = z
    .string()
    .regex(/^0x[a-fA-F0-9]{16}$/)
    .describe("A solidity bytes8");
export const bytes4Zod = z
    .string()
    .regex(/^0x[a-fA-F0-9]{8}$/)
    .describe("A solidity bytes4");

/**
 * Create zod validator that takes `bigint` input,
 * and returns bigint in given integer range.
 * Throws proper `ZodIssueCode.too_big` and `ZodIssueCode.too_small` errors.
 * @param name
 * @returns
 */
export function getSolidityBytesZod(name: SolidityBytes) {
    if (name === "bytes") {
        return z
            .string()
            .regex(/^0x[a-fA-F0-9]$/)
            .describe("solidity bytes");
    }
    const size = parseInt(name.replace("bytes", ""));
    //Hexadecimal representation size 2 (0x) + size * 2 (2 nibbles = 1 byte)
    const sizeHex = 2 + size * 2;

    return z
        .string()
        .regex(/^0x[a-fA-F0-9]$/)
        .length(sizeHex)
        .describe(`solidity bytes${size}`);
}
