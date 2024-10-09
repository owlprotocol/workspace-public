import type { AbiEvent } from "abitype";
import { Chain, BlockNumber, BlockTag, Client, Transport, GetLogsParameters, GetLogsReturnType, Log } from "viem";
import { getChainId, getLogs as getLogsViem } from "viem/actions";
import { getAction } from "viem/utils";
import { ethLogResource } from "@owlprotocol/eth-firebase/admin";
import { GCLOUD_PROJECT } from "@owlprotocol/envvars";
import { updateStateForLog } from "../indexer/updateStateForLog.js";
import { decodeLogWithAbis, decodeLogWithFirebase } from "../../controllers/index.js";

/**
 * Returns a list of event logs matching the provided parameters.
 *
 * - Docs: https://viem.sh/docs/actions/public/getLogs
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/filters-and-logs/event-logs
 * - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)
 *
 * @param client - Client to use
 * @param parameters - {@link GetLogsParameters}
 * @returns A list of event logs. {@link GetLogsReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getLogs } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const logs = await getLogs(client)
 */
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
    params: GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock> = {},
): Promise<GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>> {
    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    const logsViem = await getLogsViem<chain, abiEvent, abiEvents, strict, fromBlock, toBlock>(client, params);
    //TODO: Is this logic required? Only accept if all logs confirmed
    if (
        logsViem.some(
            (log) =>
                log.blockHash === null ||
                log.blockNumber === null ||
                log.transactionIndex === null ||
                log.transactionHash === null ||
                log.logIndex === null,
            // log.topics.length === 0,
        )
    ) {
        // transaction pending
        return logsViem;
    }

    const logsRpcConfirmed: Log<bigint, number, false>[] = logsViem.filter((l) => l.blockHash) as Log<
        bigint,
        number,
        false
    >[];

    const logsDecoded = await Promise.all(
        logsRpcConfirmed.map(async (l) => {
            const { topics, data } = l as Log<bigint, number, false>;
            const { eventName, args } =
                decodeLogWithAbis({ topics, data }) ?? (await decodeLogWithFirebase({ topics, data })) ?? {};

            const logDecoded = l as Log<bigint, number, false> & {
                eventName?: string;
                args?: any;
            };
            if (eventName) logDecoded.eventName = eventName;
            if (args) logDecoded.args = args;
            return logDecoded;
        }),
    );

    //Upsert logs, `logIndex` parsed as number as part of composite id
    //TODO: Seems like need to await for write to confirm?
    await ethLogResource.upsertBatch(
        logsDecoded.map((l) => {
            return { ...l, chainId };
        }),
    );

    //Update state in background (for non-Google environment)
    if (!GCLOUD_PROJECT) {
        Promise.allSettled(
            logsDecoded.map((l) => {
                updateStateForLog(client, l);
            }),
        );
    }

    return logsViem;
}
