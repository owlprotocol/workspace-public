import {
    getFirebaseQueryReactQueryOptions,
    getFirebaseResourceReactQueryOptions,
    Query,
} from "@owlprotocol/crud-firebase/query";
import {
    BlockDecoded,
    BlockInput,
    BlockEncoded,
    TransactionDecoded,
    TransactionInput,
    TransactionEncoded,
    LogDecoded,
    LogInput,
    LogEncoded,
} from "@owlprotocol/zod-sol";
import {
    ethBlockResource,
    ethTransactionResource,
    ethLogResource,
    ethBlockGroupQuery,
    ethTransactionGroupQuery,
    ethLogGroupQuery,
    ethBytecodeResource,
    ethBytecodeGroupQuery,
} from "../web/index.js";
import { ethBlockGroupPath, ethTransactionGroupPath, ethLogGroupPath, ethBytecodeGroupPath } from "../collections.js";
import {
    EthBlockId,
    EthTransactionId,
    EthLogId,
    EthBytecodeInput,
    EthBytecodeId,
    EthBytecodeDecoded,
    EthBytecodeEncoded,
} from "../models/index.js";
import { NetworkId, encodeNetworkId } from "../models/Network.js";

const networkPath = "network";
export const ethBlockQueryOptions = getFirebaseResourceReactQueryOptions(
    ethBlockResource,
    (collectionId: NetworkId) => {
        return {
            prefixPath: [networkPath, encodeNetworkId(collectionId)],
            collectionGroup: ethBlockGroupPath,
        };
    },
);
export const ethBytecodeQueryOptions = getFirebaseResourceReactQueryOptions(
    ethBytecodeResource,
    (collectionId: NetworkId) => {
        return {
            prefixPath: [networkPath, encodeNetworkId(collectionId)],
            collectionGroup: ethBytecodeGroupPath,
        };
    },
);
export const ethTransactionQueryOptions = getFirebaseResourceReactQueryOptions(
    ethTransactionResource,
    (collectionId: NetworkId) => {
        return {
            prefixPath: [networkPath, encodeNetworkId(collectionId)],
            collectionGroup: ethTransactionGroupPath,
        };
    },
);
export const ethLogQueryOptions = getFirebaseResourceReactQueryOptions(ethLogResource, (collectionId: NetworkId) => {
    return {
        prefixPath: [networkPath, encodeNetworkId(collectionId)],
        collectionGroup: ethLogGroupPath,
    };
});

export const ethBlockGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    BlockDecoded,
    EthBlockId,
    NetworkId,
    BlockInput,
    BlockEncoded,
    Query<"web", BlockEncoded>
>(ethBlockGroupQuery, { prefixPath: [], collectionGroup: ethBlockGroupPath });
export const ethBytecodeGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    EthBytecodeDecoded,
    EthBytecodeId,
    NetworkId,
    EthBytecodeInput,
    EthBytecodeEncoded,
    Query<"web", EthBytecodeEncoded>
>(ethBytecodeGroupQuery, { prefixPath: [], collectionGroup: ethBytecodeGroupPath });
export const ethTransactionGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    TransactionDecoded,
    EthTransactionId,
    NetworkId,
    TransactionInput,
    TransactionEncoded,
    Query<"web", TransactionEncoded>
>(ethTransactionGroupQuery, { prefixPath: [], collectionGroup: ethTransactionGroupPath });
export const ethLogGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    LogDecoded,
    EthLogId,
    NetworkId,
    LogInput,
    LogEncoded,
    Query<"web", LogEncoded>
>(ethLogGroupQuery, { prefixPath: [], collectionGroup: ethLogGroupPath });
