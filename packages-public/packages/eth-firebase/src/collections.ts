//TODO: Use join to concat path. Disabled for web compatibility for now
// import { join } from "path";
import { NetworkId, encodeNetworkId } from "./models/Network.js";

//Hacky join implementation
function join(...parameters: string[]) {
    return parameters.join("/");
}

const networkPath = "network";
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
