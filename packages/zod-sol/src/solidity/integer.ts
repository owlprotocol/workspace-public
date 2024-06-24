import { ZodIssueCode, ZodTooBigIssue, ZodTooSmallIssue, z } from "zod";
import { SolidityInt } from "abitype";
import { Hex } from "viem";
import { bigIntLikeZod, hexOrDecimalStringZod } from "../eth/math.js";

/**
 * Match hex/decimal
 * Transform to decimal
 * @throws `ZodIssueCode.too_big` if > max solidity uint/int value
 * @throws `ZodIssueCode.too_small` if < min solidity uint/int value
 * @param name solidity integer type
 * @returns
 */
export function getSolidityIntStringToDecimalZod(name: SolidityInt): z.ZodEffects<z.ZodString, string, string> {
    return getSolidityIntStringZod(name).transform((n) => n.toString(10)) as unknown as z.ZodEffects<
        z.ZodString,
        string,
        string
    >;
}

/** @deprecated use `uintXIntStringZod`  */
export const uint256Zod = getSolidityIntStringToDecimalZod("uint256");
/** @deprecated use `uintXIntStringZod`  */
export const uint128Zod = getSolidityIntStringToDecimalZod("uint128");
/** @deprecated use `uintXIntStringZod`  */
export const uint96Zod = getSolidityIntStringToDecimalZod("uint96");
/** @deprecated use `uintXIntStringZod`  */
export const uint64Zod = getSolidityIntStringToDecimalZod("uint64");
/** @deprecated use `uintXIntStringZod`  */
export const uint32Zod = getSolidityIntStringToDecimalZod("uint32");
/** @deprecated use `uintXIntStringZod`  */
export const uint16Zod = getSolidityIntStringToDecimalZod("uint16");
/** @deprecated use `uintXIntStringZod`  */
export const uint8Zod = getSolidityIntStringToDecimalZod("uint8");

/** @deprecated use `uintXIntStringZod`  */
export const int256Zod = getSolidityIntStringToDecimalZod("int256");
/** @deprecated use `uintXIntStringZod`  */
export const int128Zod = getSolidityIntStringToDecimalZod("int128");
/** @deprecated use `uintXIntStringZod`  */
export const int96Zod = getSolidityIntStringToDecimalZod("int96");
/** @deprecated use `uintXIntStringZod`  */
export const int64Zod = getSolidityIntStringToDecimalZod("int64");
/** @deprecated use `uintXIntStringZod`  */
export const int32Zod = getSolidityIntStringToDecimalZod("int32");
/** @deprecated use `uintXIntStringZod`  */
export const int16Zod = getSolidityIntStringToDecimalZod("int16");
/** @deprecated use `uintXIntStringZod`  */
export const int8Zod = getSolidityIntStringToDecimalZod("int8");

/**
 * Match hex/decimal
 * Transform to bigint
 * @throws `ZodIssueCode.too_big` if > max solidity uint/int value
 * @throws `ZodIssueCode.too_small` if < min solidity uint/int value
 * @param name solidity integer type
 * @returns
 */
export function getSolidityIntStringZod(name: SolidityInt): z.ZodEffects<z.ZodString, bigint, string> {
    const nameSanitized = name === "uint" ? "uint256" : name === "int" ? "int256" : name;
    const signed = nameSanitized.startsWith("int");
    const bitLenStr = signed ? nameSanitized.replace("int", "") : nameSanitized.replace("uint", "");
    const bitLen = BigInt(bitLenStr);

    const max = signed ? 2n ** (bitLen - 1n) : 2n ** bitLen - 1n;
    const min = signed ? 0n - 2n ** (bitLen - 1n) : 0n;

    return hexOrDecimalStringZod
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
        .describe(`A solidity ${name}`) as unknown as z.ZodEffects<z.ZodString, bigint, string>;
}

export const uint256StringZod = getSolidityIntStringZod("uint256");
export const uint128StringZod = getSolidityIntStringZod("uint128");
export const uint96StringZod = getSolidityIntStringZod("uint96");
export const uint64StringZod = getSolidityIntStringZod("uint64");
export const uint32StringZod = getSolidityIntStringZod("uint32");
export const uint16StringZod = getSolidityIntStringZod("uint16");
export const uint8StringZod = getSolidityIntStringZod("uint8");

export const int256StringZod = getSolidityIntStringZod("int256");
export const int128StringZod = getSolidityIntStringZod("int128");
export const int96StringZod = getSolidityIntStringZod("int96");
export const int64StringZod = getSolidityIntStringZod("int64");
export const int32StringZod = getSolidityIntStringZod("int32");
export const int16StringZod = getSolidityIntStringZod("int16");
export const int8StringZod = getSolidityIntStringZod("int8");

/**
 * Match bigint
 * @throws `ZodIssueCode.too_big` if > max solidity uint/int value
 * @throws `ZodIssueCode.too_small` if < min solidity uint/int value
 * @param name solidity integer type
 * @returns zod validator
 */
export function getSolidityIntZod(name: SolidityInt): z.ZodBigInt {
    const nameSanitized = name === "uint" ? "uint256" : name === "int" ? "int256" : name;
    const signed = nameSanitized.startsWith("int");
    const bitLenStr = signed ? nameSanitized.replace("int", "") : nameSanitized.replace("uint", "");
    const bitLen = BigInt(bitLenStr);

    const max = signed ? 2n ** (bitLen - 1n) : 2n ** bitLen - 1n;
    const min = signed ? 0n - 2n ** (bitLen - 1n) : 0n;

    return z.bigint().lte(max).gte(min).describe(`A solidity ${nameSanitized}`);
}

export const uint256BigIntZod = getSolidityIntZod("uint256");
export const uint128BigIntZod = getSolidityIntZod("uint128");
export const uint96BigIntZod = getSolidityIntZod("uint96");
export const uint64BigIntZod = getSolidityIntZod("uint64");

/**
 * Match bigint/number/hex/decimal
 * Transform to bigint
 * @throws `ZodIssueCode.too_big` if > max solidity uint/int value
 * @throws `ZodIssueCode.too_small` if < min solidity uint/int value
 * @param name solidity integer type
 * @returns zod validator
 */
export function getSolidityIntLikeZod(
    name: SolidityInt,
): z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodNumber, z.ZodString]>, bigint, bigint | number | string> {
    const nameSanitized = name === "uint" ? "uint256" : name === "int" ? "int256" : name;
    const signed = nameSanitized.startsWith("int");
    const bitLenStr = signed ? nameSanitized.replace("int", "") : nameSanitized.replace("uint", "");
    const bitLen = BigInt(bitLenStr);

    const max = signed ? 2n ** (bitLen - 1n) : 2n ** bitLen - 1n;
    const min = signed ? 0n - 2n ** (bitLen - 1n) : 0n;

    return bigIntLikeZod
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
        .describe(`A solidity ${nameSanitized}`) as unknown as z.ZodEffects<
        z.ZodUnion<[z.ZodBigInt, z.ZodNumber, z.ZodString]>,
        bigint,
        bigint | number | string
    >;
}

export const uint256BigIntLikeZod = getSolidityIntLikeZod("uint256");
export const uint128BigIntLikeZod = getSolidityIntLikeZod("uint128");
export const uint96BigIntLikeZod = getSolidityIntLikeZod("uint96");
export const uint64BigIntLikeZod = getSolidityIntLikeZod("uint64");

/**
 * Match bigint/number/hex/decimal
 * Transform to hex
 * @warning Do **not** use with trpc-openapi plugin (does not support union types)
 * @throws `ZodIssueCode.too_big` if > max solidity uint/int value
 * @throws `ZodIssueCode.too_small` if < min solidity uint/int value
 * @param name solidity integer type
 * @returns zod validator
 */
export function getSolidityIntLikeToHexZod(
    name: SolidityInt,
): z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodNumber, z.ZodString]>, Hex, bigint | number | string> {
    return getSolidityIntLikeZod(name).transform((n) => ("0x" + n.toString(16)) as Hex) as unknown as z.ZodEffects<
        z.ZodUnion<[z.ZodBigInt, z.ZodNumber, z.ZodString]>,
        Hex,
        bigint | number | string
    >;
}

export const uint256BigIntLikeToHexZod = getSolidityIntLikeToHexZod("uint256");
export const uint128BigIntLikeToHexZod = getSolidityIntLikeToHexZod("uint128");
export const uint96BigIntLikeToHexZod = getSolidityIntLikeToHexZod("uint96");
export const uint64BigIntLikeToHexZod = getSolidityIntLikeToHexZod("uint64");

/**
 * Match bigint/number/hex/decimal
 * Transform to decimal
 * @warning Do **not** use with trpc-openapi plugin (does not support union types)
 * @throws `ZodIssueCode.too_big` if > max solidity uint/int value
 * @throws `ZodIssueCode.too_small` if < min solidity uint/int value
 * @param name solidity integer type
 * @returns zod validator
 */
export function getSolidityIntLikeToDecimalZod(
    name: SolidityInt,
): z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodNumber, z.ZodString]>, string, bigint | number | string> {
    return getSolidityIntLikeZod(name).transform((n) => n.toString(10)) as unknown as z.ZodEffects<
        z.ZodUnion<[z.ZodBigInt, z.ZodNumber, z.ZodString]>,
        string,
        bigint | number | string
    >;
}

export const uint256BigIntLikeToDecimalZod = getSolidityIntLikeToDecimalZod("uint256");
export const uint128BigIntLikeToDecimalZod = getSolidityIntLikeToDecimalZod("uint128");
export const uint96BigIntLikeToDecimalZod = getSolidityIntLikeToDecimalZod("uint96");
export const uint64BigIntLikeToDecimalZod = getSolidityIntLikeToDecimalZod("uint64");
