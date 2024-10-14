//TODO: Use join to concat path. Disabled for web compatibility for now
// import { join } from "path";
import { NetworkId, encodeNetworkId } from "./models/Network.js";

//Hacky join implementation
function join(...parameters: string[]) {
    return parameters.join("/");
}

//networks
export const networkPath = "network";
export const networkPrivatePath = "networkPrivate";

//ethmodels
export const ethFunctionAbiPath = "ethFunctionAbi";
export const ethLogAbiPath = "ethLogAbi";

export const ethBlockGroupPath = "ethBlock";
export const ethBlockPath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), ethBlockGroupPath);
};
export const ethBytecodeGroupPath = "ethBytecode";
export const ethBytecodePath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), ethBytecodeGroupPath);
};
export const ethTransactionGroupPath = "ethTransaction";
export const ethTransactionPath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), ethTransactionGroupPath);
};
export const ethTransactionReceiptGroupPath = "ethTransactionReceipt";
export const ethTransactionReceiptPath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), ethTransactionReceiptGroupPath);
};
export const ethLogGroupPath = "ethLog";
export const ethLogPath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), ethLogGroupPath);
};
export const ethUserOpGroupPath = "ethUserOp";
export const ethUserOpPath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), ethUserOpGroupPath);
};
export const ethUserOpReceiptGroupPath = "ethUserOpReceipt";
export const ethUserOpReceiptPath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), ethUserOpReceiptGroupPath);
};

//contractmodels
export const erc20GroupPath = "erc20";
export const erc20Path = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), erc20GroupPath);
};
export const erc20AllowanceGroupPath = "erc20Allowance";
export const erc20AllowancePath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), erc20AllowanceGroupPath);
};
export const erc20BalanceGroupPath = "erc20Balance";
export const erc20BalancePath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), erc20BalanceGroupPath);
};
export const erc721GroupPath = "erc721";
export const erc721Path = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), erc721GroupPath);
};
export const erc1155GroupPath = "erc1155";
export const erc1155Path = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), erc1155GroupPath);
};
export const erc1155BalanceGroupPath = "erc1155Balance";
export const erc1155BalancePath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), erc1155BalanceGroupPath);
};
export const operatorGroupPath = "operator";
export const operatorPath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), operatorGroupPath);
};
export const ethRoleAbiPath = "ethRoleabi";
export const ethRoleGroupPath = "ethRole";
export const ethRolePath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), ethRoleGroupPath);
};
export const ethRoleAdminGroupPath = "ethRoleAdmin";
export const ethRoleAdminPath = (collectionId: NetworkId) => {
    return join(networkPath, encodeNetworkId(collectionId), ethRoleAdminGroupPath);
};
