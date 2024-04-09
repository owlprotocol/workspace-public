import { FirebaseQueryResource, FirebaseResource, FirestoreSDK } from "@owlprotocol/crud-firebase";
import { bytes32Zod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { Hash } from "viem";
import { z } from "zod";

export interface EthRoleAbiId {
    readonly roleSighash: Hash;
}
export const ethRoleAbiIdZod = z
    .union([bytes32Zod, z.object({ roleSighash: bytes32Zod })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.roleSighash));
export const encodeEthRoleAbiId: (id: string | EthRoleAbiId) => string = ethRoleAbiIdZod.parse;
export const decodeEthRoleAbiId: (id: string) => EthRoleAbiId = (id) => {
    return { roleSighash: id as Hash };
};

export interface EthRoleAbiData {
    readonly roleName: string;
    readonly roleFormat: string;
    readonly description?: string;
}
export const ethRoleAbiDataZod = z
    .object({
        roleName: z.string(),
        roleFormat: z.string(),
        description: z.string().optional(),
    })
    .describe("eth role admin");
export const encodeEthRoleAbiData: (data: EthRoleAbiData) => EthRoleAbiData = ethRoleAbiDataZod.parse;
export const encodeEthRoleAbiDataPartial: (data: Partial<EthRoleAbiData>) => Partial<EthRoleAbiData> =
    ethRoleAbiDataZod.partial().parse;

export type EthRoleAbi = EthRoleAbiId & EthRoleAbiData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthRoleAbiResource = FirebaseResource<FirestoreSDK, EthRoleAbiData, EthRoleAbiId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthRoleAbiQueryResource = FirebaseQueryResource<FirestoreSDK, EthRoleAbiData, EthRoleAbiId>;

//Check zod validator matches interface
expectType<TypeOf<EthRoleAbiData, z.input<typeof ethRoleAbiDataZod>>>(true);
expectType<TypeOf<EthRoleAbiData, z.output<typeof ethRoleAbiDataZod>>>(true);
