import { ethers } from "ethers";
import { NonTupleType } from "../abi/abiParamNonTuple.js";
import { ArrayType } from "../abi/abiParamArray.js";
import { AbiParamTuple, isAbiParamTuple } from "../abi/abiParamTuple.js";
import { AbiParamTupleArray, isAbiParamTupleArray } from "../abi/abiParamTupleArray.js";
import { AbiParam } from "../abi/abiParam.js";
import { AbiFunction } from "../abi/abiFunction.js";

export type ZodExample = string | boolean | Record<string, string | boolean>;

/**
 * Example non-array type
 * @param t
 * @returns
 */
export function zodExampleForAbiParamNonTuple(t: NonTupleType): boolean | string {
    switch (t) {
        case "bool":
            return true;
        case "address":
            return ethers.constants.AddressZero;
        case "string":
            return "";
        case "bytes":
            return "0x";
        case "uint256":
            return "0";
        case "uint128":
            return "0";
        case "uint96":
            return "0";
        case "uint64":
            return "0";
        case "uint32":
            return "0";
        case "uint16":
            return "0";
        case "uint8":
            return "0";
        case "int256":
            return "0";
        case "int128":
            return "0";
        case "int96":
            return "0";
        case "int64":
            return "0";
        case "int32":
            return "0";
        case "int16":
            return "0";
        case "int8":
            return "0";
        case "bytes32":
            return "0x0000000000000000000000000000000000000000000000000000000000000000";
        case "bytes16":
            return "0x00000000000000000000000000000000";
        case "bytes8":
            return "0x0000000000000000";
        case "bytes4":
            return "0x00000000";
    }
}

/**
 * Example for array type
 * @param t
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function zodExampleForAbiParamArray<T extends ArrayType>(t: T): string {
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
            if (p.type.endsWith("[]")) val = zodExampleForAbiParamArray(p.type as ArrayType);
            else {
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
export function zodExampleForAbiParamTupleArray<T extends AbiParamTupleArray>(t: T): string {
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
