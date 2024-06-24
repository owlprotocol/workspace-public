import { BlockDecoded, BlockEncoded, BlockInput, bytes32Zod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import {
    FirestoreSDK,
    FirebaseQueryResource,
    Query,
    FirebaseResource,
    FieldOverridesSchema,
} from "@owlprotocol/crud-firebase";
import { Hash } from "viem";
import { NetworkId } from "./Network.js";
export * from "@owlprotocol/zod-sol/eth/Block";
export interface EthBlockId {
    readonly hash: Hash;
}
export const ethBlockIdEncodeZod = z.object({ hash: bytes32Zod }).transform(({ hash }) => hash);
export const encodeEthBlockId: (id: EthBlockId) => string = ethBlockIdEncodeZod.parse;
export const decodeEthBlockId: (id: string) => EthBlockId = (id) => {
    return { hash: id as Hash };
};

export type EthBlock = EthBlockId & BlockInput;

//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type EthBlockResource = FirebaseResource<
    FirestoreSDK,
    BlockDecoded,
    EthBlockId,
    NetworkId,
    BlockInput,
    BlockEncoded
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type EthBlockQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    BlockDecoded,
    EthBlockId,
    NetworkId,
    BlockInput,
    BlockEncoded
>;
export type EthBlockGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    BlockDecoded,
    EthBlockId,
    Record<string, never>,
    BlockInput,
    BlockEncoded,
    Query<FirestoreSDK, BlockEncoded>
>;

export const EthBlockFieldOverrides: FieldOverridesSchema<keyof BlockInput> = {
    hash: "COLLECTION_GROUP",
    number: "COLLECTION",
    parentHash: "IGNORE",
    nonce: "IGNORE",
    difficulty: "IGNORE",
    totalDifficulty: "IGNORE",
    miner: "IGNORE",
    extraData: "IGNORE",
    mixHash: "IGNORE",
    size: "IGNORE",
    stateRoot: "IGNORE",
    timestamp: "IGNORE",
    uncles: "IGNORE",
    sha3Uncles: "IGNORE",
    withdrawals: "IGNORE",
    withdrawalsRoot: "IGNORE",
    gasLimit: "IGNORE",
    gasUsed: "IGNORE",
    baseFeePerGas: "IGNORE",
    blobGasUsed: "IGNORE",
    excessBlobGas: "IGNORE",
    receiptsRoot: "IGNORE",
    sealFields: "IGNORE",
    logsBloom: "IGNORE",
    transactions: "IGNORE",
    transactionsRoot: "IGNORE",
};
