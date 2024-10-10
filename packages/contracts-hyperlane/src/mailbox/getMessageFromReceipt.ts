import { TransactionReceipt, parseEventLogs } from "viem";
import { Dispatch as dispatchEvent } from "../artifacts/Mailbox.js";

export function getMessageFromReceipt(receipt: TransactionReceipt) {
    const logsDecoded = parseEventLogs({ logs: receipt.logs, abi: [dispatchEvent], eventName: "Dispatch" });

    return logsDecoded[0]?.args.message;
}
