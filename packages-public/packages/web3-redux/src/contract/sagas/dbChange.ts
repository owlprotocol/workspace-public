import { call, put } from "typed-redux-saga";
import { ContractCRUD } from "../crud.js";
import { Contract } from "../model/interface.js";
import { inferInterfaceAction } from "../../contractmodels/erc165/actions/inferInterface.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ContractCRUD.actions.dbCreating>): Generator<any, any> {
    //Handle contract creation
    const { payload } = action;
    const { obj } = payload;
    const { networkId, address, abi } = obj;
    if (!abi) {
        //Infer
        yield* put(inferInterfaceAction({ networkId, address }));
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof ContractCRUD.actions.dbUpdating>): Generator<any, any> {
    //Handle contract creation
    const { payload } = action;
    const { obj, mods } = payload;
    const { networkId, address } = obj;
    const { abi } = mods;

    if (!abi && !obj.abi) {
        //Infer
        yield* put(inferInterfaceAction({ networkId, address }));
    }
}

export function* dbDeletingSaga(action: ReturnType<typeof ContractCRUD.actions.dbDeleting>): Generator<any, any> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId, address } = payload.obj;
        yield* put(ContractCRUD.actions.reduxDelete({ networkId, address }));
    }
}

export function* createContractIfNull(networkId: string, address: string): Generator<any, Contract | undefined> {
    const contract = yield* call(ContractCRUD.db.get, {
        networkId,
        address: address,
    });
    if (!contract) {
        //Create contract if not exists
        yield* put(ContractCRUD.actions.create({ networkId, address }));
    }

    return contract;
}
