import { utils } from "ethers";
import { pick, zip } from "lodash-es";
import { EthLog, indexedTopicsLengthMatch } from "./interface.js";
import { mapDeepBigNumberToString } from "../../../utils/mapDeepBigNumberToString.js";
import { EthLogAbiCRUD } from "../../ethlogabi/crud.js";
import { getContractCRUD } from "../../../contract/crudGet.js";
//import { ERC165CRUD } from "../../../contractmodels/erc165/crud.js";

const ContractCRUD = getContractCRUD();

export async function preWriteBulkDB(items: EthLog[]): Promise<EthLog[]> {
    //const erc165 = await ERC165CRUD.db.bulkWhere(items.map((c) => pick(c, "networkId", "address")));
    //TODO: erc165abi map interfaceId => abi
    const contracts = await ContractCRUD.db.bulkGet(items.map((c) => pick(c, "networkId", "address")));
    const ethlogabisArr = await EthLogAbiCRUD.db.bulkWhere(
        items.map((c) => {
            return { eventSighash: c.topic0 ?? "" };
        }),
    );

    const promises = zip(items, contracts, ethlogabisArr).map(async ([e, contract, ethlogabis]) => {
        const { data, topics, topic0 } = e!;
        let eventFormatFull = e!.eventFormatFull;
        let returnValues = e!.returnValues;

        if (topic0 && (!eventFormatFull || !returnValues)) {
            /*
            //ERC165 - useless as already handled in-memory
            //TODO: Use DB mapping iface => abi, stores API data
            const abi165 = flatten(
                ifaces!.map((iface) => {
                    return interfaceIds[iface.interfaceId] ?? [];
                }),
            );
            const iface165 = new utils.Interface(abi165 as any);
            const methodFormatFull = inferEthLogFormatFullFromIface(topics, iface165);
            */

            //Contract
            const eventFragments: utils.EventFragment[] = [];
            const abi = contract?.abi;
            if (abi) {
                try {
                    const iface = new utils.Interface(abi as any);
                    eventFragments.push(iface.getEvent(topic0));
                    // eslint-disable-next-line no-empty
                } catch (error) {}
            }
            eventFragments.push(...ethlogabis!.map((e) => utils.EventFragment.from(e.eventFormatFull)));

            for (const fragment of eventFragments) {
                if (indexedTopicsLengthMatch(topics, fragment)) {
                    //Decode
                    if (!eventFormatFull) {
                        eventFormatFull = fragment.format(utils.FormatTypes.full).replace("event ", "");
                    }
                    if (!returnValues) {
                        const iface = new utils.Interface([fragment]);
                        returnValues = iface.decodeEventLog(fragment, data, topics);
                        returnValues = mapDeepBigNumberToString(returnValues);
                    }
                    return {
                        ...e!,
                        eventFormatFull,
                        returnValues,
                    };
                }
            }
            return e!;
        }
        return e!;
    });

    return Promise.all(promises);
}
