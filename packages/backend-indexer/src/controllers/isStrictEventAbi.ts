import { toEventHash, Log } from "viem";
import { AbiEvent } from "abitype";
/**
 * Return whether event conforms to abi by checking
 * - topic[0] = event hash
 * - topics.length - 1 = event.inputs.indexed
 * @warning imperfect as does not check data length
 * @param log
 * @param abi
 */
export function isStrictEventAbi(log: Pick<Log, "topics" | "data">, abi: AbiEvent): boolean {
    const logSighash = log.topics[0];
    //Raw log with no topics
    if (!logSighash) return false;
    //Number of fields indexed excluding topic0 (event signature)
    const logIndexedFieldsCount = log.topics.length - 1;

    const abiSighash = toEventHash(abi);
    const abiIndexedFieldsCount = abi.inputs.reduce((acc, item) => acc + (item.indexed ? 1 : 0), 0);

    return abiSighash === logSighash && abiIndexedFieldsCount === logIndexedFieldsCount;
}
