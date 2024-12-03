import { Client, Chain, Transport, BlockNumber, BlockTag, AbiEvent } from "viem";
import { getLogs as getLogsViem, GetLogsParameters, GetLogsReturnType } from "viem/actions";
export async function getLogs<
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
    params: GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock>,
): Promise<GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>> {
    const { fromBlock, toBlock } = params;

    if (typeof fromBlock === "bigint") {
        if (typeof toBlock === "bigint" && toBlock - fromBlock > 10_000n) {
            throw new Error("Block range too large. Ensure `toBlock - fromBlock < 10,000`.");
        }

        if (!toBlock || toBlock === undefined) {
            throw new Error(
                "`toBlock` is undefined. Set a valid `toBlock` or adjust your query to use smaller block ranges.",
            );
        }
    }

    return await getLogsViem<chain, abiEvent, abiEvents, strict, fromBlock, toBlock>(client, params);
}
