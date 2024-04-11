import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { LogDecoded, LogEncoded, LogInput, bytes32Zod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { Hash } from "viem";
import { NetworkId } from "./Network.js";

export interface EthLogId {
    readonly blockHash: Hash;
    readonly logIndex: number;
}
export const ethLogIdZod = z.object({ blockHash: bytes32Zod, logIndex: z.number() });
export const ethLogIdEncodeZod = ethLogIdZod.transform(({ blockHash, logIndex }) => `${blockHash}-${logIndex}`);
export const encodeEthLogId: (id: EthLogId) => string = ethLogIdEncodeZod.parse;

export const ethLogIdRegex = /^(?<blockHash>0x[a-fA-F0-9]{64})-(?<logIndex>\d+$)/;
export const decodeEthLogId: (id: string) => EthLogId = (id) => ethLogIdRegex.exec(id)!.groups! as unknown as EthLogId;

export type EthLog = EthLogId & LogInput;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthLogResource = FirebaseResource<FirestoreSDK, LogDecoded, EthLogId, NetworkId, LogInput, LogEncoded>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthLogQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    LogDecoded,
    EthLogId,
    NetworkId,
    LogInput,
    LogEncoded
>;
export type EthLogGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    LogDecoded,
    EthLogId,
    Record<string, never>,
    LogInput,
    LogEncoded,
    Query<FirestoreSDK, LogEncoded>
>;
