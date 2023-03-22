import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { all, takeEvery } from "typed-redux-saga";
import { initializeSaga } from "./initialize.js";
import { INITIALIZE } from "../actions/index.js";

/** @internal */
export function* web3ReduxSaga() {
    yield* all([takeEvery(INITIALIZE, wrapSagaWithErrorHandler(initializeSaga, INITIALIZE))]);
}
