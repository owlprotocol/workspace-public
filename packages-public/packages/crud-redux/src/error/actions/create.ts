import { createAction2 } from "../../crud/createAction.js";
import { ReduxError } from "../model/interface.js";
import { name } from "../common.js";

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction2(CREATE, (payload: ReduxError) => {
    return payload;
});
