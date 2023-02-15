import Contracts, { interfaceIdNames, interfaces, InterfaceName } from '@owlprotocol/contracts';
import { Web3ContractMethodParams } from '@owlprotocol/contracts/lib/types/web3/types.js';
import { flatten, isEqual, uniq } from 'lodash-es';
import { Action } from 'redux';
import { all, call, put, select } from 'typed-redux-saga'

import ConfigCRUD from '../../config/crud.js';
import { fetchSaga as fetchConfigSaga } from '../../config/sagas/fetch.js'
import { EthCallCRUD } from '../../ethcall/crud.js';

import { call as callAction, getCodeAction, inferInterfaceAction } from '../actions/index.js';
import { ContractCRUD } from '../crud.js';
import {
    callSagaERC1155BalanceOf,
    callSagaERC721OwnerOf,
} from './call.js';
import {
    eventGetPastAssetRouterSupportsAsset,
    eventGetPastIERC1155TransferBatch,
    eventGetPastIERC1155TransferSingle,
    eventGetPastIERC721Transfer,
} from '../../contracteventquery/sagas/eventGetPast.js';
import {
    eventGetPastAction
} from '../../contracteventquery/actions/eventGetPast.js'
import { getCodeSaga } from './getCode.js';
import { eventSubscribeAction } from '../../contracteventsubscribe/actions/index.js';

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ContractCRUD.actions.dbCreating>): Generator<
    any,
    any
> {
    //Handle contract creation
    const { payload } = action;
    const { networkId, address, abi } = payload.obj
    const interfaceIds = payload.obj.interfaceIds ?? []
    const interfaceNamesSet = new Set(interfaceIds.map((interfaceId) => interfaceIdNames[interfaceId])) as Set<InterfaceName>
    let code = payload.obj.code

    const { config } = yield* call(fetchConfigSaga, ConfigCRUD.actions.fetch({ id: '0' }))
    const account = config?.account

    if (abi) {
        //Redux
        yield* put(ContractCRUD.actions.reduxUpsert({ networkId, address, abi }))
        yield* call(fetchContractData, networkId, address, account, interfaceNamesSet)
    } else {
        //Get Code and infer
        if (!code) code = (yield* call(getCodeSaga, getCodeAction({ networkId, address }, action.meta.uuid))).code
        if (code != '0x') {
            yield* put(inferInterfaceAction({ networkId, address }))
        }
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof ContractCRUD.actions.dbUpdating>): Generator<
    any,
    any
> {

    //Handle contract creation
    const { payload } = action;
    const { networkId, address } = payload.obj
    const { abi } = payload.mods;
    const interfaceIds = payload.mods.interfaceIds ?? payload.obj.interfaceIds ?? []
    const interfaceNamesSet = new Set(interfaceIds.map((interfaceId) => interfaceIdNames[interfaceId])) as Set<InterfaceName>
    let code = payload.mods.code ?? payload.obj.code

    const { config } = yield* call(fetchConfigSaga, ConfigCRUD.actions.fetch({ id: '0' }))
    const account = config?.account

    if (abi) {
        //Redux
        const reduxSelected = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        if (!isEqual(abi, reduxSelected?.abi)) {
            yield* put(ContractCRUD.actions.reduxUpsert({ networkId, address, abi }))
        }
        yield* call(fetchContractData, networkId, address, account, interfaceNamesSet)
    } else {
        //Get Code and infer
        if (!code) code = (yield* call(getCodeSaga, getCodeAction({ networkId, address }, action.meta.uuid))).code
        if (code != '0x') {
            yield* put(inferInterfaceAction({ networkId, address }))
        }
    }
}

export function* dbDeletingSaga(action: ReturnType<typeof ContractCRUD.actions.dbDeleting>): Generator<
    any,
    any
> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId, address } = payload.obj
        yield* put(ContractCRUD.actions.reduxDelete({ networkId, address }))
    }
}

//Handle contract creation
export function* fetchContractData(networkId: string, address: string, account: string | undefined, interfaceNamesSet: Set<InterfaceName>): Generator<
    any,
    any
> {
    //console.debug({ interfaceNamesSet })
    const actions: Action[] = []

    //Handle interface
    if (interfaceNamesSet.has('IERC1820')) {
        const { actions: actionsERC1820 } = fetchERC1820(networkId, address)
        actions.push(...actionsERC1820)
    }

    if (interfaceNamesSet.has('IRouterReceiver')) {
        //ignore
        //TODO: Check common router receivers
    }
    if (interfaceNamesSet.has('IERC2981')) actions.push(...fetchERC2981(networkId, address).actions)
    if (interfaceNamesSet.has('IContractURI')) actions.push(...fetchContractURI(networkId, address).actions)
    if (interfaceNamesSet.has('IAccessControl')) actions.push(...fetchAccessControl(networkId, address).actions)

    if (interfaceNamesSet.has('IERC20')) {
        const { actions: actionsERC20 } = fetchERC20(networkId, address, account)
        actions.push(...actionsERC20)
        if (interfaceNamesSet.has('IERC20Metadata')) {
            actions.push(...fetchERC20Metadata(networkId, address).actions)
        }
    }

    if (interfaceNamesSet.has('IERC721')) {
        const { actions: actionsERC721, tokens } = yield* call(fetchERC721, networkId, address, account)
        actions.push(...actionsERC721)
        if (interfaceNamesSet.has('IERC721Metadata')) {
            const { actions: actionsERC721Metadata } = fetchERC721Metadata(networkId, address, tokens)
            actions.push(...actionsERC721Metadata)
        }
        if (interfaceNamesSet.has('IERC721TopDown')) {
            const { actions: actionsERC721TopDown } = fetchERC721TopDown(networkId, address, account)
            actions.push(...actionsERC721TopDown)
        }
        if (interfaceNamesSet.has('IERC721Dna')) {
            actions.push(...fetchERC721Dna(networkId, address, tokens).actions)
        }
    }

    if (interfaceNamesSet.has('IERC1155')) {
        const { actions: actionsERC1155, tokens } = yield* call(fetchERC1155, networkId, address, account)
        actions.push(...actionsERC1155)

        if (interfaceNamesSet.has('IERC1155MetadataURI')) {
            actions.push(
                callAction<Web3ContractMethodParams<Contracts.Web3.IERC1155MetadataURI, 'uri'>>({ networkId, address, method: 'uri' }),
            )
        }
        if (interfaceNamesSet.has('IERC1155Dna')) {
            const tokenIds = tokens.map(({ tokenId }) => tokenId)
            actions.push(...fetchERC1155Dna(networkId, address, tokenIds).actions)
        }
    }

    if (interfaceNamesSet.has('IAssetRouterInput')) {
        const result = yield* call(fetchAssetRouterInput, networkId, address, account)
        actions.push(...result.actions)
    }

    if (interfaceNamesSet.has('IAssetRouterOutput')) {
        const result = yield* call(fetchAssetRouterOutput, networkId, address, account)
        actions.push(...result.actions)
    }

    yield* all(actions.map((a) => put(a)))
}

export function fetchERC1820(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        eventGetPastAction({ networkId, address, eventName: 'InterfaceImplementerSet' }),
        eventSubscribeAction({ networkId, address, eventName: 'InterfaceImplementerSet' })
    )
    return { actions }
}

export function fetchERC2981(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC2981, 'royaltyInfo'>>({ networkId, address, method: 'royaltyInfo', args: [1, 10000], maxCacheAge: Number.MAX_SAFE_INTEGER }),
    )
    return { actions }
}

export function fetchContractURI(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        callAction<Web3ContractMethodParams<Contracts.Web3.IContractURI, 'contractURI'>>({ networkId, address, method: 'contractURI', maxCacheAge: Number.MAX_SAFE_INTEGER }),
    )
    return { actions }
}

export function fetchAccessControl(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        eventGetPastAction<Contracts.Web3.RoleAdminChangedEvent['returnValues']>({ networkId, address, eventName: 'RoleAdminChanged' }),
        eventGetPastAction<Contracts.Web3.RoleGrantedEvent['returnValues']>({ networkId, address, eventName: 'RoleGranted' }),
        eventGetPastAction<Contracts.Web3.RoleRevokedEvent['returnValues']>({ networkId, address, eventName: 'RoleRevoked' }),
    )
    return { actions }
}

export function fetchERC20(networkId: string, address: string, account: string | undefined): {
    actions: Action[]
} {
    const actions: Action[] = []
    if (account) {
        actions.push(
            callAction<Web3ContractMethodParams<Contracts.Web3.IERC20, 'balanceOf'>>({ networkId, address, method: 'balanceOf', args: [account] }),
            eventGetPastAction<Contracts.Web3.IERC20TransferEvent['returnValues']>({ networkId, address, eventName: 'Transfer', filter: { to: account } }),
            eventGetPastAction<Contracts.Web3.IERC20TransferEvent['returnValues']>({ networkId, address, eventName: 'Transfer', filter: { from: account } }),
            eventSubscribeAction<Contracts.Web3.IERC20TransferEvent['returnValues']>({ networkId, address, eventName: 'Transfer', filter: { to: account } }),
            eventSubscribeAction<Contracts.Web3.IERC20TransferEvent['returnValues']>({ networkId, address, eventName: 'Transfer', filter: { from: account } })
        )
    }
    return { actions }
}

export function fetchERC20Metadata(networkId: string, address: string): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC20Metadata, 'name'>>({ networkId, address, method: 'name', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC20Metadata, 'symbol'>>({ networkId, address, method: 'symbol', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC20Metadata, 'decimals'>>({ networkId, address, method: 'decimals', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC20Metadata, 'totalSupply'>>({ networkId, address, method: 'totalSupply', maxCacheAge: Number.MAX_SAFE_INTEGER })
    )
    return { actions }
}

export function* fetchERC721(networkId: string, address: string, account: string | undefined): Generator<any, {
    actions: Action[]
    tokens: string[]
}> {
    const actions: Action[] = []
    let tokens: string[] = []
    if (account) {
        actions.push(
            callAction<Web3ContractMethodParams<Contracts.Web3.IERC721, 'balanceOf'>>({ networkId, address, method: 'balanceOf', args: [account] }),
            eventGetPastAction<Contracts.Web3.IERC721TransferEvent['returnValues']>({ networkId, address, eventName: 'Transfer', filter: { from: account } }),
            eventSubscribeAction<Contracts.Web3.IERC721TransferEvent['returnValues']>({ networkId, address, eventName: 'Transfer', filter: { to: account } }),
            eventSubscribeAction<Contracts.Web3.IERC721TransferEvent['returnValues']>({ networkId, address, eventName: 'Transfer', filter: { from: account } })
        )
        //Transfer to yielded to get user assets
        const TransferTo = yield* call(eventGetPastIERC721Transfer, eventGetPastAction<Contracts.Web3.IERC721TransferEvent['returnValues']>({ networkId, address, filter: { to: account } }))
        const tokenIds = uniq(TransferTo.map((e) => e.returnValues!.tokenId))
        const tokenOwners = yield* all(tokenIds.map((tokenId) => {
            return call(callSagaERC721OwnerOf, callAction<Web3ContractMethodParams<Contracts.Web3.IERC721, 'ownerOf'>>({ networkId, address, args: [tokenId] }))
        }))
        tokens = tokenOwners.filter((t) => t.ethcall.returnValue === account).map((t) => t.ethcall.args![0] as string)
    }
    return { actions, tokens }
}

export function fetchERC721Metadata(networkId: string, address: string, tokens: string[]): {
    actions: Action[],
} {
    const actions: Action[] = []
    actions.push(
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC721Metadata, 'name'>>({ networkId, address, method: 'name', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        callAction<Web3ContractMethodParams<Contracts.Web3.IERC721Metadata, 'symbol'>>({ networkId, address, method: 'symbol', maxCacheAge: Number.MAX_SAFE_INTEGER }),
        ...tokens.map((tokenId) => {
            return callAction<Web3ContractMethodParams<Contracts.Web3.IERC721Metadata, 'tokenURI'>>({ networkId, address, method: 'tokenURI', args: [tokenId], maxCacheAge: 0 })
        })
    )
    return { actions }
}

export function fetchERC721TopDown(networkId: string, address: string, account: string | undefined): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(callAction<Web3ContractMethodParams<Contracts.Web3.IERC721TopDown, 'getChildContracts'>>({ networkId, address, method: 'getChildContracts', maxCacheAge: Number.MAX_SAFE_INTEGER }))
    if (account) {
        actions.push(
            eventGetPastAction<Contracts.Web3.IERC721TopDownSetChild721Event['returnValues']>({ networkId, address, eventName: 'SetChild721', filter: { parentOwner: account } }),
            eventGetPastAction<Contracts.Web3.IERC721TopDownAttachedChild1155Event['returnValues']>({ networkId, address, eventName: 'AttachedChild1155', filter: { parentOwner: account } }),
            eventGetPastAction<Contracts.Web3.IERC721TopDownDetachedChild1155Event['returnValues']>({ networkId, address, eventName: 'DetachedChild1155', filter: { parentOwner: account } }),
            eventSubscribeAction<Contracts.Web3.IERC721TopDownSetChild721Event['returnValues']>({ networkId, address, eventName: 'SetChild721', filter: { parentOwner: account } }),
            eventSubscribeAction<Contracts.Web3.IERC721TopDownAttachedChild1155Event['returnValues']>({ networkId, address, eventName: 'AttachedChild1155', filter: { parentOwner: account } }),
            eventSubscribeAction<Contracts.Web3.IERC721TopDownDetachedChild1155Event['returnValues']>({ networkId, address, eventName: 'DetachedChild1155', filter: { parentOwner: account } })
        )
    }
    return { actions }
}

export function fetchERC721Dna(networkId: string, address: string, tokens: string[]): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(
        ...tokens.map((tokenId) => callAction<Web3ContractMethodParams<Contracts.Web3.IERC721Dna, 'getDna'>>({ networkId, address, method: 'getDna', args: [tokenId], maxCacheAge: 0 }))
    )
    return { actions }
}

export function* fetchERC1155(networkId: string, address: string, account: string | undefined): Generator<any, {
    actions: Action[]
    tokens: { tokenId: string, balance: string }[]
}> {
    const actions: Action[] = []
    let tokens: { tokenId: string, balance: string }[] = []
    if (account) {
        actions.push(
            eventGetPastAction<Contracts.Web3.IERC1155TransferSingleEvent['returnValues']>({ networkId, address, filter: { from: account } }),
            eventGetPastAction<Contracts.Web3.IERC1155TransferBatchEvent['returnValues']>({ networkId, address, filter: { from: account } }),
            eventSubscribeAction({ networkId, address, eventName: 'TransferSingle', filter: { to: account } }),
            eventSubscribeAction({ networkId, address, eventName: 'TransferSingle', filter: { from: account } }),
            eventSubscribeAction({ networkId, address, eventName: 'TransferBatch', filter: { to: account } }),
            eventSubscribeAction({ networkId, address, eventName: 'TransferBatch', filter: { from: account } })
        )

        //Yielded to get user assets
        const TransferSingle = yield* call(eventGetPastIERC1155TransferSingle, eventGetPastAction<Contracts.Web3.IERC1155TransferSingleEvent['returnValues']>({ networkId, address, filter: { to: account } }))
        const TransferBatch = yield* call(eventGetPastIERC1155TransferBatch, eventGetPastAction<Contracts.Web3.IERC1155TransferBatchEvent['returnValues']>({ networkId, address, filter: { to: account } }))
        const tokenIds = uniq([...TransferSingle.map((e) => e.returnValues!.id), ...flatten(TransferBatch.map((e) => e.returnValues!.ids))])
        const results = yield* all(tokenIds.map((tokenId) => {
            return call(callSagaERC1155BalanceOf, callAction<Web3ContractMethodParams<Contracts.Web3.IERC1155, 'balanceOf'>>({ networkId, address, args: [account, tokenId], maxCacheAge: 0 }))
        }))
        tokens = results.map((r) => { return { tokenId: r.ethcall.args![1] as string, balance: r.ethcall.returnValue! } })
    }
    return { actions, tokens }
}

export function fetchERC1155Dna(networkId: string, address: string, tokens: string[]): {
    actions: Action[]
} {
    const actions: Action[] = []
    actions.push(...tokens.map((tokenId) => {
        return callAction<Web3ContractMethodParams<Contracts.Web3.IERC1155Dna, 'getDna'>>({ networkId, address, method: 'getDna', args: [tokenId], maxCacheAge: 0 })
    }))
    return { actions }
}

export function* fetchAssetRouterInput(networkId: string, address: string, account: string | undefined): Generator<any, {
    actions: Action[]
}> {
    //Actions to dispatch
    const actions: Action[] = []
    if (account) {
        actions.push(
            eventGetPastAction<Contracts.Web3.RouteBasket['returnValues']>({ networkId, address, eventName: 'RouteBasket', filter: { from: account } }),
            eventSubscribeAction<Contracts.Web3.RouteBasket['returnValues']>(({ networkId, address, eventName: 'RouteBasket', filter: { from: account } }))
        )
    }
    //Add supported assets
    const SupportsAsset = yield* call(eventGetPastAssetRouterSupportsAsset, eventGetPastAction<Contracts.Web3.SupportsAsset['returnValues']>({ networkId, address }))
    const tokens = uniq(SupportsAsset.map((e) => e.returnValues?.contractAddr!))
    //TODO: What is behaviour if asset already exists?
    actions.push(...tokens.map((t) => ContractCRUD.actions.create({ networkId, address: t })))

    return { actions }
}

export function* fetchAssetRouterOutput(networkId: string, address: string, account: string | undefined): Generator<any, {
    actions: Action[]
}> {
    //Actions to dispatch
    const actions: Action[] = []
    if (account) {
        actions.push(
            eventGetPastAction<Contracts.Web3.RouteBasket['returnValues']>({ networkId, address, filter: { to: account } }),
            eventSubscribeAction<Contracts.Web3.RouteBasket['returnValues']>({ networkId, address, eventName: 'RouteBasket', filter: { to: account } })
        )
    }
    //Add supported assets
    const SupportsAsset = yield* call(eventGetPastAssetRouterSupportsAsset, eventGetPastAction<Contracts.Web3.SupportsAsset['returnValues']>({ networkId, address }))
    const tokens = uniq(SupportsAsset.map((e) => e.returnValues?.contractAddr!))
    //TODO: What is behaviour if asset already exists?
    actions.push(...tokens.map((t) => ContractCRUD.actions.create({ networkId, address: t })))

    return { actions }
}
