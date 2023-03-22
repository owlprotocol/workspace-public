import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ContractInterfaceName } from "./common.js";
import { ContractInterfaceId, ContractInterface, validateId, toPrimaryKey } from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../db.js";

export const ContractInterfaceCRUD = createCRUDModel<
    typeof ContractInterfaceName,
    ContractInterfaceId,
    ContractInterface,
    Web3ReduxDexie
>({
    name: ContractInterfaceName,
    getDB,
    validators: {
        validateId,
        toPrimaryKey,
    },
});
