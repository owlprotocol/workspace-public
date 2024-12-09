import { Client, Chain, Transport, BlockNumber, BlockTag, AbiEvent } from "viem";
import { getLogs as getLogsViem, GetLogsParameters, GetLogsReturnType, getBlockNumber } from "viem/actions";

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
    let resolvedToBlock: BlockNumber | BlockTag;
    if (params.toBlock === "latest" || params.toBlock === undefined) {
        resolvedToBlock = await getBlockNumber(client);
    } else {
        resolvedToBlock = params.toBlock;
    }

    let fromBlock = params.fromBlock ?? (typeof resolvedToBlock === "bigint" ? resolvedToBlock - 10_000n : undefined);

    if (typeof fromBlock === "bigint") {
        fromBlock = fromBlock < 0n ? 0n : fromBlock;
    }

    if (typeof fromBlock === "bigint" && typeof resolvedToBlock === "bigint" && resolvedToBlock - fromBlock > 10_000n) {
        throw new Error("Block range must be less than 10,000 blocks.");
    }

    return await getLogsViem<chain, abiEvent, abiEvents, strict, fromBlock, toBlock>(client, {
        ...params,
        fromBlock,
        toBlock: resolvedToBlock,
    } as GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock>);
}
