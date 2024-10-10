import { TransactionReceipt, Hex, parseEventLogs } from "viem";
import { DispatchId as dispatchIdEvent } from "../artifacts/Mailbox.js";

export function getMessageIdFromReceipt(receipt: TransactionReceipt): Hex | undefined {
    const logsDecoded = parseEventLogs({ logs: receipt.logs, abi: [dispatchIdEvent], eventName: "DispatchId" });

    return logsDecoded[0]?.args.messageId;
}
