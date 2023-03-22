import { all, spawn } from "typed-redux-saga";
import { ContractInterfaceCRUD } from "../crud.js";

/** @internal */
export function* contractInterfaceSaga() {
    yield* all([spawn(ContractInterfaceCRUD.sagas.crudRootSaga)]);
}
