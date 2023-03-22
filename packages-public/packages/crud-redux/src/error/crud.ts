import { name } from "./common.js";
import {
    ReduxErrorId,
    ReduxError,
    ReduxErrorIndexInput,
    ReduxErrorIndexInputAnyOf,
    toPrimaryKey,
    validateId,
    validate,
} from "./model/index.js";
import { createCRUDModel } from "../crud/createCRUDModel.js";
import { CrudDexie, getDB } from "../db.js";

export const ReduxErrorCRUD = createCRUDModel<
    typeof name,
    ReduxErrorId,
    ReduxError,
    CrudDexie,
    ReduxErrorIndexInput,
    ReduxErrorIndexInputAnyOf
>({
    name,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
