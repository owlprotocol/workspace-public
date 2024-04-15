import { expect, describe, test, beforeEach } from "vitest";
import { deleteEmulatorData } from "@owlprotocol/crud-firebase/admin";
import { Log, zeroAddress } from "viem";
import {
    erc1155BalanceResource,
    erc20AllowanceResource,
    erc20BalanceResource,
    erc721Resource,
    ethLogAbiResource,
} from "@owlprotocol/eth-firebase/admin";
import { decodeLogWithAbis, decodeLogWithFirebase } from "./decodeLog.js";

describe("decodeLog.test.ts", function () {
    const sdk = {
        erc20Balance: erc20BalanceResource,
        erc20Allowance: erc20AllowanceResource,
        erc721: erc721Resource,
        erc1155Balance: erc1155BalanceResource,
    };

    beforeEach(async () => {
        await deleteEmulatorData();
    });

    describe("decodeLogWithAbi", async () => {
        test("Transfer - ERC20", async () => {
            //See example https://viem.sh/docs/contract/decodeEventLog
            const log = {
                address: zeroAddress,
                blockNumber: 1n,
                data: "0x0000000000000000000000000000000000000000000000000000000000000003",
                topics: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000002",
                ],
            } as Pick<Log, "address" | "data" | "topics"> & { blockNumber: bigint | `0x${string}` };

            const logDecoded = await decodeLogWithAbis(log, {
                ...sdk,
            });
            expect(logDecoded?.eventName).toBe("Transfer");
            const logArgs = logDecoded?.args as any;
            expect(logArgs.from).toBe("0x0000000000000000000000000000000000000001");
            expect(logArgs.to).toBe("0x0000000000000000000000000000000000000002");
            expect(logArgs.value).toBe(3n);
            console.debug(logArgs);
        });
    });

    describe("decodeLogWithFirebase", () => {
        test("Transfer - ERC20", async () => {
            //https://www.4byte.directory/event-signatures/?bytes_signature=ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
            await ethLogAbiResource.upsert({
                eventSighash: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                indexedFieldsCount: 2,
                eventName: "Transfer",
                eventFormat: "event Transfer(address indexed from, address indexed to, uint256 value)",
            });

            //See example https://viem.sh/docs/contract/decodeEventLog
            const log = {
                data: "0x0000000000000000000000000000000000000000000000000000000000000003",
                topics: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000002",
                ],
            } as Pick<Log, "data" | "topics">;

            const logDecoded = await decodeLogWithFirebase(log, ethLogAbiResource);
            expect(logDecoded?.eventName).toBe("Transfer");
            const logArgs = logDecoded?.args as any;
            expect(logArgs.from).toBe("0x0000000000000000000000000000000000000001");
            expect(logArgs.to).toBe("0x0000000000000000000000000000000000000002");
            expect(logArgs.value).toBe(3n);
            console.debug(logArgs);
        });
    });
});
