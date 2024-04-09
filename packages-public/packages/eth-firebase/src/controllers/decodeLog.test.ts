import { expect, describe, test, beforeEach } from "vitest";
import { deleteEmulatorData } from "@owlprotocol/crud-firebase/admin";
import { decodeLog } from "./decodeLog.js";
import { ethLogAbiResource } from "../admin/resources.js";
import { EthLog } from "../models/EthLog.js";

describe("decodeLog.test.ts", function () {
    beforeEach(async () => {
        await deleteEmulatorData();
    });

    describe("ERC20", () => {
        test("Transfer", async () => {
            //https://www.4byte.directory/event-signatures/?bytes_signature=ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
            await ethLogAbiResource.upsert({
                eventSighash: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                indexedFieldsCount: 2,
                eventName: "Transfer",
                eventFormat: "event Transfer(address indexed from, address indexed to, uint256 amount)",
            });

            //See example https://viem.sh/docs/contract/decodeEventLog
            const log = {
                data: "0x0000000000000000000000000000000000000000000000000000000000000003",
                topics: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000002",
                ],
            } as Pick<EthLog, "data" | "topics">;

            const logDecoded = await decodeLog(log, ethLogAbiResource);
            expect(logDecoded.eventName).toBe("Transfer");
            const logArgs = logDecoded.args as any;
            expect(logArgs.from).toBe("0x0000000000000000000000000000000000000001");
            expect(logArgs.to).toBe("0x0000000000000000000000000000000000000002");
            expect(logArgs.amount).toBe(3n);
            console.debug(logArgs);
        });
    });
});
