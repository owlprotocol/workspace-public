import { ethLogResource } from "@owlprotocol/eth-firebase/admin";
import {
    createClient,
    custom,
    EIP1193Parameters,
    EIP1193RequestFn,
    Hex,
    hexToNumber,
    Log,
    PublicRpcSchema,
} from "viem";
import { GCLOUD_PROJECT } from "@owlprotocol/envvars";
import { decodeLogWithAbis } from "../../controllers/decodeLogWithAbis.js";
import { updateStateForLog } from "../../actions/indexer/updateStateForLog.js";

export async function requestLogs(
    request: EIP1193RequestFn<PublicRpcSchema>,
    args: EIP1193Parameters<PublicRpcSchema> & { method: "eth_getLogs" | "eth_getFilterChanges" | "eth_getFilterLogs" },
    options?: any,
) {
    const chainId = hexToNumber(await request({ method: "eth_chainId" }));
    const logsRpc = await request(args, options);

    const logsDecoded = await Promise.all(
        logsRpc.map(async (l) => {
            const { topics, data } = l as Log<Hex, Hex, false>;
            const { eventName, args } = decodeLogWithAbis({ topics, data }) ?? {};

            const logDecoded = l as Log<Hex, Hex, false> & {
                eventName?: string;
                args?: any;
            };
            if (eventName) logDecoded.eventName = eventName;
            if (args) logDecoded.args = args;
            return logDecoded;
        }),
    );

    //Upsert logs, `logIndex` parsed as number as part of composite id
    ethLogResource.upsertBatch(
        logsDecoded.map((l) => {
            return { ...l, chainId, logIndex: hexToNumber(l.logIndex) };
        }),
    );

    //Update state in background (for non-Google environment)
    if (!GCLOUD_PROJECT) {
        Promise.allSettled(
            logsDecoded.map((l) => {
                updateStateForLog(
                    createClient({
                        transport: custom({ request }),
                    }),
                    l,
                );
            }),
        );
    }

    return logsDecoded;
}
