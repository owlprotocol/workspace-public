import { ZodIssueCode, ZodTooBigIssue, z } from "zod";

/**
 *  Any type that can be used where a numeric value is needed.
 */
export type Numeric = number | bigint;

/**
 *  Any type that can be used where a big number is needed.
 */
export type BigNumberish = string | Numeric;

export const hexStringZod = z
    .string()
    .regex(/^0x[a-fA-F0-9]+$/)
    .describe("A hex string");
export const decimalStringZod = z
    .string()
    .regex(/^[0-9]+$/)
    .describe("A decimal string");

/***** Number *****/
/**
 * Match hex string that ould convert to JS number.
 * MUST be less than or equal to Number.MAX_SAFE_INTEGER (1fffffffffffff)
 */
export const numberHexStringZod = hexStringZod
    .refine((n) => BigInt(n) <= BigInt(Number.MAX_SAFE_INTEGER), {
        code: ZodIssueCode.too_big,
        maximum: Number.MAX_SAFE_INTEGER,
        inclusive: true,
        exact: true,
        type: "number",
    } as ZodTooBigIssue)
    .describe("A number hex string");

/**
 * Match decimal string that could convert to JS number.
 * MUST be less than or equal to Number.MAX_SAFE_INTEGER (9007199254740991)
 */
export const numberDecStringZod = decimalStringZod.refine((n) => BigInt(n) <= BigInt(Number.MAX_SAFE_INTEGER), {
    code: ZodIssueCode.too_big,
    maximum: Number.MAX_SAFE_INTEGER,
    inclusive: true,
    exact: true,
    type: "number",
} as ZodTooBigIssue);

/**
 * Match number, hex string, or decimal string that could convert to JS number.
 * MUST be less than or equal to Number.MAX_SAFE_INTEGER (9007199254740991)
 */
export const numberLikeZod = z.union([z.number(), numberHexStringZod, numberDecStringZod]);

/**
 * Match number, hex string, or decimal string and convert to JS number.
 * MUST be less than or equal to Number.MAX_SAFE_INTEGER (9007199254740991)
 */
export const numberLikeToNumberZod = z.union([
    z.number(),
    numberHexStringZod.transform((n) => parseInt(n, 16)),
    numberDecStringZod.transform((n) => parseInt(n, 10)),
]);

/**
 * Match number, hex string, or decimal string and convert to hex string.
 * MUST be less than or equal to Number.MAX_SAFE_INTEGER (9007199254740991)
 */
export const numberLikeToHexStringZod = z.union([
    z.number().transform((n) => "0x" + n.toString(16)),
    numberHexStringZod,
    numberDecStringZod.transform((n) => "0x" + parseInt(n).toString(16)),
]);

/***** BigInt *****/
/**
 * Match hex string that converts to JS bigint.
 */
export const bigIntHexStringZod = hexStringZod.describe("A bigint hex string");

/**
 * Match decimal string that converts to JS bigint.
 */
export const bigIntDecStringZod = decimalStringZod.describe("A bigint hex string");

/**
 * Match bigint, hex string, or decimal string that could convert to JS bigint.
 */
export const bigIntLikeZod = z.union([z.bigint(), bigIntHexStringZod, bigIntDecStringZod]);

/**
 * Match bigint, number, hex string, or decimal string and convert to JS bigint.
 */
export const bigIntLikeToBigIntZod = z.union([
    z.number().transform((n) => BigInt(n)),
    z.bigint(),
    bigIntHexStringZod.transform((n) => BigInt(n)),
    bigIntDecStringZod.transform((n) => BigInt(n)),
]);

/**
 * Match bigint, hex string, or decimal string and convert to hex string.
 */
export const bigIntLikeToHexStringZod = z.union([
    z.number().transform((n) => "0x" + n.toString(16)),
    z.bigint().transform((n) => "0x" + n.toString(16)),
    bigIntHexStringZod,
    bigIntDecStringZod.transform((n) => "0x" + BigInt(n).toString(16)),
]);
