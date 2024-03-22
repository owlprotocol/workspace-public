import { ZodIssueCode, ZodTooBigIssue, ZodTooSmallIssue, z } from "zod";
import { bigIntLikeToBigIntZod } from "../eth/math.js";

/**
 * Create zod validator with string coerce to parse uintX
 * @deprecated
 * @param name
 * @returns
 */
export function integerZod(name: string) {
    const signed = name.startsWith("int");
    const bitLenStr = signed ? name.replace("int", "") : name.replace("uint", "");
    const bitLen = BigInt(bitLenStr);

    const max = signed ? 2n ** (bitLen - 1n) : 2n ** bitLen - 1n;
    const min = signed ? 0n - 2n ** (bitLen - 1n) : 0n;
    /*z.preprocess((p) => {
            if (typeof p === "string") return p;
            else if (typeof p === "number") return `${p}`;
            else if ((p as any).toString) return (p as any).toString();
            else throw new Error(`${p} cannot be converted to string`);
        }, z.string())
        */
    return z.coerce
        .string()
        .transform((s) => {
            //TODO: This is due to a weird bug or impromper coercion
            //1. zod-to-json-schem calls isOptional() to convert to JSON schema zod-to-json-schema/src/parsers/object.js:61:31
            //2. zod calls isOptional calls safeParse(undefined).success zod/lib/index.mjs:806:21
            //3. zod calls safeParse(undefined) (this gets coerced to "undefined")
            if (s === undefined || s === "undefined") {
                //throw new Error(`${name}Zod cannot convert undefined`)
                return BigInt(0); //WARNING: this is not good behaviour
            }
            return BigInt(s);
        })
        .refine((x) => {
            return min <= x && x <= max;
        })
        .transform((x) => x.toString())
        .describe(`A solidity ${name}`);
}

export const uint256Zod = integerZod("uint256");
export const uint128Zod = integerZod("uint128");
export const uint96Zod = integerZod("uint96");
export const uint64Zod = integerZod("uint64");
export const uint32Zod = integerZod("uint32");
export const uint16Zod = integerZod("uint16");
export const uint8Zod = integerZod("uint8");

export const int256Zod = integerZod("int256");
export const int128Zod = integerZod("int128");
export const int96Zod = integerZod("int96");
export const int64Zod = integerZod("int64");
export const int32Zod = integerZod("int32");
export const int16Zod = integerZod("int16");
export const int8Zod = integerZod("int8");

type IntSign = "uint" | "int";
type IntSize = 8 | 16 | 32 | 64 | 96 | 128 | 256;
type IntType = `${IntSign}${IntSize}`;

/**
 * Create zod validator that takes `bigint` input,
 * and returns bigint in given integer range.
 * Throws proper `ZodIssueCode.too_big` and `ZodIssueCode.too_small` errors.
 * @param name
 * @returns
 */
export function bigIntSolidityIntegerZod(name: IntType) {
    const signed = name.startsWith("int");
    const bitLenStr = signed ? name.replace("int", "") : name.replace("uint", "");
    const bitLen = BigInt(bitLenStr);

    const max = signed ? 2n ** (bitLen - 1n) : 2n ** bitLen - 1n;
    const min = signed ? 0n - 2n ** (bitLen - 1n) : 0n;

    return z.bigint().lte(max).gte(min).describe(`A solidity ${name}`);
}

export const uint256BigIntZod = bigIntSolidityIntegerZod("uint256");
export const uint128BigIntZod = bigIntSolidityIntegerZod("uint128");
export const uint96BigIntZod = bigIntSolidityIntegerZod("uint96");
export const uint64BigIntZod = bigIntSolidityIntegerZod("uint64");

/**
 * Create zod validator that takes `bigint`-like input (bigint, number, hex string, decimal string),
 * and returns bigint in given integer range.
 * Throws proper `ZodIssueCode.too_big` and `ZodIssueCode.too_small` errors.
 * @param name
 * @returns
 */
export function bigIntLikeSolidityIntegerZod(name: IntType) {
    const signed = name.startsWith("int");
    const bitLenStr = signed ? name.replace("int", "") : name.replace("uint", "");
    const bitLen = BigInt(bitLenStr);

    const max = signed ? 2n ** (bitLen - 1n) : 2n ** bitLen - 1n;
    const min = signed ? 0n - 2n ** (bitLen - 1n) : 0n;

    return bigIntLikeToBigIntZod
        .refine((n) => n <= max, {
            code: ZodIssueCode.too_big,
            maximum: max,
            inclusive: true,
            exact: true,
            type: "bigint",
        } as ZodTooBigIssue)
        .refine((n) => n >= min, {
            code: ZodIssueCode.too_small,
            minimum: min,
            inclusive: true,
            exact: true,
            type: "bigint",
        } as ZodTooSmallIssue)
        .describe(`A solidity ${name}`);
}

export const uint256BigIntLikeZod = bigIntLikeSolidityIntegerZod("uint256");
export const uint128BigIntLikeZod = bigIntLikeSolidityIntegerZod("uint128");
export const uint96BigIntLikeZod = bigIntLikeSolidityIntegerZod("uint96");
export const uint64BigIntLikeZod = bigIntLikeSolidityIntegerZod("uint64");
