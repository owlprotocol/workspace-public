import { createAction2 } from "@owlprotocol/crud-redux";

import { ContractId } from "../../../contract/model/interface.js";
import { ERC165Name } from "../common.js";

/** @internal */
export const INFER_INTERFACE = `${ERC165Name}/INFER_INTERFACE`;
/** @category Actions */
export const inferInterfaceAction = createAction2(INFER_INTERFACE, (payload: ContractId) => {
    return { networkId: payload.networkId, address: payload.address.toLowerCase() };
});
/** @internal */
export type InferInterfaceAction = ReturnType<typeof inferInterfaceAction>;
/** @internal */
export const isInferInterfaceAction = inferInterfaceAction.match;
