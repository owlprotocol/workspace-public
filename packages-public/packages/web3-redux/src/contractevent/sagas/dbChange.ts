import { Artifacts, Utils } from '@owlprotocol/contracts'
import { call, put } from 'typed-redux-saga'
import { ContractCRUD } from '../../contract/crud.js';
import { TransferBatchTopic, TransferSingleTopic, TransferTopic } from '../constants.js';
import { ContractEventCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ContractEventCRUD.actions.dbCreating>): Generator<
    any,
    any
> {
    const { payload } = action
    const { obj } = payload
    const { networkId, address, name, topic0, topics, returnValues } = obj


    if (address.toLowerCase() === Utils.ERC1820.registryAddress.toLowerCase() && name === 'InterfaceImplementerSet') {
        const contractAddress = returnValues?.implementer
        if (contractAddress) {
            yield* put(ContractCRUD.actions.create({ networkId, address: contractAddress }))
        }
        return;
    }

    const contract = yield* call(ContractCRUD.db.get, { networkId, address: address })
    if (!contract) {
        if (topic0 === TransferTopic) {
            if (topics?.length === 3) {
                yield* put(ContractCRUD.actions.create({ networkId, address }))
            } else if (topics?.length === 4) {
                yield* put(ContractCRUD.actions.create({ networkId, address }))
            }
        } else if (topic0 === TransferSingleTopic || topic0 === TransferBatchTopic) {
            yield* put(ContractCRUD.actions.create({ networkId, address }))
        }
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof ContractEventCRUD.actions.dbUpdating>): Generator<
    any,
    any
> {

}

//Handle contract creation
export function* dbDeletingSaga(action: ReturnType<typeof ContractEventCRUD.actions.dbDeleting>): Generator<
    any,
    any
> {

}