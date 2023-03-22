/**
 * @module ContractInterface
 */

import { ContractInterfaceCRUD } from "./crud.js";
import { contractInterfaceSaga } from "./sagas/index.js";

export const ContractInterface = {
    name: ContractInterfaceCRUD.name,
    actionTypes: ContractInterfaceCRUD.actionTypes,
    actions: {
        ...ContractInterfaceCRUD.actions,
    },
    sagas: {
        ...ContractInterfaceCRUD.sagas,
        rootSaga: contractInterfaceSaga,
    },
    hooks: {
        ...ContractInterfaceCRUD.hooks,
    },
    selectors: ContractInterfaceCRUD.selectors,
    isAction: ContractInterfaceCRUD.isAction,
    reducer: ContractInterfaceCRUD.reducer,
    validate: ContractInterfaceCRUD.validate,
    validateId: ContractInterfaceCRUD.validateId,
    validateWithRedux: ContractInterfaceCRUD.validateWithRedux,
    encode: ContractInterfaceCRUD.encode,
};
