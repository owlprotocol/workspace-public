import { interfaceIds, interfaces } from "@owlprotocol/contracts";
import { utils } from "ethers";
import { isEqual, uniqWith } from "lodash-es";
import { call, put } from "typed-redux-saga";
import { ContractCRUD } from "../../../contract/crud.js";
import { httpGet } from "../../../http/actions/httpGet.js";
import { catAction } from "../../../ipfs/actions/cat.js";
import { EthCallCRUD } from "../crud.js";
import { EthCall } from "../model/interface.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof EthCallCRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { obj } = payload;
    const { returnValue } = obj;
    if (returnValue) {
        yield* call(handleEthCallReturnValueUpdate, obj as Omit<EthCall, "returnValue"> & { returnValue: any });
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof EthCallCRUD.actions.dbUpdating>): Generator<any, any> {
    const { payload } = action;
    const { obj, mods } = payload;
    if (mods.returnValue) {
        yield* call(handleEthCallReturnValueUpdate, { ...obj, ...mods } as Omit<EthCall, "returnValue"> & {
            returnValue: any;
        });
    }
}

//Handle contract creation
export function* dbDeletingSaga(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action: ReturnType<typeof EthCallCRUD.actions.dbDeleting>,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
): Generator<any, any> {}

export function* handleEthCallReturnValueUpdate(
    ethcall: Omit<EthCall, "returnValues"> & { returnValue: any },
): Generator<any, any> {
    const { networkId, to, args, methodFormatFull, returnValue } = ethcall;

    if (
        methodFormatFull ===
        interfaces.IERC165.interface
            .getFunction("supportsInterface")
            .format(utils.FormatTypes.full)
            .replace("function ", "")
    ) {
        const interfaceId = args![0];
        yield* call(handleSupportsInterface, networkId, to, interfaceId);
    } else if (
        methodFormatFull ===
        interfaces.IContractURI.interface
            .getFunction("contractURI")
            .format(utils.FormatTypes.full)
            .replace("function ", "")
    ) {
        const uri = returnValue[0] as string;
        if (uri.startsWith("ipfs://")) {
            yield put(httpGet({ url: uri }));
        } else if (uri.startsWith("http://") || uri.startsWith("https://")) {
            yield put(catAction({ path: uri }));
        }
    } else if (
        methodFormatFull ===
        interfaces.IERC721Metadata.interface
            .getFunction("tokenURI")
            .format(utils.FormatTypes.full)
            .replace("function ", "")
    ) {
        const uri = returnValue[0] as string;
        if (uri.startsWith("ipfs://")) {
            yield put(httpGet({ url: uri }));
        } else if (uri.startsWith("http://") || uri.startsWith("https://")) {
            yield put(catAction({ path: uri }));
        }
    } else if (
        methodFormatFull ===
        interfaces.IERC1155MetadataURI.interface
            .getFunction("uri")
            .format(utils.FormatTypes.full)
            .replace("function ", "")
    ) {
        const uri = returnValue[0] as string;
        if (uri.startsWith("ipfs://")) {
            yield put(httpGet({ url: uri.replace("{id}", args[0]) }));
        } else if (uri.startsWith("http://") || uri.startsWith("https://")) {
            yield put(catAction({ path: uri.replace("{id}", args[0]) }));
        }
    }
}

export function* handleSupportsInterface(networkId: string, address: string, interfaceId: string) {
    const contract = yield* call(ContractCRUD.db.get, { networkId, address });
    const abi = uniqWith([...(contract?.abi ?? []), ...interfaceIds[interfaceId]], isEqual);
    if (!isEqual(abi, contract?.abi)) {
        yield* put(ContractCRUD.actions.upsert({ networkId, address, abi }));
    }
}