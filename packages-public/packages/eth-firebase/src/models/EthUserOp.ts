import { UserOpDecoded, UserOpEncoded, UserOpInput, bytes32Zod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Hash } from "viem";
import { NetworkId } from "./Network.js";

export interface EthUserOpId {
    readonly hash: Hash;
}
export const ethUserOpIdEncodeZod = z.object({ hash: bytes32Zod }).transform(({ hash }) => hash);
export const encodeEthUserOpId: (id: string | EthUserOpId) => string = ethUserOpIdEncodeZod.parse;
export const decodeEthUserOpId: (id: string) => EthUserOpId = (id) => {
    return { hash: id as Hash };
};

export type EthUserOp = EthUserOpId & UserOpInput;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthUserOpResource = FirebaseResource<
    FirestoreSDK,
    UserOpDecoded,
    EthUserOpId,
    NetworkId,
    UserOpInput,
    UserOpEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthUserOpQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    UserOpDecoded,
    EthUserOpId,
    NetworkId,
    UserOpInput,
    UserOpEncoded
>;
export type EthUserOpGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    UserOpDecoded,
    EthUserOpId,
    Record<string, never>,
    UserOpInput,
    UserOpEncoded,
    Query<FirestoreSDK, UserOpEncoded>
>;
