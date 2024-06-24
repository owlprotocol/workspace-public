import { FirebaseQueryResource, FirebaseResource, FirestoreSDK } from "@owlprotocol/crud-firebase";
import { bytes32Zod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { Hash } from "viem";
import { z } from "zod";

export interface EthLogAbiId {
    readonly eventSighash: Hash;
    readonly indexedFieldsCount: number;
}
export const ethLogAbiIdRegex = /^(?<eventSighash>0x[a-fA-F0-9]{64})-(?<indexedFieldsCount>\d+$)/;
export const ethLogAbiIdZod = z
    .union([z.string().regex(ethLogAbiIdRegex), z.object({ eventSighash: bytes32Zod, indexedFieldsCount: z.number() })])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.eventSighash}-${arg.indexedFieldsCount}`;
        }
    });
export const encodeEthLogAbiId: (id: string | EthLogAbiId) => string = ethLogAbiIdZod.parse;
export const decodeEthLogAbiId: (id: string) => EthLogAbiId = (id) =>
    ethLogAbiIdRegex.exec(id)!.groups! as unknown as EthLogAbiId;

export interface EthLogAbiData {
    readonly eventSighash: string;
    readonly indexedFieldsCount: number;
    readonly eventFormat: string;
    readonly eventName: string;
}
export const ethLogAbiDataZod = z
    .object({
        eventSighash: bytes32Zod.describe("event signature"),
        indexedFieldsCount: z.number(),
        eventName: z.string().describe("event name"),
        eventFormat: z.string().describe("event format"),
    })
    .describe("eth log abi");
export const encodeEthLogAbiData: (data: EthLogAbiData) => EthLogAbiData = ethLogAbiDataZod.parse;
export const encodeEthLogAbiDataPartial: (data: Partial<EthLogAbiData>) => Partial<EthLogAbiData> =
    ethLogAbiDataZod.partial().parse;

export type EthLogAbi = EthLogAbiId & EthLogAbiData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthLogAbiResource = FirebaseResource<FirestoreSDK, EthLogAbiData, EthLogAbiId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthLogAbiQueryResource = FirebaseQueryResource<FirestoreSDK, EthLogAbiData, EthLogAbiId>;

//Check zod validator matches interface
expectType<TypeOf<EthLogAbiData, z.input<typeof ethLogAbiDataZod>>>(true);
expectType<TypeOf<EthLogAbiData, z.output<typeof ethLogAbiDataZod>>>(true);
