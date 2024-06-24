import { z } from "zod";
import {
    SolidityAddress,
    SolidityBool,
    SolidityBytes,
    SolidityInt,
    SolidityString,
    AbiParameter,
    Address,
} from "abitype";
import { Hex } from "viem";
import { getSolidityIntZod } from "../solidity/integer.js";
import { getSolidityBytesZod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";
import { stringZod } from "../solidity/string.js";
import { boolZod } from "../solidity/bool.js";

//solidity types
//union type
export type NonTupleType = SolidityAddress | SolidityBool | SolidityBytes | SolidityInt | SolidityString;

export type AbiParamNonTuple = AbiParameter & { type: NonTupleType };
export function isSolidityInt(t: NonTupleType): t is SolidityInt {
    return t.startsWith("uint") || t.startsWith("int");
}
export function isSolidityBytes(t: NonTupleType): t is SolidityBytes {
    return t.startsWith("bytes");
}

//Zod validator
export type ZodForNonTupleType<T extends NonTupleType> = T extends SolidityBool
    ? z.ZodBoolean
    : T extends SolidityAddress
    ? z.ZodEffects<z.ZodString, Address, Address>
    : T extends SolidityString
    ? z.ZodString
    : T extends SolidityInt
    ? z.ZodBigInt
    : T extends SolidityBytes
    ? z.ZodEffects<z.ZodString, Hex, Hex>
    : never;
export function zodForAbiParamNonTuple<T extends NonTupleType>(t: T): ZodForNonTupleType<T> {
    if (isSolidityInt(t)) {
        return getSolidityIntZod(t as SolidityInt) as ZodForNonTupleType<T>;
    } else if (isSolidityBytes(t)) {
        return getSolidityBytesZod(t) as ZodForNonTupleType<T>;
    }

    switch (t) {
        case "bool":
            return boolZod as ZodForNonTupleType<T>;
        case "address":
            return addressZod as ZodForNonTupleType<T>;
        case "string":
            return stringZod as ZodForNonTupleType<T>;
    }

    throw new Error(`zodForAbiParamNonTuple(${t}) invalid type`);
}
