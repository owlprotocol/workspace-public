import { Address, Hex, padHex, zeroAddress } from "viem";
import { SolidityAddress, SolidityBool, SolidityBytes, SolidityInt, SolidityString } from "abitype";
import { NonTupleType, isSolidityBytes, isSolidityInt } from "../abi/abiParamNonTuple.js";
import { ArrayType } from "../abi/abiParamArray.js";
import { AbiParamTuple, isAbiParamTuple } from "../abi/abiParamTuple.js";
import { AbiParamTupleArray, isAbiParamTupleArray } from "../abi/abiParamTupleArray.js";
import { AbiParam } from "../abi/abiParam.js";
import { AbiFunction } from "../abi/abiFunction.js";

export type ZodExampleNonTuple = boolean | string | bigint | Hex | Address;
export type ZodExample = ZodExampleNonTuple | Record<string, ZodExampleNonTuple>;

export type ZodExampleForNonTupleType<T extends NonTupleType> = T extends SolidityBool
    ? true
    : T extends SolidityAddress
    ? typeof zeroAddress
    : T extends SolidityString
    ? ""
    : T extends SolidityInt
    ? "0"
    : T extends SolidityBytes
    ? Hex
    : never;
/**
 * Example non-array type
 * @param t
 * @returns
 */
export function zodExampleForAbiParamNonTuple<T extends NonTupleType>(t: T): ZodExampleForNonTupleType<T> {
    if (isSolidityInt(t)) {
        return "0" as ZodExampleForNonTupleType<T>;
    } else if (isSolidityBytes(t)) {
        if (t === "bytes") return "0x" as ZodExampleForNonTupleType<T>;

        const size = parseInt(t.replace("bytes", ""));
        return padHex("0x", { size }) as ZodExampleForNonTupleType<T>;
    }

    switch (t) {
        case "bool":
            return true as ZodExampleForNonTupleType<T>;
        case "address":
            return zeroAddress as ZodExampleForNonTupleType<T>;
        case "string":
            return "" as ZodExampleForNonTupleType<T>;
    }

    throw new Error(`zodExampleForAbiParamNonTuple(${t}) invalid type`);
}

/**
 * Example for array type
 * @param t
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function zodExampleForAbiParamArray<T extends ArrayType>(_: T): string {
    //TODO: Add more explanatory example
    return "[]";
}

/**
 * Example tuple type
 * @param t
 * @returns
 */
export function zodExampleForAbiParamTuple<T extends AbiParamTuple>(t: T): Record<string, string | boolean> {
    //Tuple or tuple array
    const internals = Object.fromEntries(
        t.components.map((p, idx) => {
            const key = p.name && p.name.length > 0 ? p.name : idx;
            let val: string | boolean;
            if (p.type.endsWith("[]")) {
                val = zodExampleForAbiParamArray(p.type as ArrayType);
                //TODO: Nested tuple types not handled properly
                //@ts-expect-error
            } else if (p.type === "tuple") {
                val = "<any>";
            } else {
                val = zodExampleForAbiParamNonTuple(p.type as NonTupleType);
                if (val === "" && typeof key != "number") val = `<${key}>`;
            }

            return [key, val];
        }),
    );

    return internals;
}

/**
 * Example tuple array
 * @param t
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function zodExampleForAbiParamTupleArray<T extends AbiParamTupleArray>(_: T): string {
    //TODO: Add more explanatory example
    return "[]";
}

/**
 * Example for abi param
 * @param t
 * @returns
 */
export function zodExampleForAbiParam<T extends AbiParam>(t: T): ZodExample {
    if (isAbiParamTuple(t)) return zodExampleForAbiParamTuple(t);
    else if (isAbiParamTupleArray(t)) return zodExampleForAbiParamTupleArray(t);
    else if (t.type.endsWith("[]")) return zodExampleForAbiParamArray(t.type as ArrayType);
    else return zodExampleForAbiParamNonTuple(t.type as NonTupleType);
}

/**
 * Example abi param type hard-coded values
 * @param t
 * @returns
 */
export function zodExampleForAbiParamOverrides<T extends AbiParam>(t: T): ZodExample | null | undefined {
    if (t.type === "address") {
        if (t.name === "admin") {
            return null;
        }
    } else if (t.type === "string") {
        if (t.name === "contractUri") {
            return null;
        }
    }
}

/**
 * From function inputs and outputs to zod validators code (`z.object(${...})`)
 * @param t
 * @returns
 */
export function zodExampleForFunction(inputs: AbiFunction["inputs"], outputs: AbiFunction["outputs"]) {
    const inputsExample = Object.fromEntries(
        inputs
            .map((p, idx) => {
                const key = p.name && p.name.length > 0 ? p.name : idx;
                //Overrides only apply to function inputs
                const valOverr = zodExampleForAbiParamOverrides(p);
                //overrides returning null are preserved and filtered later
                if (valOverr !== undefined) return [key, valOverr] as [string, ZodExample | null];
                const val = zodExampleForAbiParam(p);
                if (val === "") return [key, `<${key}>`] as [string, string];

                return [key, val] as [string, ZodExample];
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, v]) => v != null),
    ) as Record<string, ZodExample>;

    const outputsExample = Object.fromEntries(
        outputs
            .map((p, idx) => {
                const key = p.name && p.name.length > 0 ? p.name : idx;
                const val = zodExampleForAbiParam(p);
                if (val === "" && typeof key != "number") return [key, `<${key}>`] as [string, string];

                return [key, val] as [string, ZodExample];
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, v]) => v != null),
    ) as Record<string, ZodExample>;

    return { inputsExample, outputsExample };
}
