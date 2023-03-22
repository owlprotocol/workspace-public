import { put, call, all } from "typed-redux-saga";
import { interfaceIdNames } from "@owlprotocol/contracts";
import { Action } from "redux";
import { flatten } from "lodash-es";
import { ContractCRUD } from "../../contract/crud.js";
import { fetchContractActions } from "../../contractmodels/actions/fetchContractActions.js";
import { NetworkCRUD } from "../../network/crud.js";
import { defaultNetworks } from "../../network/defaults.js";
import { Network } from "../../network/model/interface.js";
import { ConfigCRUD } from "../../config/crud.js";
import { ERC165CRUD } from "../../contractmodels/erc165/crud.js";
import { inferInterfaceAction } from "../../contractmodels/erc165/actions/inferInterface.js";

export function* initializeSaga(): Generator<any, any, any> {
    //Load existing data to redux
    //Config
    const config = yield* call(ConfigCRUD.db.get, "0");
    const account = config?.account;

    //Networks
    //Create default networks
    const networksCreate = Object.values(defaultNetworks()) as Network[];
    yield* put(NetworkCRUD.actions.createBatched(networksCreate));

    //TODO: Config gets overriden by defaults
    //const networks = yield* call(NetworkCRUD.db.all);
    const networksUpsert = NetworkCRUD.actions.reduxUpsertBatched(networksCreate);
    yield* put(networksUpsert);
    //Contracts
    const contracts = yield* call(ContractCRUD.db.all);
    const contractsNoAbi = contracts.filter((c) => !c.abi);

    const erc165 = yield* call(ERC165CRUD.db.all);
    const actions: Action[] = [];
    actions.push(
        ...flatten(
            erc165.map((e) => {
                const ifaceName = interfaceIdNames[e.interfaceId];
                return fetchContractActions(e.networkId, e.address, account, ifaceName);
            }),
        ),
    );

    actions.push(
        ...contractsNoAbi.map((c) => {
            //Infer
            const { networkId, address } = c;
            return inferInterfaceAction({ networkId, address });
        }),
    );

    yield* all(actions.map((a) => put(a)));

    //Eth Call
    /*
    const ethcall = yield* call(EthCallCRUD.db.all)
    const ethcallLoading = ethcall.filter((f) => f.status === 'LOADING')
    */
    //Block subscriptions
    //TODO
}
