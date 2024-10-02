import { ethers } from "ethers";
import { writeFiles } from "@owlprotocol/utils";
import { mapValues, mapKeys } from "lodash-es";
import { join } from "path";
import { existsSync, rmdirSync } from "fs";
import { genBarrelFile } from "./genBarrelFile.js";
import { zodExampleForFunction } from "./zodExample.js";
import { AbiFunction } from "../abi/abiFunction.js";
import { AbiParam } from "../abi/abiParam.js";
import { ArrayType } from "../abi/abiParamArray.js";
import { NonTupleType } from "../abi/abiParamNonTuple.js";
import { AbiParamTuple, isAbiParamTuple } from "../abi/abiParamTuple.js";
import { AbiParamTupleArray, isAbiParamTupleArray } from "../abi/abiParamTupleArray.js";
import { Abi, abiWithFunctionsOnly } from "../abi/abi.js";

/**
 * From non-array type to zod validator name (`${type}Zod`)
 * @param t
 * @returns
 */
export function genZodForAbiParamNonTuple(t: NonTupleType): string {
    if (t === "address") return "zSol.addressZod";
    else if (t === "string") return "zSol.stringZod";
    else if (t === "bool") return "zSol.boolZod";
    else if (t.startsWith("bytes")) return `zSol.getSolidityBytesZod("${t}")`;
    else if (t.startsWith("uint") || t.startsWith("int")) return `zSol.getSolidityIntStringToDecimalZod("${t}")`;

    throw Error(`Invalid NonTuple param ${t}`);
}

/**
 * From array type to zod validator code (`z.array(${...})`)
 * @param t
 * @returns
 */
export function genZodForAbiParamArray<T extends ArrayType>(t: T): string {
    if (!t.endsWith("[]")) throw new Error(`${t} not array!`);

    //Nested array
    if (t.endsWith("[][]")) return `z.array(${genZodForAbiParamArray(t.replace("[]", "") as ArrayType)})`;

    //Single array
    //TODO: Change here 2 functions ArrayJSON, Array
    return `z.array(${genZodForAbiParamNonTuple(t.replace("[]", "") as NonTupleType)})`;
}

/**
 * From tuple type to zod validator code (`z.object(${...})`)
 * @param t
 * @returns
 */
export function genZodForAbiParamTuple<T extends AbiParamTuple>(t: T): string {
    //Tuple or tuple array
    const internals = t.components
        .map((p, idx) => {
            const key = normalizedInputName(p.name, idx);
            let val: string;
            if (p.type.endsWith("[]")) val = genZodForAbiParamArray(p.type as ArrayType);
            else val = genZodForAbiParamNonTuple(p.type as NonTupleType);

            return `${key}: ${val}`;
        })
        .join(", ");

    return `z.object({ ${internals} })`;
}

/**
 * From tuple array type to zod validator code (`z.array(${...})`)
 * @param t
 * @returns
 */
export function genZodForAbiParamTupleArray<T extends AbiParamTupleArray>(t: T): string {
    if (!t.type.endsWith("[]")) throw new Error(`${t} not array!`);

    //Nested array
    if (t.type.endsWith("[][]"))
        return `z.array(${genZodForAbiParamTupleArray({
            ...t,
            type: t.type.replace("[]", ""),
        })})`;

    //TODO: Fix for tuple array
    //Single array
    return `z.array(${genZodForAbiParamTuple({
        ...t,
        type: "tuple" as const,
    })})`;
}

/**
 * From abi param type to zod validator code (`...`)
 * @param t
 * @returns
 */
export function genZodForAbiParam<T extends AbiParam>(t: T): string {
    if (isAbiParamTuple(t)) return genZodForAbiParamTuple(t);
    else if (isAbiParamTupleArray(t)) return genZodForAbiParamTupleArray(t);
    else if (t.type.endsWith("[]")) return genZodForAbiParamArray(t.type as ArrayType);
    else return genZodForAbiParamNonTuple(t.type as NonTupleType);
}

/**
 * From abi param type to zod validator hard-coded values code (`...`)
 * @param t
 * @returns
 */
export function genZodForAbiParamOverrides<T extends AbiParam>(t: T): string | undefined {
    if (t.type === "address") {
        if (t.name === "admin") {
            return `zSol.${t.type}Zod.optional().describe("Admin address")`;
        }
    } else if (t.type === "string") {
        if (t.name === "contractUri") {
            return `zSol.${t.type}Zod.optional().describe("Contract metadata")`;
        }
    }
}

function normalizedInputName(name: string | undefined, idx: number) {
    return name && name.length > 0 ? `"${name}"` : `"${idx}"`;
}

/**
 * From function inputs and outputs to zod validators code (`z.object(${...})`)
 * @param t
 * @returns
 */
export function genZodValidatorForFunction(inputs: AbiFunction["inputs"], outputs: AbiFunction["outputs"]) {
    const inputKeys = inputs.map((p, idx) => {
        return normalizedInputName(p.name, idx);
    });

    //Inputs with optionals overriden at user level
    const inputInternals = inputs
        .map((p, idx) => {
            const key = normalizedInputName(p.name, idx);
            //Overrides only apply to function inputs
            const val = genZodForAbiParamOverrides(p) ?? genZodForAbiParam(p);
            return `${key}: ${val}`;
        })
        .join(", ");
    let inputZod = `z.object({ ${inputInternals} })`;
    let inputZodArrayify = `${inputZod}.transform((${inputKeys.length > 0 ? "val" : "_"}) => [${inputKeys
        .map((k) => `val[${k}]`)
        .join(",")}] as const)`;

    //Inputs with defaults
    const inputInternalsDefined = inputs
        .map((p, idx) => {
            const key = normalizedInputName(p.name, idx);
            //Overrides only apply to function inputs
            const val = genZodForAbiParam(p);
            return `${key}: ${val}`;
        })
        .join(", ");
    let inputZodDefined = `z.object({ ${inputInternalsDefined} })`;

    //Arrayify input params
    let inputZodDefinedArrayify = `${inputZodDefined}.transform((${inputKeys.length > 0 ? "val" : "_"}) => [${inputKeys
        .map((k) => `val[${k}]`)
        .join(",")}] as const)`;

    if (inputs.length === 0) {
        inputZod += ".optional()";
        inputZodArrayify += ".optional()";
        inputZodDefined += ".optional()";
        inputZodDefinedArrayify += ".optional()";
    }

    const outputInternals = outputs
        .map((p, idx) => {
            const key = normalizedInputName(p.name, idx);
            const val = genZodForAbiParam(p);
            return `${key}: ${val}`;
        })
        .join(", ");

    const outputZod = `z.object({ ${outputInternals} })`;
    const { inputsExample, outputsExample } = zodExampleForFunction(inputs, outputs);

    return `{ inputs: ${inputZod},
    inputsArrayify: ${inputZodArrayify},
    inputsDefined: ${inputZodDefined},
    inputsDefinedArrayify: ${inputZodDefinedArrayify},
    inputsExample: ${JSON.stringify(inputsExample)},
    outputs: ${outputZod},
    outputsExample: ${JSON.stringify(outputsExample)}
}`;
}

/**
 * From abi zod validator code for each function name
 * @param t
 * @returns
 */
export function genZodValidatorForAbi(abi: readonly AbiFunction[]): string {
    const abiZod = abi
        .map((abiFn, idx) => {
            const slicePre = abi.slice(0, idx);
            const slicePost = abi.slice(idx + 1);
            const spliced = [...slicePre, ...slicePost];
            const dup = spliced.find((x) => x.name === abiFn.name);

            let name: string;
            if (dup) {
                //Compute signature
                const fn = ethers.utils.FunctionFragment.from(abiFn);
                const signature = fn.format(ethers.utils.FormatTypes.minimal).replace("function ", "");
                //safety wrap in quotes
                name = `"${signature}"`;
            } else {
                name = abiFn.name;
            }

            return `${name}: ${genZodValidatorForFunction(abiFn.inputs, abiFn.outputs)}`;
        })
        .join(",\n");

    return `{ ${abiZod} }`;
}

/**
 * Generate code for contract. Option to customize zSol import for local testing
 * @param name
 * @param abi
 * @param zSolPackage defaults to @owlprotocol/zod-sol, consider using ../solidity/index.js for local
 */
export function genZodValidatorForContract(
    name: string,
    abi: readonly AbiFunction[],
    zSolPackage = "@owlprotocol/zod-sol",
): string {
    if (abi.length === 0) {
        return `/* Autogenerated file. Do not edit manually. */
\n\
export const ${name} = ${genZodValidatorForAbi(abi)};\n`;
    }

    return `/* Autogenerated file. Do not edit manually. */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";\n\
//@ts-ignore Ignore unused error
import * as zSol from "${zSolPackage}";\n\
\n\
export const ${name} = ${genZodValidatorForAbi(abi)};\n`;
}

export function genZodValidatorFilesForContracts(
    contracts: Record<string, Abi>,
    basePath = "./zsol",
    zSolPackage = "@owlprotocol/zod-sol",
) {
    const files = Object.fromEntries(
        Object.values(
            mapValues(contracts, (abi, name) => {
                const fileData = genZodValidatorForContract(name, abiWithFunctionsOnly(abi), zSolPackage);
                const fileName = `${name}.ts`;
                return [fileName, fileData];
            }),
        ),
    );

    const index = genBarrelFile(Object.keys(files).map((f) => `./${f.replace(".ts", ".js")}`));

    return {
        ...mapKeys(files, (_, k) => join(basePath, k)),
        [join(basePath, `index.ts`)]: index,
    };
}

export async function writeZodValidatorFilesForContracts(
    contracts: Record<string, Abi>,
    basePath = "./zsol",
    zSolPackage = "@owlprotocol/zod-sol",
) {
    const { ESLint } = await import("eslint");
    //Remove files
    if (existsSync(basePath)) rmdirSync(basePath, { recursive: true });
    //Generate files data
    const files = genZodValidatorFilesForContracts(contracts, basePath, zSolPackage);
    //Write files
    writeFiles(files);
    //Lint files
    const eslint = new ESLint({ useEslintrc: true, fix: true });
    const results = await eslint.lintFiles(basePath);
    await ESLint.outputFixes(results);
}
