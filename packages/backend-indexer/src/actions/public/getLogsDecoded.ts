import {
    Chain,
    AbiEvent,
    BlockNumber,
    BlockTag,
    Client,
    Transport,
    GetLogsParameters,
    GetLogsReturnType,
    Log,
} from "viem";
import { getLogs as getLogsViem } from "viem/actions";
import { decodeLogWithAbis } from "../../controllers/decodeLogWithAbis.js";

export async function getLogsDecoded<
    chain extends Chain | undefined,
    const abiEvent extends AbiEvent | undefined = undefined,
    const abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent
        ? [abiEvent]
        : undefined,
    strict extends boolean | undefined = undefined,
    fromBlock extends BlockNumber | BlockTag | undefined = undefined,
    toBlock extends BlockNumber | BlockTag | undefined = undefined,
>(
    client: Client<Transport, chain>,
    params: GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock> = {},
): Promise<GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>> {
    const logsViem = await getLogsViem<chain, abiEvent, abiEvents, strict, fromBlock, toBlock>(client, params);
    return logsViem.map((l) => {
        if (!(l as Log<bigint, number, boolean, AbiEvent>).eventName) {
            const { topics, data } = l as Log<bigint, number, false>;
            const { eventName, args } = decodeLogWithAbis({ topics, data }) ?? {};

            const logDecoded = l as Log<bigint, number, false> & {
                eventName?: string;
                args?: any;
            };
            if (eventName) logDecoded.eventName = eventName;
            if (args) logDecoded.args = args;
            return logDecoded;
        }

        return l;
    }) as GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>;
}