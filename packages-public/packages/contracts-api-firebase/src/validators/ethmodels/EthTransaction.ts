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
        gasLimit: z.string().describe("gasLimit"),
        gasPrice: z.string().describe("gasPrice"),
        gas: z.string().describe("gas").optional(),
        effectiveGasPrice: z.string().describe("effective gas price").optional(),
        blockNumber: z.number().describe("block number").optional(),
        blockHash: bytes32Zod.describe("block hash").optional(),
        confirmations: z.number().describe("confirmations"),
        ethCost: z.string().describe("eth cost").optional(),
        usdCost: z.string().describe("usd cost").optional(),
        addressTouched: z.record(addressZod, z.boolean()).describe("addresses touched by transaction").optional(),
    })
    .describe("eth transaction");

type EthTransactionZodInferred = Readonly<z.infer<typeof ethTransactionZod>>;
expectType<TypeEqual<EthTransaction, EthTransactionZodInferred>>(true);
