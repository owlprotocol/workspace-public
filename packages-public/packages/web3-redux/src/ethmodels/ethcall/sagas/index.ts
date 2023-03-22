import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";
import { watchWeb3CallSaga } from "./web3Call.js";
import { EthCallCRUD } from "../crud.js";

/** @internal */
export function* ethCallSaga() {
    yield* all([
        spawn(EthCallCRUD.sagas.crudRootSaga),
        spawn(watchWeb3CallSaga),
        takeEvery(EthCallCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(EthCallCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(EthCallCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
