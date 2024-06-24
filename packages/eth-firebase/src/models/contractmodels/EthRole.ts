import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod, bytes32Zod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { Address, Hash } from "viem";
import { NetworkId } from "../Network.js";

export interface EthRoleId {
    readonly address: Address;
    readonly account: Address;
    readonly roleSighash: Hash;
}
export const ethRoleIdRegex =
    /^(?<address>0x[a-fA-F0-9]{40})-(?<account>0x[a-fA-F0-9]{40})-(?<roleSighash>0x[a-fA-F0-9]{64})$/;
export const ethRoleIdZod = z
    .union([
        z.string().regex(ethRoleIdRegex),
        z.object({ address: addressZod, account: addressZod, roleSighash: bytes32Zod }),
    ])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.address}-${arg.account}-${arg.roleSighash}`;
        }
    });
export const encodeEthRoleId: (id: string | EthRoleId) => string = ethRoleIdZod.parse;
export const decodeEthRoleId: (id: string) => EthRoleId = (id) =>
    ethRoleIdRegex.exec(id)!.groups! as unknown as EthRoleId;

export interface EthRoleData {
    readonly address: Address;
    readonly account: Address;
    readonly roleSighash: Hash;
    readonly hasRole: boolean;
    //Last known sender
    readonly sender?: Address;
}
export const ethRoleDataZod = z
    .object({
        address: addressZod,
        account: addressZod,
        roleSighash: bytes32Zod,
        hasRole: z.boolean(),
        sender: addressZod.optional(),
    })
    .describe("eth role");
export const encodeEthRoleData: (data: EthRoleData) => EthRoleData = ethRoleDataZod.parse;
export const encodeEthRoleDataPartial: (data: Partial<EthRoleData>) => Partial<EthRoleData> =
    ethRoleDataZod.partial().parse;

export type EthRole = EthRoleId & EthRoleData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthRoleResource = FirebaseResource<FirestoreSDK, EthRoleData, EthRoleId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthRoleQueryResource = FirebaseQueryResource<FirestoreSDK, EthRoleData, EthRoleId>;
export type EthRoleGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    EthRoleData,
    EthRoleId,
    NetworkId,
    EthRoleData,
    EthRoleData,
    Query<FirestoreSDK, EthRoleData>
>;

//Check zod validator matches interface
expectType<TypeOf<EthRoleData, z.input<typeof ethRoleDataZod>>>(true);
expectType<TypeOf<EthRoleData, z.output<typeof ethRoleDataZod>>>(true);
