import { Abi, decodeEventLog, parseAbi } from "viem";
import { EthLog } from "../models/EthLog.js";
import { EthLogAbiResource } from "../models/EthLogAbi.js";

/**
 * Decode a log by fetching its abi from local LRU cache of Firebase
 * @param log
 * @param ethLogAbiResource
 * @returns
 */
export async function decodeLog<T extends Pick<EthLog, "topics" | "data">>(
    log: T,
    ethLogAbiResource: EthLogAbiResource,
): Promise<
    T & {
        eventName?: string;
        args?: any[] & Record<string, any>;
    }
> {
    //Number of fields indexed excluding topic0 (event signature)
    const eventSighash = log.topics[0];
    //Raw log with no topics
    if (!eventSighash) return log;

    const indexedFieldsCount = log.topics.length - 1;
    const ethLogAbi = await ethLogAbiResource.getOrNull({ eventSighash, indexedFieldsCount });
    if (!ethLogAbi) return log;

    //Event Format to Event Abi
    const eventFormat = ethLogAbi.eventFormat;
    const eventAbi: Abi = parseAbi([eventFormat]);

    try {
        const logDecoded = decodeEventLog({
            abi: eventAbi,
            data: log.data,
            topics: log.topics,
            strict: true,
        });
        return {
            ...log,
            ...logDecoded,
        } as any;
    } catch (error) {
        //Failed to decode log
        return log;
    }
}
