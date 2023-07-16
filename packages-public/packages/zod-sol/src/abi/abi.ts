import type { AbiParam, } from "./abiParam.js";
import { filter } from "../lodash.js";
import { AbiFunction } from "./abiFunction.js";


/** Abi Event Item  */
export interface AbiEvent {
    /** Abi item type, defines if this is a function, event, or special function (eg. constructor) */
    readonly type: "event"
    /** Event name */
    readonly name: string;
    /** Event input parameters */
    readonly inputs: readonly AbiParam[];
}

/** Abi Error Item  */
export interface AbiError {
    /** Abi item type, defines if this is a function, event, or special function (eg. constructor) */
    readonly type: "error"
    /** Event name */
    readonly name: string;
    /** Event input parameters */
    readonly inputs: readonly AbiParam[];
}

/** Abi Contractor Item */
export interface AbiConstructor {
    /** Abi item type, defines if this is a function, event, or special function (eg. constructor) */
    readonly type: "constructor"
    /** State mutability (payable/nonpayable) */
    readonly stateMutability: "payable" | "nonpayable";
    /** Constructor input parameters */
    readonly inputs: readonly AbiParam[];
}

/** Abi */
export type AbiItem = AbiFunction | AbiEvent | AbiError | AbiConstructor
export type Abi = AbiItem[]

export type AbiFunctionsOnly<T extends readonly AbiItem[]> = {
    [Idx in keyof T]: T[Idx] extends AbiFunction ? T[Idx] : never
}
export function abiWithFunctionsOnly<T extends readonly AbiItem[]>(abi: T): AbiFunctionsOnly<T> {
    return filter(abi, (a) => a.type === "function") as any;
}
