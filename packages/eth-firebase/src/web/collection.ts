import { firestore, getColRef, getColGroupRef } from "@owlprotocol/crud-firebase/web";
import { BlockEncoded, TransactionEncoded, TransactionReceiptEncoded, LogEncoded } from "@owlprotocol/zod-sol";
import {
    ethBlockGroupPath,
    ethBlockPath,
    ethTransactionGroupPath,
    ethTransactionPath,
    ethTransactionReceiptGroupPath,
    ethTransactionReceiptPath,
    ethLogGroupPath,
    ethLogPath,
    ethUserOpGroupPath,
    ethUserOpPath,
    ethBytecodePath,
    ethBytecodeGroupPath,
    erc1155BalanceGroupPath,
    erc1155BalancePath,
    erc1155GroupPath,
    erc1155Path,
    erc20AllowanceGroupPath,
    erc20AllowancePath,
    erc20BalanceGroupPath,
    erc20BalancePath,
    erc20GroupPath,
    erc20Path,
    erc721GroupPath,
    erc721Path,
    ethFunctionAbiPath,
    ethLogAbiPath,
    ethRoleAbiPath,
    operatorGroupPath,
    operatorPath,
    ethRoleAdminPath,
    ethRolePath,
    networkPath,
    networkPrivatePath,
} from "../collections.js";
import {
    ERC1155BalanceEncoded,
    ERC1155Data,
    ERC20AllowanceEncoded,
    ERC20BalanceEncoded,
    ERC20Data,
    ERC721Encoded,
    EthBytecodeEncoded,
    EthFunctionAbiData,
    EthLogAbiData,
    EthRoleAbiData,
    EthRoleAdminData,
    EthRoleData,
    EthUserOpEncoded,
    OperatorData,
    NetworkDataEncoded,
    NetworkId,
} from "../models/index.js";

//networks
export const networkCol = getColRef<NetworkDataEncoded>(firestore, networkPath);
export const networkPrivateCol = getColRef<NetworkDataEncoded>(firestore, networkPrivatePath);

//ethmodels
export const ethFunctionAbiCol = getColRef<EthFunctionAbiData>(firestore, ethFunctionAbiPath);
export const ethLogAbiCol = getColRef<EthLogAbiData>(firestore, ethLogAbiPath);

export const ethRoleCol = (collectionId: NetworkId) => getColRef<EthRoleData>(firestore, ethRolePath(collectionId));
export const ethRoleAdminCol = (collectionId: NetworkId) =>
    getColRef<EthRoleAdminData>(firestore, ethRoleAdminPath(collectionId));

export const ethBlockColGroup = getColGroupRef<BlockEncoded>(firestore, ethBlockGroupPath);
export const ethBlockCol = (collectionId: NetworkId) => getColRef<BlockEncoded>(firestore, ethBlockPath(collectionId));

export const ethBytecodeColGroup = getColGroupRef<EthBytecodeEncoded>(firestore, ethBytecodeGroupPath);
export const ethBytecodeCol = (collectionId: NetworkId) =>
    getColRef<EthBytecodeEncoded>(firestore, ethBytecodePath(collectionId));

export const ethTransactionColGroup = getColGroupRef<TransactionEncoded>(firestore, ethTransactionGroupPath);
export const ethTransactionCol = (collectionId: NetworkId) =>
    getColRef<TransactionEncoded>(firestore, ethTransactionPath(collectionId));

export const ethTransactionReceiptColGroup = getColGroupRef<TransactionReceiptEncoded>(
    firestore,
    ethTransactionReceiptGroupPath,
);
export const ethTransactionReceiptCol = (collectionId: NetworkId) =>
    getColRef<TransactionReceiptEncoded>(firestore, ethTransactionReceiptPath(collectionId));

export const ethLogColGroup = getColGroupRef<LogEncoded>(firestore, ethLogGroupPath);
export const ethLogCol = (collectionId: NetworkId) => getColRef<LogEncoded>(firestore, ethLogPath(collectionId));

export const ethUserOpColGroup = getColGroupRef<EthUserOpEncoded>(firestore, ethUserOpGroupPath);
export const ethUserOpCol = (collectionId: NetworkId) =>
    getColRef<EthUserOpEncoded>(firestore, ethUserOpPath(collectionId));

//contractmodels
export const erc20ColGroup = getColGroupRef<ERC20Data>(firestore, erc20GroupPath);
export const erc20Col = (collectionId: NetworkId) => getColRef<ERC20Data>(firestore, erc20Path(collectionId));

export const erc20AllowanceColGroup = getColGroupRef<ERC20AllowanceEncoded>(firestore, erc20AllowanceGroupPath);
export const erc20AllowanceCol = (collectionId: NetworkId) =>
    getColRef<ERC20AllowanceEncoded>(firestore, erc20AllowancePath(collectionId));

export const erc20BalanceColGroup = getColGroupRef<ERC20BalanceEncoded>(firestore, erc20BalanceGroupPath);
export const erc20BalanceCol = (collectionId: NetworkId) =>
    getColRef<ERC20BalanceEncoded>(firestore, erc20BalancePath(collectionId));

export const erc721ColGroup = getColGroupRef<ERC721Encoded>(firestore, erc721GroupPath);
export const erc721Col = (collectionId: NetworkId) => getColRef<ERC721Encoded>(firestore, erc721Path(collectionId));

export const erc1155ColGroup = getColGroupRef<ERC1155Data>(firestore, erc1155GroupPath);
export const erc1155Col = (collectionId: NetworkId) => getColRef<ERC1155Data>(firestore, erc1155Path(collectionId));

export const erc1155BalanceColGroup = getColGroupRef<ERC1155BalanceEncoded>(firestore, erc1155BalanceGroupPath);
export const erc1155BalanceCol = (collectionId: NetworkId) =>
    getColRef<ERC1155BalanceEncoded>(firestore, erc1155BalancePath(collectionId));

export const operatorColGroup = getColGroupRef<OperatorData>(firestore, operatorGroupPath);
export const operatorCol = (collectionId: NetworkId) => getColRef<OperatorData>(firestore, operatorPath(collectionId));

export const ethRoleAbiCol = getColRef<EthRoleAbiData>(firestore, ethRoleAbiPath);
