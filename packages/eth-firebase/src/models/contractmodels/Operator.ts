/**
 * Operator security model refers to a user giving full access to a smart contract
 * This model is used by ERC721/ERC1155
 */

import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { addressZod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { Address } from "viem";
import { NetworkId } from "../Network.js";

/** Operator id components */
export interface OperatorId {
    readonly address: Address;
    readonly owner: Address;
    readonly operator: Address;
}
export const operatorIdRegex =
    /^(?<address>0x[a-fA-F0-9]{40})-(?<owner>0x[a-fA-F0-9]{40})-(?<operator>0x[a-fA-F0-9]{40})$/;
export const operatorIdZod = z
    .union([
        z.string().regex(operatorIdRegex),
        z.object({ address: addressZod, owner: addressZod, operator: addressZod }),
    ])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.address}-${arg.owner}-${arg.operator}`;
        }
    });
export const encodeOperatorId: (id: string | OperatorId) => string = operatorIdZod.parse;
export const decodeOperatorId: (id: string) => OperatorId = (id) =>
    operatorIdRegex.exec(id)!.groups! as unknown as OperatorId;

export interface OperatorData {
    readonly address: string;
    readonly owner: string;
    readonly operator: string;
    readonly approved: boolean;
}
export const operatorDataZod = z.object({
    address: addressZod,
    owner: addressZod,
    operator: addressZod,
    approved: z.boolean().describe("Operator approved or not"),
});
export const encodeOperatorData: (data: OperatorData) => OperatorData = operatorDataZod.parse;
export const encodeOperatorDataPartial: (data: Partial<OperatorData>) => Partial<OperatorData> =
    operatorDataZod.partial().parse;

export type Operator = OperatorId & OperatorData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type OperatorResource = FirebaseResource<FirestoreSDK, OperatorData, OperatorId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type OperatorQueryResource = FirebaseQueryResource<FirestoreSDK, OperatorData, OperatorId>;
export type OperatorGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    OperatorData,
    OperatorId,
    NetworkId,
    OperatorData,
    OperatorData,
    Query<FirestoreSDK, OperatorData>
>;

//Check zod validator matches interface
expectType<TypeOf<OperatorData, z.input<typeof operatorDataZod>>>(true);
expectType<TypeOf<OperatorData, z.output<typeof operatorDataZod>>>(true);
