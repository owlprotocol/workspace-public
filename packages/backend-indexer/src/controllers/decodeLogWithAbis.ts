import { decodeEventLog, Log, toFunctionSignature } from "viem";
import { AbiEvent, formatAbiItem } from "abitype";
import { events as Create2FactoryEvents } from "@owlprotocol/contracts-create2factory/artifacts/events";
import { events as AccountAbstractionEvents } from "@owlprotocol/contracts-account-abstraction/artifacts/events";
import { events as DiamondEvents } from "@owlprotocol/contracts-diamond/artifacts/events";
import { Transfer as TransferERC20, Approval as ApprovalERC20 } from "@owlprotocol/contracts-diamond/artifacts/IERC20";
import { Transfer as TransferERC721 } from "@owlprotocol/contracts-diamond/artifacts/IERC721";
import { TransferSingle, TransferBatch } from "@owlprotocol/contracts-diamond/artifacts/IERC1155";

import { uniqBy } from "lodash-es";
import { isStrictEventAbi } from "./isStrictEventAbi.js";

/**
 * Decode a log with common abis
 * @param log
 * @param ethLogAbiResource
 * @returns
 */
export function decodeLogWithAbis(log: Pick<Log, "topics" | "data">): {
    eventName?: string;
    args?: any[] & Record<string, any>;
} | null {
    /** Local decodeing of common abis */
    try {
        if (isStrictEventAbi(log, TransferERC20)) {
            const { eventName, args } = decodeEventLog({
                abi: [TransferERC20],
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            return { eventName, args } as any;
        } else if (isStrictEventAbi(log, ApprovalERC20)) {
            const { eventName, args } = decodeEventLog({
                abi: [ApprovalERC20],
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            return { eventName, args } as any;
        } else if (isStrictEventAbi(log, TransferERC721)) {
            const { eventName, args } = decodeEventLog({
                abi: [TransferERC721],
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            return { eventName, args } as any;
        } else if (isStrictEventAbi(log, TransferSingle)) {
            const { eventName, args } = decodeEventLog({
                abi: [TransferSingle],
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            return { eventName, args } as any;
        } else if (isStrictEventAbi(log, TransferBatch)) {
            const { eventName, args } = decodeEventLog({
                abi: [TransferBatch],
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            return { eventName, args } as any;
        } else {
            const { eventName, args } = decodeEventLog({
                abi: uniqBy(
                    [...Create2FactoryEvents, ...AccountAbstractionEvents, ...DiamondEvents] as AbiEvent[],
                    (f) =>
                        `${toFunctionSignature(formatAbiItem(f))}-${f.inputs.filter((input) => input.indexed).length}`,
                ),
                data: log.data,
                topics: log.topics,
                strict: true,
            });
            return { eventName, args } as any;
        }
    } catch (error) {
        //Failed to decode log
        return null;
    }
}
