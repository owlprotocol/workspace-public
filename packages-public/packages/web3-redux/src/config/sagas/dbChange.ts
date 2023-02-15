import { Action } from "redux";
import { all, put } from "typed-redux-saga";
import { TransferBatchTopic, TransferSingleTopic, TransferTopic } from "../../contractevent/constants.js";
import { eventGetPastAction } from "../../contracteventquery/actions/index.js";
import { ContractEventSubscribeCRUD } from "../../contracteventsubscribe/crud.js";
import { coder } from "../../utils/web3-eth-abi/index.js";
import { ConfigCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ConfigCRUD.actions.dbCreating>): Generator<
    any,
    any
> {
    //Handle contract creation
    const { payload } = action;
    const { networkId, account } = payload.obj
    const actions: Action[] = []

    if (networkId && account) {
        actions.push(...startAssetSubscribe(networkId, account).actions)
    }

    yield* all(actions.map((a) => put(a)))
}

export function* dbUpdatingSaga(action: ReturnType<typeof ConfigCRUD.actions.dbUpdating>): Generator<
    any,
    any
> {
    //Handle contract creation
    const { payload } = action;
    const { obj, mods } = payload
    const actions: Action[] = []

    const networkId = mods.networkId ?? obj.networkId
    const account = mods.account ?? obj.account

    if (networkId && account && (mods.networkId || mods.account)) {
        if (obj.networkId && obj.account) {
            actions.push(...stopAssetSubscribe(networkId, account).actions)
        }
        actions.push(...startAssetSubscribe(networkId, account).actions)
    }

    yield* all(actions.map((a) => put(a)))
}

export function* dbDeletingSaga(action: ReturnType<typeof ConfigCRUD.actions.dbDeleting>): Generator<
    any,
    any
> {
    const { payload } = action;
    const { networkId, account } = payload.obj
    const actions: Action[] = []

    if (networkId && account) {
        actions.push(...stopAssetSubscribe(networkId, account).actions)
    }
    yield* all(actions.map((a) => put(a)))
}

export function stopAssetSubscribe(networkId: string, account: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    const addressTopic = coder.encodeParameter('address', account);

    actions.push(
        ContractEventSubscribeCRUD.actions.delete({ networkId, address: '*', topic0: TransferTopic, topic1: addressTopic, topic2: '*', topic3: '*' }),
        ContractEventSubscribeCRUD.actions.delete({ networkId, address: '*', topic0: TransferTopic, topic1: '*', topic2: addressTopic, topic3: '*' }),
        ContractEventSubscribeCRUD.actions.delete({ networkId, address: '*', topic0: TransferSingleTopic, topic1: '*', topic2: addressTopic, topic3: '*' }),
        ContractEventSubscribeCRUD.actions.delete({ networkId, address: '*', topic0: TransferSingleTopic, topic1: '*', topic2: '*', topic3: addressTopic }),
        ContractEventSubscribeCRUD.actions.delete({ networkId, address: '*', topic0: TransferBatchTopic, topic1: '*', topic2: addressTopic, topic3: '*' }),
        ContractEventSubscribeCRUD.actions.delete({ networkId, address: '*', topic0: TransferBatchTopic, topic1: '*', topic2: '*', topic3: addressTopic })
    )
    return { actions }
}


export function startAssetSubscribe(networkId: string, account: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    const addressTopic = coder.encodeParameter('address', account);

    actions.push(
        ContractEventSubscribeCRUD.actions.create({ networkId, address: '*', topic0: TransferTopic, topic1: addressTopic, topic2: '*', topic3: '*', eventName: 'Transfer', active: true }),
        ContractEventSubscribeCRUD.actions.create({ networkId, address: '*', topic0: TransferTopic, topic1: '*', topic2: addressTopic, topic3: '*', eventName: 'Transfer', active: true }),
        ContractEventSubscribeCRUD.actions.create({ networkId, address: '*', topic0: TransferSingleTopic, topic1: '*', topic2: addressTopic, topic3: '*', eventName: 'TransferSingle', active: true }),
        ContractEventSubscribeCRUD.actions.create({ networkId, address: '*', topic0: TransferSingleTopic, topic1: '*', topic2: '*', topic3: addressTopic, eventName: 'TransferSingle', active: true }),
        ContractEventSubscribeCRUD.actions.create({ networkId, address: '*', topic0: TransferBatchTopic, topic1: '*', topic2: addressTopic, topic3: '*', eventName: 'TransferBatch', active: true }),
        ContractEventSubscribeCRUD.actions.create({ networkId, address: '*', topic0: TransferBatchTopic, topic1: '*', topic2: '*', topic3: addressTopic, eventName: 'TransferBatch', active: true }),
        eventGetPastAction({ networkId, address: '*', topic0: TransferTopic, topic1: addressTopic, topic2: '*', topic3: '*', eventName: 'Transfer' }),
        eventGetPastAction({ networkId, address: '*', topic0: TransferTopic, topic1: '*', topic2: addressTopic, topic3: '*', eventName: 'Transfer' }),
        eventGetPastAction({ networkId, address: '*', topic0: TransferSingleTopic, topic1: '*', topic2: addressTopic, topic3: '*', eventName: 'TransferSingle' }),
        eventGetPastAction({ networkId, address: '*', topic0: TransferSingleTopic, topic1: '*', topic2: '*', topic3: addressTopic, eventName: 'TransferSingle' }),
        eventGetPastAction({ networkId, address: '*', topic0: TransferBatchTopic, topic1: '*', topic2: addressTopic, topic3: '*', eventName: 'TransferBatch' }),
        eventGetPastAction({ networkId, address: '*', topic0: TransferBatchTopic, topic1: '*', topic2: '*', topic3: addressTopic, eventName: 'TransferBatch' }),

    )
    return { actions }
}
