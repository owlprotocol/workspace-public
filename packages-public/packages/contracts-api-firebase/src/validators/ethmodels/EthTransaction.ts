import { addressZod, bytes32Zod } from "@owlprotocol/zod-sol";
import { TypeEqual, expectType } from "ts-expect";
import { z } from "zod";
import { EthTransaction } from "../../models/ethmodels/EthTransaction.js";

export const ethTransactionZod = z
    .object({
        networkId: z.string().describe("networkId"),
        from: addressZod.describe("from"),
        to: addressZod.describe("to"),
        data: z.string().describe("data"),
        hash: bytes32Zod.describe("hash"),
        gas: z.string().describe("gas"),
        effectiveGasPrice: z.string().describe("effective gas price"),
        blockNumber: z.number().describe("block number"),
        blockHash: bytes32Zod.describe("block hash"),
        confirmations: z.number().describe("confirmations"),
        ethCost: z.string().describe("eth cost"),
        usdCost: z.string().describe("usd cost"),
    })
    .describe("eth transaction");

type EthTransactionZodInferred = Readonly<z.infer<typeof ethTransactionZod>>;
expectType<TypeEqual<EthTransaction, EthTransactionZodInferred>>(true);
