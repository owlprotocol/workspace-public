import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod, bytes32Zod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { Address, Hash } from "viem";
import { NetworkId } from "../Network.js";

export interface EthRoleAdminId {
    readonly address: Address;
    readonly roleSighash: Hash;
}
export const ethRoleAdminIdRegex = /^(?<address>0x[a-fA-F0-9]{40})-(?<roleSighash>0x[a-fA-F0-9]{64})$/;
export const ethRoleAdminIdZod = z
    .union([z.string().regex(ethRoleAdminIdRegex), z.object({ address: addressZod, roleSighash: bytes32Zod })])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.address}-${arg.roleSighash}`;
        }
    });
export const encodeEthRoleAdminId: (id: string | EthRoleAdminId) => string = ethRoleAdminIdZod.parse;
export const decodeEthRoleAdminId: (id: string) => EthRoleAdminId = (id) =>
    ethRoleAdminIdRegex.exec(id)!.groups! as unknown as EthRoleAdminId;

export interface EthRoleAdminData {
    readonly address: Address;
    readonly roleSighash: Hash;
    readonly adminRoleSighash: Hash;
}
export const ethRoleAdminDataZod = z
    .object({
        address: addressZod,
        roleSighash: bytes32Zod,
        adminRoleSighash: bytes32Zod,
    })
    .describe("eth role admin");
export const encodeEthRoleAdminData: (data: EthRoleAdminData) => EthRoleAdminData = ethRoleAdminDataZod.parse;
export const encodeEthRoleAdminDataPartial: (data: Partial<EthRoleAdminData>) => Partial<EthRoleAdminData> =
    ethRoleAdminDataZod.partial().parse;

export type EthRoleAdmin = EthRoleAdminId & EthRoleAdminData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthRoleAdminResource = FirebaseResource<FirestoreSDK, EthRoleAdminData, EthRoleAdminId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthRoleAdminQueryResource = FirebaseQueryResource<FirestoreSDK, EthRoleAdminData, EthRoleAdminId>;
export type EthRoleAdminGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    EthRoleAdminData,
    EthRoleAdminId,
    NetworkId,
    EthRoleAdminData,
    EthRoleAdminData,
    Query<FirestoreSDK, EthRoleAdminData>
>;

//Check zod validator matches interface
expectType<TypeOf<EthRoleAdminData, z.input<typeof ethRoleAdminDataZod>>>(true);
expectType<TypeOf<EthRoleAdminData, z.output<typeof ethRoleAdminDataZod>>>(true);
