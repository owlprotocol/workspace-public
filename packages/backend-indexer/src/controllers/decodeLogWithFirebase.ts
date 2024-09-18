import { Abi, decodeEventLog, parseAbi, Log } from "viem";
import { ethLogAbiResource } from "@owlprotocol/eth-firebase/admin";

/**
 * Decode a log by fetching its abi from Firebase
 * @param log
 * @param ethLogAbiResource
 * @returns
 */
export async function decodeLogWithFirebase<T extends Pick<Log, "topics" | "data">>(
    log: T,
): Promise<{
    eventName?: string;
    args?: any[] & Record<string, any>;
} | null> {
    /** Search Firebase Database */
    //Number of fields indexed excluding topic0 (event signature)
    const eventSighash = log.topics[0];
    //Raw log with no topics
    if (!eventSighash) return null;

    const indexedFieldsCount = log.topics.length - 1;
    const ethLogAbi = await ethLogAbiResource.getOrNull({ eventSighash, indexedFieldsCount });
    if (!ethLogAbi) return null;

    //Event Format to Event Abi
    const eventFormat = ethLogAbi.eventFormat;
    const eventAbi: Abi = parseAbi([eventFormat]);

    try {
        const { eventName, args } = decodeEventLog({
            abi: eventAbi,
            data: log.data,
            topics: log.topics,
            strict: true,
        });
        return {
            eventName,
            args,
        } as any;
    } catch (error) {
        //Failed to decode log
        return null;
    }
}
