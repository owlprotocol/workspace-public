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
    erc1155BalanceGroupQuery,
    erc1155BalanceResource,
    erc1155Resource,
    erc20AllowanceGroupQuery,
    erc20AllowanceResource,
    erc20BalanceGroupQuery,
    erc20BalanceResource,
    erc20Resource,
    erc721GroupQuery,
    erc721Resource,
    ethFunctionAbiResource,
    ethLogAbiResource,
    ethRoleAbiResource,
    ethRoleAdminResource,
    ethRoleResource,
    operatorResource,
    networkResource,
} from "../web/index.js";
import {
    ethBlockGroupPath,
    ethTransactionGroupPath,
    ethLogGroupPath,
    ethBytecodeGroupPath,
    erc1155BalanceGroupPath,
    erc1155GroupPath,
    erc20AllowanceGroupPath,
    erc20BalanceGroupPath,
    erc20GroupPath,
    erc721GroupPath,
    ethFunctionAbiPath,
    ethLogAbiPath,
    ethRoleAbiPath,
    ethRoleAdminGroupPath,
    ethRoleGroupPath,
    operatorGroupPath,
    networkPath,
} from "../collections.js";
import {
    EthBlockId,
    EthTransactionId,
    EthLogId,
    EthBytecodeInput,
    EthBytecodeId,
    EthBytecodeDecoded,
    EthBytecodeEncoded,
    ERC1155BalanceId,
    ERC20AllowanceId,
    ERC20BalanceId,
    ERC721Id,
    ERC1155BalanceDecoded,
    ERC1155BalanceEncoded,
    ERC1155BalanceInput,
    ERC20AllowanceDecoded,
    ERC20AllowanceEncoded,
    ERC20AllowanceInput,
    ERC20BalanceDecoded,
    ERC20BalanceEncoded,
    ERC20BalanceInput,
    ERC721Encoded,
    ERC721Input,
    ERC721Decoded,
} from "../models/index.js";
import { NetworkId, encodeNetworkId } from "../models/Network.js";

//TODO: REQUIRED Replace prefixPath/collectionGroup with computed => need getWhere to support getColPath()
//networks
export const networkQueryOptions = getFirebaseResourceReactQueryOptions(networkResource, {
    prefixPath: [],
    collectionGroup: networkPath,
});

//ethmodels
//global
export const ethFunctionAbiQueryOptions = getFirebaseResourceReactQueryOptions(ethFunctionAbiResource, {
    prefixPath: [],
    collectionGroup: ethFunctionAbiPath,
});
export const ethLogAbiQueryOptions = getFirebaseResourceReactQueryOptions(ethLogAbiResource, {
    prefixPath: [],
    collectionGroup: ethLogAbiPath,
});
//network-bound
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

//contractmodels
//contractmodels
export const erc20QueryOptions = getFirebaseResourceReactQueryOptions(erc20Resource, (collectionId: NetworkId) => {
    return {
        prefixPath: [networkPath, encodeNetworkId(collectionId)],
        collectionGroup: erc20GroupPath,
    };
});
export const erc20AllowanceQueryOptions = getFirebaseResourceReactQueryOptions(
    erc20AllowanceResource,
    (collectionId: NetworkId) => {
        return {
            prefixPath: [networkPath, encodeNetworkId(collectionId)],
            collectionGroup: erc20AllowanceGroupPath,
        };
    },
);
export const erc20BalanceQueryOptions = getFirebaseResourceReactQueryOptions(
    erc20BalanceResource,
    (collectionId: NetworkId) => {
        return {
            prefixPath: [networkPath, encodeNetworkId(collectionId)],
            collectionGroup: erc20BalanceGroupPath,
        };
    },
);
export const erc721QueryOptions = getFirebaseResourceReactQueryOptions(erc721Resource, (collectionId: NetworkId) => {
    return {
        prefixPath: [networkPath, encodeNetworkId(collectionId)],
        collectionGroup: erc721GroupPath,
    };
});
export const erc1155QueryOptions = getFirebaseResourceReactQueryOptions(erc1155Resource, (collectionId: NetworkId) => {
    return {
        prefixPath: [networkPath, encodeNetworkId(collectionId)],
        collectionGroup: erc1155GroupPath,
    };
});
export const erc1155BalanceQueryOptions = getFirebaseResourceReactQueryOptions(
    erc1155BalanceResource,
    (collectionId: NetworkId) => {
        return {
            prefixPath: [networkPath, encodeNetworkId(collectionId)],
            collectionGroup: erc1155BalanceGroupPath,
        };
    },
);
export const operatorQueryOptions = getFirebaseResourceReactQueryOptions(
    operatorResource,
    (collectionId: NetworkId) => {
        return {
            prefixPath: [networkPath, encodeNetworkId(collectionId)],
            collectionGroup: operatorGroupPath,
        };
    },
);
export const ethRoleAbiQueryOptions = getFirebaseResourceReactQueryOptions(ethRoleAbiResource, {
    prefixPath: [],
    collectionGroup: ethRoleAbiPath,
});
export const ethRoleQueryOptions = getFirebaseResourceReactQueryOptions(ethRoleResource, (collectionId: NetworkId) => {
    return {
        prefixPath: [networkPath, encodeNetworkId(collectionId)],
        collectionGroup: ethRoleGroupPath,
    };
});
export const ethRoleAdminQueryOptions = getFirebaseResourceReactQueryOptions(
    ethRoleAdminResource,
    (collectionId: NetworkId) => {
        return {
            prefixPath: [networkPath, encodeNetworkId(collectionId)],
            collectionGroup: ethRoleAdminGroupPath,
        };
    },
);

/*** Group Queries ***/
//contractmodels
export const erc20BalanceGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    ERC20BalanceDecoded,
    ERC20BalanceId,
    NetworkId,
    ERC20BalanceInput,
    ERC20BalanceEncoded,
    Query<"web", ERC20BalanceEncoded>
>(erc20BalanceGroupQuery, { prefixPath: [], collectionGroup: erc20BalanceGroupPath });
export const erc20AllowanceGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    ERC20AllowanceDecoded,
    ERC20AllowanceId,
    NetworkId,
    ERC20AllowanceInput,
    ERC20AllowanceEncoded,
    Query<"web", ERC20AllowanceEncoded>
>(erc20AllowanceGroupQuery, { prefixPath: [], collectionGroup: erc20AllowanceGroupPath });
export const erc721GroupQueryOptions = getFirebaseQueryReactQueryOptions<
    ERC721Decoded,
    ERC721Id,
    NetworkId,
    ERC721Input,
    ERC721Encoded,
    Query<"web", ERC721Encoded>
>(erc721GroupQuery, { prefixPath: [], collectionGroup: erc721GroupPath });
export const erc1155BalanceGroupQueryOptions = getFirebaseQueryReactQueryOptions<
    ERC1155BalanceDecoded,
    ERC1155BalanceId,
    NetworkId,
    ERC1155BalanceInput,
    ERC1155BalanceEncoded,
    Query<"web", ERC1155BalanceEncoded>
>(erc1155BalanceGroupQuery, { prefixPath: [], collectionGroup: erc1155GroupPath });
