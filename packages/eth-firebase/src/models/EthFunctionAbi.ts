import { FirebaseQueryResource, FirestoreSDK } from "@owlprotocol/crud-firebase";
import { bytes4Zod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { Hex } from "viem";
import { z } from "zod";

export interface EthFunctionAbiId {
    readonly functionSighash: Hex;
}
export const ethFunctionAbiIdZod = z
    .union([bytes4Zod, z.object({ functionSighash: bytes4Zod })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.functionSighash));
export const encodeEthFunctionAbiId: (id: string | EthFunctionAbiId) => string = ethFunctionAbiIdZod.parse;
export const decodeEthFunctionAbiId: (id: string) => EthFunctionAbiId = (id) => {
    return { functionSighash: id as Hex };
};

export interface EthFunctionAbiData {
    readonly functionFormat: string;
    readonly functionName: string;
}
export const ethFunctionAbiDataZod = z.object({
    functionFormat: z.string(),
    functionName: z.string(),
});
export const encodeEthFunctionAbiData: (data: EthFunctionAbiData) => EthFunctionAbiData = ethFunctionAbiDataZod.parse;
export const encodeEthFunctionAbiDataPartial: (data: Partial<EthFunctionAbiData>) => Partial<EthFunctionAbiData> =
    ethFunctionAbiDataZod.partial().parse;

export type EthFunctionAbi = EthFunctionAbiId & EthFunctionAbiData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthFunctionAbiResource = FirebaseQueryResource<FirestoreSDK, EthFunctionAbiData, EthFunctionAbiId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthFunctionAbiQueryResource = FirebaseQueryResource<FirestoreSDK, EthFunctionAbiData, EthFunctionAbiId>;

//Check zod validator matches interface
expectType<TypeOf<EthFunctionAbiData, z.input<typeof ethFunctionAbiDataZod>>>(true);
expectType<TypeOf<EthFunctionAbiData, z.output<typeof ethFunctionAbiDataZod>>>(true);
