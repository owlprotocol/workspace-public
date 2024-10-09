import { Address, Chain, BlockNumber, BlockTag, Client, Transport, GetLogsReturnType, Log, Hash, LogTopic, RpcLog, numberToHex, formatLog } from "viem";
import { getChainId  } from "viem/actions";
import { getAction } from "viem/utils";
import { ethLogResource } from "@owlprotocol/eth-firebase/admin";
import { GCLOUD_PROJECT } from "@owlprotocol/envvars";
import { updateStateForLog } from "../indexer/updateStateForLog.js";
import { decodeLogWithAbis, decodeLogWithFirebase } from "../../controllers/index.js";

export type GetLogsByTopicsParameters<
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
> = {
  /** Address or list of addresses from which logs originated */
  address?: Address | Address[] | undefined
  topics?: LogTopic[]
}  &
  (
    | {
        /** Block number or tag after which to include logs */
        fromBlock?: fromBlock | BlockNumber | BlockTag | undefined
        /** Block number or tag before which to include logs */
        toBlock?: toBlock | BlockNumber | BlockTag | undefined
        blockHash?: undefined
      }
    | {
        fromBlock?: undefined
        toBlock?: undefined
        /** Hash of block to include logs from */
        blockHash?: Hash | undefined
      }
  )

export async function getLogsByTopics<
    chain extends Chain | undefined,
    fromBlock extends BlockNumber | BlockTag | undefined = undefined,
    toBlock extends BlockNumber | BlockTag | undefined = undefined,
>(
    client: Client<Transport, chain>,
    params: GetLogsByTopicsParameters<fromBlock, toBlock> = {},
): Promise<GetLogsReturnType<undefined, undefined, undefined, fromBlock, toBlock>> {
    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));
    const { address, topics, blockHash, fromBlock, toBlock } = params;

    let logs: RpcLog[]
    if (blockHash) {
        logs = await client.request({
            method: 'eth_getLogs',
            params: [{ address, topics, blockHash }],
        })
    } else {
        logs = await client.request({
        method: 'eth_getLogs',
        params: [
            {
            address,
            topics,
            fromBlock:
                typeof fromBlock === 'bigint' ? numberToHex(fromBlock) : fromBlock,
            toBlock: typeof toBlock === 'bigint' ? numberToHex(toBlock) : toBlock,
            },
        ],
        })
    }

    const logsViem = logs.map((log) => formatLog(log))

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
        return logsViem as any;
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

    return logsViem as any;
}
