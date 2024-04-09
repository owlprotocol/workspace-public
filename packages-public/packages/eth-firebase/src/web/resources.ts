import { firestore, getFirebaseResource } from "@owlprotocol/crud-firebase/web";
import {
    BlockDecoded,
    BlockInput,
    BlockEncoded,
    blockEncodeZod,
    blockDecodeZod,
    TransactionDecoded,
    TransactionInput,
    TransactionEncoded,
    transactionEncodeZod,
    transactionDecodeZod,
    LogDecoded,
    LogInput,
    LogEncoded,
    logEncodeZod,
    logDecodeZod,
    UserOpDecoded,
    UserOpEncoded,
    UserOpInput,
    userOpDecodeZod,
    userOpEncodeZod,
    TransactionReceiptDecoded,
    TransactionReceiptEncoded,
    TransactionReceiptInput,
    transactionReceiptDecodeZod,
    transactionReceiptEncodeZod,
} from "@owlprotocol/zod-sol";
import {
    ethBlockCol,
    ethTransactionCol,
    ethTransactionReceiptCol,
    ethLogCol,
    ethUserOpCol,
    ethBytecodeCol,
    ethFunctionAbiCol,
    ethLogAbiCol,
    erc1155BalanceCol,
    erc1155Col,
    erc20AllowanceCol,
    erc20BalanceCol,
    erc20Col,
    erc721Col,
    ethRoleAbiCol,
    ethRoleAdminCol,
    ethRoleCol,
    operatorCol,
} from "./collection.js";
import {
    EthBlockId,
    encodeEthBlockId,
    decodeEthBlockId,
    EthTransactionId,
    encodeEthTransactionId,
    decodeEthTransactionId,
    EthTransactionReceiptId,
    encodeEthTransactionReceiptId,
    decodeEthTransactionReceiptId,
    EthLogId,
    encodeEthLogId,
    decodeEthLogId,
    EthUserOpId,
    encodeEthUserOpId,
    decodeEthUserOpId,
    encodeEthBytecodeData,
    EthBytecodeInput,
    EthBytecodeId,
    decodeEthBytecodeData,
    decodeEthBytecodeId,
    encodeEthBytecodeDataPartial,
    encodeEthBytecodeId,
    EthBytecodeDecoded,
    EthBytecodeEncoded,
    EthFunctionAbiData,
    EthFunctionAbiId,
    EthLogAbiData,
    EthLogAbiId,
    decodeEthFunctionAbiId,
    decodeEthLogAbiId,
    encodeEthFunctionAbiData,
    encodeEthFunctionAbiDataPartial,
    encodeEthFunctionAbiId,
    encodeEthLogAbiData,
    encodeEthLogAbiDataPartial,
    encodeEthLogAbiId,
    ERC1155BalanceId,
    ERC1155Data,
    ERC1155Id,
    ERC20AllowanceId,
    ERC20BalanceId,
    ERC20Data,
    ERC20Id,
    ERC721Id,
    EthRoleAbiData,
    EthRoleAbiId,
    EthRoleAdminData,
    EthRoleAdminId,
    EthRoleData,
    EthRoleId,
    OperatorData,
    OperatorId,
    decodeERC1155BalanceId,
    decodeERC1155Id,
    decodeERC20AllowanceId,
    decodeERC20BalanceId,
    decodeERC20Id,
    decodeERC721Id,
    decodeEthRoleAbiId,
    decodeEthRoleAdminId,
    decodeEthRoleId,
    decodeOperatorId,
    encodeERC1155BalanceData,
    encodeERC1155BalanceDataPartial,
    encodeERC1155BalanceId,
    encodeERC1155Data,
    encodeERC1155DataPartial,
    encodeERC1155Id,
    encodeERC20AllowanceData,
    encodeERC20AllowanceDataPartial,
    encodeERC20AllowanceId,
    encodeERC20BalanceData,
    encodeERC20BalanceDataPartial,
    encodeERC20BalanceId,
    encodeERC20Data,
    encodeERC20DataPartial,
    encodeERC20Id,
    encodeERC721Data,
    encodeERC721DataPartial,
    encodeERC721Id,
    encodeEthRoleAbiData,
    encodeEthRoleAbiDataPartial,
    encodeEthRoleAbiId,
    encodeEthRoleAdminData,
    encodeEthRoleAdminDataPartial,
    encodeEthRoleAdminId,
    encodeEthRoleData,
    encodeEthRoleDataPartial,
    encodeEthRoleId,
    encodeOperatorData,
    encodeOperatorDataPartial,
    encodeOperatorId,
    ERC20AllowanceDecoded,
    ERC20AllowanceInput,
    ERC20AllowanceEncoded,
    ERC20BalanceDecoded,
    ERC20BalanceInput,
    ERC20BalanceEncoded,
    ERC1155BalanceDecoded,
    ERC1155BalanceInput,
    ERC1155BalanceEncoded,
    decodeERC20BalanceData,
    decodeERC20AllowanceData,
    decodeERC1155BalanceData,
    decodeERC721Data,
    ERC721Decoded,
    ERC721Encoded,
    ERC721Input,
} from "../models/index.js";
import { NetworkId, encodeNetworkId, decodeNetworkId } from "../models/Network.js";

//ethmodels
//global
export const ethFunctionAbiResource = getFirebaseResource<EthFunctionAbiData, EthFunctionAbiId>(
    firestore,
    ethFunctionAbiCol,
    {
        encodeId: encodeEthFunctionAbiId,
        decodeId: decodeEthFunctionAbiId,
        encodeDataPartial: encodeEthFunctionAbiDataPartial,
        encodeData: encodeEthFunctionAbiData,
    },
);
export const ethLogAbiResource = getFirebaseResource<EthLogAbiData, EthLogAbiId>(firestore, ethLogAbiCol, {
    encodeId: encodeEthLogAbiId,
    decodeId: decodeEthLogAbiId,
    encodeDataPartial: encodeEthLogAbiDataPartial,
    encodeData: encodeEthLogAbiData,
});

//network-bound
export const ethBlockResource = getFirebaseResource<BlockDecoded, EthBlockId, NetworkId, BlockInput, BlockEncoded>(
    firestore,
    ethBlockCol,
    {
        encodeId: encodeEthBlockId,
        decodeId: decodeEthBlockId,
        encodeDataPartial: blockEncodeZod.partial().parse as (block: Partial<BlockInput>) => Partial<BlockEncoded>,
        encodeData: blockEncodeZod.parse as (block: BlockInput) => BlockEncoded,
        decodeData: blockDecodeZod.parse as unknown as (block: BlockEncoded) => BlockDecoded,
        encodeParentDocId: encodeNetworkId,
        decodeParentDocId: decodeNetworkId,
    },
);
export const ethBytecodeResource = getFirebaseResource<
    EthBytecodeDecoded,
    EthBytecodeId,
    NetworkId,
    EthBytecodeInput,
    EthBytecodeEncoded
>(firestore, ethBytecodeCol, {
    encodeId: encodeEthBytecodeId,
    decodeId: decodeEthBytecodeId,
    encodeDataPartial: encodeEthBytecodeDataPartial,
    encodeData: encodeEthBytecodeData,
    decodeData: decodeEthBytecodeData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethTransactionResource = getFirebaseResource<
    TransactionDecoded,
    EthTransactionId,
    NetworkId,
    TransactionInput,
    TransactionEncoded
>(firestore, ethTransactionCol, {
    encodeId: encodeEthTransactionId,
    decodeId: decodeEthTransactionId,
    encodeDataPartial: transactionEncodeZod.partial().parse as (
        transaction: Partial<TransactionInput>,
    ) => Partial<TransactionEncoded>,
    encodeData: transactionEncodeZod.parse as unknown as (transaction: TransactionInput) => TransactionEncoded,
    decodeData: transactionDecodeZod.parse as unknown as (transaction: TransactionEncoded) => TransactionDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethTransactionReceiptResource = getFirebaseResource<
    TransactionReceiptDecoded,
    EthTransactionReceiptId,
    NetworkId,
    TransactionReceiptInput,
    TransactionReceiptEncoded
>(firestore, ethTransactionReceiptCol, {
    encodeId: encodeEthTransactionReceiptId,
    decodeId: decodeEthTransactionReceiptId,
    encodeDataPartial: transactionReceiptEncodeZod.partial().parse as (
        transactionReceipt: Partial<TransactionReceiptInput>,
    ) => Partial<TransactionReceiptEncoded>,
    encodeData: transactionReceiptEncodeZod.parse as (
        transactionReceipt: TransactionReceiptInput,
    ) => TransactionReceiptEncoded,
    decodeData: transactionReceiptDecodeZod.parse as unknown as (
        transactionReceipt: TransactionReceiptEncoded,
    ) => TransactionReceiptDecoded,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethLogResource = getFirebaseResource<LogDecoded, EthLogId, NetworkId, LogInput, LogEncoded>(
    firestore,
    ethLogCol,
    {
        encodeId: encodeEthLogId,
        decodeId: decodeEthLogId,
        encodeDataPartial: logEncodeZod.partial().parse as (log: Partial<LogInput>) => Partial<LogEncoded>,
        encodeData: logEncodeZod.parse as (log: LogInput) => LogEncoded,
        decodeData: logDecodeZod.parse as unknown as (log: LogEncoded) => LogDecoded,
        encodeParentDocId: encodeNetworkId,
        decodeParentDocId: decodeNetworkId,
    },
);
export const ethUserOpResource = getFirebaseResource<UserOpDecoded, EthUserOpId, NetworkId, UserOpInput, UserOpEncoded>(
    firestore,
    ethUserOpCol,
    {
        encodeId: encodeEthUserOpId,
        decodeId: decodeEthUserOpId,
        encodeDataPartial: userOpEncodeZod.partial().parse as (userOp: Partial<UserOpInput>) => Partial<UserOpEncoded>,
        encodeData: userOpEncodeZod.parse as (userOp: UserOpInput) => UserOpEncoded,
        decodeData: userOpDecodeZod.parse as unknown as (userOp: UserOpEncoded) => UserOpDecoded,
        encodeParentDocId: encodeNetworkId,
        decodeParentDocId: decodeNetworkId,
    },
);

//contractmodels
export const erc20Resource = getFirebaseResource<ERC20Data, ERC20Id, NetworkId>(firestore, erc20Col, {
    encodeId: encodeERC20Id,
    decodeId: decodeERC20Id,
    encodeDataPartial: encodeERC20DataPartial,
    encodeData: encodeERC20Data,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc20AllowanceResource = getFirebaseResource<
    ERC20AllowanceDecoded,
    ERC20AllowanceId,
    NetworkId,
    ERC20AllowanceInput,
    ERC20AllowanceEncoded
>(firestore, erc20AllowanceCol, {
    encodeId: encodeERC20AllowanceId,
    decodeId: decodeERC20AllowanceId,
    encodeDataPartial: encodeERC20AllowanceDataPartial,
    encodeData: encodeERC20AllowanceData,
    decodeData: decodeERC20AllowanceData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc20BalanceResource = getFirebaseResource<
    ERC20BalanceDecoded,
    ERC20BalanceId,
    NetworkId,
    ERC20BalanceInput,
    ERC20BalanceEncoded
>(firestore, erc20BalanceCol, {
    encodeId: encodeERC20BalanceId,
    decodeId: decodeERC20BalanceId,
    encodeDataPartial: encodeERC20BalanceDataPartial,
    encodeData: encodeERC20BalanceData,
    decodeData: decodeERC20BalanceData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc721Resource = getFirebaseResource<ERC721Decoded, ERC721Id, NetworkId, ERC721Input, ERC721Encoded>(
    firestore,
    erc721Col,
    {
        encodeId: encodeERC721Id,
        decodeId: decodeERC721Id,
        encodeDataPartial: encodeERC721DataPartial,
        encodeData: encodeERC721Data,
        decodeData: decodeERC721Data,
        encodeParentDocId: encodeNetworkId,
        decodeParentDocId: decodeNetworkId,
    },
);
export const erc1155Resource = getFirebaseResource<ERC1155Data, ERC1155Id, NetworkId>(firestore, erc1155Col, {
    encodeId: encodeERC1155Id,
    decodeId: decodeERC1155Id,
    encodeDataPartial: encodeERC1155DataPartial,
    encodeData: encodeERC1155Data,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const erc1155BalanceResource = getFirebaseResource<
    ERC1155BalanceDecoded,
    ERC1155BalanceId,
    NetworkId,
    ERC1155BalanceInput,
    ERC1155BalanceEncoded
>(firestore, erc1155BalanceCol, {
    encodeId: encodeERC1155BalanceId,
    decodeId: decodeERC1155BalanceId,
    encodeDataPartial: encodeERC1155BalanceDataPartial,
    encodeData: encodeERC1155BalanceData,
    decodeData: decodeERC1155BalanceData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const operatorResource = getFirebaseResource<OperatorData, OperatorId, NetworkId>(firestore, operatorCol, {
    encodeId: encodeOperatorId,
    decodeId: decodeOperatorId,
    encodeDataPartial: encodeOperatorDataPartial,
    encodeData: encodeOperatorData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethRoleAbiResource = getFirebaseResource<EthRoleAbiData, EthRoleAbiId>(firestore, ethRoleAbiCol, {
    encodeId: encodeEthRoleAbiId,
    decodeId: decodeEthRoleAbiId,
    encodeDataPartial: encodeEthRoleAbiDataPartial,
    encodeData: encodeEthRoleAbiData,
});
export const ethRoleResource = getFirebaseResource<EthRoleData, EthRoleId, NetworkId>(firestore, ethRoleCol, {
    encodeId: encodeEthRoleId,
    decodeId: decodeEthRoleId,
    encodeDataPartial: encodeEthRoleDataPartial,
    encodeData: encodeEthRoleData,
    encodeParentDocId: encodeNetworkId,
    decodeParentDocId: decodeNetworkId,
});
export const ethRoleAdminResource = getFirebaseResource<EthRoleAdminData, EthRoleAdminId, NetworkId>(
    firestore,
    ethRoleAdminCol,
    {
        encodeId: encodeEthRoleAdminId,
        decodeId: decodeEthRoleAdminId,
        encodeDataPartial: encodeEthRoleAdminDataPartial,
        encodeData: encodeEthRoleAdminData,
        encodeParentDocId: encodeNetworkId,
        decodeParentDocId: decodeNetworkId,
    },
);
